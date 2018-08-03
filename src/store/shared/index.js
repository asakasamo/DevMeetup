export default {
   state: {
      loading: false,
      error: null
   },
   mutations: {
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
       * Clears the error state
       */
      clearError({ commit }) {
         commit("clearError");
      }
   },

   getters: {
      error(state) {
         return state.error;
      },
      loading(state) {
         return state.loading;
      }
   }
};
