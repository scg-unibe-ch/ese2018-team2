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
  },
  elasticsearch_url: {
    doc: "URL to elasticsearch",
    default: "localhost:9200",
    env: "ELASTICSEARCH_URL"
  },
  sparkpost_api_key: {
    doc: "API Key for SparkPost mailing service",
    default: "",
    env: "SPARKPOST_API_KEY"
  }
});

export default config;
