<template>
    <VApp>
        <ParentLayout>
            <template #page-content-top v-if="isLightingRoute">
                <BoardConfigure/>
            </template>
        </ParentLayout>
    </VApp>
</template>

<script setup lang="ts">
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue"
import BoardConfigure from "../components/lighting/BoardConfigure.vue"
import {usePageData} from "@vuepress/client"
</script>

<script lang="ts">
export default {
    computed: {
        isLightingRoute() {
            const pageMeta = usePageData().value;
            
            //Janky but good way to do it for now
            return pageMeta.path.startsWith("/lighting");
        }
    }
}
</script>