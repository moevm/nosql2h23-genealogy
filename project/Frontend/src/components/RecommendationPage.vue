<template>
    <MainNavigation/>
    <v-card>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
      ></v-text-field>
    </template>

    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<style scoped lang="scss">
@import "src/styles/styles";
</style>

<script>
import MainNavigation from "@/components/UI/MainNavigation.vue";

export default {
  name: "RecommendationPage",
  components: {MainNavigation},
  
  data() {
    return {
      search: '',
      headers: [
        { title: 'ФИО', align: 'center', key: 'full_name' },
        {
          title: 'Количество узлов в дереве',
          align: 'center',
          key: 'amount_in_tree',
        },
        {
          title: 'Количество совпадающих узлов',
          align: 'center',
          key: 'amount_of_matches',
        },
        {
          title: 'Совпадения на поколениях',
          align: 'center',
          key: 'amount_in_generation',
        },
      ],
      desserts: [
        {
          full_name: 'Алексей Алексеевич Алексеев',
          amount_in_tree: 20,
          amount_of_matches: 10,
          amount_in_generation: 5,
        },
        {
          full_name: 'Роман Романович Романов',
          amount_in_tree: 40,
          amount_of_matches: 7,
          amount_in_generation: 4,
        },
        {
          full_name: 'Иван Иванович Иванов',
          amount_in_tree: 20,
          amount_of_matches: 7,
          amount_in_generation: 3,
        },
        {
          full_name: 'Евгений Евгеньевич Евгеньев',
          amount_in_tree: 19,
          amount_of_matches: 5,
          amount_in_generation: 2,
        },
      ],
    }
  },
}
</script>