<template>
   <v-container>
      <!-- Explore/Organize Meetup buttons -->
      <v-layout row wrap>
         <v-flex xs12 sm6 class="text-sm-right text-xs-center">
            <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
         </v-flex>
         <v-flex xs12 sm6  class="text-sm-left text-xs-center">
            <v-btn large router to="/meetup/new" class="success">Organize Meetup</v-btn>
         </v-flex>
      </v-layout>


      <!-- Carousel -->
      <v-layout row wrap class="mt-2">
         <v-carousel>
            <v-carousel-item
               v-for="meetup in meetups"
               v-bind:src="meetup.imageURL"
               :key="meetup.id"
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
      return {
         meetups: [
            {
               imageURL:
                  "https://c1.staticflickr.com/8/7610/17149522281_3b6ae4c948_b.jpg",
               id: "id1",
               title: "Meetup in NY"
            },
            {
               imageURL:
                  "https://c1.staticflickr.com/9/8233/8586789587_c5f7ac6079_b.jpg",
               id: "id2",
               title: "Meetup in Paris"
            }
         ]
      };
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
