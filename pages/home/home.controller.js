import CONFIG from "../../config.js";
import hbs from "../../functions/hbs.js";

export default async function homeController({}) {
   const template = await hbs({
      path: CONFIG.VIEW_ENGINE_PAGE + "/home/page.hbs",
      context: {},
   });
   return template;
}
