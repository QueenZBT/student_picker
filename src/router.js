import Vue from "vue";
import Router from 'vue-router'
import MyPicker from "./routes/MyPicker.vue";
import MyStudentList from "./routes/MyStudentList.vue";
import MyHistory from "./routes/MyHistory.vue";

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', component: MyPicker },
        { path: '/students', component: MyStudentList },
        { path: '/history', component: MyHistory },
    ]
})