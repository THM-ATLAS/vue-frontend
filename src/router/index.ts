import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from "@/views/LoginView.vue";
import Exercise from "@/views/exercises/ExerciseView.vue";

import Profile from "@/views/ProfileView.vue";
import Submission from "@/views/exercises/submissions/SubmissionView.vue";
import Notifications from "@/views/NotificationsView.vue";
import Help from "@/views/HelpView.vue";
import Leaderboard from "@/views/LeaderboardView.vue";
import ExerciseEditor from "@/views/exercises/ExerciseEditorView.vue";
import Feedback from "@/views/exercises/feedback/FeedbackView.vue";
import Settings from "@/views/SettingsView.vue";
import PageNotFound from "@/views/PageNotFoundView.vue";
import UserManagement from "@/views/admin/UserManagementView.vue";
import CourseMainPage from "@/views/CourseMainPageView.vue"
import TaskManagement from "@/views/admin/TaskManagementView.vue";
import ModuleManagement from "@/views/admin/ModuleManagementView.vue";
import Home from "@/views/HomeView.vue";
import CourseSearch from "@/views/CourseSearchView.vue";
import Admin from "@/views/admin/AdminView.vue";

const routes: Array<RouteRecordRaw> = [
  {path: '/', component: Home},

  {path: '/login', component: Login},
  { path: '/404', name: 'NotFound', component: PageNotFound },
  { path: '/:pathMatch(.*)*', redirect: '/404' },

  {path: '/:course/', component: CourseMainPage},
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

  {path: '/admin/', component: Admin},
  {path: '/admin/users', component: UserManagement},
  {path: '/admin/tasks', component: TaskManagement},
  {path: '/admin/modules', component: ModuleManagement},

  {path: '/courses', component: CourseSearch},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
