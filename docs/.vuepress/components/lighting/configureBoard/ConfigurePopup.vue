<template>
    <v-dialog
    v-model="dialog"
    width="auto"
    >
        <template v-slot:activator="{ props }">
            <v-btn
            v-bind="props"
            variant="tonal"
            @click="setToCurrentPreference"
            >
            Click Me
            </v-btn>
        </template>

        <v-card>
            <VCardTitle>Lighting Overlay Preference</VCardTitle>
            <v-card-text>
                Please select what board you are using from the dropdown:
                <VForm>
                    <VSelect
                        :items="availableChoices"
                        hide-selected
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

<script>
const RESET_TEXT = "Reset to Default";
import {getDefaultOption, getAvailableOptions, getPreference, setPreference, deletePreference} from "../../../util/lighting/lightingBoardCookieWrapper"
export default {
    data () {
        return {
            dialog: false,
            selectedVal: undefined
        }
    },
    computed: {
        availableChoices() {
            const options = getAvailableOptions();
            options.push(RESET_TEXT);
            return options;
        },
        getPreference() {
            return getPreference() ?? getDefaultOption();
        }
    },
    mounted() {
        this.setToCurrentPreference();
    },
    methods: {
        setToCurrentPreference() {
            this.selectedVal = this.getPreference;
        },
        save() {
            this.dialog = false;
            if (this.selectedVal === RESET_TEXT) {
                deletePreference();
            } else {
                setPreference(this.selectedVal)
            }
            location.reload();
        }
    }
}
</script>