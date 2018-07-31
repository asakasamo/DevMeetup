<template>
   <v-container>
      <v-layout row wrap>
         <v-flex xs12>
            <v-card>

               <!-- Meetup Title -->
               <v-card-title>
                  <h1 class="primary--text">
                     {{ meetup.title }}
                  </h1>
               </v-card-title>

               <!-- Meetup image -->
               <v-card-media
                  :src="meetup.imageURL"
                  height="400px"
                  >
               </v-card-media>

               <!-- Meetup description -->
               <v-card-text>
                  <div class="info--text">{{ meetup.date }} - (Meetup Location)</div>
                  <div>
                     (Meetup description)
                  </div>
               </v-card-text>

               <!-- Register button -->
               <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="primary">Register</v-btn>
               </v-card-actions>

            </v-card>
         </v-flex>
      </v-layout>
   </v-container>
</template>

<script>
export default {
   props: ["id"],
   computed: {
      meetup() {
         return this.$store.getters.loadedMeetup(this.id);
      }
   }
};
</script>
