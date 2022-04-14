<template>

    <component :is="store.currentComponent" @select-feedback-type="handleSelectFeedbackType" @next="next" />

</template>

<script lang="ts">
import { defineComponent } from 'vue'

import useStore from '@/hooks/store'
import useNavigation, { Navigation } from '@/hooks/navigation'
import { setFeedbackType, StoreState } from '@/store'

import SelectFeedbackType from './SelectFeedbackType.vue'
import WriteAFeedback from './WriteAFeedback.vue'

interface SetupReturn {
    handleSelectFeedbackType(type: string): void;
    next: Navigation['next'];
    store: StoreState;
}

export default defineComponent({
    components: { SelectFeedbackType, WriteAFeedback },
    setup(): SetupReturn {

        const store = useStore()
        const { next } = useNavigation()

        function handleSelectFeedbackType(type: string): void {

            setFeedbackType(type)

        }

        return {
            handleSelectFeedbackType,
            next,
            store
        }

    }

})

</script>
