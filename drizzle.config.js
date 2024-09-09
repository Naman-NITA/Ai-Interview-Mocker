/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://ai-interview-mocker_owner:w6yaGVvhz1BL@ep-still-glade-a5xj53ve.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
  }
};