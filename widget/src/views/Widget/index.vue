<script lang="ts">
import useIframeControl from '@/hooks/iframe'
import { defineComponent, onMounted, reactive } from 'vue'

import Box from './Box.vue'
import Standby from './Standby.vue'

type State = {
    component: string,
}

interface SetupReturn {
    state: State,
    handleCloseBox(): void,
    handleOpenBox(): void
}


export default defineComponent({

    components: { Box, Standby },

    setup(): SetupReturn {

        const iframe = useIframeControl()
        const state = reactive<State>({
            component: 'Standby',
        })


        onMounted(() => {
            iframe.updateCoreValueOnStore()
        })


        function handleCloseBox(): void {
            iframe.notifyClose()
            state.component = 'Standby'
        }

        function handleOpenBox(): void {
            iframe.notifyOpen()
            state.component = 'Box'
        }

        return {
            handleCloseBox,
            handleOpenBox,
            state
        }
    },

})

</script>


<template>

    <teleport to="body">

        <component :is="state.component" @open-box="handleOpenBox" @close-box="handleCloseBox" />

    </teleport>

</template>


<style scoped>
</style>
