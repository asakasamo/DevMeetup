import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import sampleMeetups from "./sampleMeetups";

export default {
   state: {
      loadedMeetups: []
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
         meetup.location = payload.location || meetup.location;
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
       * Creates a new meetup
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
               // commit("createMeetup", { ...meetup, key });
               // update the store with the database data
               // commit("loadMeetups");
            })
            .catch((error) => {
               console.log(error);
            });

         // commit("createMeetup", meetup);
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
         if (payload.location) {
            updateObj.location = payload.location;
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

      loadSampleMeetups({ getters }) {
         // for each sample meetup
         for (const meetupid of Object.keys(sampleMeetups)) {
            const refPath = "meetups/" + meetupid + ".jpg";
            firebase
               .storage()
               .ref(refPath)
               .getDownloadURL() // fill in the image URLs and creatorId
               .then((url) => {
                  sampleMeetups[meetupid].imageURL = url;
                  sampleMeetups[meetupid].creatorId = getters.user.id;
               })
               .then(() => {
                  // then store it in the database
                  firebase
                     .database()
                     .ref("meetups")
                     .push(sampleMeetups[meetupid])
                     .then(() => {})
                     .catch((error) => {
                        console.log(error);
                     });
               })
               .catch((error) => {
                  console.log(error);
               });
         }
      }
   },

   getters: {
      /**
       * Returns the meetups loaded into the store
       * @param {Object} state
       */
      loadedMeetups(state) {
         return state.loadedMeetups.sort(
            (meetup1, meetup2) =>
               new Date(meetup1.date).getTime() -
               new Date(meetup2.date).getTime()
         );
      },

      /**
       * Returns the featured meetups (which currently is the last 5 submitted meetups)
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
};
