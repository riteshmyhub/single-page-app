const CONFIG = {
   APP_NAME: "single-page-app",
   PRODUCTION_URL: "https://riteshmyhub.github.io",
   get BASE_URL() {
      if (location.origin === this.PRODUCTION_URL) {
         return location.href.replace(`/${this.APP_NAME}/#/`, `/`);
      } else {
         return location.href.replace("/#/", "/");
      }
   },
   get VIEW_ENGINE_PAGE() {
      if (location.origin === this.PRODUCTION_URL) {
         return `${location.origin}/${this.APP_NAME}/pages`;
      } else {
         return `${location.origin}/pages`;
      }
   },
   get VIEW_ENGINE_PARTIALS() {
      if (location.origin === this.PRODUCTION_URL) {
         return `${location.origin}/${this.APP_NAME}/components`;
      } else {
         return `${location.origin}/components`;
      }
   },
   HASH_ROUTER_INIT() {
      if (!location.href.includes("/#/")) {
         location.replace(this.BASE_URL + "#/");
      }
   },
};

export default CONFIG;
