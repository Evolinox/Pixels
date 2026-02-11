<script setup lang="ts">
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarMenu, SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar";
import { Aperture } from 'lucide-vue-next'
import SidebarMainNav from "@/components/nav/SidebarMainNav.vue";
import SidebarUserNav from "@/components/nav/SidebarUserNav.vue";
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
    <Sidebar collapsible="icon">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <a @click="routeTo('/')">
                            <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <Aperture class="size-4" />
                            </div>
                            <div class="flex flex-col gap-0.5 leading-none">
                                <span class="font-bold">Pixels</span>
                            </div>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMainNav/>
        </SidebarContent>
        <SidebarFooter>
            <SidebarUserNav/>
        </SidebarFooter>
    </Sidebar>
</template>