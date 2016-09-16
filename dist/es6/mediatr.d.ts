// Generated by dts-bundle v0.5.0

export interface IRequest<T> {
   handle(mediator: IMediator): Promise<T>;
   isReadOnly: boolean;
}
export interface IQuery<T> extends IRequest<T> {
}
export interface ICommand<T> extends IRequest<T> {
}
export interface IVoidCommand extends ICommand<void> {
}
export interface IRequestHandler<TRequest, TResponse> {
   handle(request: TRequest): Promise<TResponse>;
}
export interface IVoidCommandHandler extends IRequestHandler<IVoidCommand, void> {
}
export abstract class Request<T> implements IRequest<T> {
   isReadOnly: boolean;
   handle(mediator: IMediator): Promise<T>;
}
export class Query<T> extends Request<T> implements IQuery<T> {
   isReadOnly: boolean;
}
export class Command<T> extends Request<T> implements ICommand<T> {
}
export class VoidCommand extends Command<void> implements IVoidCommand {
}
export interface IMediator {
   request<T>(request: IRequest<T>): Promise<T>;
}
export class Mediator implements IMediator {
   constructor(instanceCreator: <T>(desired: Function) => T);
   static registry: Map<Function, Function>;
   request<T>(request: IRequest<T>): Promise<T>;
}
export const registerRequest: (request: Function, handler: Function) => void;
export const handlerFor: (request: Function) => (target: Function) => void;
