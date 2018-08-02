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
         console.log(payload);
      },

      /**
       * Updats a given meetup
       * @param {Object} state
       * @param {Object} payload
       */
      updateMeetup(state, payload) {
         const meetup = state.loadedMeetups.find((mu) => mu.id === payload.id);

         // only update if updates are available
         meetup.title = payload.title || meetup.title;
         meetup.description = payload.description || meetup.description;
         meetup.date = payload.date || meetup.date;
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
      /**
       * Preloads meetups from the database
       * @param {Object} commit
       */
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
                  meetups.push({
                     id: key,
                     title: obj[key].title,
                     location: obj[key].location,
                     description: obj[key].description,
                     imageURL: obj[key].imageURL,
                     date: obj[key].date,
                     creatorId: obj[key].creatorId
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
            creatorId: getters.user.id
         };
         // Reach out to firebase and store it
         let key, refPath;
         firebase
            .database()
            .ref("meetups")
            .push(meetup) // store the meetup in the database
            .then((data) => {
               // get the new meetup's key
               key = data.key;
               const filename = payload.image.name;
               const extension = filename.slice(filename.lastIndexOf("."));

               // store the file in firebase storage as {id}.{extension}
               refPath = "meetups/" + key + extension;
               return firebase
                  .storage()
                  .ref(refPath)
                  .put(payload.image);
            })
            .then(() =>
               // fetch the image URL
               firebase
                  .storage()
                  .ref(refPath)
                  .getDownloadURL()
            )
            .then((imageURL) =>
               // update the database reference with the url
               firebase
                  .database()
                  .ref("meetups")
                  .child(key)
                  .update({ imageURL })
            )
            .then(() => {
               // commit the changes to the local store
               commit("createMeetup", { ...meetup, key });
            })
            .catch((error) => {
               console.log(error);
            });

         commit("createMeetup", meetup);
      },

      /**
       * Updates a meetup (i.e. from the Edit Meetup component)
       * @param {Object} commit
       * @param {Object} payload
       */
      updateMeetupData({ commit }, payload) {
         commit("setLoading", true);

         const updateObj = {};
         if (payload.title) {
            updateObj.title = payload.title;
         }
         if (payload.description) {
            updateObj.description = payload.description;
         }
         if (payload.date) {
            updateObj.date = payload.date;
         }

         // update the meetup in firebase
         firebase
            .database()
            .ref("meetups")
            .child(payload.id)
            .update(updateObj)
            .then(() => {
               // update the local store
               commit("updateMeetup", payload);
               commit("setLoading", false);
            })
            .catch((error) => {
               commit("setLoading", false);
               console.log(error);
            });
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
