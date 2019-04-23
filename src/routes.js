import Home from './components/home/home'
import LoginPage from './components/LoginPage'
import CreateSurvey from './components/home/CreateSurvey'
import Surveys from './components/survey/Surveys'
import SingleSurvey from './components/survey/SingleSurvey'

export const routes = [
    { path: '', component: Surveys},
    { path: '/survey/:value', component: SingleSurvey},
    { path: '/login', component: LoginPage},
    { path: '/home', component: Home},
    { path: '/new-survey', component: CreateSurvey},

];


