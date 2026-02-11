<script setup lang="ts">
import {EllipsisVertical, LogOut, Bell, CircleUser, Settings } from 'lucide-vue-next'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {useUserStore} from "@/stores/user.store.ts";
import {onMounted, ref} from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()
const {isMobile} = useSidebar()
const userStore = useUserStore();

// Userdata
const userName = ref("");
const userFirstName = ref("");
const userLastName = ref("");
const userEmail = ref("");
const userAvatarUrl = ref("");

onMounted(() => {
    userName.value = userStore.getUserName as string;
    userFirstName.value = userStore.getUserFirstName as string;
    userLastName.value = userStore.getUserLastName as string;
    userEmail.value = userStore.getUserEmail as string;
    userAvatarUrl.value = userStore.getUserAvatarUrl as string;
})

/*
route to sidebar item
 */
function routeTo(link: string) {
    router.push(`${link}`);
}

function logOutUser() {
    userStore.clearToken();
    router.push("/auth/login");
}
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <SidebarMenuButton
                        size="lg"
                        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar class="h-8 w-8 rounded-lg">
                            <AvatarImage :src="userAvatarUrl" :alt="userFirstName"/>
                            <AvatarFallback class="rounded-lg">
                                CN
                            </AvatarFallback>
                        </Avatar>
                        <div class="grid flex-1 text-left text-sm leading-tight">
                            <span class="truncate font-medium">{{ userFirstName + " " + userLastName }}</span>
                            <span class="text-muted-foreground truncate text-xs">
                                {{ userName }}
                            </span>
                        </div>
                        <EllipsisVertical class="ml-auto size-4"/>
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-(--reka-dropdown-menu-trigger-width) min-w-52 rounded-lg"
                    :side="isMobile ? 'bottom' : 'right'"
                    :side-offset="4"
                    align="end"
                >
                    <DropdownMenuLabel class="p-0 font-normal">
                        <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar class="h-8 w-8 rounded-lg">
                                <AvatarImage :src="userAvatarUrl" :alt="userFirstName"/>
                                <AvatarFallback class="rounded-lg">
                                    CN
                                </AvatarFallback>
                            </Avatar>
                            <div class="grid flex-1 text-left text-sm leading-tight">
                                <span class="truncate font-medium">{{ userName }}</span>
                                <span class="text-muted-foreground truncate text-xs">
                                    {{ userEmail }}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem @click="routeTo('/me')">
                            <CircleUser/>
                            Account
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="routeTo('/notifications')">
                            <Bell/>
                            Notifications
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="routeTo('/settings')">
                            <Settings/>
                            Settings
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem @click="logOutUser()">
                        <LogOut/>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
</template>
