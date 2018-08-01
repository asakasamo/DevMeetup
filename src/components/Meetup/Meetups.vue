<template>
   <v-container>
      <!-- Meetup card wrapper -->
      <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
         <v-flex xs12>
            <!-- Meetup card -->
            <v-card class="info" >
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
                        <v-card-title primary-title>
                           <div>
                              <h2 class="white--text">{{ meetup.title }}</h2>
                              <div>{{ meetup.date | date }}</div>
                           </div>
                        </v-card-title>

                        <!-- View Meetup button -->
                        <v-card-actions>
                           <v-btn flat light :to="'/meetups/' + meetup.id">
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
   }
};
</script>
