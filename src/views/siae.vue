<template>
<div class="siae">
    <pageHeader :activeIndex="Index"></pageHeader>
    <router-view />
    <p>开发中...</p>
</div>
</template>
<script>
import pageHeader from '@/components/siae/header.vue'
export default {
    name: 'siae',
    data() {
        return {
            Index:'/homePage'
        }
    },
    components: {
        pageHeader
    }
}
</script>
