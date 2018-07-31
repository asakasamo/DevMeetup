<template>
   <v-container>
      <!-- Explore/Organize Meetup buttons -->
      <v-layout row wrap>
         <v-flex xs12 sm6 class="text-sm-right text-xs-center">
            <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>
         </v-flex>
         <v-flex xs12 sm6  class="text-sm-left text-xs-center">
            <v-btn large to="/meetup/new" class="success">Organize Meetup</v-btn>
         </v-flex>
      </v-layout>


      <!-- Carousel -->
      <v-layout row wrap class="mt-2">
         <v-carousel style="cursor: pointer;">
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

      <!-- Text below carousel -->
      <v-layout row wrap class="mt-2">
         <v-flex xs12 class="text-xs-center">
            <p>Join our awesome meetups!</p>
         </v-flex>
      </v-layout>

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
