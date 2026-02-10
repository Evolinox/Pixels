<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'

const router = useRouter()

function temporaryRouterPush() {
    router.push('/me')
}
function temporaryRouterPushUser() {
    router.push('/user/Spooki')
}
</script>

<template>
    <Button @click="temporaryRouterPush">Profile</Button>
    <Button @click="temporaryRouterPushUser">Random User</Button>
</template>