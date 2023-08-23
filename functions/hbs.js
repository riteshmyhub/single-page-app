import CONFIG from "../config/config.js";

export default async function hbs({ path, context }) {
   const response = await fetch(path);
   let code = await response.text();
   let template = Handlebars.compile(code);
   let html = template(context);
   return html;
}

const RegisterPartial = (path, callback) => {
   let xhr = new XMLHttpRequest();
   xhr.open("GET", path, true);
   xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
         if (xhr.status === 200) {
            callback(this.responseText);
         } else {
            callback("template not found!");
         }
      }
   };
   xhr.send();
};

RegisterPartial(`${CONFIG.VIEW_ENGINE_PARTIALS}/Navbar.hbs`, (res) => {
   Handlebars.registerPartial("Navbar", res);
});
RegisterPartial(`${CONFIG.VIEW_ENGINE_PARTIALS}/TaskCard.hbs`, (res) => {
   Handlebars.registerPartial("TaskCard", res);
});
// ifEquals
Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
   return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
