import { createLogger } from "../../createLogger";
import { middleware } from "./middleware";
function createNodeMiddleware(webhooks, {
  path = "/api/github/webhooks",
  log = createLogger()
} = {}) {
  return middleware.bind(null, webhooks, {
    path,
    log
  });
}
export {
  createNodeMiddleware
};
