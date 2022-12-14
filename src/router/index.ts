import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/add-tweet",
      name: "add tweet",
      component: () => import("../views/AddTweetView.vue"),
    },
    {
      path: "/tweet/:id",
      name: "tweet",
      component: () => import("../views/TweetView.vue"),
    },
    {
      path: "/:id",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: "/reply/:id",
      name: "reply",
      component: () => import("../views/ReplyView.vue"),
    },
    {
      path: "/retweet/:id",
      name: "add-retweet",
      component: () => import("../views/RetweetView.vue"),
    },
  ],
});

export default router;
