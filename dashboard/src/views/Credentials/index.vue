<script>
import { reactive, watch } from 'vue'

import { useToast } from 'vue-toastification'
import HeaderLogged from '@/components/HeaderLogged'
import ContentLoader from '@/components/ContentLoader'
import useStore from '@/hooks/useStore'
import Icon from '@/components/Icon/index.vue'
import palette from '../../../palette'
import services from '@/services'
import { setApiKey } from '@/store/user'

export default {
    components: { ContentLoader, HeaderLogged, Icon },

    setup() {

        const store = useStore()
        const state = reactive({
            isLoading: false,
            hasError: false
        })
        const toast = useToast()

        watch(() => store.User.currentUser, () => {
            if(!store.Global.isLoading && !store.User.currentUser.apiKey) {
                handleError(true)
            }
        })

        function handleError(error) {
            state.isLoading = false
            state.hasError = !!error
            console.log(error)
        }

        async function handleGenerateApiKey() {
            try { 
                state.isLoading = true

                const {data} = await services.users.generateApiKey()

                setApiKey(data.apiKey)


                state.isLoading = false
            } catch(error) {
                handleError(error)
            }
        }

        async function handleCopy() {
            toast.clear()
            try {
                await navigator.clipboard.writeText(store.User.currentUser,apiKey)
                toast.success("Copiado com sucesso!")
            } catch(error) {
                handleError(error)
            }
        }

        return {
            state,
            store,
            brandColors: palette.brand,
            handleGenerateApiKey,
            handleCopy
        }

    }
}
</script>


<template>
    <div class="flex justify-center w-full h-28 bg-brando-main">
        <header-logged />
    </div>

    <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
        <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>

        <p
            class="text-lg text-center text-gray-800 font-regular"
        >Guia de instalação e geração de suas credenciais</p>
    </div>

    <div class="flex justify-center w-full h-full">
        <div class="flex flex-col w-4/5 max-w-6xl py-10">
            <h1 class="text-3xl font-black text-brand-darkgray">Instalação e Configuração</h1>

            <p class="mt-10 text-lg text-gray-800 font-regular">Esta é a sua chave de API</p>

            <content-loader
                v-if="store.Global.isLoading || state.isLoading"
                class="rounded"
                height="50px"
                width="600px"
            />
                <span v-if="state.hasError">Erro ao carrgear a API Key</span>
            <div
                v-else
                class="flex py-3 pl-5 py-20 mt-2 w-full justify-between rounded items-center bg-brand-gray lg:w-2/3"
            >
                <span v-if="!state.hasError">{{ store.User.currentUser.apiKey }}</span>

                <div v-if="!state.hasError" class="flex ml-20 mr-5">
                    <icon
                        @click="handleCopy"
                        name="copy"
                        :color="brandColors.graydark"
                        size="24"
                        class="cursor-pointer"
                    />
                    <icon
                        @click="handleGenerateApiKey"
                        name="loading"
                        :color="brandColors.graydark"
                        size="24"
                        class="cursor-pointer ml-3"
                    />
                </div>
            </div>

            <p
                class="mt-5 text-lg text-gray-800 font-regular"
            >Coloque o script abaixo em seu site para começar a receber feedbacks!</p>

            <content-loader
                v-if="store.Global.isLoading || state.isLoading"
                class="rounded"
                height="50px"
                width="600px"
            />

            <div
                v-else
                class="flex py-3 pl-5 pr-20 mt-2 bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
            >

                <span v-if="state.hasError">Erro ao carrgear o script</span>
                <pre v-else class="break-normal w-full">&lt;script src="https://isa56-feedbacker-widget.netlify.app?api_key={{ store.User.currentUser.apiKey }}"&gt;&lt;/script&gt;</pre>
                <div class="flex ml-20 mr-5">
                    <icon
                        @click="handleCopy"
                        name="copy"
                        :color="brandColors.graydark"
                        size="24"
                        class="cursor-pointer"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
