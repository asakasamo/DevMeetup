<template>
   <v-container>
      <v-layout row v-if="error">
         <v-flex xs12 sm6 offset-sm3>
            <app-alert @dismiss="onDismiss" :text="error.message"></app-alert>
         </v-flex>
      </v-layout>

      <v-layout>
         <v-flex xs12 sm6 offset-sm3>

            <!-- Login card wrapper -->
            <v-card>
               <v-card-text>
                  <form @submit.prevent="submitLogin">
                     <v-layout row>
                        <v-flex xs12>

                           <!-- Email field -->
                           <v-text-field 
                              name="email" 
                              label="Email" 
                              id="email" 
                              v-model="email" 
                              type="email" 
                              required
                              >
                           </v-text-field>

                           <!-- Password field -->
                           <v-text-field 
                              name="password" 
                              label="Password" 
                              id="password" 
                              v-model="password" 
                              type="password" 
                              required
                              >
                           </v-text-field>
                        </v-flex>
                     </v-layout>

                     <!-- Submit button -->
                     <v-layout row>
                        <v-flex xs12>
                           <v-btn type="submit" class="info" :disabled="loading" :loading="loading">
                              Log in
                              <span slot="loader" class="custom-loader">
                                 <v-icon light>cached</v-icon>
                              </span>
                           </v-btn>
                        </v-flex>
                     </v-layout>
                  </form>
               </v-card-text>
            </v-card>
         </v-flex>
      </v-layout>
   </v-container>
</template>

<script>
export default {
   data() {
      return {
         email: "",
         password: ""
      };
   },
   computed: {
      user() {
         return this.$store.getters.user;
      },
      error() {
         return this.$store.getters.error;
      },
      loading() {
         return this.$store.getters.loading;
      }
   },
   watch: {
      user(value) {
         if (value) {
            this.$router.push("/");
         }
      }
   },
   methods: {
      submitLogin() {
         this.$store.dispatch("logUserIn", {
            email: this.email,
            password: this.password
         });
      },
      onDismiss() {
         this.$store.dispatch("clearError");
      }
   }
};
</script>
