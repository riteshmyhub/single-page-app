const CONFIG = {
   APP_NAME: "single-page-app",
   PRODUCTION_URL: "https://riteshmyhub.github.io",
   get BASE_URL() {
      if (location.origin === this.PRODUCTION_URL) {
         return location.href.replace(`/${this.APP_NAME}/#/`, "/");
      } else {
         return location.href.replace("/#/", "/");
      }
   },
   TEMPLATE_ENGINE_PATH() {
      return this.BASE_URL;
   },
   HASH_ROUTER_INIT() {
      if (!location.href.includes("/#/")) {
         location.replace(this.BASE_URL);
      }
   },
};

export default CONFIG;
