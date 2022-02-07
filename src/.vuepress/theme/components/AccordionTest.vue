<template>
  <div>
    <div class="text-center d-flex pb-4">
      <!-- <v-btn @click="all">
        all
      </v-btn>
      <div>{{ panel }}</div>
      <v-btn @click="none">
        none
      </v-btn> -->
    </div>

    <v-expansion-panels focusable popout
      v-model="panel"
    >
      <v-expansion-panel
        v-for="(item,i) in items"
        :key="i"
      >
        <v-expansion-panel-header>Header {{ item }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <br>Unimportant text<br><br>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        panel: [],
        items: 5,
      }
    },
    methods: {
      // Create an array the length of our items
      // with all values as true
      all () {
        this.panel = [...Array(this.items).keys()].map((k, i) => i)
      },
      // Reset the panel
      none () {
        this.panel = []
      },
    },
  }
</script>