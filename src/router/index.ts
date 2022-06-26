import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from "@/views/LoginView.vue";
import Exercise from "@/views/exercises/ExerciseView.vue";

import Profile from "@/views/ProfileView.vue";
import Submission from "@/views/exercises/submissions/SubmissionView.vue";
import EditSubmission from "@/views/exercises/submissions/EditSubmissionView.vue";
import SpecificEvaluation from "@/views/exercises/submissions/SpecificEvaluationView.vue";
import EvaluationList from "@/views/exercises/submissions/EvaluationListView.vue";
import Notifications from "@/views/NotificationsView.vue";
import Help from "@/views/HelpView.vue";
import Leaderboard from "@/views/LeaderboardView.vue";
import ExerciseEditor from "@/views/exercises/ExerciseEditorView.vue";
import Feedback from "@/views/exercises/feedback/FeedbackView.vue";
import Settings from "@/views/SettingsView.vue";
import PageNotFound from "@/views/PageNotFoundView.vue";
import UserManagement from "@/views/admin/UserManagementView.vue";
import ModuleMainPage from "@/views/ModuleMainPageView.vue"
import ExerciseManagement from "@/views/admin/ExerciseManagementView.vue";
import ModuleManagement from "@/views/admin/ModuleManagementView.vue";
import Home from "@/views/HomeView.vue";
import ModuleSearch from "@/views/ModuleSearchView.vue";
import Admin from "@/views/admin/AdminView.vue";
import ModuleManager from "@/views/moduleManagement/ModuleManagementView.vue";
import UserService from "@/services/UserService";
import SettingsService from "@/services/SettingsService";
import {theme} from "@/helpers/theme";
import {i18n} from "@/main";

const routes: Array<RouteRecordRaw> = [
  {path: '/', name: 'Home',component: Home},

  {path: '/login', component: Login},
  { path: '/404', name: 'NotFound', component: PageNotFound },
  { path: '/:pathMatch(.*)*', redirect: '/404' },

  {path: '/:module/', component: ModuleMainPage},
  {path: '/:module/manage', component: ModuleManager},
  {path: '/:module/e/new/edit', component: ExerciseEditor}, // create new exercise
  {path: '/:module/e/:id', component: Exercise},
  {path: '/:module/e/:id/edit', component: ExerciseEditor}, // edit mode
  {path: '/:module/e/:id/feedback', component: Feedback}, // list feedback
  {path: '/:module/e/:id/:title', component: Exercise}, // title specified, internally ignored

  {path: '/:module/s/:id', component: Submission},
  {path: '/:module/s/:id/edit/:sid', component: EditSubmission},
  {path: '/:module/eval/:id', component: EvaluationList},
  {path: '/:module/eval/:id/:sid', component: SpecificEvaluation},

  {path: '/u/', component: Profile}, // personal profile
  {path: '/u/:id', component: Profile}, // profile of other user

  {path: "/leaderboard", component: Leaderboard},

  {path: '/notifications', component: Notifications},
  {path: '/help', component: Help},

  {path: '/settings', component: Settings},

  {path: '/admin/', component: Admin},
  {path: '/admin/users', component: UserManagement},
  {path: '/admin/exercises', component: ExerciseManagement},
  {path: '/admin/modules', component: ModuleManagement},

  {path: '/modules', component: ModuleSearch},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
    await UserService.getMe().then(async r =>{
      if (r.request.responseURL != "http://localhost:8080/login") {
        window.localStorage.setItem('loggedIn', 'true')
        await SettingsService.getUserSettings(r.data.user_id).then( res => {
          theme.value = res.data.theme
          i18n.global.locale = res.data.language
        })
      } else {
        window.localStorage.removeItem('loggedIn')
        theme.value = 'light'
        i18n.global.locale = 'de'
      }
    })
})

export default router
