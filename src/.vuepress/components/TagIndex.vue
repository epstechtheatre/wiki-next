<template lang="html">
  <div class="tag-page-wrapper">
    <div class="tag-content">
      <span v-for="tag in Object.keys(tags)">
        <h2 :id="tag">
          <router-link
            :to="{ path: `/tags.html#${tag}`}"
            class="header-anchor"
            aria-hidden="true">#</router-link>
          {{tag}}
        </h2>
        <ul>
          <li v-for="page in tags[tag]">
            <router-link
              :to="{ path: page.path}">{{page.title}}</router-link>
          </li>
        </ul>
      </span>
    </div> 

    <div class="tag-sidebar">
      Test
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    tags() {
      let tags = {}
      for (let page of this.$site.pages) {
        for (let index in page.frontmatter.tags) {
          const tag = page.frontmatter.tags[index]
          if (tag in tags) {
            tags[tag].push(page)
          } else {
            tags[tag] = [page]
          }
        }
      }
      return tags
    }
  }
}
</script>

<style scoped lang="stylus">
.tag-page-wrapper {
  display: flex
  flex-direction: row
}

.tag-sidebar {
  display: flex
  float: right
  background-color: white
  width: 500px
}

.tag-content {
  display: flex
  flex-grow: 1
}
</style>