<script>

import ContentLoader from '@/components/ContentLoader'

export default {
    components: { ContentLoader },
}
</script>


<template>
    <content-loader class="flex flex-col items-center rounded" height="300px" width="100%">
        <content-loader class="mt-3 rounded" height="90px" width="90%" animation-duration="2s" />
        <content-loader class="mt-3 rounded" height="90px" width="90%" animation-duration="2.3s" />
        <content-loader class="mt-3 rounded" height="90px" width="90%" animation-duration="2.7s" />
    </content-loader>
</template>
