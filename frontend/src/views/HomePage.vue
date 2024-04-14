<!-- eslint-disable prettier/prettier -->
<template>
  <div id="home">
    <HeaderComponent :isLoggedIn="isLoggedIn" @showProfile="showProfile" />
    <MainComponent v-if="isShowMain" :isLoggedIn="isLoggedIn" />
    <ProfileComponent v-if="isShowProfile" :isLoggedIn="isLoggedIn" />
    <FooterComponent />
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import HeaderComponent from "@/components/Header.vue";
import FooterComponent from "@/components/Footer.vue";
import MainComponent from "@/components/MainComponent.vue";
import ProfileComponent from "@/components/ProfileComponent.vue";

export default {
    name: 'HomePage',
    components: {
      HeaderComponent,
      FooterComponent,
      MainComponent,
      ProfileComponent
    },
    data() {
        return {
            user: null,
            payload: null,
            isLoggedIn: false,
            isShowMain: false,
            isShowProfile: false,
        }
    },
    created() {
        const token = sessionStorage.getItem('token');
        const user = sessionStorage.getItem('user');
        if(!token) {
          console.log("Token not present");
          this.$router.push({ name: 'login' });
        }
        if(token && user) {
          return;
        }
        console.log("this is here");
        this.getPayloadReady(token);
        this.getUserData(token);
    },
    methods: {
      getPayloadReady(token) {
        this.payload = {
          query: `
          mutation Mutation($input: LoggedInCtsUserInputType!) {
            loggedInUser(input: $input) {
              user_id
              first_name
              last_name
              email
              role_id
            }
          }`,
          variables: { input: {
            token: token
          }}
        };
      },

      getRouteLink(routeName) {
          return this.$router.resolve({ name: routeName }).href;
      },

      async getUserData() {
        return await axios({
          method: 'post',
          url: 'http://localhost:4000/graphql',
          responseType: 'json',
          headers: {
            'Access-Control-Aloww-Origin': '*',
            'Content-type': 'application/json',
          },
          data: this.payload,
        })
        .then((response) => {
            console.log("Response in retrieving user", response);
            this.user = response.data.data.loginUser;
            sessionStorage.setItem('user', this.user);
            console.log("User:", this.user);
            this.isLoggedIn = true;
            this.isShowMain = true;
        })
        .catch((error) => {
            console.log("Error while retrieving user:", error);
            this.$router.push({ name: 'login' });
        });
      },

      showProfile() {
        this.isShowMain = false;
        this.isShowProfile = true;
      },

      logout() {
        if(sessionStorage.getItem('token')) {
          sessionStorage.removeItem("token");
        }
        if(sessionStorage.getItem('user')) {
          sessionStorage.removeItem("user");
        }
        this.$router.push({ name: "login" });
      }
    }
}
</script>


<style scoped>
#home {
  display: flex;
  flex-direction: column;
  background-image: url("../assets/cts_bg.jpg") !important;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
}
</style>