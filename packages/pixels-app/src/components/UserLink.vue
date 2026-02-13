<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import defaultAvatar from "@/assets/avatar.webp";
import {useUserStore} from "@/stores/user.store.ts";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {useRouter} from "vue-router";

const router = useRouter()
const userStore = useUserStore();

// Props
const props = defineProps({
    userId: Number,
    timeStamp: String,
})

// Userdata
const userName = ref("");
const userFirstName = ref("");
const userLastName = ref("");
const userAvatarUrl = ref("");

onMounted(async () => {
    // Get Userdata
    const response = await fetch(`/pixels-api/users/id/${props.userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userStore.getUserToken}`,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (response.ok) {
        userName.value = data.username;
        userFirstName.value = data.firstname;
        userLastName.value = data.lastname;
        userAvatarUrl.value = data.avatar;
    }
});

const resolvedAvatarUrl = computed(() => {
    if (userAvatarUrl && userAvatarUrl.value.startsWith('http')) {
        return userAvatarUrl.value
    }
    return defaultAvatar
})

const postCreatedAt = computed(() => {
    const date = new Date(props.timeStamp.replace(' ', 'T'));
    const now = new Date();

    const diffMs = now - date;

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
        return diffMinutes <= 1 ? "one minute ago" : `${diffMinutes} minutes ago`;
    }

    if (diffHours < 24) {
        return diffHours === 1 ? "one hour ago" : `${diffHours} hours ago`;
    }

    return diffDays === 1 ? "one day ago" : `${diffDays} days ago`;
})

function routeTo(link: string) {
    router.push(`${link}`);
}
</script>

<template>
    <Button class="pl-0! w-full" variant="ghost" @click="routeTo('/user/' + userName)">
        <Avatar class="h-8 w-8 rounded-lg l-0">
            <AvatarImage :src="resolvedAvatarUrl" :alt="userFirstName"/>
        </Avatar>
        <div class="grid flex-1 text-left text-sm leading-tight">
            <span class="truncate font-medium">{{ userFirstName + " " + userLastName }}</span>
            <span class="text-muted-foreground truncate text-xs">
                {{ postCreatedAt }}
            </span>
        </div>
    </Button>
</template>