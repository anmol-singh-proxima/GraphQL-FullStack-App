<!-- eslint-disable prettier/prettier -->
<template>
  <section id="header">
    <div class="brand" v-on:click="showHome">
      <p><span>CTS</span> Employee Portal</p>
    </div>
    <div class="nav-links">
      <!-- <span v-if="user">Hi {{ user.first_name }}!</span> -->
      <a class="link-item" v-on:click="showProjects">Projects</a>
      <a class="link-item" v-on:click="showTasks">Tasks</a>
      <a class="link-item" v-on:click="showProfile">Profile</a>
      <a class="link-item logoutBtn" v-on:click="logout">Logout</a>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: "HeaderComponent",
  data() {
    return {
      user: {},
    }
  },
  // watch: {
    // user: (newVal, oldVal) => {
    //   console.log('[Header.vue] User in Header.vue');
    //   console.log('[Header.vue] oldVal:', oldVal);
    //   console.log('[Header.vue] newVal:', newVal);
    // }
  // },
  // emits: ['showHome', 'showProfile', 'showProjects', 'showTasks', 'logout'],
  created() {
    // if(this.isLoggedIn) {
    //   const user = sessionStorage.getItem('user');
    //   if(user) {
    //     this.user = user;
    //     console.log('[Header.vue] User in SessionStorage:', user);
    //   } else {
    //     console.log('[Header.vue] User is not stored properly in SessionStoarge');
    //   }
    // }
  },
  methods: {
    showHome() {
      this.$router.push({ path: '/' });
    },
    showProfile() {
      this.$router.push({ path: '/profile' });
    },
    showProjects() {
      this.$router.push({ path: '/projects' });
    },
    showTasks() {
      this.$router.push({ path: '/tasks' });
    },
    logout() {
      if(sessionStorage.getItem('token')) {
        sessionStorage.removeItem('token');
      }
      if(sessionStorage.getItem('user')) {
        sessionStorage.removeItem('user');
      }
      this.$router.push({ path: '/login' });
    },
  },
};
</script>

<!-- CSS Styling for Header Component -->
<style scoped>
#header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 25px 100px;
  background-color: rgba(230, 255, 230, 0.6);
  border-bottom: 1px solid rgba(78, 121, 78, 0.304);
}
#header .brand {
  font-size: 2rem;
  line-height: 1;
  font-weight: 400;
  color: rgba(0, 128, 0, 0.858);
  text-decoration: none;
  cursor: pointer;
}
#header .brand span {
  font-weight: 600;
}
#header .nav-links .link-item {
  font-size: 1.1rem;
  line-height: 1.4;
  padding-right: 18px;
  margin-left: 10px;
  text-decoration: none;
  cursor: pointer;
  color: rgb(0, 155, 0);
}
#header .nav-links .link-item:hover {
  color: rgb(0, 87, 0);
}
#header .nav-links .logoutBtn {
  border: 1px solid rgba(0, 128, 0, 0.5);
  background-color: rgb(34, 129, 34);
  color: #fff;
  padding: 12px 18px;
}
#header .nav-links .logoutBtn:hover {
  border: 1px solid rgba(0, 128, 0);
  color: #fff;
}
</style>
