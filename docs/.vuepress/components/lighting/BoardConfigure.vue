<template>
    <VAlert
        :border-color="hasPreference ? 'success': 'warning'"
        closable
        border="start"
    >
        <div v-if="hasPreference">
            <p>Your lighting board is current set to <i>{{ preferenceName }}</i>.</p>
            <p><ConfigurePopup/> if you want to change this.</p>
        </div>
        <div v-else>
            <p>You haven't set what lighting board you use! To get more tailored examples as you read through the wiki, <ConfigurePopup/></p>
            <p>By default, examples will assume you use an ETC Ion XE console.</p>
        </div>
    </VAlert>
</template>

<script lang="ts">
import {checkIfPreference, getPreference} from "../../util/lighting/lightingBoardCookieWrapper";
import ConfigurePopup from "./configureBoard/ConfigurePopup.vue";

export default {
    components: {ConfigurePopup},
    computed: {
        hasPreference() {
            return checkIfPreference();
        },
        preferenceName() {
            return getPreference();
        }
    },
    mounted() {

    }
}
</script>