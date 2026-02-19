<script setup lang="ts">
import { Aperture, Pin, Camera, Video, ClockFading, RectangleHorizontal, CalendarDays } from 'lucide-vue-next'
import { Picture } from '@/types/types.pixels.ts'
import {Separator} from "@/components/ui/separator";

// Props
const props = defineProps<{
    picture: Picture
}>()
</script>

<template>
    <div class="bg-background text-muted-foreground text-s border-1 rounded-lg p-4 space-y-2">
        <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
                <Pin class="w-4 h-4 shrink-0" />
                <span>{{ props.picture.location || '-' }}</span>
            </div>
            <div class="flex items-center gap-2">
                <CalendarDays class="w-4 h-4 shrink-0" />
                <span>{{ props.picture.takenAt || '-' }}</span>
            </div>
            <div class="flex items-center gap-2">
                <Camera class="w-4 h-4 shrink-0" />
                <span>{{ props.picture.cameraModel || '-' }}</span>
            </div>
        </div>
        <Separator />
        <div class="flex">
            <div class="flex flex-col gap-2 flex-1">
                <div class="flex items-center gap-2">
                    <Aperture class="w-4 h-4 shrink-0" />
                    <span>{{ props.picture.aperture || '-' }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <RectangleHorizontal class="w-4 h-4 shrink-0" />
                    <span>{{ props.picture.iso || '-' }}</span>
                </div>
            </div>
            <div class="flex flex-col gap-2 flex-1">
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