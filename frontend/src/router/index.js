import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import HomePage from "@/views/HomePage.vue";
import ProjectPage from "@/views/ProjectPage.vue";
import TaskPage from "@/views/TaskPage.vue";
import ProfilePage from "@/views/ProfilePage.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/projects",
    name: "projects",
    component: ProjectPage,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: TaskPage,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
