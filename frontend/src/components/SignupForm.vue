<!-- eslint-disable prettier/prettier -->
<template>
   <section id="content">
      <div class="signup">
        <span class="head">Signup</span>
        <span class="validation-alert" v-if="validationAlert">{{validationAlert}}</span>
        <span class="error" v-if="errorAlert">Error {{errorAlert.code}}: {{errorAlert.message}}</span>
        <form @submit.prevent="signup">
          <input type="text" placeholder="Employe Id" id="userId" v-model="userId" />
          <input type="text" placeholder="First name" id="firstName" v-model="firstName" />
          <input type="text" placeholder="Last name" id="lastName" v-model="lastName" />
          <input type="email" placeholder="Email Id" id="email" v-model="email" />
          <input type="password" placeholder="Enter Password" id="password1" v-model="password1" />
          <input type="password" placeholder="Confirm Password" id="password2" v-model="password2" />
          <button>Signup</button>
        </form>
      </div>
    </section>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

export default {
  name: "SignupForm",
  data() {
    return {
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
      errorAlert: null,
      validationAlert: null,
    }
  },
};
</script>

<!-- CSS Styling for SignupForm Component -->
<style scoped>
#content {
  flex: 1;
  background-color: rgba(10, 10, 10, 0.5);
  padding: 20px;
}

#content .signup {
  display: block;
  width: 370px;
  height: 100%;
  padding: 20px;
  margin: auto;
  /* float: center; */
  border: 1px solid #888;
  border-radius: 2px;
  background-color: rgba(50, 60, 70, 0.5);
}
#content .signup .head {
  display: block;
  width: 100%;
  font-size: 1.4rem;
  line-height: 1.4;
  color: #fff;
  padding: 10px 0;
  border-bottom: 1px solid #aaa;
}
#content .signup .error, #content .signup .validation-alert {
  display: block;
  width: 100%;
  font-size: 1rem;
  line-height: 1.3;
  padding: 8px 16px;
  border: 1px solid red;
  background: red;
  color: #eee;
  border-radius: 2px;
  margin-top: 10px;
}
#content .signup form input, #content .signup form button {
  display: block;
  width: 100%;
  font-size: 1rem;
  line-height: 1.5;
  padding: 10px 18px;
  margin: 15px 0;
  color: green;
  background-color: #eee;
  border: 1px solid green;
  border-radius: 6px;
}
#content .signup form button {
  font-size: 1.1rem;
  color: #fff;
  text-align: center;
  background-color: green;
}
</style>
