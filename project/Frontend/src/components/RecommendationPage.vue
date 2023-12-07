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
      />
    </template>

    <v-data-table
      :headers="headers"
      :items="hardcoded"
      :search="search"
    />
  </v-card>
</template>

<style scoped lang="scss">
@import "src/styles/styles";
</style>

<script>
  import {onMounted, ref } from 'vue'
  import MainNavigation from "@/components/UI/MainNavigation.vue";
  import {useAppStore} from "@/store/app";

  var headers = ref([])
  var hardcoded = ref([])
  var search = ref('')

  export default {
    name: 'RecommendationPage',
    components: {MainNavigation},
    setup() {
      onMounted(async () => {
        await getOtherTrees()
      })
      const store = useAppStore()
      const displaing_data = ref([])
      const getOtherTrees = async () => {
        const res = await fetch(`http://localhost:3000/get_other_trees/${store.userId}`)
        //displaing_data.value = await res.json()
        //console.log("Данные дада", displaing_data.value[0]._fields[0])
      }
      headers = [
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
      ]

      hardcoded = [
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
      ]
      return {
        headers,
        hardcoded,
        search,
        getOtherTrees,
        displaing_data
      }
    },
  }
</script>
