import type { EmitterWebhookEventWithStringPayloadAndSignature, State } from "./types";
export declare function verifyAndReceive(state: State & {
    secret: string;
}, event: EmitterWebhookEventWithStringPayloadAndSignature): Promise<any>;
