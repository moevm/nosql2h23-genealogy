<template>
  <v-toolbar
    class="gray-background-color"
    elevation="5"
  >
    <v-btn
      value="profile"
      variant="text"
      class="blue-color"
      @click="$router.push('/profile')"
    >
      Профиль
    </v-btn>

    <v-btn
      value="myTree"
      variant="text"
      class="blue-color"
    >
      Моё дерево
    </v-btn>

    <v-btn
      value="otherTrees"
      variant="text"
      class="blue-color"
      @click="$router.push('/recommendation')"
    >
      Другие родословные
    </v-btn>
    <v-btn
      value="Statistic"
      variant="text"
      class="blue-color"
      @click="$router.push('/statistics')"
    >
      Статистика
    </v-btn>
  </v-toolbar>
</template>

<style scoped lang="scss">
@import "src/styles/styles";
</style>

<script>
export default {
  name: "mainNavigation",
  setup() {

  }
}
</script>
