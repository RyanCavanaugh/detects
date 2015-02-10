/// <reference path="patterns.ts" />
/// <reference path="matcher.ts" />
/// <reference path="../typings/esprima/esprima.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />

import Patterns = require('./patterns');
import StructuralMatch = require('./matcher');

$(() => {
    $.getJSON('/tests-positive.txt', (positiveTests: string[]) => {
        positiveTests.forEach(filename => {
            $.get('/tests/positive/' + filename, data => {
                runTest(filename, data, true);
            }, 'text');
        });
    });

    $.getJSON('/tests-negative.txt', (negativeTests: string[]) => {
        negativeTests.forEach(filename => {
            $.get('/tests/negative/' + filename, data => {
                runTest(filename, data, false);
            }, 'text');
        });
    });

});


function runTest(name: string, contents: string, expectedResult: boolean) {
    var ast = esprima.parse(contents, { tolerant: true });

    var report = $('<div>');
    report.addClass('test');
    report.append('<h1>' + name + '</h1>');

    Object.keys(Patterns).sort().forEach(p => {
        try {
            var result = StructuralMatch.isMatchDeep(ast.body, Patterns[p]);
        } catch (e) {
            result = e;
        }

        if (result) {
            report.append('<div class="pass">' + p + '</div>');
        } else {
            report.append('<div class="fail">' + p + '</div>');
        }
    });
    $('#testResults').append(report);
}
