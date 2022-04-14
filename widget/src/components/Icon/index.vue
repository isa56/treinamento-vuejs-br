<script>
import ArrowRight from './ArrowRight.vue'
import Attention from './Attention.vue'
import Chat from './Chat.vue'
import Check from './Check.vue'
import ChevronDown from './ChevronDown.vue'
import Close from './Close.vue'
import Copy from './Copy.vue'
import Loading from './Loading.vue'

export default {
    components: { ArrowRight, Attention, Chat, Check, ChevronDown, Close, Copy, Loading, },
    props: {
        name: { type: String, required: true },
    },

}
</script>


<template>
    <component :is="name" v-bind="$props" />
</template>


<style scoped>
</style>
