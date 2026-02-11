<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area';
import {useRoute} from 'vue-router';
import {useUserStore} from "@/stores/user.store.ts";
import { Pin, AtSign } from 'lucide-vue-next'
// Placeholders
import defaultAvatar from '@/assets/avatar.webp'
import defaultBanner from '@/assets/banner.webp'
import {Button} from "@/components/ui/button";
import PictureGrid from "@/components/PictureGrid.vue";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const route = useRoute();
const userStore = useUserStore();

// Userdata
const userId = ref("");
const userName = ref("");
const userEmail = ref("");
const userFirstName = ref("");
const userLastName = ref("");
const userDescription = ref("");
const userAvatarUrl = ref("");
const userBannerUrl = ref("");

// Check if we are on the 'Profile' route
const isMe = route.name === 'Profile';

onMounted(async () => {
    // Get Userdata
    if (isMe) {
        userId.value = userStore.getUserId as string;
        userName.value = userStore.getUserName as string;
        userEmail.value = userStore.getUserEmail as string;
        userFirstName.value = userStore.getUserFirstName as string;
        userLastName.value = userStore.getUserLastName as string;
        userDescription.value = userStore.getUserDescription || "Keine Informationen angegeben.";
        userAvatarUrl.value = userStore.getUserAvatarUrl as string;
        userBannerUrl.value = userStore.getUserBannerUrl as string;
    } else {
        const response = await fetch(`/pixels-api/users/${route.params.userName}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userStore.getUserToken}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (response.ok) {
            userId.value = data.id;
            userName.value = data.username;
            userEmail.value = data.email;
            userFirstName.value = data.firstname;
            userLastName.value = data.lastname;
            userDescription.value = data.descr || "Keine Informationen angegeben.";
            userAvatarUrl.value = data.avatar;
            userBannerUrl.value = data.banner;
        }
    }
});

const resolvedAvatarUrl = computed(() => {
    if (userAvatarUrl && userAvatarUrl.value.startsWith('http')) {
        return userAvatarUrl.value
    }
    return defaultAvatar
})
const resolvedBannerUrl = computed(() => {
    if (userBannerUrl && userBannerUrl.value.startsWith('http')) {
        return userBannerUrl.value
    }
    return defaultBanner
})
</script>

<template>
    <Dialog>
        <ScrollArea>
            <div id="profileInfoBox">
                <div>
                    <img class="w-full h-64 object-cover rounded-lg" :src="resolvedBannerUrl" alt="" />
                </div>
                <!-- Avatar + Info Section -->
                <div class="flex items-center px-4 -mt-12">
                    <!-- Avatar on the left -->
                    <div class="w-32 h-32 rounded-lg border-4 overflow-hidden shadow-md">
                        <img
                            :src="resolvedAvatarUrl"
                            alt="Avatar"
                            class="w-full h-full object-cover"
                        />
                    </div>

                    <!-- User info on the right -->
                    <div class="ml-4 mt-16">
                        <h1 class="text-xl font-semibold">
                            {{ userFirstName + " " + userLastName }}
                        </h1>
                        <div class="flex items-center text-gray-500 space-x-1">
                            <AtSign class="w-4 h-4" />
                            <span>{{ userName }}</span>
                        </div>
                        <div class="flex items-center text-gray-500 space-x-1">
                            <Pin class="w-4 h-4" />
                            <span>Mosbach (Baden)</span>
                        </div>
                    </div>

                    <div class="ml-auto mr-4 mt-16">
                        <DialogTrigger asChild>
                            <Button v-if="isMe">
                                Edit Profile
                            </Button>
                        </DialogTrigger>
                        <Button v-if="!isMe">
                            Follow {{ userName }}
                        </Button>
                    </div>
                </div>
                <!-- About Box -->
                <div class="mt-4 px-6 py-2 border-t text-left">
                    <p class="text-gray-500 mt-0 leading-relaxed">
                        {{ userDescription }}
                    </p>
                </div>
                <div class="border-t mb-4">
                </div>
            </div>
            <div class="content-view">
                <Tabs default-value="activity" class="ml-4 mr-4">
                    <TabsList class="w-full">
                        <TabsTrigger value="activity">
                            Activity
                        </TabsTrigger>
                        <TabsTrigger value="photos">
                            Photos
                        </TabsTrigger>
                        <TabsTrigger value="albums">
                            Albums
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="activity">
                        Here you will see the users activity
                    </TabsContent>
                    <TabsContent value="photos">
                        <PictureGrid :userId="userId"/>
                    </TabsContent>
                    <TabsContent value="albums">
                        Here you will see the users albums
                    </TabsContent>
                </Tabs>
            </div>
        </ScrollArea>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Your Profile</DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="banner" class="text-right">
                        Banner
                    </Label>
                    <Input id="banner" type="file" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="avatar" class="text-right">
                        Avatar
                    </Label>
                    <Input id="avatar" type="file" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">
                        Name
                    </Label>
                    <Input id="name" v-model="userFirstName" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right">
                        Username
                    </Label>
                    <Input id="username" v-model="userName" class="col-span-3" />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="location" class="text-right">
                        Location
                    </Label>
                    <Input id="location" value="Mosbach" class="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Save</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<style>
.content-view {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>