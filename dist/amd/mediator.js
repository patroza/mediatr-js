define(["exports"], function (exports) {
    "use strict";

    exports.__esModule = true;

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Request = (function () {
        function Request() {
            _classCallCheck(this, Request);

            this.isReadOnly = false;
        }

        Request.prototype.handle = function handle(mediator) {
            return mediator.request(this);
        };

        return Request;
    })();

    exports.Request = Request;

    var Query = (function (_Request) {
        _inherits(Query, _Request);

        function Query() {
            _classCallCheck(this, Query);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            _Request.call.apply(_Request, [this].concat(args));
            this.isReadOnly = true;
        }

        return Query;
    })(Request);

    exports.Query = Query;

    var Command = (function (_Request2) {
        _inherits(Command, _Request2);

        function Command() {
            _classCallCheck(this, Command);

            _Request2.apply(this, arguments);
        }

        return Command;
    })(Request);

    exports.Command = Command;

    var VoidCommand = (function (_Command) {
        _inherits(VoidCommand, _Command);

        function VoidCommand() {
            _classCallCheck(this, VoidCommand);

            _Command.apply(this, arguments);
        }

        return VoidCommand;
    })(Command);

    exports.VoidCommand = VoidCommand;

    var Mediator = (function () {
        function Mediator(instanceCreator) {
            _classCallCheck(this, Mediator);

            this.instanceCreator = instanceCreator;
        }

        Mediator.prototype.request = function request(_request) {
            var cstr = _request.constructor;
            if (Mediator.registry.has(cstr)) {
                var handler = this.instanceCreator(Mediator.registry.get(cstr));
                return handler.handle(_request);
            }
            throw new Error("no handler registered for this request");
        };

        return Mediator;
    })();

    exports.Mediator = Mediator;

    Mediator.registry = new Map();
    var registerRequest = function registerRequest(request, handler) {
        if (request === handler) throw new Error("You can't register request === handler");
        if (Mediator.registry.has(request)) throw new Error("Request already has a handler assigned");
        Mediator.registry.set(request, handler);
    };
    exports.registerRequest = registerRequest;
    var handlerFor = function handlerFor(request) {
        return function (target) {
            return registerRequest(request, target);
        };
    };
    exports.handlerFor = handlerFor;
});