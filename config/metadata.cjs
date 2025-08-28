const {
  author,
  dependencies,
  repository,
  version,
} = require("../package.json");

module.exports = {
  name: {
    $: "WME WazeMY",
  },
  namespace: "https://www.github.com/junyian/",
  version: version,
  author: author,
  source: repository.url,
  license: "MIT",
  match: ["*://www.waze.com/editor*", "*://www.waze.com/*/editor*"],
  require: [
    `https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js`,
    `https://greasyfork.org/scripts/449165-wme-wazemy-trafcamlist/code/wme-wazemy-trafcamlist.js`,
  ],
  grant: ["GM_xmlhttpRequest", "GM.xmlHttpRequest", "unsafeWindow"],
  connect: [
    "p3.fgies.com",
    "p4.fgies.com",
    "t2.fgies.com",
    "jalanow.com",
    "llm.gov.my",
    "venue-image.waze.com",
    "generativelanguage.googleapis.com",
  ],
  "run-at": "document-end",
};
