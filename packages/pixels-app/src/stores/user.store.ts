import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useUserStore = defineStore('user', {
    state: () => ({
        userToken: useLocalStorage<string | undefined>('userToken', undefined),
        userId: useLocalStorage<string | undefined>('userId', undefined),
        userName: useLocalStorage<string | undefined>('userName', undefined),
        userEmail: useLocalStorage<string | undefined>('userEmail', undefined),
        userFirstName: useLocalStorage<string | undefined>('userFirstName', undefined),
        userLastName: useLocalStorage<string | undefined>('userLastName', undefined),
        userDescription: useLocalStorage<string | undefined>('userDescription', undefined),
        userAvatarUrl: useLocalStorage<string | undefined>('userAvatarUrl', undefined),
        userBannerUrl: useLocalStorage<string | undefined>('userBannerUrl', undefined),
    }),

    actions: {
        setUserToken(token: string) {
            this.userToken = token;
        },
        clearToken() {
            this.userToken = undefined;
            localStorage.removeItem('userToken');
        },
        setUserName(name: string) {
            this.userName = name;
        },
        setUserEmail(email: string) {
            this.userEmail = email;
        },
        async getUserData() {
            const response = await fetch('/pixels-api/users/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.userToken}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                this.userId = data.id;
                this.userName = data.username;
                this.userEmail = data.email;
                this.userFirstName = data.firstname;
                this.userLastName = data.lastname;
                this.userDescription = data.descr;
                this.userAvatarUrl = data.avatar;
                this.userBannerUrl = data.banner;
            }
        },
    },

    getters: {
        getUserToken(): string | undefined {
            return this.userToken;
        },
        getUserId(): string | undefined {
            return this.userId;
        },
        getUserName(): string | undefined {
            return this.userName;
        },
        getUserEmail(): string | undefined {
            return this.userEmail;
        },
        getUserFirstName(): string | undefined {
            return this.userFirstName;
        },
        getUserLastName(): string | undefined {
            return this.userLastName;
        },
        getUserDescription(): string | undefined {
            return this.userDescription;
        },
        getUserAvatarUrl(): string | undefined {
            return this.userAvatarUrl;
        },
        getUserBannerUrl(): string | undefined {
            return this.userBannerUrl;
        }
    },
});