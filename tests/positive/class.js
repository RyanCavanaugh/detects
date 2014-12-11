var foo = (function () {
    function foo(foo, bar) {
        if (bar === void 0) { bar = 42; }
        this.foo = foo;
        this.bar = bar;
    }
    foo.prototype.method = function () {
        return 0;
    };
    foo.x = 'thing';
    return foo;
})();
