import toastify from "../functions/toastify.js";
export default class Storage {
   #storageConfig = Object.freeze({
      dbName: "task",
   });
   refresher;
   loading = false;
   taskList = JSON.parse(localStorage.getItem(this.#storageConfig.dbName)) || [];

   constructor() {}

   _create = (task) => {
      this.taskList = [...this.taskList, task];
      localStorage.setItem(this.#storageConfig.dbName, JSON.stringify(this.taskList));
      this.refresher();
      toastify(`task successfully created!`);
   };
   //
   _deleteById = (id) => {
      this.taskList = this.taskList.filter((item) => item?.id !== id);
      localStorage.setItem(this.#storageConfig.dbName, JSON.stringify([...this.taskList]));
      this.refresher();
      toastify(`task successfully deleted!`);
   };
   //
   _deleteAllList = () => {
      this.taskList = [];
      localStorage.setItem(this.#storageConfig.dbName, JSON.stringify(this.taskList));
      this.refresher();
      toastify(`removed all task!`);
   };
   //
   _updateById = (id, task) => {
      this.taskList.forEach((item) => {
         if (item?.id === id) {
            item.title_task = task?.title_task;
            item.discription = task?.discription;
            item.category = task?.category;
         }
      });
      localStorage.setItem(this.#storageConfig.dbName, JSON.stringify([...this.taskList]));
      this.refresher();
      toastify(`task successfully update!`);
   };
   //
   _updateStatusById = (id, status) => {
      this.taskList.forEach((item) => {
         if (item?.id === id) {
            item.status = status;
         }
      });
      localStorage.setItem(this.#storageConfig.dbName, JSON.stringify([...this.taskList]));
      setTimeout(() => {
         this.refresher();
         toastify(`your task status is ${status}`);
      }, 1000);
   };
}
