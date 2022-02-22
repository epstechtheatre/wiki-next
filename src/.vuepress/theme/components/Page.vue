<template>
    <main class="page">
        <slot name="top" />

        <Content :key="$page.path" class="theme-default-content"/>
        <PageTag/>
        <Authors/>
        <PageEdit />

        <PageNav v-bind="{ sidebarItems }" />

        <slot name="bottom" />
        <Copyright />

    </main>
</template>

<script>
import PageEdit from './PageEdit.vue';
import PageNav from './PageNav.vue';
import Authors from "./Authors.vue";
import Copyright from "./Copyright.vue";
import PageTag from "./PageTag.vue"

export default {
    components: { PageEdit, PageNav, Authors, Copyright, PageTag },
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
    }
}

</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

</style>