<template>
    <VAlert
        :border-color="boardPreferenceExists ? 'success': 'warning'"
        closable
        class="lightingBoardPreferenceAlert"
        border="start"
    >
        <VFadeTransition mode="out-in">
            <div v-if="boardPreferenceExists">
                <p>Your lighting board is current set to <VFadeTransition mode="out-in"><span :key="boardPreference"><i>{{ boardPreference }}</i>.</span></VFadeTransition></p>
            </div>
            <div v-else>
                <p>You haven't set what lighting board you use!</p>
                <p>By default, examples will assume you use an ETC Ion XE console.</p>
            </div>
        </VFadeTransition>
        <p><ConfigurePopup/> if you want to change you preferences.</p>
    </VAlert>
</template>

<script setup lang="ts">
//Import the lighting pref store
import { useLightingPrefsStore } from "../../store/lightingPrefs";
import { storeToRefs } from "pinia";

const store = useLightingPrefsStore();

const { boardPreference, boardPreferenceExists } = storeToRefs(store)
</script>

<script lang="ts">
import ConfigurePopup from "./configureBoard/ConfigurePopup.vue";

export default {
    components: {ConfigurePopup}
}
</script>

<style>
.lightingBoardPreferenceAlert > div.v-alert__border {
    transition: color 0.3s linear !important;
}
</style>