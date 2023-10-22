/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./lib/schema.js",
  out:"./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRESS_URL,
  }
};