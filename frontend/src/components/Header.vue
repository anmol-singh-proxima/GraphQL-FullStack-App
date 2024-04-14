<!-- eslint-disable prettier/prettier -->
<template>
  <section id="header">
    <div class="brand">
      <a :href="getRouteLink('login')">CTS</a>
      <span>Employee Portal</span>
    </div>
    <div v-if="isLoggedIn" class="nav-links-login">
      <a class="profileBtn" v-on:click="showProfile">Profile</a>
      <a class="logoutBtn" v-on:click="logout">Logout</a>
    </div>
    <div v-else class="nav-links-logout" >
      <a class="loginBtn" :href="getRouteLink('login')">Login</a>
      <a class="signupBtn" :href="getRouteLink('signup')">Signup</a>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
export default {
  name: "HeaderComponent",
  props: {
    isLoggedIn: Boolean,
  },
  emits: {
    showProfile: () => {
      return true;
    }
  },
  methods: {
    showProfile() {
      this.$emit("showProfile");
    },
    logout() {
      if(sessionStorage.getItem('token')) {
        sessionStorage.removeItem("token");
      }
      if(sessionStorage.getItem('user')) {
        sessionStorage.removeItem("user");
      }
      this.$router.push({ name: "login" });
    },
    getRouteLink(routeName) {
      return this.$router.resolve({ name: routeName }).href;
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
  padding: 20px;
  background-color: honeydew;
}
#header .brand a {
  font-size: 2rem;
  line-height: 1;
  font-weight: 600;
  color: green;
  padding: 12px 18px;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
}
#header .brand span {
  font-size: 2rem;
  line-height: 1;
  font-weight: 400;
  color: green;
  padding: 12px 18px;
  padding-left: 0;
  text-transform: capitalize;
  text-decoration: none;
  cursor: pointer;
}
#header .nav-links-logout a {
  font-size: 1.1rem;
  line-height: 1.4;
  padding: 12px 18px;
  margin-left: 10px;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
}
#header .nav-links-logout .loginBtn {
  border: 1px solid green;
  background-color: #fff;
  color: green;
}
#header .nav-links-logout .signupBtn {
  border: 1px solid green;
  background-color: green;
  color: #fff;
}

#header .nav-links-login a {
  font-size: 1.1rem;
  line-height: 1.4;
  padding: 12px 18px;
  margin-left: 10px;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
}
#header .nav-links-login .profileBtn {
  border: 1px solid green;
  background-color: #fff;
  color: green;
}
#header .nav-links-login .logoutBtn {
  border: 1px solid green;
  background-color: green;
  color: #fff;
}
</style>
