import CONFIG from "./config/config.js";

CONFIG.HASH_ROUTER_INIT();
console.log(CONFIG.TEMPLATE_ENGINE_PATH());
const root = document.getElementById("root");

export default class App {
   page;
   constructor() {
      this.routes();
      window.addEventListener("hashchange", this.routes);
   }
   routes = () => {
      let url =
         new URL(location.href.replace("/#/", "/")) || //
         new URL(location.href.replace("/single-page-app/#/", "/"));

      switch (url.pathname) {
         case "/":
            this.page = `<a href="#/dd">home page work!</a>`;
            break;
         default:
            this.page = `<a href="#/">404 page work!</a>`;
            break;
      }
      root.innerHTML = this.page;
   };
}

const app = new App();
