import firebase from "firebase";

export default {
   state: {
      user: null
   },
   mutations: {
      /**
       * Sets the current active user
       * @param {Object} state
       * @param {Object} payload
       */
      setUser(state, payload) {
         state.user = payload;
      },

      /**
       * Registers the current user for a given meetup
       * @param {Object} state
       * @param {Object} payload the meetup
       */
      registerUserForMeetup(state, payload) {
         const meetupid = payload.id;
         if (
            state.user.registeredMeetups.findIndex(
               (meetup) => meetup.id === meetupid
            ) >= 0
         ) {
            return;
         }

         // store the meetup id
         state.user.registeredMeetups.push(meetupid);

         // store the firebase reference to the meetup registration
         state.user.fbRegistrationKeys[meetupid] = payload.fbRegistrationKey;
      },

      /**
       * Unregisters a the current user from a given meetup
       * @param {Object} state
       * @param {string} payload the meetup id
       */
      unregisterUserFromMeetup(state, payload) {
         const registeredMeetups = state.user.registeredMeetups;

         // Remove the registered meetup from the registeredMeetups array
         registeredMeetups.splice(
            registeredMeetups.findIndex((meetup) => meetup.id === payload),
            1
         );

         // Delete the firebase reference to the meetup registration
         Reflect.deleteProperty(state.user.fbRegistrationKeys, payload);
      }
   },

   actions: {
      /**
       * Registers a user for a meetup
       * @param {Object} commit
       * @param {Object} payload the meetup id
       */
      registerUserForMeetup({ commit, getters }, payload) {
         commit("setLoading", true);
         const user = getters.user;

         firebase
            .database()
            .ref("/users/" + user.id)
            .child("/registrations/")
            .push(payload) // add the meetup to /users/registrations/
            .then((data) => {
               commit("registerUserForMeetup", {
                  id: payload,
                  fbRegistrationKey: data.key // the firebase id of the registration
               });
               commit("setLoading", false);
            })
            .catch((error) => {
               commit("setLoading", false);
               console.log(error);
            });
      },

      /**
       * Unregisters a user from a meetup
       */
      unregisterUserFromMeetup({ commit, getters }, payload) {
         commit("setLoading", true);
         const user = getters.user;

         if (!user.fbRegistrationKeys) {
            return;
         }
         const fbRegistrationKey = user.fbRegistrationKeys[payload];
         firebase
            .database()
            .ref("/users/" + user.id + "/registrations") // go to the registration
            .child(fbRegistrationKey)
            .remove() // remove the registration from the database
            .then(() => {
               commit("unregisterUserFromMeetup", payload);
               commit("setLoading", false);
            })
            .catch((error) => {
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
                  registeredMeetups: [],
                  fbRegistrationKeys: {}
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
                  registeredMeetups: [],
                  fbRegistrationKeys: {}
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
       * Automaticaly logs in the user
       * @param {Object} commit
       * @param {Object} payload
       */
      autoLogIn({ commit }, payload) {
         commit("setUser", {
            id: payload.uid,
            registeredMeetups: [],
            fbRegistrationKeys: {}
         });
      },

      fetchUserData({ commit, getters }) {
         commit("setLoading", true);

         // fetch registered meetups
         firebase
            .database()
            .ref("/users/" + getters.user.id + "/registrations/")
            .once("value")
            .then((data) => {
               commit("setLoading", true);

               const registrations = data.val();
               let registeredMeetups = [];
               let fbRegistrationKeys = {};

               for (let key in registrations) {
                  registeredMeetups.push(registrations[key]);
                  fbRegistrationKeys[registrations[key]] = key;
               }

               const updatedUser = {
                  id: getters.user.id,
                  registeredMeetups,
                  fbRegistrationKeys
               };

               commit("setUser", updatedUser);
               commit("setLoading", false);
            })
            .catch((error) => {
               console.log(error);
            });
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
       * Returns the current logged in user
       * @param {Object} state
       */
      user(state) {
         return state.user;
      }
   }
};
