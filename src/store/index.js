import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
      loadedMeetups: [
         {
            imageURL:
               "https://c1.staticflickr.com/8/7610/17149522281_3b6ae4c948_b.jpg",
            id: "1",
            title: "Meetup in NY",
            date: new Date("1/1/2019"),
            location: "New York, NY",
            description: "Some description"
         },
         {
            imageURL:
               "https://c1.staticflickr.com/9/8233/8586789587_c5f7ac6079_b.jpg",
            id: "2",
            title: "Meetup in Paris",
            date: new Date("2/2/2019"),
            location: "Paris, France",
            description: "Some other description"
         }
      ],
      user: null
   },
   mutations: {
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
      }
   },
   actions: {
      /**
       * Creates a new user
       */
      createMeetup({ commit }, payload) {
         const meetup = {
            id: "99999999",
            title: payload.title,
            location: payload.location,
            imageURL: payload.imageURL,
            description: payload.description,
            date: payload.date
         };
         // Reach out to firebase and store it
         commit("createMeetup", meetup);
      },
      /**
       * Signs up a new user using firebase
       * @param {Object} commit
       * @param {Object} payload
       */
      signUserUp({ commit }, payload) {
         firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then((userCredential) => {
               const newUser = {
                  id: userCredential.user.uid,
                  registeredMeetups: []
               };
               commit("setUser", newUser);
            })
            .catch((error) => {
               console.log(error);
            });
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

      /**
       * Returns the current active user
       * @param {Object} state
       */
      user(state) {
         return state.user;
      }
   }
});
