<script setup lang="ts">
import { Aperture, Pin, Camera, Video, ClockFading, Asterisk } from 'lucide-vue-next'
import { Picture } from '@/types/types.pixels.ts'

// Props
const props = defineProps<{
    picture: Picture
}>()
</script>

<template>
    <div class="text-muted-foreground text-s border-2 rounded-lg p-4 space-y-4">
        <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
                <Pin class="w-4 h-4 shrink-0" />
                <span>{{ props.picture.location || '-' }}</span>
            </div>
            <div class="flex items-center gap-2">
                <Camera class="w-4 h-4 shrink-0" />
                <span>{{ props.picture.cameraModel || '-' }}</span>
            </div>
        </div>
        <div class="flex gap-8">
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Aperture class="w-4 h-4 shrink-0" />
                    <span>{{ props.picture.aperture || '-' }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <Asterisk class="w-4 h-4 shrink-0" />
                    <span>{{ props.picture.iso || '-' }}</span>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Video class="w-4 h-4 shrink-0" />
                    <span>{{ props.picture.focalLength || '-' }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <ClockFading class="w-4 h-4 shrink-0" />
                    <span>{{ props.picture.shutterSpeed || '-' }}</span>
                </div>
            </div>
        </div>
    </div>
</template>