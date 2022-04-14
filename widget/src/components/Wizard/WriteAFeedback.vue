<script lang="ts">
import { computed, ComputedRef, defineComponent, reactive } from "vue"
import useStore from "@/hooks/store"
import { setCurrentComponent, setMessage } from "@/store"
import useNavigation from "@/hooks/navigation"
// import services from "@/services"

import Icon from "@/components/Icon/index.vue"

const services = {}

type State = {
    feedback: string;
    hasError: Error | null;
    isLoading: boolean;
}

interface SetupReturn {
    state: State;
    submitAFeedback(): Promise<void>;
    submitButtonIsDisabled: ComputedRef<boolean>;
}

export default defineComponent({

    components: { Icon },

    setup(): SetupReturn {

        const store = useStore()
        const state = reactive<State>({
            feedback: '',
            hasError: null,
            isLoading: false,
        })

        const { setErrorState, setSuccessState } = useNavigation()

        const submitButtonIsDisabled = computed<boolean>(() => {
            return !state.feedback.length
        })

        function handleError(error: Error) {
            state.hasError = error
            state.isLoading = false
            setErrorState()
        }

        async function submitAFeedback(): Promise<void> {

            setMessage(state.feedback)

            state.isLoading = true

            try {

                const response = await services.feedbacks.create({
                    apiKey: store.apiKey,
                    device: window.navigator.userAgent,
                    fingerprint: store.fingerprint,
                    page: store.currentPage,
                    text: store.message,
                    type: store.feedbackType,
                })

                if (!response.errors) {
                    setSuccessState()
                } else {
                    setErrorState()
                }

                state.isLoading = false

            } catch (error) {
                handleError(error)
            }
        }

        return {
            state,
            submitAFeedback,
            submitButtonIsDisabled,
        }
    },

})
</script>


<template>

    <div class="flex flex-col items-center justify-center w-full my-5">

        <textarea id="" v-model="state.feedback"
            class="w-full rounded-lg border-2 border-gray-300 border-solid h-24 p-2 resize-none focus:outline-none"></textarea>

        <button :disabled="submitButtonIsDisabled"
            :class="{ 'opacity-50': state.isLoading, 'opacity-50 bg-gray-100 text-gray-500': submitButtonIsDisabled, 'bg-brand-main text-white': !submitButtonIsDisabled }"
            @click="submitAFeedback"
            class="rounded-lg font-black mt-3 flex flex-col justify-center items-center py-2 w-full cursor-pointer focus:outline-none transition-all duration-200">

            <icon v-if="state.isLoading" name="loading" class="animate-spin" color="white" />

            <template v-else> Enviar feedback </template>

        </button>

    </div>

</template>

