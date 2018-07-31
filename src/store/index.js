import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
   state: {
      loadedMeetups: [
         {
            imageURL:
               "https://c1.staticflickr.com/8/7610/17149522281_3b6ae4c948_b.jpg",
            id: "1",
            title: "Meetup in NY",
            date: "1/1/2019"
         },
         {
            imageURL:
               "https://c1.staticflickr.com/9/8233/8586789587_c5f7ac6079_b.jpg",
            id: "2",
            title: "Meetup in Paris",
            date: "2/2/2019"
         }
      ],
      user: {
         id: "userid",
         registeredMeetups: ["registeredMeetups"]
      }
   },
   mutations: {},
   actions: {},
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
       * Returns the fir st 5 meetups
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
      }
   }
});
