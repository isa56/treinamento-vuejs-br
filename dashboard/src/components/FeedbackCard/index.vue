<template>
    <div class="flex flex-col px-8 py-6 rounded cursor-pointer bg-brand-gray" @click="handleToggle">
        <div class="flex items-center justify-between w-full mb-8">
            <badge :type="feedback.type" />

            <span
                class="font-regular text-brand-darkgray"
            >{{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}</span>
        </div>

        <div class="text-lg font-medium text-gray-">{{ feedback.text }}</div>

        <div
            :class="{ animate__fadeOutUp: state.isClosing }"
            class="flex mt-8 animate__animated animate__fadeInUp animate__faster"
            v-if="state.isOpen"
        >
            <div class="flex flex-col w-1/2">
                <div class="flex flex-col">
                    <span class="font-bold text-gray-400 uppercase select-none">Página</span>
                    <span
                        class="font-medium text-gray-700 uppercase select-none"
                    >{{ feedback.page }}</span>

                    <span class="font-bold text-gray-400 uppercase select-none">Dispositivo</span>
                    <span
                        class="font-medium text-gray-700 uppercase select-none"
                    >{{ feedback.device }}</span>
                </div>
            </div>

            <div class="flex flex-col w-1/2">
                <div class="flex flex-col">
                    <span class="font-bold text-gray-400 uppercase select-none">Usuário</span>
                    <span
                        class="font-medium text-gray-700 uppercase select-none"
                    >{{ feedback.fingerprint }}</span>
                </div>
            </div>
        </div>

        <div class="flex justify-end mt-8" v-if="!state.isOpen">
            <icon name="chevron-down" size="24" :color="brandColors.graydark" />
        </div>
    </div>
</template>


<script>
import { reactive } from 'vue'
import palette from '../../../palette'
import { getDiffTimeBetweenCurrentDate } from '@/utils/date'
import { wait } from '@/utils/timeout'
import Badge from './Badge'
import Icon from '@/components/Icon'


export default {
    components: { Badge, Icon },
    props: {
        feedback: { type: Object, required: true },
        isOpened: { type: Boolean, default: false }
    },
    setup() {

        const state = reactive({
            isClosing: !isOpened,
            isOpen: props.isOpened
        })

        async function handleToggle() {
            state.isClosing = true

            await wait(250)

            state.isClosing = false

            state.isOpen = !state.isOpen
        }

        return {
            brandColors: palette.brand,
            getDiffTimeBetweenCurrentDate,
            handleToggle,
            state,
        }
    },

}
</script>
