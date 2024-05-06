<!-- eslint-disable prettier/prettier -->
<template>
  <div id="profile-page">
    <div v-if="isLoggedIn">
      <h3>User Profile</h3>
      <div v-if="user" class="user-data">
        Name: {{ user.first_name }} {{ user.last_name }}
      </div>
    </div>
    <div v-else>
      <h3>User Not Logged In</h3>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "ProfilePage",
  props: {
    isLoggedIn: Boolean,
  },
  data() {
    return {
      user: null,
    }
  },
  created() {
    if(this.isLoggedIn) {
      const user = sessionStorage.getItem('user');
      if(user) {
        this.user = user;
        console.log("User in SessionStorage:", user);
      } else {
        console.log('User is not stored properly in SessionStoarge');
      }
    }
  },
};
</script>

<!-- CSS Styling for Footer Component -->
<style scoped>
#profile-page {
  padding: 20px;
  margin: 0;
  /* display: grid; */
  /* grid-template-columns: 25% 25% 25% 25%; */
  /* grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 50px auto 50px; */
  height: 100%;
}
</style>
