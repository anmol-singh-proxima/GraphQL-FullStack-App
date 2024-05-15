<!-- eslint-disable prettier/prettier -->
<template>
  <div id="profile-page" v-if="isLoggedIn">
    <HeaderComponent />
    <div class="page-content">
      <div v-if="user">
        User Name: {{ user.first_name }} {{ user.last_name }}
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
/* eslint-disable */
import HeaderComponent from '@/components/Header.vue';
import FooterComponent from '@/components/Footer.vue';

export default {
  name: 'ProfilePage',
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
    console.log('[ProfilePage.vue] created()');
    this.checkIfLoggedIn();
    return;
  },
  mounted() {
    console.log('[ProfilePage.vue] mounted()');
    return;
  },
  methods: {
    checkIfLoggedIn() {
      const token = sessionStorage.getItem('token');
      const user = sessionStorage.getItem('user');
      if(token && user) {
        console.log('[ProfilePage.vue] User is logged-In');
        this.isLoggedIn = true;
        this.user = user;
      } else {
        console.log('[ProfilePage.vue] User not logged-In');
        this.$router.push({ path: '/login' });
      }
    },
  }
}
</script>

<style scoped>
#profile-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
#profile-page .page-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 100px;
}
</style>