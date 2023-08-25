import CONFIG from "../../config.js";
import hbs from "../../functions/hbs.js";

export default async function themesController({}) {
   const redirectUrl = CONFIG.VIEW_ENGINE_PAGE.replace("/pages", "/#/");
   const template = await hbs({
      path: CONFIG.VIEW_ENGINE_PAGE + "/themes/page.hbs",
      context: {
         redirectUrl,
         themes: [
            {
               get text() {
                  return this.var.p5;
               },
               get palette() {
                  return this.var.p1;
               },
               var: {
                  p1: "#111111",
                  p2: "#333333",
                  p3: "#555555",
                  p4: "#777777",
                  p5: "#999999",
               },
            },
            {
               get text() {
                  return this.var.p5;
               },
               get palette() {
                  return this.var.p1;
               },
               var: {
                  p1: "#510000",
                  p2: "#740000",
                  p3: "#9f3434",
                  p4: "#ff7676",
                  p5: "#ffa5a5",
               },
            },
            {
               get text() {
                  return this.var.p5;
               },
               get palette() {
                  return this.var.p1;
               },
               var: {
                  p1: "#000000",
                  p2: "#121212",
                  p3: "#282828",
                  p4: "#3B444B",
                  p5: "#868686",
               },
            },
            {
               get text() {
                  return this.var.p5;
               },
               get palette() {
                  return this.var.p1;
               },
               var: {
                  p1: "#3B0054",
                  p2: "#4A006A",
                  p3: "#680094",
                  p4: "#C263F9",
                  p5: "#D58CFC",
               },
            },
            {
               get text() {
                  return this.var.p5;
               },
               get palette() {
                  return this.var.p1;
               },
               var: {
                  p1: "#FFFFFF",
                  p2: "#EEEEEE",
                  p3: "#D6D6D6",
                  p4: "#A9A9A9",
                  p5: "#000000",
               },
            },
            {
               get text() {
                  return this.var.p5;
               },
               get palette() {
                  return this.var.p1;
               },
               var: {
                  p1: "#0A2647",
                  p2: "#144272",
                  p3: "#D6D6D6",
                  p4: "#205295",
                  p5: "white",
               },
            },
         ],
      },
   });
   return template;
}
