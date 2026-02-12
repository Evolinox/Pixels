<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import UserLink from "@/components/UserLink.vue";
import ExifContainer from "@/components/ExifContainer.vue";
import {ScrollArea} from "@/components/ui/scroll-area";

// Props
const props = defineProps({
    picture: {
        type: Object,
        required: true,
        // Expected shape: { id: string | number, imageUrl: string }
    },
})
</script>

<template>
    <Dialog>
        <DialogTrigger class="block w-full max-w-md overflow-hidden rounded-lg shadow-md transition-transform hover:scale-101" asChild >
            <img
                :src="`/pixels-api/${picture.url}`"
                :alt="`Picture ${picture.id}`"
                class="w-full h-auto object-cover aspect-4/3"
            />
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ picture.title }}</DialogTitle>
            </DialogHeader>
            <div class="flex items-start gap-4">
                <div class="shrink-0 w-2/3">
                    <img
                        :src="`/pixels-api/${picture.url}`"
                        :alt="`Picture ${picture.id}`"
                        class="w-full h-auto rounded-lg"
                    />
                </div>
                <div class="w-1/3">
                    <UserLink :userId="picture.userId" :timeStamp="picture.createdAt" />
                    <ScrollArea>
                        {{ picture.descr }}
                    </ScrollArea>
                    <ExifContainer :data="picture" />
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>