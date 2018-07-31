<template>
   <v-container>
      <v-layout row wrap>
         <v-flex xs12>
            <v-card>

               <!-- Meetup Title -->
               <v-card-title>
                  <h1 class="primary--text">
                     (Meetup Title)
                  </h1>
               </v-card-title>

               <!-- Meetup image -->
               <v-card-media
                  src="https://c1.staticflickr.com/8/7610/17149522281_3b6ae4c948_b.jpg"
                  height="400px"
                  >
               </v-card-media>

               <!-- Meetup description -->
               <v-card-text>
                  <div class="info--text">(Meetup Date) (Meetup Location)</div>
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
