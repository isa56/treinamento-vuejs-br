<script>
import Loading from './Loading.vue'

export default {
    props: {
        name: {type: String, required: true},
    },
    components: {Loading},

}
</script>


<template>

    <component :is="name" v-bind="$props" />

</template>


<style scoped>


</style>
