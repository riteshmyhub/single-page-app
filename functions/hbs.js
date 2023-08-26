import CONFIG from "../config.js";

export default async function hbs({ path, context }) {
   const response = await fetch(path);
   let code = await response.text();
   let template = Handlebars.compile(code);
   let html = template(context);
   return html;
}

const RegisterToComponent = async (path, callback) => {
   const response = await fetch(path);
   let code = await response.text();
   callback(code);
};

await RegisterToComponent(`${CONFIG.VIEW_ENGINE_PARTIALS}/Navbar.hbs`, (res) => {
   Handlebars.registerPartial("Navbar", res);
});
await RegisterToComponent(`${CONFIG.VIEW_ENGINE_PARTIALS}/TaskCard.hbs`, (res) => {
   Handlebars.registerPartial("TaskCard", res);
});
await RegisterToComponent(`${CONFIG.VIEW_ENGINE_PARTIALS}/Loading.hbs`, (res) => {
   Handlebars.registerPartial("Loading", res);
});
await RegisterToComponent(`${CONFIG.VIEW_ENGINE_PARTIALS}/Alert.hbs`, (res) => {
   Handlebars.registerPartial("Alert", res);
});

// ifEquals
Handlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
   return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("asObj", function (context) {
   return new Object(context);
});
