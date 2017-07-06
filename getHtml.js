'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (jsonPath) => {
  const html = [];
  const fileName = path.basename(jsonPath);
  const tests = JSON.parse(path.join(process.cwd(), jsonPath));
  const style = ''

  html.push('<!DOCTYPE html>');
  html.push('<html>');
  html.push('<head>');
  html.push(`<title>${fileName}</title>`);
  html.push('<style>');

  html.push('</style>');
  html.push('</head>');
  html.push('<body>');
  html.push('<ul style="list-style-type: none">');
  tests.forEach(({ name }) => {
    html.push(`<li>${name}</li>`);
  });
  html.push('</ul>');
  html.push('</body>');
  html.push('</html>');

  return html.join('\n');
};
