import { store } from "../store";

export default (toolbar, from, next) => {
   if (store.getters.user) {
      next();
   } else {
      next("/login");
   }
};
