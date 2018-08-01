// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import * as firebase from "firebase";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import DateFilter from "./filters/date";
import { store } from "./store";

Vue.use(Vuetify);
Vue.config.productionTip = false;

// Register our filter(s)
Vue.filter("date", DateFilter);

/* eslint-disable no-new */
new Vue({
   el: "#app",
   router,
   components: { App },
   template: "<App/>",
   store,
   created() {
      firebase.initializeApp({
         apiKey: "AIzaSyAMbCb0D6hHbgPR1JLoNTk-Su7nK70aqIU",
         authDomain: "wemeetup-asakasamo.firebaseapp.com",
         databaseURL: "https://wemeetup-asakasamo.firebaseio.com",
         projectId: "wemeetup-asakasamo",
         storageBucket: "wemeetup-asakasamo.appspot.com"
      });
   }
});
