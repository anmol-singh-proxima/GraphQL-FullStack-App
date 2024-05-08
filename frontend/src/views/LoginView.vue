<!-- eslint-disable prettier/prettier -->
<template>
  <div id="home">
    <div class="logo-box">
      <img src="../../public/cts_icon.png" alt="CTS" class="logo" />
    </div>
    <LoginForm />
    <FooterComponent />
  </div>
</template>

<script>
/* eslint-disable */
import FooterComponent from "@/components/Footer.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginView",
  components: {
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
  background-image: linear-gradient(to bottom, #212121ac, #434343ac), url("../assets/cts_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  width: 100%;
  min-height: 100vh;
}
.logo-box {
  display: block;
  height: 200px;
  width: auto;
  margin: auto;
  margin-top: 5vh;
}
.logo {
  display: block;
  height: 100%;
  width: 100%;
}
</style>