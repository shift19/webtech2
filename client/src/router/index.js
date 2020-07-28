import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "home",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/",
        name: "login",
        component: () => import("../views/login.vue")
    },
    {
        path: "/register",
        name: "register",
        component: () => import("../views/register.vue")
    },
    {
        path: "/createSerie",
        name: "createSerie",
        meta: {
            requiresAuth: true
        },
        component: () => import("../views/createSerie.vue")
    },
    {
        path: "/listSeries",
        name: "listSeries",
        meta: {
            requiresAuth: true
        },
        component: () => import("../views/listSeries.vue")
    },
    {
        path: '/edit/:id',
        name: 'edit',
        meta: {
            requiresAuth: true
        },
        component: () => import('../components/series/editSerie.vue')
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("jwt") == null) {
            next({
                path: "/"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
