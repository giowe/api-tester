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
    `<title>${path.basename(fileName, '.json')}</title>`,
    `<script>${scripts}</script>`,
    `<style>${style}</style>`,
    '<meta charset="UTF-8">',
    '</head>',
    '<body>',
    `<section class="footer"><p>Generated at ${ new Date() }</p></section>`,
    '<section class="container">',
    '<ul style="list-style-type: none; -webkit-padding-start: 0;">'
  );

  tests.forEach(({ name, input, expectedOutput, description, passed, uri, method, options, result, executionTime, errorMessage }, index) => {
    const inputLength = pretty(input).split(/\r\n|\r|\n/).length - 1;
    const outputLength = pretty(expectedOutput).split(/\r\n|\r|\n/).length - 1;
    const resultLength = pretty(result).split(/\r\n|\r|\n/).length - 1;
    const optionsLength = pretty(options).split(/\r\n|\r|\n/).length - 1;

    html.push(
      '<li>',
        `<div id="${name}-${index}">`,
          '<table>',
            `<tr class=${passed ? 'success' : 'fail'}>`,
              `<th   
                  colspan="2" 
                  onclick="changeVisibility('${name}', '${index}')" width="60vm">
                  <div class=${passed ? "success" : "fail"}>${name} ${passed ? '&#x2714;' : '&#x2718;'}</div></th>`,
            '</tr>',
            `<tr class="${name}-${index}-visibility" style="display: none;">`,
              '<th scope="row">Description</th>',
              `<td id="${name}-${index}-description" style="white-space: normal">${description}</td>`,
            '</tr>',
            `<tr class="${name}-${index}-visibility ${name}-${index}-uri" style="display: none;">`,
              '<th scope="row">URI</th>',
              `<td id="${name}-${index}-uri" class="uriViewer"><a href="${encodeURI(uri)}">${uri}</a></td>`,
            '</tr>',
            `<tr class="${name}-${index}-visibility ${name}-${index}-method" style="display: none;">`,
              '<th scope="row">Method</th>',
              `<td id="${name}-${index}-method">${method}</td>`,
            '</tr>',
            `<tr class="${name}-${index}-visibility ${name}-${index}-executionTime" style="display: none;">`,
              '<th scope="row">Execution time</th>',
              `<td id="${name}-${index}-executionTime">${executionTime}ms</td>`,
            '</tr>',
            `<tr class="${name}-${index}-visibility ${name}-${index}-input" style="display: none;">`,
              '<th scope="row">Input</th>',
              `<td id="${name}-${index}-input"><div class="partial">${pretty(input, 2)}</div></td>`,
            '</tr>',
            inputLength > 10 ? `<tr class="${name}-${index}-visibility" style="display: none;">` : '',
              inputLength > 10 ? `<th colspan="2" class="viewMore"><a href="#"  onclick="changeToShow('${name}', '${index}', 'input')" id="${name}-${index}-input-viewMore">View more</a></th>` : '',
            inputLength > 10 ? '</tr>' : '',
            errorMessage ? `<tr class="${name}-${index}-visibility ${name}-${index}-errorMessage" style="display: none;">` : '',
              errorMessage ? '<th scope="row">Errors</th>' : '',
              errorMessage ? `<td id="${name}-${index}-errorMessage"><div class="full">${errorMessage}</div></td>` : '',
            errorMessage ? '</tr>' : '',
            `<tr class="${name}-${index}-visibility ${name}-${index}-output" style="display: none;">`,
              '<th scope="row">Output</th>',
              `<td id="${name}-${index}-output"><div class="partial">${pretty(expectedOutput, 2).replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
                return '&#'+i.charCodeAt(0)+';';
              })}</div></td>`,
            '</tr>',
            outputLength > 10 ? `<tr class="${name}-${index}-visibility" style="display: none;">` : '',
              outputLength > 10 ? `<th colspan="2" class="viewMore"><a href="#"  onclick="changeToShow('${name}', '${index}', 'output')" id="${name}-${index}-output-viewMore">View more</a></th>` : '',
            outputLength > 10 ? '</tr>' : '',
            `<tr class="${name}-${index}-visibility ${name}-${index}-result" style="display: none;">`,
              '<th scope="row">Result</th>',
              `<td id="${name}-${index}-result"><div class="partial">${pretty(result, 2)}</div></td>`,
            '</tr>',
            resultLength > 10 ? `<tr class="${name}-${index}-visibility" style="display: none;">` : '',
              resultLength > 10 ? `<th colspan="2" class="viewMore"><a href="#"  onclick="changeToShow('${name}', '${index}', 'result')" id="${name}-${index}-result-viewMore">View more</a></th>` : '',
            resultLength > 10 ? '</tr>' : '',
            options ? `<tr class="${name}-${index}-visibility ${name}-${index}-options" style="display: none;">` : '',
              options ? '<th scope="row">Options</th>' : '',
              options ? `<td id="${name}-${index}-options"><div class="partial">${options ? pretty(options, 2): ''}</div></td>` : '',
            options ? '</tr>' : '',
            options && optionsLength > 10 ? `<tr class="${name}-${index}-visibility" style="display: none;">` : '',
              options && optionsLength > 10 ? `<th colspan="2" class="viewMore"><a href="#" onclick="changeToShow('${name}', '${index}', 'options')" id="${name}-${index}-options-viewMore">View more</a></th>` : '',
            options && optionsLength > 10 ? '</tr>' : '',
          '</table>',
        '</div>',
      '</li>'
    );
  });
  html.push(
    '</ul>',
    '</section>',
    '</body>',
    '</html>'
  );

  return html.join(' ');
};
