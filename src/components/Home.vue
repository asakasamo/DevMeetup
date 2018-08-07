<template>
   <v-container>
      <!-- Loading spinner -->
      <v-layout v-if="loading">
         <v-flex xs12 class="text-xs-center">
            <v-progress-circular
               :size="70"
               color="primary"
               indeterminate
               >
            </v-progress-circular>
         </v-flex>
      </v-layout>

      <!-- Main content wrapper -->
      <template v-else>

         <!-- Header text: Featured Meetups -->
         <v-layout row wrap class="mt-2">
            <v-flex xs12 class="text-xs-center">
               <h1 class="display-2 font-weight-black blue--text text--darken-2">Featured Meetups</h1>
            </v-flex>
         </v-layout>

         <!-- Carousel -->
         <v-layout row wrap class="mt-2 mb-2" v-if="!loading">
            <v-carousel style="cursor: pointer;" class="blue">
               <v-carousel-item
                  v-for="meetup in meetups"
                  v-bind:src="meetup.imageURL"
                  :key="meetup.id"
                  @click.native="goToMeetup(meetup.id)"
                  >
                  <div centered class="carousel-title">
                     {{ meetup.title }}
                  </div>
               </v-carousel-item>
            </v-carousel>
         </v-layout>

         <!-- Explore/Organize Meetup buttons -->
         <v-layout row wrap>
            <v-flex xs12 sm6 class="text-sm-right text-xs-center">
               <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6  class="text-sm-left text-xs-center">
               <v-btn large to="/meetup/new" class="success">Organize Meetup</v-btn>
            </v-flex>
         </v-layout>
      </template>
   </v-container>
</template>

<script>
export default {
   data() {
      return {};
   },
   computed: {
      meetups() {
         return this.$store.getters.featuredMeetups;
      },
      loading() {
         return this.$store.getters.loading;
      }
   },
   methods: {
      goToMeetup(id) {
         this.$router.push("/meetups/" + id);
      }
   }
};
</script>

<style scoped>
.carousel-title {
   color: white;
   position: absolute;
   bottom: 50px;
   font-size: 1.5em;
   background-color: rgba(0, 0, 0, 0.5);
   padding: 0.5em;

   left: 50%;
   transform: translateX(-50%);
   text-align: center;
}
</style>
