"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = {
    Query: {
        hello: function (_, _a) {
            var name = _a.name;
            return "Hello " + (name || "World");
        },
        jobs: function (_, args, ctx) { return ctx.jobRepository.getJobs(); }
    },
    Mutation: {
        createJob: function (_, _a, ctx) {
            var title = _a.title, description = _a.description;
            return ctx.jobRepository.createJob(title, description);
        }
    }
};
