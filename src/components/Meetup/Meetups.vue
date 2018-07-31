<template>
   <v-container>
      <v-layout row wrap>
         <v-flex xs12>
            <v-card class="info">
               <v-container fluid>
                  <v-layout row>

                     <!-- Meetup image -->
                     <v-flex xs5 sm4 md3>
                        <v-card-media
                           src="https://c1.staticflickr.com/8/7610/17149522281_3b6ae4c948_b.jpg"
                           height="130px"
                           >
                        </v-card-media>
                     </v-flex>

                     <!-- Meetup info -->
                     <v-flex xs7 sm8 md9>
                        <v-card-title primary-title>
                           <div>
                              <h2 class="white--text">(Meetup Title)</h2>
                              <div>(Meetup Date)</div>
                           </div>
                        </v-card-title>

                        <!-- View Meetup button -->
                        <v-card-actions>
                           <v-btn flat light to="/meetups/1">
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
