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
      :items="displaing_data"
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
      const store = useAppStore()
      const displaing_data = ref([])
      onMounted(async () => {
        await getOtherTrees()
      })
      const getOtherTrees = async () => {
        const res = await fetch(`http://${store.domain}:${store.serverPort}/get_other_trees/${store.userId}`)
        displaing_data.value = await res.json()
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
      return {
        headers,
        search,
        getOtherTrees,
        displaing_data
      }
    },
  }
</script>
