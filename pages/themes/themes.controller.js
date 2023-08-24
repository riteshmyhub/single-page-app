import CONFIG from "../../config.js";
import hbs from "../../functions/hbs.js";

export default async function themesController({}) {
   const template = await hbs({
      path: CONFIG.VIEW_ENGINE_PAGE + "/themes/page.hbs",
      context: {},
   });
   return template;
}
