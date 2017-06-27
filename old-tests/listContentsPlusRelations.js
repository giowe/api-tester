const baseTest = require("./baseTestNoClean")

const path = "contents/contents?params={\"relations\":true}";
const method = "GET"

const test = (terminatePool = false) =>
  baseTest(
    path,
    method,
    null,
    terminatePool
  )

// eslint-disable-next-line
if (process.argv[1] === __filename) {
  test(true)
    .then(data => { console.log(data) })
    .catch(error => { console.error(error) })
}

module.exports = test