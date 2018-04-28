(function (register) {
    'use strict';

    register({
        name: 'register-resolve-patterns-specs',
        Spec: Spec
    });

    function Spec (hilary, expect, id) {
        return {
            'when a regular expression is used for a dependency,': {
                'hilary should be resolve all modules whose names match that expression as an array': resolvePattern,
                'and no modules match the expression': {
                    'it should resolve an empty array': resolvePatternNoneFound
                }
            }
        };

        function resolvePattern () {
            // when
            var scope = hilary.scope(id.createUid(8), { logging: { log: function () {}}});
            // var scope = hilary.scope(id.createUid(8), { logging: { level: 'trace' }});

            scope.register({ name: 'one-component', factory: 1 });
            scope.register({ name: 'two-component', factory: 2 });
            scope.register({
                name: 'three-component',
                dependencies: ['one-component', 'two-component'],
                factory: function (one, two) {
                    return function () { return one + two; };
                }
            });
            scope.register({ name: 'four', factory: 4 });
            scope.register({
                name: 'all-components',
                dependencies: [/component/i, 'three-component'],
                factory: function (components, three) {
                    return {
                        components,
                        three: three()
                    };
                }
            });

            var actual = scope.resolve('all-components');
            // then
            expect(actual.components.indexOf(1) > -1).to.equal(true);
            expect(actual.components.indexOf(2) > -1).to.equal(true);
            expect(actual.components[2]()).to.equal(3);
            expect(actual.three).to.equal(3);
            expect(actual.components.indexOf(4) > -1).to.equal(false);
        }

        function resolvePatternNoneFound () {
            // when
            var scope = hilary.scope(id.createUid(8), { logging: { log: function () {}}});
            // var scope = hilary.scope(id.createUid(8), { logging: { level: 'trace' }});

            scope.register({ name: 'one', factory: 1 });
            scope.register({ name: 'two', factory: 2 });
            scope.register({
                name: 'three',
                dependencies: ['one', 'two'],
                factory: function (one, two) {
                    return function () { return one + two; };
                }
            });
            scope.register({ name: 'four', factory: 4 });
            scope.register({
                name: 'all-components',
                dependencies: [/component/i, 'three'],
                factory: function (components, three) {
                    return {
                        components,
                        three: three()
                    };
                }
            });

            var actual = scope.resolve('all-components');

            // then
            expect(actual.components.length).to.equal(0);
            expect(actual.three).to.equal(3);
        }
    } // /Spec

}(function (registration) {
    'use strict';

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = registration.Spec;
    } else if (typeof window !== 'undefined') {
        window.fixtures = window.fixtures || {};
        window.fixtures[registration.name] = registration.Spec;
    } else {
        throw new Error('[HILARY-TESTS] Unkown runtime environment');
    }
}));