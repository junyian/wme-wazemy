const {
  author,
  dependencies,
  repository,
  version,
} = require("../package.json");

module.exports = {
  name: {
    $: "WME WazeMY"
  },
  namespace: "https://www.github.com/junyian/",
  version: version,
  author: author,
  source: repository.url,
  license: 'MIT',
  match: ["*://www.waze.com/editor*", "*://www.waze.com/*/editor*"],
  require: [
    `https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`,
  ],
  grant: ["GM.xmlHttpRequest"],
  connect: ["httpbin.org"],
  "run-at": "document-end",
};
