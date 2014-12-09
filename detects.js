/// <reference path="esprima.d.ts" />
/// <reference path="jquery.d.ts" />
var positiveTests = [
    '/tests/positive/module.js',
    '/tests/positive/module-minified-uglify.js'
];

$(function () {
    positiveTests.forEach(function (filename) {
        $.get(filename, function (data) {
            runTest(filename, data, true);
        });
    });
});

var Detectors;
(function (Detectors) {
    function isStandardModule(node) {
        // Modules are expression statements
        var expr = matches(node, 'ExpressionStatement');

        // Consists of an invocation with a single argument
        var callExpr = matches(read(expr, function (e) {
            return e.expression;
        }), 'CallExpression', function (expr) {
            return expr.arguments.length === 1;
        });
        var arg0 = read(callExpr, function (c) {
            return c.arguments[0];
        });

        // Argument is a logical OR op
        var orArg = matches(arg0, 'LogicalExpression', function (or) {
            return or.operator === '||';
        });

        // RHS of OR operator is an assignment
        var orRhs = matches(read(orArg, function (o) {
            return o.right;
        }), 'AssignmentExpression');

        // an assignment to an empty object literal
        var assignSrc = matches(read(orRhs, function (b) {
            return b.right;
        }), 'ObjectExpression', function (obj) {
            return obj.properties.length === 0;
        });
        if (assignSrc) {
            return true;
        } else {
            return false;
        }
    }
    Detectors.isStandardModule = isStandardModule;

    function isMinifiedModule(node) {
        // Modules are expression statements
        var expr = matches(node, 'ExpressionStatement');
        var notExpr = matches(read(expr, function (e) {
            return e.expression;
        }), 'UnaryExpression', function (u) {
            return u.operator === '!';
        });

        // Consists of an invocation with a single argument
        var callExpr = matches(read(notExpr, function (e) {
            return e.argument;
        }), 'CallExpression', function (expr) {
            return expr.arguments.length === 1;
        });
        var arg0 = read(callExpr, function (c) {
            return c.arguments[0];
        });

        // Argument is a logical OR op
        var orArg = matches(arg0, 'LogicalExpression', function (or) {
            return or.operator === '||';
        });

        // RHS of OR operator is an assignment
        var orRhs = matches(read(orArg, function (o) {
            return o.right;
        }), 'AssignmentExpression');

        // an assignment to an empty object literal
        var assignSrc = matches(read(orRhs, function (b) {
            return b.right;
        }), 'ObjectExpression', function (obj) {
            return obj.properties.length === 0;
        });
        if (assignSrc) {
            return true;
        } else {
            return false;
        }
    }
    Detectors.isMinifiedModule = isMinifiedModule;
})(Detectors || (Detectors = {}));

function runTest(name, contents, expectedResult) {
    var ast = esprima.parse(contents);

    // console.log(JSON.stringify(ast));
    ast.body.forEach(function (statement) {
        Object.keys(Detectors).forEach(function (d) {
            if (Detectors[d](statement)) {
                console.log(name + ' matches ' + d);
            }
        });
    });
}

function read(node, elem) {
    if (node) {
        return elem(node);
    } else {
        return undefined;
    }
}

function matches(node, type, predicate) {
    if (node && node.type === type && (!predicate || predicate(node))) {
        return node;
    } else {
        return undefined;
    }
}
