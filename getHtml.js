/* eslint-disable indent */
'use strict';

const fs = require('fs');
const path = require('path');
const pretty = require('js-object-pretty-print').pretty;

module.exports = (jsonPath) => {
  const html = [];
  const fileName = path.basename(jsonPath);
  const tests = require(jsonPath);
  const style = fs.readFileSync(path.join(__dirname, 'style.css'));
  const scripts = fs.readFileSync(path.join(__dirname, 'htmlScripts.js'));

  html.push(
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    `<title>${fileName}</title>`,
    `<script>${scripts}</script>`,
    `<style>${style}</style>`,
    '<meta charset="UTF-8">',
    '</head>',
    '<body style="text-align: center;">',
    '<ul style="list-style-type: none; -webkit-padding-start: 0;">'
  );

  tests.forEach(({ name, input, expectedOutput, description, passed, uri, method, options, result }, index) => {

    html.push(
      '<li>',
        `<div id="${name}-${index}">`,
          '<table>',
            `<tr class=${passed ? 'success' : 'fail'}>`,
              `<th   
                  colspan="2" 
                  onclick="changeVisibility('${name}', '${index}')">
                  ${name} ${passed ? '&#x2714;' : '&#x2718;'}</th>`,
            '</tr>',
            `<tr class="${name}-${index}-visibility">`,
              '<th scope="row">Description</th>',
              `<td><div class=scrollable>${description}</div></td>`,
            '</tr>',
            `<tr class="${name}-${index}-visibility">`,
              '<th scope="row"><div class=scrollable>URI</div></th>',
              `<td><div class=scrollable>${uri}</div></td>`,
            '</tr>',
            `<tr class="${name}-${index}-visibility">`,
              '<th scope="row">Method</th>',
              `<td>${method}</td>`,
            '</tr>',
            `<tr class="${name}-${index}-visibility">`,
              '<th scope="row">Input</th>',
              `<td><div class=scrollable>${pretty(input)}</div></td>`,
            '</tr>',
            `<tr class="${name}-${index}-visibility">`,
              '<th scope="row">Output</th>',
              `<td><div class=scrollable>${pretty(expectedOutput).replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                return '&#'+i.charCodeAt(0)+';';
              })}</div>  </td>`,
            '</tr>',
            `<tr class="${name}-${index}-visibility">`,
              '<th scope="row">Result</th>',
              `<td><div class=scrollable>${pretty(result)}</div></td>`,
            '</tr>',
            `<tr class="${name}-${index}-visibility">`,
              '<th scope="row">Options</th>',
              `<td><div class=scrollable>${pretty(options)}</div></td>`,
            '</tr>',
          '</table>',
        '</div>',
      '</li>'
    );
  });
  html.push(
    '</ul>',
    '</body>',
    '</html>'
  );

  return html.join('\n');
};
