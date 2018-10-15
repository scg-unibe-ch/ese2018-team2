import { createServer } from "http";
import * as next from "next";
import routes from "../lib/routes";

const port = 3000;
//const dev = process.env.NODE_ENV !== "production";
const app = next({ dev: true });

const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(port);
});
