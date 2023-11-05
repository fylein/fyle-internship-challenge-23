import { verify } from "@octokit/webhooks-methods";
async function verifyAndReceive(state, event) {
  const matchesSignature = await verify(
    state.secret,
    event.payload,
    event.signature
  );
  if (!matchesSignature) {
    const error = new Error(
      "[@octokit/webhooks] signature does not match event payload and secret"
    );
    return state.eventHandler.receive(
      Object.assign(error, { event, status: 400 })
    );
  }
  return state.eventHandler.receive({
    id: event.id,
    name: event.name,
    payload: JSON.parse(event.payload)
  });
}
export {
  verifyAndReceive
};
