<script setup lang="ts">
import ExifReader from 'exifreader';
import {ref} from "vue";

import {useUserStore} from "@/stores/user.store.ts";

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {toast} from "vue-sonner";

const userStore = useUserStore();

const image = ref<File | null>(null);
const title = ref('');
const description = ref('');
// Exif
const takenAt      = ref<string | null>(null)
const location     = ref<string | null>(null)
const latitude     = ref<number | null>(null)
const longitude    = ref<number | null>(null)
const cameraModel  = ref<string | null>(null)
const aperture     = ref<string | null>(null)
const focalLength  = ref<string | null>(null)
const iso          = ref<number | null>(null)
const shutterSpeed = ref<string | null>(null)
const resolution   = ref<string | null>(null)
const megapixel    = ref<string | null>(null)

const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        image.value = file;
        await extractExif(file);
    }
};

const getLocationName = async (lat: number, lon: number): Promise<string | null> => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    )

    if (!res.ok) return null

    const data = await res.json()

    return data.display_name ?? null
}

const extractExif = async (file: File) => {
    const tags = await ExifReader.load(file);
    console.log(tags);

    const rawDate =
        tags.DateTimeOriginal?.description ||
        tags.DateTimeDigitized?.description ||
        tags.DateTime?.description;

// 1. Check if rawDate exists
// 2. Replace the first two colons (YYYY:MM:DD) with hyphens (YYYY-MM-DD)
// 3. Convert to ISO string
    const isoDate = rawDate
        ? new Date(rawDate.replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')).toISOString()
        : null;

    takenAt.value = isoDate;

    // GPS
    if (tags.GPSLatitude && tags.GPSLongitude) {
        latitude.value = tags.GPSLatitude.description as number;
        longitude.value = tags.GPSLongitude.description as number;

        location.value = await getLocationName(latitude.value!, longitude.value!)
    }

    // Kamera
    cameraModel.value =
        tags.Model?.description ||
        tags.CameraModelName?.description ||
        null;

    // Blende
    aperture.value =
        tags.FNumber?.description ||
        tags.ApertureValue?.description ||
        null;

    // Brennweite
    focalLength.value =
        tags.FocalLength?.description ||
        null;

    // ISO
    iso.value =
        tags.ISOSpeedRatings?.value ||
        tags.ISO?.value ||
        null;

    // Verschlusszeit
    shutterSpeed.value =
        tags.ExposureTime?.description ||
        tags.ShutterSpeedValue?.description ||
        null;

    // Auflösung
    if (tags.ExifImageWidth && tags.ExifImageHeight) {
        const width = tags.ExifImageWidth.value;
        const height = tags.ExifImageHeight.value;

        resolution.value = `${width} x ${height}`;

        const mp = (width * height) / 1000000;
        megapixel.value = mp.toFixed(1) + " MP";
    }
};

const handleSubmit = async (): Promise<void> => {
    try {
        const formData = new FormData();
        formData.append("picture", image.value);
        formData.append("title", title.value);
        formData.append("descr", description.value);
        formData.append("takenAt", takenAt.value);
        if (location.value)
            formData.append("location", location.value);
        if (latitude.value != null)
            formData.append("latitude", latitude.value.toString());
        if (longitude.value != null)
            formData.append("longitude", longitude.value.toString());
        if (cameraModel.value)
            formData.append("cameraModel", cameraModel.value);
        if (aperture.value)
            formData.append("aperture", aperture.value);
        if (focalLength.value)
            formData.append("focalLength", focalLength.value);
        if (iso.value != null)
            formData.append("iso", iso.value.toString());
        if (shutterSpeed.value)
            formData.append("shutterSpeed", shutterSpeed.value);
        if (resolution.value)
            formData.append("resolution", resolution.value);
        if (megapixel.value)
            formData.append("megapixel", megapixel.value);

        const response = await fetch('/pixels-api/pictures/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userStore.getUserToken}`,
            },
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Upload successful:', data);
        } else {
            console.error('Upload failed:', data);
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
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <Card class="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Upload a new picture to Pixels</CardTitle>
                <CardDescription>
                    Select your local picture, enter a title and description to upload
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit.prevent="handleSubmit">
                    <div class="grid w-full items-center gap-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="picture">Picture</Label>
                            <Input id="picture" type="file" accept=".png,.jpg,.jpeg,.heic,image/png,image/jpeg,image/heic" @change="handleFileChange" requiredd/>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="title">Title</Label>
                            <Input id="title" type="text" v-model="title" required />
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="description">Description</Label>
                            <Input id="description" type="text" v-model="description" required />
                        </div>
                        <div class="space-y-1.5">
                            <Button type="submit" class="w-full">
                                Upload
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>