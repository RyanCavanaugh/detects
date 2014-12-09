/// <reference path="esprima.d.ts" />
/// <reference path="jquery.d.ts" />

var positiveTests = [
    '/tests/positive/module.js',
    '/tests/positive/module-minified-uglify.js' /*,
    '/tests/positive/class.js',
    '/tests/positive/extends.js' */
];

$(() => {
    positiveTests.forEach(filename => {
        $.get(filename, data => {
            runTest(filename, data, true);
        });

    });
});

module Detectors {
    export function isStandardModule(node: esprima.Syntax.Node) {
        // Modules are expression statements
        var expr = matches(node, 'ExpressionStatement');
        // Consists of an invocation with a single argument
        var callExpr = matches(read(expr, e => e.expression), 'CallExpression', expr => expr.arguments.length === 1);
        var arg0 = read(callExpr, c => c.arguments[0]);
        // Argument is a logical OR op
        var orArg = matches(arg0, 'LogicalExpression', or => or.operator === '||');
        // RHS of OR operator is an assignment
        var orRhs = matches(read(orArg, o => o.right), 'AssignmentExpression');
        // an assignment to an empty object literal
        var assignSrc = matches(read(orRhs, b => b.right), 'ObjectExpression', obj => obj.properties.length === 0)
        if (assignSrc) {
            return true;
        } else {
            return false;
        }
    }

    export function isMinifiedModule(node: esprima.Syntax.Node) {
        // Modules are expression statements
        var expr = matches(node, 'ExpressionStatement');
        var notExpr = matches(read(expr, e => e.expression), 'UnaryExpression', u => u.operator === '!');
        // Consists of an invocation with a single argument
        var callExpr = matches(read(notExpr, e => e.argument), 'CallExpression', expr => expr.arguments.length === 1);
        var arg0 = read(callExpr, c => c.arguments[0]);
        // Argument is a logical OR op
        var orArg = matches(arg0, 'LogicalExpression', or => or.operator === '||');
        // RHS of OR operator is an assignment
        var orRhs = matches(read(orArg, o => o.right), 'AssignmentExpression');
        // an assignment to an empty object literal
        var assignSrc = matches(read(orRhs, b => b.right), 'ObjectExpression', obj => obj.properties.length === 0)
        if (assignSrc) {
            return true;
        } else {
            return false;
        }
    }
}


function runTest(name: string, contents: string, expectedResult: boolean) {
    var ast = esprima.parse(contents);
    // console.log(JSON.stringify(ast));

    ast.body.forEach(statement => {
        Object.keys(Detectors).forEach(d => {
            if (Detectors[d](statement)) {
                console.log(name + ' matches ' + d);
            }
        });
    });
}

function read<T, U>(node: T, elem: (x: T) => U): U {
    if (node) {
        return elem(node);
    } else {
        return undefined;
    }
}

function matches(node: esprima.Syntax.Node, type: 'ArrayExpression', predicate?: (x: esprima.Syntax.ArrayExpression) => boolean): esprima.Syntax.ArrayExpression;
function matches(node: esprima.Syntax.Node, type: 'ArrowFunctionExpression', predicate?: (x: esprima.Syntax.ArrowFunctionExpression) => boolean): esprima.Syntax.ArrowFunctionExpression;
function matches(node: esprima.Syntax.Node, type: 'AssignmentExpression', predicate?: (x: esprima.Syntax.AssignmentExpression) => boolean): esprima.Syntax.AssignmentExpression;
function matches(node: esprima.Syntax.Node, type: 'BinaryExpression', predicate?: (x: esprima.Syntax.BinaryExpression) => boolean): esprima.Syntax.BinaryExpression;
function matches(node: esprima.Syntax.Node, type: 'BlockStatement', predicate?: (x: esprima.Syntax.BlockStatement) => boolean): esprima.Syntax.BlockStatement;
function matches(node: esprima.Syntax.Node, type: 'BlockStatementOrExpression', predicate?: (x: esprima.Syntax.BlockStatementOrExpression) => boolean): esprima.Syntax.BlockStatementOrExpression;
function matches(node: esprima.Syntax.Node, type: 'BreakStatement', predicate?: (x: esprima.Syntax.BreakStatement) => boolean): esprima.Syntax.BreakStatement;
function matches(node: esprima.Syntax.Node, type: 'CallExpression', predicate?: (x: esprima.Syntax.CallExpression) => boolean): esprima.Syntax.CallExpression;
function matches(node: esprima.Syntax.Node, type: 'Declaration', predicate?: (x: esprima.Syntax.Declaration) => boolean): esprima.Syntax.Declaration;
function matches(node: esprima.Syntax.Node, type: 'ExpressionStatement', predicate?: (x: esprima.Syntax.ExpressionStatement) => boolean): esprima.Syntax.ExpressionStatement;
function matches(node: esprima.Syntax.Node, type: 'LogicalExpression', predicate?: (x: esprima.Syntax.LogicalExpression) => boolean): esprima.Syntax.LogicalExpression;
function matches(node: esprima.Syntax.Node, type: 'MemberExpression', predicate?: (x: esprima.Syntax.MemberExpression) => boolean): esprima.Syntax.MemberExpression;
function matches(node: esprima.Syntax.Node, type: 'NewExpression', predicate?: (x: esprima.Syntax.NewExpression) => boolean): esprima.Syntax.NewExpression;
function matches(node: esprima.Syntax.Node, type: 'ObjectExpression', predicate?: (x: esprima.Syntax.ObjectExpression) => boolean): esprima.Syntax.ObjectExpression;
function matches(node: esprima.Syntax.Node, type: 'ReturnStatement', predicate?: (x: esprima.Syntax.ReturnStatement) => boolean): esprima.Syntax.ReturnStatement;
function matches(node: esprima.Syntax.Node, type: 'UnaryExpression', predicate?: (x: esprima.Syntax.UnaryExpression) => boolean): esprima.Syntax.UnaryExpression;
function matches(node: esprima.Syntax.Node, type: 'VariableDeclaration', predicate?: (x: esprima.Syntax.VariableDeclaration) => boolean): esprima.Syntax.VariableDeclaration;
function matches(node: esprima.Syntax.Node, type: 'VariableDeclarator', predicate?: (x: esprima.Syntax.VariableDeclarator) => boolean): esprima.Syntax.VariableDeclarator;
function matches(node: esprima.Syntax.Node, type: string, predicate?: (x: esprima.Syntax.Node) => boolean): esprima.Syntax.Node;
function matches(node: esprima.Syntax.Node, type: string, predicate: (x: any) => boolean): any {
    if (node && node.type === type && (!predicate || predicate(node))) {
        return node;
    } else {
        return undefined;
    }
}
