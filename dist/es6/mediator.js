export class Request {
    constructor() {
        this.isReadOnly = false;
    }
    handle(mediator) { return mediator.request(this); }
}
export class Query extends Request {
    constructor(...args) {
        super(...args);
        this.isReadOnly = true;
    }
}
export class Command extends Request {
}
export class VoidCommand extends Command {
}
export class Mediator {
    constructor(instanceCreator) {
        this.instanceCreator = instanceCreator;
    }
    // TODO: find out why we must specify <T> even when we constrain to IRequest<T> :S
    request(request) {
        const cstr = request.constructor;
        if (Mediator.registry.has(cstr)) {
            const handler = this.instanceCreator(Mediator.registry.get(cstr));
            return handler.handle(request);
        }
        throw new Error("no handler registered for this request");
    }
}
Mediator.registry = new Map();
export const registerRequest = (request, handler) => {
    if (request === handler)
        throw new Error("You can't register request === handler");
    if (Mediator.registry.has(request))
        throw new Error("Request already has a handler assigned");
    Mediator.registry.set(request, handler);
};
export const handlerFor = (request) => {
    return (target) => registerRequest(request, target);
};
//# sourceMappingURL=mediator.js.map