// import { ApolloClient, InMemoryCache } from "@apollo/client/core";
// import { createApolloProvider } from "@vue/apollo-option";
// import VueApolloComponents from "@vue/apollo-components";
// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";

// const apolloClient = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: process.env.GRAPHQL_URI,
// });

// const apolloProvider = createApolloProvider({
//   defaultClient: apolloClient,
// });

// createApp(App)
//   .use(router)
//   .use(apolloProvider)
//   .use(VueApolloComponents)
//   .mount("#app");

import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import App from "./App.vue";
import router from "./router";

// Create the apollo client
const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: process.env.GRAPHQL_URI,
  }),
  cache: new InMemoryCache(),
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});

app.use(router).mount("#app");
