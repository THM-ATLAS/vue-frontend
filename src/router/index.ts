import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Login from "@/views/LoginView.vue";
import Exercise from "@/views/ExerciseView.vue";
import MainPage from "@/views/MainView.vue";
import Profile from "@/views/ProfileView.vue";
import Submission from "@/views/SubmissionView.vue";
import Notifications from "@/views/NotificationsView.vue";
import Help from "@/views/HelpView.vue";
import Leaderboard from "@/views/LeaderboardView.vue";
import ExerciseEditor from "@/views/ExerciseEditorView.vue";
import Feedback from "@/views/FeedbackView.vue";
import Settings from "@/views/SettingsView.vue";
import PageNotFound from "@/views/PageNotFoundView.vue";
import ExerciseCard from "@/components/ExerciseCard.vue";

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/helloworld',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },

  {path: '/', component: Login},
  // {path: '/mainpage', component: Mainpage},
  // {path: '/home', component: CourseSelector},

  {path: '/:course/', component: MainPage},

  {path: '/:course/e/new/edit', component: ExerciseEditor}, // create new exercise
  {path: '/:course/e/:id', component: Exercise},
  {path: '/:course/e/:id/edit', component: ExerciseEditor}, // edit mode
  {path: '/:course/e/:id/feedback', component: Feedback}, // list feedback
  {path: '/:course/e/:id/:title', component: Exercise}, // title specified, internally ignored

  {path: '/:course/s/:id', component: Submission},
  // TODO {path: '/:course/s/:id/review', component: SubmissionReview},

  {path: '/u/', component: Profile}, // personal profile
  {path: '/u/:id', component: Profile}, // profile of other user

  {path: "/leaderboard", component: Leaderboard},

  {path: '/notifications', component: Notifications},
  {path: '/help', component: Help},

  {path: '/settings', component: Settings},

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: PageNotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
