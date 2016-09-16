export interface IRequest<T> {
  handle(mediator: IMediator): Promise<T>;
  isReadOnly: boolean;
}
export interface IQuery<T> extends IRequest<T> { }
export interface ICommand<T> extends IRequest<T> { }
export interface IVoidCommand extends ICommand<void> { }

export interface IRequestHandler<TRequest, TResponse> {
  handle(request: TRequest): Promise<TResponse>;
}

export interface IVoidCommandHandler extends IRequestHandler<IVoidCommand, void> { }

export abstract class Request<T> implements IRequest<T> {
  isReadOnly = false;
  handle(mediator: IMediator): Promise<T> { return mediator.request(this); }
}
export class Query<T> extends Request<T> implements IQuery<T> {
  isReadOnly = true;
}
export class Command<T> extends Request<T> implements ICommand<T> { }
export class VoidCommand extends Command<void> implements IVoidCommand { }

export interface IMediator {
  request<T>(request: IRequest<T>): Promise<T>;
}

export class Mediator implements IMediator {
  constructor(private instanceCreator: <T>(desired: Function) => T) { }
  static registry = new Map<Function, Function>();

  // TODO: find out why we must specify <T> even when we constrain to IRequest<T> :S
  request<T>(request: IRequest<T>): Promise<T> {
    const cstr = request.constructor;
    if (Mediator.registry.has(cstr)) {
      const handler = this.instanceCreator<{ handle: (request: IRequest<T>) => Promise<T> }>(Mediator.registry.get(cstr));
      return handler.handle(request);
    }
    throw new Error("no handler registered for this request");
  }
}

export const registerRequest = (request: Function, handler: Function) => {
  if (request === handler) throw new Error("You can't register request === handler");
  if (Mediator.registry.has(request)) throw new Error("Request already has a handler assigned");
  Mediator.registry.set(request, handler);
}

export const handlerFor = (request: Function) => {
  return (target: Function) => registerRequest(request, target);
}
