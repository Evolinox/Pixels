import { createRouter, createWebHistory } from 'vue-router';
import { isLoggedIn } from '@/utils/auth.ts';
import {useDataStore} from "@/stores/data.store.ts";
import {useUserStore} from "@/stores/user.store.ts";

const routes : any[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/',
        name: 'Feed',
        meta: { requiresAuth: true, updatesTitle: true },
        component: () => import('@/views/Feed.vue'),
    },
    {
        path: '/explore',
        name: 'Explore',
        meta: { requiresAuth: true, updatesTitle: true },
        component: () => import('@/views/Explore.vue'),
    },
    {
        path: '/post',
        name: 'Create',
        meta: { requiresAuth: true },
        component: () => import('@/views/Create.vue'),
    },
    {
        path: '/me',
        name: 'Profile',
        meta: { requiresAuth: true, updatesTitle: true },
        component: () => import('@/views/User.vue'),
    },
    {
        path: '/user/:userName',
        name: 'User',
        meta: { requiresAuth: true, updatesTitle: true },
        component: () => import('@/views/User.vue'),
        props: true,
    },
    {
        path: '/user/:userName/photos/:photoId',
        name: 'Photo',
        meta: { requiresAuth: true },
        component: () => import('@/views/Photo.vue'),
        props: true,
    },
    {
        path: '/settings',
        name: 'Settings',
        meta: { requiresAuth: true, updatesTitle: true },
        component: () => import('@/views/Settings.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    const dataStore = useDataStore();
    const userStore = useUserStore();

    if (to.meta.requiresAuth && !isLoggedIn()) {
        return '/login';
    }

    if (to.meta.updatesTitle && isLoggedIn()) {
        if (to.name === 'User') {
            dataStore.setPageTitle(to.params.userName);
        } else if (to.name === 'Profile') {
            dataStore.setPageTitle(userStore.getUserName as string);
        } else {
            dataStore.setPageTitle(to.name);
        }
        next();
    }
});

export default router;