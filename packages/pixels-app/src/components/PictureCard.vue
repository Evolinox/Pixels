<script setup lang="ts">
import { computed } from 'vue'

// Props
const props = defineProps({
    picture: {
        type: Object,
        required: true,
        // Expected shape: { id: string | number, imageUrl: string }
    },
})

const pictureLink = computed(() => `/pixels-api/${props.picture.url}`)
</script>

<template>
    <router-link
        :to="pictureLink"
        class="block w-full max-w-md overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
    >
        <img
            :src="`/pixels-api/${picture.url}`"
            :alt="`Picture ${picture.id}`"
            class="w-full h-auto object-cover"
        />
    </router-link>
</template>