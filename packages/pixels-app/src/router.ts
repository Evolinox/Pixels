import { createRouter, createWebHistory } from 'vue-router';
import { isLoggedIn } from '@/utils/auth.ts';

const routes : any[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/',
        name: 'Feed',
        meta: { requiresAuth: true },
        component: () => import('@/views/Feed.vue'),
    },
    {
        path: '/explore',
        name: 'Explore',
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
        component: () => import('@/views/User.vue'),
    },
    {
        path: '/user/:userName',
        name: 'User',
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
        component: () => import('@/views/Settings.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn()) {
        next('/login');
    } else {
        next();
    }
});

export default router;