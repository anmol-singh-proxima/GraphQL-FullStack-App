<!-- eslint-disable prettier/prettier -->
<template>
  <div id="home">
    <HeaderComponent :isLoggedIn="false" />
    <LoginForm />
    <FooterComponent />
  </div>
</template>

<script>
/* eslint-disable */
import HeaderComponent from "@/components/Header.vue";
import FooterComponent from "@/components/Footer.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginView",
  components: {
    HeaderComponent,
    FooterComponent,
    LoginForm,
  },
  created() {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    if(token && user) {
      console.log("User already logged in");
      this.$router.push({ name: 'home' });
    }
  },
};
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  background-image: url("../assets/cts_bg.jpg") !important;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
}
</style>