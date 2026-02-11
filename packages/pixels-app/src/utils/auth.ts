import { jwtDecode } from 'jwt-decode';
import { useUserStore } from '../stores/user.store';

export function isLoggedIn(): boolean {
    const userStore = useUserStore();
    const token = userStore.getUserToken;

    if (!token) {
        return false;
    }
/*
    try {
        const { exp } = jwtDecode<{ exp: number }>(token);
        const now = Math.floor(Date.now() / 1000);

        const isValid = exp > now;

        if (!isValid) {
            userStore.clearToken(); // auto-logout on expiration
        }

        return isValid;
    } catch (error) {
        console.error('Invalid token:', error);
        userStore.clearToken() // corrupted token → force logout
        return false;
    }*/return true;
}
