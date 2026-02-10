<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import { cn } from '@/lib/utils';
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
    try {
        const response = await fetch('/pixels-api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login successful:', data);
            userStore.setUserToken(data.token);
            await userStore.getUserData();
            await router.push('/');
        } else {
            console.error('Login failed:', data);
            toast('Uh oh! Something went wrong.', {
                description: 'There was an error. Code ' + response.status,
            });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        toast('Uh oh! Something went wrong.', {
            description: 'There was an error. Code ' + error,
        });
    }
};
</script>

<template>
    <form :class="cn('flex flex-col gap-6')" @submit.prevent="handleSubmit">
        <div class="flex flex-col items-center gap-2 text-center">
            <h1 class="text-2xl font-bold">
                Login to your account
            </h1>
            <p class="text-balance text-sm text-muted-foreground">
                Enter your email below to login to your account
            </p>
        </div>
        <div class="grid gap-6">
            <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" v-model="email" required />
            </div>
            <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input id="password" type="password" v-model="password" required />
            </div>
            <Button type="submit" class="w-full">
                Login
            </Button>
        </div>
    </form>
</template>