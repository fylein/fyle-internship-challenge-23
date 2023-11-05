import { createEventHandler } from "./event-handler/index";
import type { EmitterWebhookEvent, EmitterWebhookEventName, HandlerFunction, RemoveHandlerFunction, Options, WebhookError, WebhookEventHandlerError, EmitterWebhookEventWithStringPayloadAndSignature } from "./types";
export { createNodeMiddleware } from "./middleware/node/index";
export { emitterEventNames } from "./generated/webhook-names";
declare class Webhooks<TTransformed = unknown> {
    sign: (payload: string) => Promise<string>;
    verify: (eventPayload: string, signature: string) => Promise<boolean>;
    on: <E extends EmitterWebhookEventName>(event: E | E[], callback: HandlerFunction<E, TTransformed>) => void;
    onAny: (callback: (event: EmitterWebhookEvent) => any) => void;
    onError: (callback: (event: WebhookEventHandlerError) => any) => void;
    removeListener: <E extends EmitterWebhookEventName | "*">(event: E | E[], callback: RemoveHandlerFunction<E, TTransformed>) => void;
    receive: (event: EmitterWebhookEvent) => Promise<void>;
    verifyAndReceive: (options: EmitterWebhookEventWithStringPayloadAndSignature) => Promise<void>;
    constructor(options: Options<TTransformed> & {
        secret: string;
    });
}
export { createEventHandler, Webhooks, type EmitterWebhookEvent, type EmitterWebhookEventName, type WebhookError, };
