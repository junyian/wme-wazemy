#!/usr/bin/env node
/**
 * Refreshes the wme-sdk-typings entry in package-lock.json.
 *
 * The typings are installed from a "latest" URL that Waze republishes in
 * place, so the integrity hash recorded in the lockfile goes stale and
 * `npm ci` fails with EINTEGRITY. This script downloads the current tarball,
 * computes its sha512 integrity and reads its version, then writes both into
 * the lockfile. Run it before `npm ci` (CI does) or via `npm run sdk:refresh`.
 *
 * Usage: node scripts/refresh-sdk-hash.cjs [tarball-url]
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const PACKAGE_NAME = "wme-sdk-typings";
const LOCK_KEY = `node_modules/${PACKAGE_NAME}`;
const lockPath = path.join(__dirname, "..", "package-lock.json");

/**
 * Reads package/package.json from a gzipped tarball.
 *
 * @param {Buffer} tgz - The gzipped tarball.
 * @return {object|null} The parsed package.json, or null if not found.
 */
function readPackageJson(tgz) {
  const tar = zlib.gunzipSync(tgz);
  let offset = 0;
  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512);
    const name = header.toString("utf8", 0, 100).replace(/\0.*$/s, "");
    if (!name) break;
    const size = parseInt(
      header.toString("utf8", 124, 136).replace(/\0.*$/s, "").trim() || "0",
      8,
    );
    const dataStart = offset + 512;
    if (/^[^/]+\/package\.json$/.test(name)) {
      return JSON.parse(tar.toString("utf8", dataStart, dataStart + size));
    }
    offset = dataStart + Math.ceil(size / 512) * 512;
  }
  return null;
}

async function main() {
  const lock = JSON.parse(fs.readFileSync(lockPath, "utf8"));
  const entry = lock.packages && lock.packages[LOCK_KEY];
  if (!entry) {
    throw new Error(`${LOCK_KEY} not found in package-lock.json`);
  }

  const url = process.argv[2] || entry.resolved;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${url}`);
  }
  const tgz = Buffer.from(await response.arrayBuffer());

  const integrity =
    "sha512-" + crypto.createHash("sha512").update(tgz).digest("base64");
  const pkg = readPackageJson(tgz);

  if (entry.integrity === integrity) {
    console.log(`${PACKAGE_NAME}: hash is up to date (${entry.version}).`);
    return;
  }

  console.log(`${PACKAGE_NAME}: ${entry.version} -> ${pkg?.version ?? "?"}`);
  console.log(`  old: ${entry.integrity}`);
  console.log(`  new: ${integrity}`);
  entry.integrity = integrity;
  if (pkg?.version) entry.version = pkg.version;
  fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + "\n");
}

main().catch((err) => {
  console.error(`[refresh-sdk-hash] ${err.message}`);
  process.exit(1);
});
