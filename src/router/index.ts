import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Login from "@/views/misc/LoginView.vue";
import Exercise from "@/views/exercises/ExerciseView.vue";

import Profile from "@/views/user/ProfileView.vue";
import Submission from "@/views/exercises/submissions/SubmissionView.vue";
import EditSubmission from "@/views/exercises/submissions/EditSubmissionView.vue";
import SpecificEvaluation from "@/views/exercises/submissions/SpecificEvaluationView.vue";
import EvaluationList from "@/views/exercises/submissions/EvaluationListView.vue";
import Notifications from "@/views/user/NotificationsView.vue";
import Help from "@/views/misc/HelpView.vue";
import ExerciseEditor from "@/views/exercises/ExerciseEditorView.vue";
import ExerciseCreator from "@/views/exercises/ExerciseCreatorView.vue";
import Feedback from "@/views/exercises/feedback/FeedbackView.vue";
import Settings from "@/views/misc/SettingsView.vue";
import PageNotFound from "@/views/misc/PageNotFoundView.vue";
import UserManagement from "@/views/admin/UserManagementView.vue";
import ModuleMainPage from "@/views/module/ModuleMainPageView.vue"
import ExerciseManagement from "@/views/admin/ExerciseManagementView.vue";
import ModuleManagement from "@/views/admin/ModuleManagementView.vue";
import Home from "@/views/misc/HomeView.vue";
import ModuleSearch from "@/views/module/ModuleSearchView.vue";
import Admin from "@/views/admin/AdminView.vue";
import ModuleManager from "@/views/module/ModuleManagementView.vue";
import UserService from "@/services/UserService";
import SettingsService from "@/services/SettingsService";
import {theme} from "@/helpers/theme";
import {i18n} from "@/main";
import {isLoggedIn} from "@/services/LoginService";
import {AxiosResponse} from "axios";

const routes: Array<RouteRecordRaw> = [
    {path: '/', name: 'Home', component: Home},

    {path: '/login', component: Login},
    {path: '/notifications', component: Notifications},
    {path: '/help', component: Help},
    {path: '/settings', component: Settings},
    {path: '/modules', component: ModuleSearch},

    {path: '/u/:id?', component: Profile},

    {
        path: '/:module', children: [
            {path: '', component: ModuleMainPage},
            {path: 'manage', component: ModuleManager},
            {
                path: 'e', children: [
                    {path: 'new', component: ExerciseCreator},
                    {
                        path: ':id', children: [
                            {path: ':title?', component: Exercise},
                            {path: 'edit', component: ExerciseEditor},
                            {path: 'feedback', component: Feedback},
                            {path: 'submissions', component: Submission},
                        ]
                    },
                ]
            },
            {
                path: 's/:id', children: [
                    {path: '', component: Submission},
                    {path: 'edit/:sid', component: EditSubmission},
                    {path: 'evaluation/:sid', component: SpecificEvaluation},
                ]
            },
            {
                path: 'eval/:id', children: [
                    {path: '', component: EvaluationList},
                    {path: ':sid', component: SpecificEvaluation},
                ]
            },
        ]
    },

    {
        path: '/admin', children: [
            {path: '', component: Admin},
            {path: 'users', component: UserManagement},
            {path: 'exercises', component: ExerciseManagement},
            {path: 'modules', component: ModuleManagement},
        ]
    },

    {path: '/page-not-found', name: 'NotFound', component: PageNotFound},
    {path: '/:pathMatch(.*)*', redirect: '/page-not-found'},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {
            top: 0,
        }
    }
})

router.beforeEach(async (to, from) => {
    await UserService.getMe().then(async (r: AxiosResponse) => {
        if (isLoggedIn(r)) {
            window.localStorage.setItem('loggedIn', 'true')
            await SettingsService.getUserSettings(r.data.user_id).then(res => {
                theme.value = res.data.theme
                i18n.global.locale = res.data.language
            })
        } else {
            window.localStorage.removeItem('loggedIn')
        }
    })
})

export default router
