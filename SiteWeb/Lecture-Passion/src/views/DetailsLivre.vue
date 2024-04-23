<script setup>
const props = defineProps({
    id: {
        required: true
    }
})
</script>

<template>
    <p>{{id}}</p>
</template>