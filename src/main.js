// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import firebase from "firebase";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import DateFilter from "./filters/date";
import { store } from "./store";
import AlertCmp from "./components/Shared/Alert.vue";
import EditMeetupDetailsDialog from "./components/Meetup/Edit/EditMeetupDetailsDialog.vue";
import "./styles/animations.css";

Vue.use(Vuetify);
Vue.config.productionTip = false;

// Register our filter(s)
Vue.filter("date", DateFilter);

// Globally register components
Vue.component("app-alert", AlertCmp);
Vue.component("app-edit-meetup-details-dialog", EditMeetupDetailsDialog);

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
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.$store.dispatch("autoLogIn", user);
         }
      });

      this.$store.dispatch("loadMeetups");
   }
});
