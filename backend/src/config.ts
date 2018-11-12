import convict from "convict";

export const config = convict({
  database_url: {
    doc: "URL to database",
    default: "postgres://postgres@localhost/postgres",
    env: "DATABASE_URL"
  },
  redis_url: {
    doc: "URL to redis",
    default: "redis://localhost:6379",
    env: "REDIS_URL"
  }
});

export default config;
