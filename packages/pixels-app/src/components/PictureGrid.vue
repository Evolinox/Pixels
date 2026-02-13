<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue';
import PictureCard from './PictureCard.vue'
import { toast } from 'vue-sonner'

const props = defineProps<{
    userId?: string;
}>();

const userId = props.userId;
const pictures = ref([]);

onMounted(async () => {
    let apiEndpoint: string;
    try {
        if (userId) {
            apiEndpoint = `/pixels-api/pictures/latest?userId=${userId}`;
        } else {
            apiEndpoint = `/pixels-api/pictures/latest`;
        }
        console.log(apiEndpoint);
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (response.ok) {
            pictures.value = data;
        } else {
            console.error('Fetching user-pictures failed:', data);
            toast('Uh oh! Something went wrong.', {
                description: 'There was an error. Code ' + response.status,
            });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        toast('Uh oh! Something went wrong.', {
            description: 'There was an error. Code ' + error,
        });
    }
});
</script>

<template>
    <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <PictureCard
            v-for="pic in pictures"
            :key="pic.id"
            :picture="pic"
        />
    </div>
</template>