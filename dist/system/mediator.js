System.register([], function (_export) {
    "use strict";

    var Request, Query, Command, VoidCommand, Mediator, registerRequest, handlerFor;

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [],
        execute: function () {
            Request = (function () {
                function Request() {
                    _classCallCheck(this, Request);

                    this.isReadOnly = false;
                }

                Request.prototype.handle = function handle(mediator) {
                    return mediator.request(this);
                };

                return Request;
            })();

            _export("Request", Request);

            Query = (function (_Request) {
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

            _export("Query", Query);

            Command = (function (_Request2) {
                _inherits(Command, _Request2);

                function Command() {
                    _classCallCheck(this, Command);

                    _Request2.apply(this, arguments);
                }

                return Command;
            })(Request);

            _export("Command", Command);

            VoidCommand = (function (_Command) {
                _inherits(VoidCommand, _Command);

                function VoidCommand() {
                    _classCallCheck(this, VoidCommand);

                    _Command.apply(this, arguments);
                }

                return VoidCommand;
            })(Command);

            _export("VoidCommand", VoidCommand);

            Mediator = (function () {
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

            _export("Mediator", Mediator);

            Mediator.registry = new Map();

            registerRequest = function registerRequest(request, handler) {
                if (request === handler) throw new Error("You can't register request === handler");
                if (Mediator.registry.has(request)) throw new Error("Request already has a handler assigned");
                Mediator.registry.set(request, handler);
            };

            _export("registerRequest", registerRequest);

            handlerFor = function handlerFor(request) {
                return function (target) {
                    return registerRequest(request, target);
                };
            };

            _export("handlerFor", handlerFor);
        }
    };
});