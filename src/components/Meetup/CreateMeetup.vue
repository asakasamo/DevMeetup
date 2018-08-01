<template>
   <v-container>
      <!-- Page title -->
      <v-layout row>
         <v-flex xs12 sm6 offset-sm3>
            <h2>Create a New Meetup</h2>
         </v-flex>
      </v-layout>

      <!-- Create Meetup form -->
      <form @submit.prevent="submitMeetup">
         
         <!-- Title field -->
         <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
               <v-text-field 
                  name="title" 
                  label="Title" 
                  id="title"
                  v-model="title"
                  required
                  >
               </v-text-field>
            </v-flex>
         </v-layout>

         <!-- Location field -->
         <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
               <v-text-field 
                  name="location" 
                  label="Location" 
                  id="location"
                  required
                  v-model="location"
                  >
               </v-text-field>
            </v-flex>
         </v-layout>
         
         <!-- Image URL field -->
         <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
               <v-text-field 
                  name="imageURL" 
                  label="Image URL" 
                  id="image-url"
                  required
                  v-model="imageURL"
                  >
               </v-text-field>
            </v-flex>
         </v-layout>

         <!-- Preview image -->
         <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
               <img :src="imageURL" alt="Meetup Image" width="300px">
            </v-flex>
         </v-layout>
         
         <!-- Description field -->
         <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
               <v-textarea
                  name="description" 
                  label="Description" 
                  id="description"
                  required
                  v-model="description"
                  >
               </v-textarea>
            </v-flex>
         </v-layout>

         <!-- Date & time picker header -->
         <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
               <h3>Date and time</h3>
            </v-flex>
         </v-layout>

         <!-- Date & time picker -->
         <v-layout row>
            <v-flex offset-sm3>
               <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
         </v-layout>

         <v-layout row>
            <v-flex offset-sm3>
               <v-time-picker v-model="time"></v-time-picker>
            </v-flex>
         </v-layout>

         <!-- Submit button -->
         <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
               <v-btn class="success" type="submit" :disabled="!formIsValid">
                  Create Meetup
               </v-btn>
            </v-flex>
         </v-layout>

      </form>
   </v-container>
</template>

<script>
import moment from "moment";

export default {
   data() {
      const dateTime = moment();
      return {
         title: "",
         location: "",
         imageURL: "",
         description: "",
         date: dateTime.format("YYYY-MM-DD"),
         time: dateTime.format("HH:mm")
      };
   },
   computed: {
      submittableDateTime() {
         return new Date(this.date + " " + this.time);
      },
      formIsValid() {
         return (
            this.title && this.location && this.imageURL && this.description
         );
      }
   },
   methods: {
      submitMeetup() {
         if (!this.formIsValid) {
            return;
         }

         const meetupData = {
            title: this.title,
            location: this.location,
            imageURL: this.imageURL,
            description: this.description,
            date: this.submittableDateTime
         };

         this.$store.dispatch("createMeetup", meetupData);
         this.$router.push("/meetups");
      }
   }
};
</script>
