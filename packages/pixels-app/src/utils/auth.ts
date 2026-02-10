import { jwtDecode } from 'jwt-decode';
import { useUserStore } from '../stores/user.store';

export function isLoggedIn() {
    const userStore = useUserStore();
    let token = userStore.getUserToken;

    if (!token) {
        return false
    } else {
        return true
    }
    /* Token expiry check... still wip as it currently is broken
    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const now = Date.now() / 1000;
        return decoded.exp > now;
    } catch (error) {
        console.error('Invalid token:', error);
        return false;
    }
     */
}
