/*jslint plusplus: true*/
/*globals module, require*/
(function (exports, Hilary) {
    "use strict";
    
    var AMDContainer;
    
    Hilary.extend('define', function (scope) {
        return scope.amd.register;
    });
    
    Hilary.extend('require', function (scope) {
        return scope.amd.resolve;
    });
    
    AMDContainer = new Hilary();
    
    // export the main container and make define and require globals
    exports.AMDContainer = AMDContainer;
    exports.define = AMDContainer.define;
    exports.define.amd = {};
    exports.require = AMDContainer.require;

}(
    (typeof module !== 'undefined' && module.exports) ? module.exports : window,
    (typeof module !== 'undefined' && module.exports) ? require('hilary') : window.Hilary
));
