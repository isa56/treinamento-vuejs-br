<script>
import { reactive } from 'vue'
import { useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import useModal from '@/hooks/useModal'
import { validateEmptyAndLength4, validateEmptyAndEmail } from '@/utils/validators'
import services from '@/services'
import Icon from '@/components/Icon'


export default {
    components: {Icon},
    setup() {

        const modal = useModal()
        const router = useRouter()
        const toast = useToast()

        const { value: nameValue, errorMessage: nameErrorMessage } = useField('name', validateEmptyAndLength4)
        const { value: emailValue, errorMessage: emailErrorMessage } = useField('email', validateEmptyAndEmail)
        const { value: passwordValue, errorMessage: passwordErrorMessage } = useField('password', validateEmptyAndLength4)

        const state = reactive({
            hasErrors: false,
            isLoading: false,
            name: {
                value: nameValue,
                errorMessage: nameErrorMessage
            },
            email: {
                value: emailValue,
                errorMessage: emailErrorMessage
            },
            password: {
                value: passwordValue,
                errorMessage: passwordErrorMessage
            }
        })

        async function login({ email, password }) {
            const { data, errors } = await services.auth.login({ email, password })

            if (!errors) {
                window.localStorage.setItem('token', data.token)
                router.push({ name: 'Feedbacks' })
                modal.close()
            }

            state.isLoading = false

        }


        async function handleSubmit() {

            try {

                toast.clear()
                state.isLoading = true
                const { errors } = await services.auth.register({ name: state.name.value, email: state.email.value, password: state.password.value })

                if (!errors) {
                    await login({ email: state.email.value, password: state.password.value })
                    return
                }

                if (errors.status === 404) {
                    toast.error('E-mail não encontrado ' + + errors.status)
                }

                if (errors.status === 401) {
                    toast.error('E-mail/senha inválidos ' + errors.status)
                }

                if (errors.status === 400) {
                    toast.error('Ocorreu um erro ao criar conta: ' + errors.status)
                }

                state.isLoading = false

            } catch (error) {
                state.isLoading = false
                state.hasErrors = !!error
                toast.error('Ocorreu um erro ao fazer ao criar conta: ' + errors.status)
            }
        }


        return {
            state,
            closeModal: modal.close,
            handleSubmit
        }
    },

}
</script>


<template>
    <div class="flex justify-between">
        <h1 class="text-4xl font-black text-gray-800">Crie a sua conta</h1>

        <button class="text-4xl text-gray-600 focus:outline-none" @click="closeModal">&times;</button>
    </div>

    <div class="mt-16">
        <form @submit.prevent="handleSubmit">
            <!-- Nome -->
            <label class="block">
                <span class="text-lg font-medium text-gray-800">Nome</span>
                <input
                    type="text"
                    v-model="state.name.value"
                    class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
                    :class="{ 'border-brand-danger': !!state.name.errorMessage }"
                    placeholder="Evelyn Gonçalves"
                />
                <span
                    v-if="!!state.name.errorMessage"
                    class="block font-medium text-brand-danger"
                >{{ state.name.errorMessage }}</span>
            </label>

            <!-- E-mail -->
            <label class="block mt-5">
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

            <!-- Senha -->
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
                @click="handleSubmit"
            >
                <icon v-if="state.isLoading" name="loading" class="animate-spin" />
                <span v-else>Criar conta</span>
            </button>
        </form>
    </div>
</template>


<style scoped>
</style>
