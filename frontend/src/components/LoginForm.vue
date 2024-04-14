<!-- eslint-disable prettier/prettier -->
<template>
  <section id="content">
    <div class="login">
      <span class="head">Login</span>
      <span class="validation-alert" v-if="validationAlert">{{validationAlert}}</span>
      <span class="error" v-if="errorAlert">Error {{errorAlert.code}}: {{errorAlert.message}}</span>
      <form @submit.prevent="login">
        <input type="email" placeholder="you@example.com" id="email" v-model="email" />
        <input type="password" placeholder="************" id="password" v-model="password" />
        <button @click="login">Login</button>
      </form>
    </div>

    <!-- <div class="queryResult" v-show="isShowQueryResult">
      <div v-if="loading">Loading...</div>

      <div v-else-if="error">Error: {{ error.message }}</div>

      <div v-if="result">Result: {{ result }}</div>
    </div> -->

    <!-- <div class="queryClass">
    <div v-if="loading">Loading...</div>

    <div v-else-if="error">Error: {{ error.message }}</div>

    <ul v-if="result && result.users">
      <li v-for="user of result.users" :key="user.id">
        {{ user.firstname }} {{ user.lastname }}
      </li>
    </ul>

    <button @click="login">Login</button>
  </div> -->
  </section>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import {setAuthToken} from '@/api';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errorAlert: null,
      validationAlert: null,
      // isShowLogin: true,
      // isShowQueryResult: false,
      loading: false,
      result: null,
      error: null,
      payload: null,
    }
  },
  methods: {
    // mounted() {
    //   this.isShowLogin = true;
    //   this.isShowQueryResult = false;
    // },

    getRouteLink(routeName) {
      return this.$router.resolve({ name: routeName }).href;
    },

    alertMessageDisplay(message, id) {
      this.validationAlert = message;
      document.getElementById(id).focus();
      setTimeout(() => {
        this.validationAlert = null;
      }, 3000);
      return false;
    },

    formValidation() {
      if(this.email === '') {
        return this.alertMessageDisplay('Please enter the email', 'email');
      } else if(!this.email.endsWith('@zcorp.com')) {
        return this.alertMessageDisplay('Please enter the valid email', 'email');
      } else if(this.password === '') {
        return this.alertMessageDisplay('Please enter the password', 'password');
      }
      return true;
    },

    timeoutError() {
      setTimeout(() => {
          this.errorAlert = null;
      }, 3000);
    },

    getPayloadReady() {
      this.payload = {
        query: `
        mutation Mutation($input: LoginCtsUserInputType!) {
          loginUser(input: $input) {
            token
          }
        }`,
        variables: { input: {
          email: this.email,
          password: this.password,
        }}
      };
    },

    async login() {
      if (!this.formValidation()) {
        return false;
      }
      this.loading = true;
      this.getPayloadReady();

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
        // this.loading = false;
        // this.isShowLogin = false;
        // this.isShowQueryResult = true;

        if(response.data.errors) {
          this.errorAlert = {
            code: response.status,
            message: response.data.errors[0].message,
          }
          this.timeoutError();
          return;
        }

        console.log("Response:", JSON.stringify(response, null, 2));
        /* Set the token and call the setAuthToken function */
        const token = response.data.data.loginUser.token;
        sessionStorage.setItem('token', token);
        setAuthToken(token);
        this.result = response;
        this.$router.push({ name: 'home' });
      })
      .catch((error) => {
        // console.log("Error from Server:", error);
        console.log("Error from Server:", error.message);
        // this.error = error;
        this.errorAlert = {
          message: error.message
        }
        this.timeoutError();
      })
    },
  }
}
</script>




<!-- <script>
/* eslint-disable */
import { watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref } from 'vue'

const variables = ref({
  where: {
    "user_id": "Z01000",
  }
})

const isShowLogin = ref(false)

export default {
  setup () {
    const { result, loading, error } = useQuery(gql`
      query Query($variables: SequelizeJSON) {
        cts_user(where: $variables) {
          user_id
          firstname
          lastname
          email
        }
      }
    `, variables)

    watch(result, value => {
      console.log(value)
    })

    return {
      result,
      loading,
      error 
    }
  },
}
</script> -->

<!-- <script setup>
/* eslint-disable */
import { watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref } from 'vue'

const result = ref(null);
const loading = ref(true);
const error = ref(null);
const variables = ref({
  where: {
    "user_id": "Z01000",
  }
});

function login() {
const { result, loading, error } = useQuery(gql`
      query Query($variables: SequelizeJSON) {
        cts_user(where: $variables) {
          user_id
          firstname
          lastname
          email
        }
      }
    `, variables)
}

</script> -->


<!-- CSS Styling for LoginForm Component -->
<style scoped>
#content {
  flex: 1;
  background-color: rgba(10, 10, 10, 0.5);
  padding: 20px;
}
#content .login {
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
#content .login .head {
  display: block;
  width: 100%;
  font-size: 1.4rem;
  line-height: 1.4;
  color: #fff;
  padding: 10px 0;
  border-bottom: 1px solid #aaa;
}
#content .login .error, #content .login .validation-alert {
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
#content .login form input, #content .login form button {
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
#content .login form button {
  font-size: 1.1rem;
  color: #fff;
  text-align: center;
  background-color: green;
}



#content .queryResult > * {
  color: #ddd;
}
</style>
