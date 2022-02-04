<template>
    <main class="page">
        <slot name="top" />

        <Content :key="$page.path" class="theme-default-content"/>
        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />

        <slot name="bottom" />

    </main>
</template>

<script lang="ts">
import PageEdit from './PageEdit.vue'
import PageNav from './PageNav.vue'

export default {
    components: { PageEdit, PageNav },
    props: ['sidebarItems'],

    beforeMount() {
        document.querySelectorAll(".custom-block.command").forEach(item => {
            const target = item.childElementCount == 2 ? item.children[1] : item.children[0]
            target.classList.add("lighting_command_container")

            if (target.textContent) {
                //1 split elements by key name or key group
                const keyNames = target.textContent.trim().split(",");
                target.textContent = "";

                //For each key (group)
                keyNames.forEach((name, index) => {
                    //Possibly split the key group, represent these are simultaneous keypress
                    
                    //Cant use plus because that is a key on the keyboard
                    if (name.search("&") >=0) {
                        const simulElS = document.createElement("span")
                        simulElS.classList.add("lighting_key_simultaneous_group")

                        const splitMore = name.split("&");
                        splitMore.forEach((item, index2) => {
                            simulElS.appendChild(createKeyEl(item, true));
                            if (index2 < splitMore.length - 1) simulElS.appendChild(createSepEl(true));
                        })

                        target.appendChild(simulElS)
                    } else {
                        target.appendChild(createKeyEl(name));
                        if (index < keyNames.length - 1) target.appendChild(createSepEl());
                    }
                })
            }
        })

        function createKeyEl(elName: string, simultaneous = false): Node {
            const newEl = document.createElement("span");
            newEl.textContent = elName.trim();
            newEl.classList.add("lighting_console_key");
            if (simultaneous) newEl.classList.add("lighting_simultaneous");

            if (elName.startsWith("{") && elName.endsWith("}")) {
                newEl.classList.add("lighting_softkey");
            } else {
                newEl.classList.add("lighting_hardkey");
            }

            return newEl;
        }

        function createSepEl(simultaneous = false): Node {
            const newEl = document.createElement("span");
            newEl.classList.add("lighting_command_separator");
            if (simultaneous) {
                newEl.classList.add("simultaneous");
                newEl.textContent = "&"
            } else {
                newEl.textContent = ">"
            }

            return newEl;
        }
    }
}

</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

</style>