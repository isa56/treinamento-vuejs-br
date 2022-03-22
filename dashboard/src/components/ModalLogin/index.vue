<script>
import { reactive } from 'vue'
import useModal from '@/hooks/useModal'

export default {
    components: {},
    setup() {

        const modal = useModal()

        const state = reactive({
            hasErrors: false,
            isLoading: false,
            email: {
                value: '',
                errorMessage: false
            },
            password: {
                value: '',
                errorMessage: false
            }
        })

        function handleSubmit() {

        }


        return {
            state,
            closeModal: modal.close
        }
    },

}
</script>


<template>
    <div class="flex justify-between">
        <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>

        <button class="text-4xl text-gray-600 focus:outline-none" @click="close">&times;</button>
    </div>

    <div class="mt-16">
        <form @submit.prevent="handleSubmit">
            <label class="block">
                <span class="text-lg font-medium text-gray-800">E-mail</span>
                <input
                    type="email"
                    v-model="state.email.value"
                    class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
                    :class="{ 'border-brand-danger': !!state.email.errorMessage }"
                    placeholder="email@provedor.com"
                />
                <span
                    v-if="!!state.email.errorMessage"
                    class="block font-medium text-brand-danger"
                >{{ state.email.errorMessage }}</span>
            </label>

            <label class="block mt-5">
                <span class="text-lg font-medium text-gray-800">Senha</span>
                <input
                    type="password"
                    v-model="state.password.value"
                    class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
                    :class="{ 'border-brand-danger': !!state.password.errorMessage }"
                    placeholder="*********"
                />
                <span
                    v-if="!!state.password.errorMessage"
                    class="block font-medium text-brand-danger"
                >{{ state.password.errorMessage }}</span>
            </label>

            <button
                :disabled="state.isLoading"
                type="submit"
                class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
                :class="{ 'opacity-50': state.isLoading }"
            >Entrar</button>
        </form>
    </div>
</template>


<style scoped>
</style>
