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
    `https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js`
  ],
  grant: ["GM.xmlHttpRequest"],
  connect: ["httpbin.org"],
  "run-at": "document-end",
};
