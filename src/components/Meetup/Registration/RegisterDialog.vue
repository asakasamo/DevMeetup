<template>
   <v-dialog width="300px" persistent v-model="registerDialog">

      <!-- Activator button -->
      <div slot="activator">
         <v-layout v-if="userIsRegistered">
            <v-chip 
               text-color="white"
               class="green"
               >
               <v-avatar>
                  <v-icon>check_circle</v-icon>
               </v-avatar>
               You are registered
            </v-chip>
         </v-layout>

         <v-btn v-else class="success">
            Register
         </v-btn>
      </div>

      <!-- Main card wrapper -->
      <v-card>
         <v-container>

            <!-- Dialog box title -->
            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-title v-if="!userIsRegistered">Register for meetup?</v-card-title>
                  <v-card-title v-else>Cancel Registration?</v-card-title>
               </v-flex>
            </v-layout>

            <!-- Confirmation message wrapper -->
            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-text>
                     You can always change your decision later on.
                  </v-card-text>
               </v-flex>
            </v-layout>

            <v-divider></v-divider>

            <!-- Action buttons -->
            <v-layout row wrap>
               <v-flex xs12>
                  <v-card-actions>

                     <!-- Confirm button -->
                     <v-btn 
                        flat 
                        class="green--text darken-1" 
                        @click="onConfirm"
                        >
                        Confirm
                     </v-btn>
                     
                     <v-spacer></v-spacer>
                     
                     <!-- Cancel button -->
                     <v-btn 
                        flat 
                        class="red--text darken-1" 
                        @click="registerDialog = false"
                        >
                        Cancel
                     </v-btn>

                  </v-card-actions>
               </v-flex>
            </v-layout>
         </v-container>
      </v-card>
   </v-dialog>
</template>

<script>
export default {
   props: ["meetupId"],
   data() {
      return {
         registerDialog: false
      };
   },
   computed: {
      userIsRegistered() {
         return (
            this.$store.getters.user.registeredMeetups.findIndex(
               (meetupId) => meetupId === this.meetupId
            ) >= 0
         );
      }
   },
   methods: {
      onConfirm() {
         if (this.userIsRegistered) {
            this.$store.dispatch("unregisterUserFromMeetup", this.meetupId);
         } else {
            this.$store.dispatch("registerUserForMeetup", this.meetupId);
         }
      }
   }
};
</script>