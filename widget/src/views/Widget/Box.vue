<script lang="ts">

import { computed, ComputedRef, defineComponent, reactive, SetupContext } from 'vue'

import colors from 'tailwindcss/colors'

import { brand } from '../../../palette.js'
import useStore from '@/hooks/store'
import useNavigation, { Navigation } from '@/hooks/navigation'
import Icon from '@/components/Icon/index.vue'
import Wizard from '@/components/Wizard/index.vue'

interface SetupReturn {
    back: Navigation['back'];
    brandColors: Record<string, string>;
    canGoBack: ComputedRef<boolean>;
    canShowAdditionalControlAndInfo: ComputedRef<boolean>;
    colors: Record<string, string>;
    emit: SetupContext['emit'];
    label: ComputedRef<string>;
}

export default defineComponent({

    components: { Icon, Wizard },

    emits: ['close-box'],

    setup(_, { emit }: SetupContext): SetupReturn {

        const store = useStore()

        const { back } = useNavigation()

        const label = computed<string>(() => {
            if (store.feedbackType === 'ISSUE') {
                return 'Reporte um problema'
            }

            if (store.feedbackType === 'IDEA') {
                return 'Nos fale a sua ideia'
            }

            if (store.feedbackType === 'OTHER') {
                return 'Abra a sua mente'
            }

            return 'O que você tem em mente?'

        })

        const canGoBack = computed<boolean>(() => {
            return store.currentComponent === 'SelectFeedbackType'
        })

        const canShowAdditionalControlAndInfo = computed<boolean>(() => {
            return store.currentComponent !== 'Success' && store.currentComponent !== 'Error'
        })
        return {
            back,
            brandColors: brand,
            canGoBack,
            canShowAdditionalControlAndInfo,
            colors,
            emit,
            label,
        }
    },

})
</script>


<template>

    <div class="box animate__animated animate__fadeInUp animate__faste">

        <div :class="{
            'justify-between': canShowAdditionalControlAndInfo,
            'justify-end': !canShowAdditionalControlAndInfo,
        }" class="flex relative w-full">

            <button v-if="canShowAdditionalControlAndInfo" @click="back" :disabled="canGoBack"
                :class="{ 'invisible': canGoBack }" class="text-xl text-gray-800 focus:outline-none">
                <icon name="arrow-right" :color="colors.gray['800']" />
            </button>

            <p v-if="canShowAdditionalControlAndInfo" class="text-xl font-black text-center text-brand-main">
                {{ label }}
            </p>

            <button @click="() => emit('close-box')" class="text-xl text-gray-800 focus:outline-none">
                <icon name="close" size="14" :color="colors.gray['800']" />
            </button>

        </div>


        <wizard />


        <div class="text-gray-800 text-sm flex" v-if="canShowAdditionalControlAndInfo">
            <icon name="chat" class="mr-1" :color="brandColors.graydark" />
            Widget by
            <span class="ml-1 font-bold">Feedbacker</span>
        </div>

    </div>

</template>


<style lang="postcss" scoped>
.box {
    @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl py-5 px-5 flex flex-col items-center shadow-xl select-none;
    width: 400px;
}
</style>
