import algoliasearch from "algoliasearch";
import * as dotenv from "dotenv";
dotenv.config();

const app_id = process.env.ALGOLIA_APP_ID.toString();
const api_key = process.env.ALGOLIA_API_KEY.toString();
const algoliaClient = algoliasearch(app_id, api_key);

export const mascotasClientIndex = algoliaClient.initIndex("mascotas");
export const usersClientIndex = algoliaClient.initIndex("users");
