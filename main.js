import CONFIG from "./config.js";
import hbs from "./functions/hbs.js";
import Storage from "./storage/storage.js";
//import hbs from "./functions/hbs.js";
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
               form.setAttribute("data-form-id", task?.id);
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
            let status = url.searchParams.get("status");
            this.page = await hbs({
               path: CONFIG.VIEW_ENGINE_PAGE + "/todos/page.hbs",
               context: {
                  loading: this.loading,
                  tasks: this.taskList?.filter((task) => {
                     return status === "all" ? true : task.status === status;
                  }),
                  queryObj: {
                     status: url.searchParams.get("status"),
                  },
               },
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
      /* dom access here */
      const taskList = document.getElementById("task-container")?.children;
      const form = document.getElementsByTagName("form")[0];
      form.addEventListener("submit", this.SubmitHandler);

      for (let i = 0; i < taskList?.length; i++) {
         const element = taskList[i];
         element?.addEventListener("click", this.DeleteByIdTask);
         element?.addEventListener("click", this.EditHandler);
      }
      /* dom access here */
   };
}

const app = new App();
