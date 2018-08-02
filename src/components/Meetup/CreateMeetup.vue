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
         
         <!-- Image picker -->
         <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
               <v-btn raised class="info" @click="onPickFile">Upload Image</v-btn>
               <input 
                  type="file" 
                  style="display: none" 
                  ref="fileInput" 
                  accept="image/*"
                  @change="onFilePicked"
                  >
            </v-flex>
         </v-layout>

         <!-- Preview image -->
         <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
               <img :src="imageURL" alt="Meetup Image" width="300px" v-if="imageURL">
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

         <!-- Header: Date & time -->
         <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
               <h3>Date and time</h3>
            </v-flex>
         </v-layout>

         <!-- Date picker -->
         <v-layout row>
            <v-flex offset-sm3>
               <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
         </v-layout>

         <!-- Time picker -->
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
         time: dateTime.format("HH:mm"),
         image: null
      };
   },
   computed: {
      submittableDateTime() {
         return new Date(this.date + " " + this.time);
      },
      formIsValid() {
         return (
            this.title &&
            this.location &&
            this.imageURL &&
            this.description &&
            this.image
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
            image: this.image,
            imageURL: this.imageURL,
            description: this.description,
            date: this.submittableDateTime
         };

         this.$store.dispatch("createMeetup", meetupData);
         this.$router.push("/meetups");
      },
      onPickFile() {
         this.$refs.fileInput.click();
      },
      onFilePicked(event) {
         const file = event.target.files[0];
         const filename = file.name;

         // reject the file if it doesn't have an extension
         if (filename.lastIndexOf(".") <= 0) {
            return alert("Please select a valid file.");
         }

         // Convert the file to base64 string
         const fileReader = new FileReader();
         fileReader.addEventListener("load", () => {
            this.imageURL = fileReader.result;
         });
         fileReader.readAsDataURL(file);
         this.image = file;
      }
   }
};
</script>
