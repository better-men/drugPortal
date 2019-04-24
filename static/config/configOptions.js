(function () {
    'use strict';
    
    var _options = {
        "apiPath": "blakk/"
    };

    if (!window.Bingo) window.Bingo = {};
    window.Bingo.config = function (key, defalutValue) {
        return _options[key] == null ? defalutValue : _options[key];
    };
})();
