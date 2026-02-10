<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { onMounted } from 'vue';
import { Toaster } from '@/components/ui/sonner'

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
    <router-view />
    <Toaster />
</template>