import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AppCard from "../components/App/AppCard.vue";
import Login from "../components/Login and SignUp/Login.vue";
import SignPg from "../components/Login and SignUp/SignUp.vue";
import SignupAndLogin from "../components/Login and SignUp/SignUpAndLogin.vue";
import PreSignup from "../components/PreSignup.vue";
import AppDashboard from "../components/App/AppDashboard.vue";
import DashboardCard from "../components/App/DashboardCard.vue";
import CreateTask from "../components/CreateTask.vue";
import AppProfile from "../components/App/AppProfile";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/appcard",
    name: "appcard",
    component: AppCard,
  },
  {
    path: "/signPg",
    name: "signPg",
    component: SignPg,
  },
  {
    path: "/create",
    name: "create",
    component: SignupAndLogin,
  },
  {
    path: "/presignup",
    name: "presignup",
    component: PreSignup,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: AppDashboard,
  },
  {
    path: "/createTask",
    name: "createTask",
    component: CreateTask,
  },
  {
    path: "/dashboardcard",
    name: "dashboardcard",
    component: DashboardCard,
  },
  {
    path: "/appProfile",
    name: "appProfile",
    component: AppProfile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
