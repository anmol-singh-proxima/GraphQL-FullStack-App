<!-- eslint-disable prettier/prettier -->
<template>
  <div id="home">
    <HeaderComponent :isLoggedIn="isLoggedIn" :user="user" @showProfile="showProfile" />
    <MainPage v-if="isShowMain" :isLoggedIn="isLoggedIn" />
    <ProfilePage v-if="isShowProfile" :isLoggedIn="isLoggedIn" />
    <FooterComponent />
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import HeaderComponent from "@/components/Header.vue";
import FooterComponent from "@/components/Footer.vue";
import MainPage from "@/components/MainPage.vue";
import ProfilePage from "@/components/ProfilePage.vue";

export default {
  name: 'HomeView',
  components: {
    HeaderComponent,
    FooterComponent,
    MainPage,
    ProfilePage
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
      this.isLoggedIn = true;
      this.isShowMain = true;
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
        this.user = response.data.data.loggedInUser;
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
  width: 100%;
  height: 100vh;
}
</style>