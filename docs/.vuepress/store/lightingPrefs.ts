import { defineStore } from "pinia";
import { deletePreference, getPreference, setPreference } from "../util/lighting/lightingBoardCookieWrapper"; //Use this one cause it will default if no selection

import AvailableLightingBoards from "../json/available_lighting_svgs.json";
const BASE_SVG_PATH = "/images/svg/lighting_boards";

if (Object.keys(AvailableLightingBoards).length == 0) alert("No lighting board paths defined!");
const DEFAULT_BOARD_OPTION = Object.keys(AvailableLightingBoards)[0];

export const useLightingPrefsStore = defineStore("lightingPrefs", {
    state: () => ({
        /**
         * Should always been defined with at least the default option
         */
        boardPreference: getPreference()
    }),

    getters: {
        /**
         * Gets the lighting board svg path from the preference in the store
         * Or returns the default path if no preference is set
         */
        boardSvgPath(state) {
            if (state.boardPreference == undefined) return `${BASE_SVG_PATH}/${AvailableLightingBoards[DEFAULT_BOARD_OPTION]}`

            return `${BASE_SVG_PATH}/${AvailableLightingBoards[state.boardPreference]}`
        },
        /**
         * Returns the current board preference or if that is undefined returns the default board name
         */
        boardPreferenceOrDefault(state) {
            if (state.boardPreference == undefined) return DEFAULT_BOARD_OPTION;

            return state.boardPreference;
        },

        boardPreferenceExists(state) {
            return state.boardPreference != undefined;
        }
    },

    actions: {
        clearBoardPreference() {
            deletePreference();
            this.boardPreference = undefined;
        },
        setBoardPreference(boardName: keyof (typeof AvailableLightingBoards)) {
            this.boardPreference = boardName;
            setPreference(boardName)
        }
    }
})

export function availableSvgs() {
    return AvailableLightingBoards;
}