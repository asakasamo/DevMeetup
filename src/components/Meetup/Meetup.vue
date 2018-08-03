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
               <v-card-title>
                  <h1 class="primary--text">
                     {{ meetup.title }}
                  </h1>
                  <template v-if="userIsCreator">
                     <v-spacer></v-spacer>
                     <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
                  </template>
               </v-card-title>

               <!-- Meetup image -->
               <v-card-media
                  :src="meetup.imageURL"
                  height="400px"
                  >
               </v-card-media>

               <!-- Meetup details -->
               <v-card-text>
                  <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
                  <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date-dialog>
                  <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-time-dialog>
                  <div>
                     {{ meetup.description }}
                  </div>
               </v-card-text>

               <!-- Register button -->
               <v-card-actions>
                  <v-spacer></v-spacer>
                  <app-register-dialog :meetupId="meetup.id"></app-register-dialog>
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
