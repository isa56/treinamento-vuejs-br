<script>
import { computed } from "vue"
import { useRouter } from "vue-router"

import useStore from "@/hooks/useStore"
import { cleanCurrentUser } from "@/store/user"

export default {
    setup() {
        const store = useStore('User')
        const router = useRouter()

        console.log("Current user", store.currentUser)

        const logoutLabel = computed(() => {
            if (!store.currentUser.name) {
                return '...'
            }
            return `${store.currentUser.name}, sair`
        })

        function handleLogout() {
            window.localStorage.removeItem('token')
            cleanCurrentUser()
            router.push({ name: 'home' })
        }

        return {
            router,
            logoutLabel,
            handleLogout
        }
    },

}
</script>

<template>
    <div class="flex items-center justify-between w-full max-w-6xl py-10">
        <div class="w-28 lg:w-36">
            <img src="@/assets/images/logo_white.png" alt="Logo" class="w-full" />
        </div>
        <div class="flex">
            <ul class="flex list-none">
                <li
                    id="credentials-access-button"
                    class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
                    @click="() => router.push({ name: 'credentials' })"
                >Credenciais</li>
                <li
                    class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
                    @click="() => router.push({ name: 'feedbacks' })"
                >Feedbacks</li>
                <li
                    class="px-5 py-2 font-bold bg-white rounded-full cursor-pointer text-brand-main focus:outline-none"
                    @click="handleLogout"
                    id="logout-button"
                >{{ logoutLabel }}</li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
</style>
