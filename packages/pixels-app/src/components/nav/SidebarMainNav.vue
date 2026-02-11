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
                <SidebarMenuItem class="flex items-center gap-2">
                    <SidebarMenuButton
                        @click="routeTo('/create')"
                        tooltip="Quick Create"
                        class="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                    >
                        <ImagePlus />
                        <span>Create</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton @click="routeTo('/')" tooltip="Feed">
                        <House/>
                        <span>Feed</span>
                    </SidebarMenuButton>
                    <SidebarMenuButton @click="routeTo('/explore')" tooltip="Explore">
                        <Telescope/>
                        <span>Explore</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
</template>