const CONFIG = {
   APP_NAME: "vanilla-js-curd",
   PRODUCTION_URL: "https://riteshmyhub.github.io",
   get BASE_URL() {
      let baseUrl = location.origin === this.PRODUCTION_URL ? `${location.origin}/${this.APP_NAME}` : location.origin;
      return baseUrl + "/#/";
   },
   TEMPLATE_ENGINE_PATH() {
      return this.BASE_URL.replace("/#/", "/");
   },
   HASH_ROUTER_INIT() {
      location.replace("/#/");
   },
};

export default CONFIG;
