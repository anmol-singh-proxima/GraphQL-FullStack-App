<!-- eslint-disable prettier/prettier -->
<template>
  <div id="login-page">
    <div class="logo-box">
      <img src="../../public/cts_icon.png" alt="CTS" class="logo" />
    </div>
    <LoginForm />
    <footer class="footer-section">
      <div class="copyright">Copyright &copy; 2024 | All Rights Reserved</div>
      <div class="designby">Common Transaction System | Designed By <span>Anmol Singh</span></div>
    </footer>
  </div>
</template>

<script>
/* eslint-disable */
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
  created() {
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    if(token && user) {
      console.log('[LoginPage.vue] User already logged in');
      this.$router.push({ path: '/' });
    }
  },
};
</script>

<style scoped>
#login-page {
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
#login-page .footer-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #222;
  padding: 20px 100px;
}
#login-page .footer-section .copyright {
  font-size: 0.9rem;
  line-height: 1.2;
  color: #eee;
}
#login-page .footer-section .designby {
  font-size: 0.9rem;
  line-height: 1.2;
  color: #eee;
}
#login-page .footer-section .designby span {
  font-size: 0.9rem;
  color: green;
}
</style>