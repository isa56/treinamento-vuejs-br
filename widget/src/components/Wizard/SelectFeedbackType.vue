<script lang="ts">
import { defineComponent, SetupContext } from "vue"

interface SetupReturn {
    handleSelect(feedbackType: string): void;

}

export default defineComponent({
    components: {},
    setup(_, { emit }: SetupContext): SetupReturn {

        function handleSelect(feedbackType: string): void {
            emit('select-feedback-type', feedbackType)
            emit('next')
        }

        return {
            handleSelect,
        }
    },

})
</script>


<template>

    <div class="class justify-between w-full my-5">

        <button
            class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28 cursor-pointer focus:outline-none"
            @click="() => handleSelect('ISSUE')">

            <div class="w-12">
                <img src="@/assets/images/issue.png" alt="Problema" class="w-full" />
            </div>
            <p class="font-medium mt-1 text-gray-800">Problema</p>

        </button>

        <button
            class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28 cursor-pointer focus:outline-none"
            @click="() => handleSelect('IDEA')">

            <div class="w-12">
                <img src="@/assets/images/lamp.png" alt="Ideia" class="w-full" />
            </div>
            <p class="font-medium mt-1 text-gray-800">Ideia</p>

        </button>

        <button
            class="rounded-xl hover:bg-gray-100 bg-brand-gray flex flex-col justify-center items-center p-5 w-28 cursor-pointer focus:outline-none"
            @click="() => handleSelect('OTHER')">

            <div class="w-12">
                <img src="@/assets/images/fire.png" alt="Outro" class="w-full" />
            </div>
            <p class="font-medium mt-1 text-gray-800">Outros</p>

        </button>

    </div>

</template>


<style scoped>
</style>
