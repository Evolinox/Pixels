<script setup lang="ts">
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ImagePlus, House, Telescope } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

/*
route to sidebar item
 */
function routeTo(link: string) {
    router.push(`${link}`);
}
</script>
<template>
    <SidebarGroup>
        <SidebarGroupContent class="flex flex-col gap-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton @click="routeTo('/')" tooltip="See what your Friends have posted!">
                        <House/>
                        <span>Feed</span>
                    </SidebarMenuButton>
                    <SidebarMenuButton @click="routeTo('/explore')" tooltip="Explore new Pictures by other People!">
                        <Telescope/>
                        <span>Explore</span>
                    </SidebarMenuButton>
                    <SidebarMenuButton @click="routeTo('/post')" tooltip="Upload new Pictures!">
                        <ImagePlus/>
                        <span>Create</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
</template>