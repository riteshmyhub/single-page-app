import CONFIG from "./config/config.js";
import hbs from "./functions/hbs.js";
//import hbs from "./functions/hbs.js";
console.log({
   BASE_URL: CONFIG.BASE_URL,
   VIEW_ENGINE_PAGE: CONFIG.VIEW_ENGINE_PAGE,
   VIEW_ENGINE_PARTIALS: CONFIG.VIEW_ENGINE_PARTIALS,
});
CONFIG.HASH_ROUTER_INIT();

const root = document.getElementById("root");

console.log();
export default class App {
   page;
   constructor() {
      this.routes();
      window.addEventListener("hashchange", this.routes);
   }
   routes = async () => {
      let url = new URL(CONFIG.BASE_URL);
      switch (url.pathname) {
         case "/":
            this.page = await hbs({
               path: CONFIG.VIEW_ENGINE_PAGE + "/home/page.hbs",
               context: {},
            });
            break;
         case "/todos":
            this.page = await hbs({
               path: CONFIG.VIEW_ENGINE_PAGE + "/todos/page.hbs",
               context: {},
            });
            break;
         default:
            this.page = await hbs({
               path: CONFIG.VIEW_ENGINE_PAGE + "/404/page.hbs",
               context: {},
            });
            break;
      }
      root.innerHTML = this.page;
   };
}

const app = new App();
