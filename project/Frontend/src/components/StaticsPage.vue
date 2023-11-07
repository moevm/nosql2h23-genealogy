<template>
    <MainNavigation/>
    <p class="blue-color"> Статистика </p>
    <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="hardcoded_data"
    item-value="name"
    class="elevation-1"
    ></v-data-table>
</template>

<style scoped lang="scss">
@import "src/styles/styles";
</style>

<script>
import MainNavigation from "@/components/UI/MainNavigation.vue";

export default {
  name: "profilePage",
  components: {MainNavigation},
  data(){
    return {
        itemsPerPage: 5,
        headers: [
          { title: 'Поколение', align: 'center', key: 'generation' },
          { title: 'Количество людей в поколении', align: 'center', key: 'amount_in_generation' },
          { title: 'Мужчины', align: 'center', key: 'male' },
          { title: 'Женщины', align: 'center', key: 'female' },
          { title: 'Средний возраст', align: 'center', key: 'average_age' },
          { title: 'Количество пар', align: 'center', key: 'pair_amount' },
        ],
        hardcoded_data: [
          {
            generation: 1,
            amount_in_generation: 6,
            male: 3,
            female: 3,
            average_age: 90,
            pair_amount: 3,
          },
          {
            generation: 2,
            amount_in_generation: 4,
            male: 2,
            female: 2,
            average_age: 50,
            pair_amount: 2,
          },
          {
            generation: 3,
            amount_in_generation: 2,
            male: 1,
            female: 1,
            average_age: 30,
            pair_amount: 1,
          },
          {
            generation: 4,
            amount_in_generation: 1,
            male: 0,
            female: 1,
            average_age: 5,
            pair_amount: 0,
          }
        ]
    }
  }
}
</script>