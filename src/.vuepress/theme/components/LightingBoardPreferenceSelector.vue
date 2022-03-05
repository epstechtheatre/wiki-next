<template>
    <Transition
        name="fade"
        mode="out-in"
    >
        <v-alert
            border="left"
            :type="hasBoardPref ? 'success' : 'warning'"
            outlined
            elevation="2"
            :prominent='hasBoardPref == false'
        >
            <v-dialog
                v-model="dialog"
                max-width="600"
            >

            <template v-slot:activator="{on, attrs}">
                <span v-if="hasBoardPref == false">You haven't selected what lighting board you use.
                <br>To see examples using your board, click </span>
                <span v-else>Your lighting board is currently set as <code>{{savedPreference}}</code>
                <br>To change your selection, click </span>
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                >
                Here
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-h5">
                Lighting Board Preference
                </v-card-title>

                <v-card-text>
                    Please select your lighting board from the dropdown below
                    <v-select
                        label="Please select..."
                        solo
                        :items="items"
                        v-model="model.currentPreference"
                        :menu-props="{transition: 'slide-y-transition', 'offset-y': true}"
                    ></v-select>
                    <small>Your preference will be stored as a cookie in your browser for 30 days.
                        <br>To delete this cookie, select "{{DELETE_OPTION_TEXT}}" from the dropdown</small>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="onPreferenceSave"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-alert>
    </Transition>
</template>

<script lang="ts">
const DELETE_OPTION_TEXT = "Delete My Selection"
import * as lightingBoardCookieWrapper from "../../util/lighting/lightingBoardCookieWrapper"

export default {
    data(){
        return {
            dialog: false,
            items: [...lightingBoardCookieWrapper.getAvailableOptions(), DELETE_OPTION_TEXT],
            model: {
                currentPreference: lightingBoardCookieWrapper.checkIfPreference() ? lightingBoardCookieWrapper.getPreference() : lightingBoardCookieWrapper.getDefaultOption()
            },
            hasBoardPref: lightingBoardCookieWrapper.checkIfPreference(),
            DELETE_OPTION_TEXT: DELETE_OPTION_TEXT,
            savedPreference: lightingBoardCookieWrapper.checkIfPreference() ? lightingBoardCookieWrapper.getPreference() : lightingBoardCookieWrapper.getDefaultOption()
        }
    },
    methods: {
        onPreferenceSave(){
            //FIXME Typescript is dumb and doesn't recognize properties

            //@ts-ignore
            this.dialog = false
            //@ts-ignore
            if (this.model?.currentPreference !== undefined) {
                //@ts-ignore
                if (lightingBoardCookieWrapper.getAvailableOptions().includes(this.model.currentPreference)) {
                    //@ts-ignore
                    lightingBoardCookieWrapper.setPreference(this.model.currentPreference);
                    //@ts-ignore
                    this.savedPreference = this.model.currentPreference;
                    //@ts-ignore
                    this.hasBoardPref = true;
                } else {
                    //@ts-ignore
                    if (this.model.currentPreference == DELETE_OPTION_TEXT) {
                        console.log("Should Delete")
                        //@ts-ignore
                        lightingBoardCookieWrapper.deletePreference();
                        //@ts-ignore
                        this.savedPreference = undefined;
                        //@ts-ignore
                        this.hasBoardPref = false;
                    }
                }

                //@ts-ignore
                this.$root.$emit('lighting-board-preference-update');
            }
        }
    }
}
</script>