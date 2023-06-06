<template>
    <v-dialog
    v-model="dialog"
    width="auto"
    >
        <template v-slot:activator="{ props }">
            <v-btn
            v-bind="props"
            variant="tonal"
            @click="selectedVal = boardPreferenceOrDefault.valueOf()"
            >
            Click Here
            </v-btn>
        </template>

        <v-card>
            <VCardTitle>Lighting Overlay Preference</VCardTitle>
            <v-card-text>
                Please select what board you are using from the dropdown:
                <VForm>
                    <VSelect
                        :items="availableOptions"
                        v-model="selectedVal"
                    />
                </VForm>
            </v-card-text>
            <v-card-actions >
                <VSpacer/>
                <VBtn @click="dialog = false">Close</vBtn>
                <VBtn color="red" @click="save()">Save Changes</VBtn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { useLightingPrefsStore, availableSvgs } from "../../../store/lightingPrefs";
import { storeToRefs } from "pinia";

const RESET_TEXT = "Reset to Default";
export default {
    setup() {
        const lightingStore = useLightingPrefsStore();
        const { boardPreferenceOrDefault } = storeToRefs(lightingStore);

        return {
            lightingStore,
            boardPreferenceOrDefault
        }
    },
    data () {
        return {
            dialog: false,
            selectedVal: undefined as string|undefined
        }
    },
    computed: {
        availableOptions() {
            const options = Object.keys(availableSvgs() ?? [])
            options.push(RESET_TEXT);
            return options;
        }
    },
    methods: {
        save() {
            this.dialog = false;
            if (this.selectedVal === RESET_TEXT) {
                this.lightingStore.clearBoardPreference();
            } else {
                this.lightingStore.setBoardPreference(this.selectedVal as any)
            }
        }
    }
}
</script>