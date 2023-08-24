import CONFIG from "./config.js";
import hbs from "./functions/hbs.js";
import homeController from "./pages/home/home.controller.js";
import todosController from "./pages/todos/todos.controller.js";
import themesController from "./pages/themes/themes.controller.js";
import Storage from "./storage/storage.js";

console.log({
   BASE_URL: CONFIG.BASE_URL,
   VIEW_ENGINE_PAGE: CONFIG.VIEW_ENGINE_PAGE,
   VIEW_ENGINE_PARTIALS: CONFIG.VIEW_ENGINE_PARTIALS,
});

CONFIG.HASH_ROUTER_INIT();

const root = document.getElementById("root");
export default class App extends Storage {
   page;
   constructor() {
      super();
      this.routes();
      window.addEventListener("hashchange", this.routes);
      this.refresher = () => {
         setTimeout(() => {
            this.routes();
         }, 500);
      };
   }

   DeleteByIdTask = (event) => {
      const isDeleteMode = Object.keys(event.target.dataset).includes("deleteId");
      if (isDeleteMode) {
         this._deleteById(event.target.dataset?.deleteId);
      }
   };

   EditHandler = (event) => {
      const form = document.getElementsByTagName("form")[0];
      const isEditMode = Object.keys(event.target.dataset).includes("editId");
      if (isEditMode) {
         let id = event.target.dataset.editId;
         form.dataset.formName = id;
         this.taskList.forEach((task) => {
            if (task?.id === id) {
               document.getElementById("title_task").value = task.title_task;
               document.getElementById("discription").value = task.discription;
               if (task.category === "personal") {
                  document.querySelectorAll(`[value="personal"]`)[0].checked = true;
               }
               if (task.category === "teams") {
                  document.querySelectorAll(`[value="teams"]`)[0].checked = true;
               }
            }
         });
      }
   };

   SubmitHandler = (event) => {
      event.preventDefault();
      let data = new FormData(event.target);
      let task = {
         id: `task-id-${Date.now()}`,
         title_task: data.get("title_task"),
         discription: data.get("discription"),
         category: data.get("category"),
         status: "pending",
      };
      if (event.target.dataset.formName) {
         delete task.id;
         this._updateById(event.target.dataset.formName, task);
      } else {
         this._create(task);
      }
      event.target.dataset.formName = "";
      event.target.reset();
   };

   onStatusChange = (event) => {
      if (event.target.checked) {
         this._updateStatusById(event.target.getAttribute("data-status-id"), "done");
      } else {
         this._updateStatusById(event.target.getAttribute("data-status-id"), "pending");
      }
   };

   routes = async () => {
      let url = new URL(CONFIG.BASE_URL);
      switch (url.pathname) {
         case "/":
            this.page = await homeController({});
            break;
         case "/todos":
            this.page = await todosController({
               loading: this.loading,
               list: this.taskList,
            });
            break;
         case "/themes":
            this.page = await themesController({});
            break;
         default:
            this.page = await hbs({
               path: CONFIG.VIEW_ENGINE_PAGE + "/404/page.hbs",
               context: {},
            });
            break;
      }
      root.innerHTML = this.page;
      /* dom access here */
      const form = document.getElementsByTagName("form")[0];
      const taskList = document.getElementById("task-container")?.children;
      form?.addEventListener("submit", this.SubmitHandler);

      for (let i = 0; i < taskList?.length; i++) {
         const element = taskList[i];
         element?.addEventListener("click", this.DeleteByIdTask);
         element?.addEventListener("click", this.EditHandler);
         element?.addEventListener("change", this.onStatusChange);
      }
      /* dom access here */
   };
}

const app = new App();
