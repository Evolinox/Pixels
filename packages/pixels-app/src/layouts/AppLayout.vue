<script setup lang="ts">
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar.vue";
import SiteHeader from "@/components/SiteHeader.vue";
</script>
<template>
    <SidebarProvider
        :style=" {
          '--sidebar-width': 'calc(var(--spacing) * 52)',
          '--header-height': 'calc(var(--spacing) * 12)',
        }"
    >
        <AppSidebar />
        <SidebarInset>
            <SiteHeader />
            <router-view />
        </SidebarInset>
    </SidebarProvider>
</template>