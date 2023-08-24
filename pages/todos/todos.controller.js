import CONFIG from "../../config.js";
import hbs from "../../functions/hbs.js";

export default async function todosController({ loading, list }) {
   let url = new URL(CONFIG.BASE_URL);
   let status = url.searchParams.get("status");
   const template = await hbs({
      path: CONFIG.VIEW_ENGINE_PAGE + "/todos/page.hbs",
      context: {
         loading: loading,
         tasks: list?.filter((task) => {
            return status === "all" ? true : task.status === status;
         }),
         queryObj: {
            status: url.searchParams.get("status"),
         },
      },
   });
   return template;
}
