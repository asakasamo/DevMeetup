<template>
   <v-container>
      <v-layout>
         <v-flex xs12 sm6 offset-sm3>

            <!-- Signup card wrapper -->
            <v-card>
               <v-card-text>
                  <form>
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

                           <!-- Confirm password field -->
                           <v-text-field 
                              name="confirmPassword" 
                              label="Confirm Password" 
                              id="confirmPassword" 
                              v-model="confirmPassword" 
                              type="password"
                              required
                              :rules="[ comparePasswords ]"
                              >
                           </v-text-field>
                        </v-flex>
                     </v-layout>

                     <!-- Submit button -->
                     <v-layout row>
                        <v-flex xs12>
                           <v-btn type="submit">
                              Sign up
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
         password: "",
         confirmPassword: ""
      };
   },
   computed: {
      comparePasswords() {
         return this.password === this.confirmPassword
            ? true
            : "Passwords do not match";
      }
   },
   methods: {
      submitSignup() {
         // TODO: Vuex store it in the database
         console.log({
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword
         });
      }
   }
};
</script>
