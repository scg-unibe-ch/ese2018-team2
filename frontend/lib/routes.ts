import * as createRoutes from "next-routes";
import Routes from "next-routes";

// https://github.com/fridays/next-routes/issues/181
// @ts-ignore
const routes: Routes = createRoutes();

routes
  .add("index", "/")
  .add("jobs", "/jobs")
  .add("jobdetails", "/jobs/:id", "details");

export const Link = routes.Link;
export const Router = routes.Router;

export default routes;
