const nextRoutes = require("next-routes");
const routes = (module.exports = nextRoutes());

routes.matchPath = path => {
  const result = routes.match(path);
  if (result.route && result.route.name && result.params) {
    return {
      route: result.route.name,
      params: result.params
    };
  }
  return null;
};

routes
  .add("index", "/")
  .add("jobs", "/jobs")
  .add("jobdetails", "/jobdetails");
