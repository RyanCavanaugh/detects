/// <reference path="patterns.ts" />
/// <reference path="matcher.ts" />
/// <reference path="esprima.d.ts" />
/// <reference path="jquery.d.ts" />
$(function () {
    $.getJSON('/tests-positive.txt', function (positiveTests) {
        positiveTests.forEach(function (filename) {
            $.get('/tests/positive/' + filename, function (data) {
                runTest(filename, data, true);
            }, 'text');
        });
    });

    $.getJSON('/tests-negative.txt', function (negativeTests) {
        negativeTests.forEach(function (filename) {
            $.get('/tests/negative/' + filename, function (data) {
                runTest(filename, data, false);
            }, 'text');
        });
    });
});

function runTest(name, contents, expectedResult) {
    var ast = esprima.parse(contents, { tolerant: true });

    var report = $('<div>');
    report.addClass('test');
    report.append('<h1>' + name + '</h1>');

    Object.keys(Patterns).sort().forEach(function (p) {
        try  {
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
