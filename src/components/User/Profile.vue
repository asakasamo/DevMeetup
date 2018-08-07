<template>
   <v-container grid-list-md v-if="user">
      <v-layout row wrap>

         <!-- User info wrapper -->
         <v-flex xs12>
            <v-card>
               <v-card-title class="blue darken-1">
                  <h2 class="blue--text text--lighten-5">User Info</h2>
               </v-card-title>
               <v-card-text>
                  <p class="my-1 subheading">
                     Email: {{ user.email }}
                  </p>
               </v-card-text>
            </v-card>
         </v-flex>

         <!-- Registered Meetups wrapper -->
         <v-flex xs12 md6>
            <v-card>
               <v-card-title class="blue darken-1">
                  <h2 class="blue--text text--lighten-5">Registered Meetups</h2>
               </v-card-title>

               <!-- List of registered meetups -->
               <v-list class="pa-0">
                  <v-list-tile 
                     v-for="(meetup, idx) in getRegisteredMeetups"
                     :key="idx"
                     :class="idx % 2 ? 'blue lighten-5' : ''"
                     >
                     <v-list-tile-content>
                        <v-list-tile-title>
                           {{ meetup.title }}
                        </v-list-tile-title>
                     </v-list-tile-content>

                     <v-list-tile-action>
                        <v-btn icon :to="'/meetups/' + meetup.id">
                           <v-icon color="green">arrow_forward</v-icon>
                        </v-btn>
                     </v-list-tile-action>

                     <v-list-tile-action>
                        <app-register-dialog :meetupId="meetup.id" :profile="true"></app-register-dialog>
                     </v-list-tile-action>

                  </v-list-tile>
               </v-list>

               <div class="text-xs-center">
                  <!-- No registered meetups indicator -->
                  <p 
                     v-if="!user.registeredMeetups.length"
                     class="my-2 subheading"
                     >
                     You are not registered for any meetups.
                  </p>

                  <!-- Explore meetups button -->
                  <v-btn 
                     class="info"
                     to="/meetups"
                     small
                     >
                     Explore Meetups
                  </v-btn>
               </div>
            </v-card>
         </v-flex>
         
         <!-- Organized Meetups wrapper -->
         <v-flex xs12 md6>
            <v-card>
               <v-card-title class="blue darken-1">
                  <h2 class="blue--text text--lighten-5">Organized Meetups</h2>
               </v-card-title>

               <!-- List of created meetups -->
               <v-list class="pa-0">
                  <v-list-tile 
                     v-for="(meetup, idx) in getCreatedMeetups"
                     :key="idx"
                     :class="idx % 2 ? 'blue lighten-5' : ''"
                     >
                     <v-list-tile-content>
                        <v-list-tile-title>
                           {{ meetup.title }}
                        </v-list-tile-title>
                     </v-list-tile-content>

                     <v-list-tile-action>
                        <v-btn icon :to="'/meetups/' + meetup.id">
                           <v-icon color="green">arrow_forward</v-icon>
                        </v-btn>
                     </v-list-tile-action>
                  </v-list-tile>
               </v-list>

               <div class="text-xs-center">
                  <!-- No organized meetups indicator -->
                  <p 
                     v-if="!getCreatedMeetups.length" 
                     class="my-2 subheading"
                     >
                     You have not organized any meetups.
                  </p>

                  <!-- Organize new meetup button -->
                  <v-btn
                     class="success"
                     to="/meetup/new"
                     small
                     >
                     Organize a new Meetup
                  </v-btn>
               </div>
            </v-card>
         </v-flex>
      </v-layout>
   </v-container>

</template>

<script>
export default {
   computed: {
      user() {
         return this.$store.getters.user;
      },
      getRegisteredMeetups() {
         return this.user.registeredMeetups.map((meetupId) =>
            this.getMeetupById(meetupId)
         );
      },
      getCreatedMeetups() {
         return this.$store.getters.getMeetupsByCreator(this.user.id);
      }
   },
   methods: {
      getMeetupById(meetupId) {
         return this.$store.getters.loadedMeetup(meetupId);
      },
      goToMeetup(meetupId) {
         this.$router.push("/meetups/" + meetupId);
      }
   }
};
</script>

