import convict from "convict";

export const config = convict({
  database_url: {
    doc: "URL to database",
    default: "postgres://postgres@localhost/postgres",
    env: "DATABASE_URL"
  }
});

export default config;
