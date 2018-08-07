<template>
   <v-dialog width="350px" persistent v-model="editDialog">

      <!-- Activator button -->
      <v-btn class="info ma-0" small slot="activator">
         Edit Date
      </v-btn>

      <!-- Main card wrapper -->
      <v-card>
         <v-container>

            <!-- Dialog box title -->
            <!-- v-layout row wrap>
               <v-flex xs12>
                  <v-card-title>Edit Meetup Date</v-card-title>
               </v-flex>
            </v-layout -->

            <!-- Inputs wrapper -->
            <v-layout row wrap>
               <v-flex xs12>
                  
                  <!-- Date picker -->
                  <v-date-picker v-model="editableDate" style="width: 100%" actions>
                     <template>
                        <!-- Save button -->
                        <v-btn 
                           class="success" 
                           flat 
                           @click="onSaveChanges"
                           >
                           Save
                        </v-btn>

                        <v-spacer></v-spacer>
                     
                        <!-- Close button -->
                        <v-btn 
                           class="error" 
                           flat 
                           @click="editDialog = false"
                           >
                           Cancel
                        </v-btn>

                     </template>                     
                  </v-date-picker>
                  
               </v-flex>
            </v-layout>

         </v-container>
      </v-card>
   </v-dialog>
</template>

<script>
import moment from "moment";

export default {
   props: ["meetup"],
   data() {
      return {
         editDialog: false,
         editableDate: null
      };
   },
   methods: {
      onSaveChanges() {
         const time = moment(this.meetup.date).format("HH:mm");
         const newDateTime = new Date(this.editableDate + " " + time);

         this.$store.dispatch("updateMeetupData", {
            id: this.meetup.id,
            date: newDateTime
         });
      }
   },
   created() {
      this.editableDate = moment(this.meetup.date).format("YYYY-MM-DD");
   }
};
</script>
