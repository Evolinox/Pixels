<script setup lang="ts">
import { ThumbsUp, UserPlus } from 'lucide-vue-next'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import UserLink from "@/components/UserLink.vue";
import ExifContainer from "@/components/ExifContainer.vue";
import { Picture } from '@/types/types.pixels.ts'
import {Button} from "@/components/ui/button";

// Props
const props = defineProps<{
    picture: Picture
}>()
</script>

<template>
    <Dialog>
        <DialogTrigger class="block w-full max-w-md overflow-hidden rounded-lg shadow-md transition-transform hover:scale-101" asChild >
            <img
                :src="`/pixels-api/${props.picture.url}`"
                :alt="`Picture ${picture.id}`"
                class="w-full h-auto object-cover aspect-4/3"
            />
        </DialogTrigger>
        <DialogContent class="w-auto! lg:min-w-250">
            <DialogHeader>
                <DialogTitle>{{ props.picture.title }}</DialogTitle>
            </DialogHeader>
            <div class="flex items-stretch gap-4">
                <div class="flex-1 max-w-300">
                    <img
                        :src="`/pixels-api/${props.picture.url}`"
                        :alt="`Picture ${props.picture.id}`"
                        class="w-auto h-auto rounded-lg object-contain"
                    />
                </div>
                <div class="grid grid-rows-[auto_1fr_auto_auto] min-w-50 max-w-62.5 h-[450px]">
                    <UserLink :userId="props.picture.userId" :timeStamp="props.picture.createdAt" />
                    <div class="overflow-y-auto min-h-0 text-m text-muted-foreground">{{ props.picture.descr }}</div>
                    <div class="grid grid-cols-2 gap-2">
                        <Button variant="outline">
                            <ThumbsUp />
                            Like
                        </Button>
                        <Button variant="outline">
                            <UserPlus />
                            Follow
                        </Button>
                    </div>
                    <div class="pt-2">
                        <ExifContainer :picture="props.picture" />
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
</template>