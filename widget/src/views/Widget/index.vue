<script lang="ts">
import { defineComponent, reactive } from 'vue'

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

        const state = reactive<State>({
            component: 'Standby',
        })


        function handleCloseBox(): void {
            state.component = 'Standby'
        }

        function handleOpenBox(): void {
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
