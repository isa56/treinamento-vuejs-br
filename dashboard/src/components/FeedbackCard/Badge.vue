<script>

export default {
    props: { type: { type: String, required: true } },
    setup(props) {

        const label = computed(() => {
            if (props.type === 'ISSUE') {
                return 'problema'
            } else if (props.type === 'IDEA') {
                return 'ideia'
            } else {
                return 'outros'
            }
        })

        const classColor = computed(() => {
            if (props.type === 'ISSUE') {
                return 'brand-danger'
            } else if (props.type === 'IDEA') {
                return 'brand-warning'
            } else {
                return 'brand-graydark'
            }
        })

        return {
            classColor,
            label,
        }
    },

}
</script>


<template>
    <span :class="`bg-${classColor}`" class="p-2 text-xs font-black text-white uppercase rounded-full">{{ label }}</span>
</template>

