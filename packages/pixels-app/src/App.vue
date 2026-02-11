<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { onMounted } from 'vue';
import { Toaster } from '@/components/ui/sonner'
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import SiteHeader from "@/components/SiteHeader.vue";
import AppSidebar from "@/components/AppSidebar.vue";

onMounted(() => {
    const colorMode = useColorMode();
    const appearance = localStorage.getItem('appearance');

    if (appearance === 'light' || appearance === 'dark') {
        colorMode.value = appearance;
    } else {
        colorMode.value = 'auto';
    }
});
</script>

<template>
    <SidebarProvider
        :style=" {
      '--sidebar-width': 'calc(var(--spacing) * 62)',
      '--header-height': 'calc(var(--spacing) * 12)',
    }"
    >
        <AppSidebar />
        <SidebarInset>
            <SiteHeader />
            <RouterView />
        </SidebarInset>
    </SidebarProvider>
    <Toaster />
</template>