const CONFIG = {
   APP_NAME: "single-page-app",
   PRODUCTION_URL: "https://riteshmyhub.github.io",
   get BASE_URL() {
      let baseUrl = location.origin === this.PRODUCTION_URL ? `${location.origin}/${this.APP_NAME}` : location.origin;
      return baseUrl + "/#/";
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
