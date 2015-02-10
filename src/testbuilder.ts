/// <reference path="../typings/esprima/esprima.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

import $ = require('jquery');
import esprima = require('esprima');
import StructuralMatch = require('./matcher');
import tsprima = require('./tsprima');

// console.log(tsprima.sourceFileToJSON(ts.createSourceFile('empty.ts', 'var x: string = 23', ts.ScriptTarget.ES5, false)));

function parse(s: string): {} {
    return JSON.parse(tsprima.sourceFileToJSON(ts.createSourceFile('test.ts', s, ts.ScriptTarget.Latest, true)));
}

$(() => {
    var inputBox = $('#input');
    inputBox.val(window.localStorage.getItem('code') || '');
    inputBox.on('input propertychange', generateTestBuilderUI);
    inputBox.on('input propertychange', () => window.localStorage.setItem('code', inputBox.val()));
    generateTestBuilderUI();
    produceTest();
    runBackTest();


    var back = $('#back');
    back.val(window.localStorage.getItem('back') || '');
    back.on('input propertychange', runBackTest);
    back.on('input propertychange', () => window.localStorage.setItem('back', back.val()));

    $('#test').on('input propertychange', runBackTest);
});

function runBackTest() {
    var test = JSON.parse($('#test').val());
    var backtestAst = parse($('#back').val());
    if (StructuralMatch.isMatchDeep(backtestAst, test)) {
        $('#backtest-result').text('Passed');
    } else {
        $('#backtest-result').text('Failed');
    }
}

function produceTest() {

    function computeCommonRootKey(ast: any) {
        var keyStack: string[] = [];
        var keyList: string[] = [];
        function recurse(node) {
            Object.keys(node).forEach(k => {
                keyStack.push(k);
                var compositeKey = keyStack.join('.');
                var checkbox = $('input').filter((i, c) => c.getAttribute('data-key') === compositeKey);
                if (checkbox.length > 0 && checkbox.prop('checked')) {
                    keyList.push(compositeKey);
                }

                if (typeof node[k] === 'object' && node[k] !== null) {
                    recurse(node[k]);
                }

                keyStack.pop();
            });
        }
        recurse(ast);

        console.log('keys = ' + keyList.join(','));
        var bestKey = '';
        if (keyList.length > 0) {
            for (var i = 1; i < 1000; i++) {
                var candidate = keyList[0].substr(0, i);
                if (keyList.every(k => k.indexOf(candidate) === 0)) {
                    bestKey = candidate;
                } else {
                    break;
                }
            }
        }
        return bestKey;
    }

    var keyStack: string[] = [];
    function setFields(ast: any, root: any) {
        var anyChecked = false;
        Object.keys(ast).forEach(k => {
            keyStack.push(k);

            var compositeKey = keyStack.join('.');
            var checkbox = $('input').filter((i, c) => c.getAttribute('data-key') === compositeKey);
            if (checkbox.length > 0) {
                if (typeof ast[k] === 'object' && ast[k] !== null) {
                    var child = {};
                    root[k] = child;
                    var anyChildren = setFields(ast[k], root[k]);
                    if (anyChildren || checkbox.prop('checked')) {
                        anyChecked = true;
                    } else {
                        delete root[k];
                    }
                } else {
                    if (checkbox.prop('checked')) {
                        anyChecked = true;
                        root[k] = ast[k];
                    }
                }
            }

            keyStack.pop();

        });
        return anyChecked;
    }

    var ast = getCodeBlock();
    var result = {};
    setFields(ast.ast, result);
    var commonRoot = computeCommonRootKey(ast.ast);

    if (commonRoot.length > 0) {
        var keyParts = commonRoot.split('.');
        keyParts.every(k => {
            if (k !== '') {
                if (typeof result[k] === 'object') {
                    result = result[k];
                    return true;
                } else {
                    return false;
                }
            }
        });
    }

    $('#test').val(JSON.stringify(result, undefined, '  '));

    runBackTest();
}

function getCodeBlock() {
    var code = $('#input').val();
    var parsed = parse(code);
    var firstStatement = parsed;

    return {
        code: code,
        ast: firstStatement
    }
}

function generateTestBuilderUI() {
    var codeBlock = getCodeBlock();
    var ast = codeBlock.ast;
    var code = codeBlock.code;

    $('#code').text(code);

    var rangeStack: number[][] = [];
    var keyStack: string[] = [];
    function emitTo(node: any, elem: JQuery) {
        var parentList = $('<ul>');
        Object.keys(node).forEach(k => {
            if (k === 'range' || k === 'rest' || k === 'generator') return;

            var val = node[k];

            keyStack.push(k);
            rangeStack.unshift(val && val.range);

            var listItem = $('<li>');
            var currentRanges = rangeStack.slice(0);
            listItem.hover(() => {
                var ranges = currentRanges.filter(r => !!r);
                if (ranges.length > 0) {
                    var range = ranges[0];
                    $('#code').html(code.substr(0, range[0]) + '<span class="active">' + code.substr(range[0], range[1] - range[0]) + '</span>' + code.substr(range[1]));
                } else {
                    $('#code').html(code);
                }
            }, () => {
                // Hover out, ?
            });
            listItem.attr('data-key', k);
            listItem.attr('data-value', JSON.stringify(val));

            var label = $('<label>');
            if (val !== null && val.range !== undefined) {
                label.attr('title', code.substr(val.range[0], val.range[1] - val.range[0]));
            }
            var checkbox = $('<input type="checkbox">');
            checkbox.attr('data-key', keyStack.join('.'));
            checkbox.change(produceTest);
            var caption = $('<span>');

            label.append(checkbox);
            label.append(caption);
            listItem.append(label);

            if (typeof node[k] === 'object' && node[k] !== null) {
                caption.text(k);
                emitTo(node[k], listItem);
            } else {
                if (typeof node[k] === 'string') {
                    caption.text('"' + k + '": "' + node[k] + '"');
                } else {
                    caption.text('"' + k + '": ' + node[k]);
                }
            }

            parentList.append(listItem);

            keyStack.pop();
            rangeStack.shift();
        });
        elem.append(parentList);
    }
    $('#ast').empty();
    emitTo(ast, $('#ast'));
}



