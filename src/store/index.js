import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
      loadedMeetups: [
         // {
         //    imageURL:
         //       "https://c1.staticflickr.com/8/7610/17149522281_3b6ae4c948_b.jpg",
         //    id: "1",
         //    title: "Meetup in NY",
         //    date: new Date("1/1/2019"),
         //    location: "New York, NY",
         //    description: "Some description"
         // },
         // {
         //    imageURL:
         //       "https://c1.staticflickr.com/9/8233/8586789587_c5f7ac6079_b.jpg",
         //    id: "2",
         //    title: "Meetup in Paris",
         //    date: new Date("2/2/2019"),
         //    location: "Paris, France",
         //    description: "Some other description"
         // }
      ],
      user: null,
      loading: false,
      error: null
   },
   mutations: {
      setLoadedMeetups(state, payload) {
         state.loadedMeetups = payload;
      },
      /**
       * Adds a new meetup to the store
       * @param {Object} state
       * @param {Object} payload The new meetup object
       */
      createMeetup(state, payload) {
         state.loadedMeetups.push(payload);
      },
      /**
       * Sets the current active user
       * @param {Object} state
       * @param {Object} payload
       */
      setUser(state, payload) {
         state.user = payload;
      },

      /**
       * Sets the loading state
       * @param {Object} state
       * @param {boolean} payload
       */
      setLoading(state, payload) {
         state.loading = payload;
      },

      /**
       * Sets the error state
       * @param {Object} state
       * @param {Object} payload
       */
      setError(state, payload) {
         state.error = payload;
      },

      /**
       * Clears the error state
       * @param {Object} state
       */
      clearError(state) {
         state.error = null;
      }
   },
   actions: {
      loadMeetups({ commit }) {
         commit("setLoading", true);
         firebase
            .database()
            .ref("meetups")
            .once("value")
            .then((data) => {
               const meetups = [];
               const obj = data.val();
               for (let key in obj) {
                  console.log(obj[key]);
                  meetups.push({
                     id: key,
                     title: obj[key].title,
                     location: obj[key].location,
                     description: obj[key].description,
                     imageURL: obj[key].imageURL,
                     date: obj[key].date,
                     creatorID: obj[key].creatorID
                  });
               }
               commit("setLoadedMeetups", meetups);
               commit("setLoading", false);
            })
            .catch((error) => {
               console.log(error);
               commit("setLoading", false);
            });
      },
      /**
       * Creates a new user
       */
      createMeetup({ commit, getters }, payload) {
         const meetup = {
            title: payload.title,
            location: payload.location,
            imageURL: payload.imageURL,
            description: payload.description,
            date: payload.date.toISOString(),
            creatorID: getters.user.id
         };
         // Reach out to firebase and store it
         firebase
            .database()
            .ref("meetups")
            .push(meetup)
            .then((data) => {
               const key = data.key;
               commit("createMeetup", { ...meetup, key });
            })
            .catch((error) => {
               console.log(error);
            });

         commit("createMeetup", meetup);
      },
      /**
       * Signs up a new user using firebase
       * @param {Object} commit
       * @param {Object} payload { email, password }
       */
      signUserUp({ commit }, payload) {
         commit("setLoading", true);
         commit("clearError");
         firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then((userCredential) => {
               const newUser = {
                  id: userCredential.user.uid,
                  registeredMeetups: []
               };
               commit("setUser", newUser);
               commit("setLoading", false);
            })
            .catch((error) => {
               commit("setLoading", false);
               commit("setError", error);
               console.log(error);
            });
      },

      /**
       * Logs a user in
       * @param {Object} commit
       * @param {Object} payload { email, password }
       */
      logUserIn({ commit }, payload) {
         commit("setLoading", true);
         commit("clearError");
         firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then((userCredential) => {
               const newUser = {
                  id: userCredential.user.uid,
                  registeredMeetups: []
               };
               commit("setUser", newUser);
               commit("setLoading", false);
            })
            .catch((error) => {
               commit("setLoading", false);
               commit("setError", error);
               console.log(error);
            });
      },

      /**
       * Clears the error state
       */
      clearError({ commit }) {
         commit("clearError");
      },

      /**
       * Automaticaly logs in the user
       * @param {Object} commit
       * @param {Object} payload
       */
      autoLogIn({ commit }, payload) {
         commit("setUser", { id: payload.uid, registeredMeetups: [] });
      },

      /**
       * Logs the user out
       * @param {Object} commit
       */
      logOut({ commit }) {
         firebase.auth().signOut();
         commit("setUser", null);
      }
   },
   getters: {
      /**
       * Returns the meetups loaded into the store
       * @param {Object} state
       */
      loadedMeetups(state) {
         return state.loadedMeetups.sort(
            (meetup1, meetup2) => meetup1.date > meetup2.date
         );
      },

      /**
       * Returns the first 5 meetups
       * @param {Object} state
       */
      featuredMeetups(state, getters) {
         return getters.loadedMeetups.slice(0, 5);
      },

      /**
       * Returns the current loaded meetup
       * @param {Object} state
       */
      loadedMeetup(state) {
         return (meetupId) =>
            state.loadedMeetups.find((meetup) => meetup.id === meetupId);
      },

      user(state) {
         return state.user;
      },

      error(state) {
         return state.error;
      },

      loading(state) {
         return state.loading;
      }
   }
});
