import { createRouter, createWebHistory } from 'vue-router';

import AppLayout from '@/layouts/AppLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

import { isLoggedIn } from '@/utils/auth.ts';
import { useDataStore } from "@/stores/data.store.ts";

const routes : any[] = [
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                name: 'LoginView',
                component: () => import('@/views/Login.vue'),
            }
        ]
    },
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'Feed',
                meta: { requiresAuth: true, updatesTitle: true },
                component: () => import('@/views/Feed.vue'),
            },
            {
                path: 'explore',
                name: 'Explore',
                meta: { requiresAuth: true, updatesTitle: true },
                component: () => import('@/views/Explore.vue'),
            },
            {
                path: 'post',
                name: 'Create',
                meta: { requiresAuth: true, updatesTitle: true },
                component: () => import('@/views/Create.vue'),
            },
            {
                path: 'me',
                name: 'Profile',
                meta: { requiresAuth: true, updatesTitle: true },
                component: () => import('@/views/User.vue'),
            },
            {
                path: 'user/:userName',
                name: 'User',
                meta: { requiresAuth: true, updatesTitle: true },
                component: () => import('@/views/User.vue'),
                props: true,
            },
            {
                path: 'user/:userName/photos/:photoId',
                name: 'Photo',
                meta: { requiresAuth: true },
                component: () => import('@/views/Photo.vue'),
                props: true,
            },
            {
                path: 'settings',
                name: 'Settings',
                meta: { requiresAuth: true, updatesTitle: true },
                component: () => import('@/views/Settings.vue'),
            },
            {
                path: 'notifications',
                name: 'Notifications',
                meta: { requiresAuth: true, updatesTitle: true },
                component: () => import('@/views/Settings.vue'),
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    const dataStore = useDataStore();

    console.log(isLoggedIn());
    if (to.meta.requiresAuth && !isLoggedIn()) {
        next('/auth/login');
    } else {
        if (to.meta.updatesTitle) {
            if (to.name === 'User') {
                dataStore.setPageTitle(to.params.userName + "'s Account");
            } else if (to.name === 'Profile') {
                dataStore.setPageTitle("Your Account");
            } else {
                dataStore.setPageTitle(to.name);
            }
        }
        next();
    }
});

export default router;