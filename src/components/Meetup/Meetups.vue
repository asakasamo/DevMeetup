<template>
   <v-container>
      <!-- Meetup card wrapper -->
      <v-layout 
         row 
         wrap 
         v-for="meetup in meetups" 
         :key="meetup.id" 
         class="mb-2"
         >
         <v-flex xs12>
            <!-- Meetup card -->
            <v-card class="" >
               <v-container fluid>
                  <v-layout row>

                     <!-- Meetup image -->
                     <v-flex xs5 sm4 md3>
                        <v-card-media
                           :src="meetup.imageURL"
                           height="130px"
                           >
                        </v-card-media>
                     </v-flex>

                     <!-- Meetup info -->
                     <v-flex xs7 sm8 md9>
                        <v-card-title class="pt-1 blue--text text--darken-2">
                           <div>
                              <h2 class="headline font-weight-medium">{{ meetup.title }}</h2>
                              <h3 class="subheading">{{ meetup.date | date }}</h3>
                           </div>
                        </v-card-title>

                        <!-- View Meetup button -->
                        <v-card-actions class="ml-2">
                           <v-btn 
                              flat
                              class="info"
                              :to="'/meetups/' + meetup.id">
                              <v-icon left>arrow_forward</v-icon>
                              View Meetup
                           </v-btn>
                        </v-card-actions>
                     </v-flex>

                  </v-layout>
               </v-container>
            </v-card>
         </v-flex>
      </v-layout>
   </v-container>
</template>

<script>
export default {
   computed: {
      meetups() {
         return this.$store.getters.loadedMeetups;
      }
   },
   created() {
      this.$store.dispatch("loadMeetups");
   }
};
</script>
