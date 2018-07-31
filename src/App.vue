<template>
   <v-app>
      <!-- Navigation Drawer -->
      <v-navigation-drawer v-model="sideNav" temporary absolute disable-resize-watcher>
         <v-list>
            <v-list-tile 
               v-for="item in menuItems" 
               :key="item.title"
               :to="item.link">
               <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
               </v-list-tile-action>
               <v-list-tile-content>
                  {{ item.title }}
               </v-list-tile-content>
            </v-list-tile>
         </v-list>
      </v-navigation-drawer>

      <!-- Main Navigation Toolbar -->
      <v-toolbar dark class="primary">
         <v-toolbar-side-icon 
            @click.stop="sideNav = !sideNav"
            class="hidden-sm-and-up"
            >
         </v-toolbar-side-icon> 

         <v-toolbar-title>
            <router-link to="/" tag="span" style="cursor: pointer">
               Meetup
            </router-link>
         </v-toolbar-title>
         
         <v-spacer></v-spacer>

         <v-toolbar-items class="hidden-xs-only">
            <v-btn 
               flat 
               v-for="item in menuItems" 
               :key="item.title"
               :to="item.link"
               >
               <v-icon left>{{ item.icon }}</v-icon>
               {{ item.title }}
            </v-btn>
         </v-toolbar-items>
      </v-toolbar>

      <!-- Main Content Route -->
      <router-view></router-view>
   </v-app>
</template>

<script>
export default {
   data() {
      return {
         sideNav: false,
         menuItems: [
            {
               icon: "supervisor_account",
               title: "View Meetups",
               link: "/meetups"
            },
            { icon: "room", title: "Organize Meetup", link: "/meetup/new" },
            { icon: "person", title: "Profile", link: "/profile" },
            { icon: "face", title: "Sign up", link: "/signup" },
            { icon: "lock_open", title: "Log in", link: "/login" }
         ]
      };
   },
   mounted() {}
};
</script>

<style>
</style>