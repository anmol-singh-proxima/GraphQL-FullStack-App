<!-- eslint-disable prettier/prettier -->
<template>
  <div id="home" v-if="isLoggedIn">
    <HeaderComponent />
    <div class="page-content">
      <h3>Home Page</h3>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
/* eslint-disable */
// import axios from 'axios';
import HeaderComponent from '@/components/Header.vue';
import FooterComponent from '@/components/Footer.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      isLoggedIn: false,
      user: null,
    }
  },
  created() {
    console.log('[HomePage.vue] created()');
    this.checkIfLoggedIn();
    return;
  },
  mounted() {
    console.log('[HomePage.vue] mounted()');
    return;
  },
  methods: {
    checkIfLoggedIn() {
      const token = sessionStorage.getItem('token');
      const user = sessionStorage.getItem('user');
      if (token && user) {
        console.log('[HomePage.vue] User is logged-In');
        this.isLoggedIn = true;
      } else {
        console.log('[HomePage.vue] User not logged-In');
        this.$router.push({ path: '/login' });
      }
    },
  },
}
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#home .page-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 100px;
}
</style>