<template>
   <v-container>
      <!-- Loading spinner -->
      <v-layout v-if="loading">
         <v-flex xs12 class="text-xs-center">
            <v-progress-circular
               :size="70"
               color="primary"
               indeterminate
               v-if="loading"
               >
            </v-progress-circular>
         </v-flex>
      </v-layout>

      <!-- Meetup card wrapper -->
      <v-layout row wrap v-else>
         <v-flex xs12>
            <v-card>

               <!-- Meetup Title -->
               <v-card-title class="primary text-xs-center">
                  <v-spacer></v-spacer>
                  <h1 class="blue--text text--lighten-5">
                     {{ meetup.title }}
                  </h1>

                  <!-- Meetup title edit button -->
                  <template v-if="userIsCreator">
                     <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
                  </template>
                  <v-spacer></v-spacer>
               </v-card-title>

               <!-- Meetup image -->
               <v-card-media
                  :src="meetup.imageURL"
                  height="400px"
                  >
               </v-card-media>

               <v-card-text class="title blue lighten-4 blue--text text--darken-3 text-xs-center">
                  <h4 class="mb-1">
                     Date: <span class="font-weight-regular">{{ meetup.date | date }}</span>
                     <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date-dialog>
                     <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-time-dialog>
                  </h4>
                  <h4>
                     Location: <span class="mb-1 font-weight-regular">{{ meetup.location }}</span>
                  </h4>
               </v-card-text>

               <!-- Meetup details -->
               <v-card-text>
                  <div class="text-xs-center subheading">
                     {{ meetup.description }}
                  </div>
               </v-card-text>


               <!-- Register button -->
               <v-card-actions class="blue lighten-4">
                  <v-spacer></v-spacer>
                  <app-register-dialog
                     :meetupId="meetup.id" 
                     v-if="!userIsCreator"
                     >
                  </app-register-dialog>
                  <v-chip 
                     v-else 
                     color="orange"
                     text-color="white"
                     >
                  You are the organizer
                  </v-chip>
                  <v-spacer></v-spacer>
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
         return (
            this.$store.getters.loadedMeetup(this.id) || {
               imageURL: "",
               title: "Loading...",
               date: "Loading...",
               location: "Loading...",
               description: "Loading..."
            }
         );
      },
      userIsAuthenticated() {
         return !!this.$store.getters.user;
      },
      userIsCreator() {
         if (!this.userIsAuthenticated) return false;

         return this.$store.getters.user.id === this.meetup.creatorId;
      },
      loading() {
         return this.$store.getters.loading;
      }
   }
};
</script>
