<template>
   <v-container>
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
                           <v-btn type="submit" class="success">
                              Log in
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
      }
   }
};
</script>
