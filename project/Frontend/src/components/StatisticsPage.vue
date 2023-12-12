<template>
    <MainNavigation/>
    <h2 class="blue-color"> Статистика </h2>
    <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="displaing_data"
    item-value="name"
    class="elevation-1"
    ></v-data-table>
</template>

<style scoped lang="scss">
@import "src/styles/styles";
.blue-color{
  align-self: center;
}
</style>

<script>
import MainNavigation from "@/components/UI/MainNavigation.vue";
import {onMounted, ref} from "vue";
import {useAppStore} from "@/store/app";

export default {
  name: "StatisticsPage",
  components: {MainNavigation},
  setup(){
    const store = useAppStore()
    const userId = store.userId
    const itemsPerPage = 5
    const headers = [
      { title: 'Поколение', align: 'center', key: 'generation' },
      { title: 'Количество людей в поколении', align: 'center', key: 'amount_in_generation' },
      { title: 'Мужчины', align: 'center', key: 'male' },
      { title: 'Женщины', align: 'center', key: 'female' },
      { title: 'Средний возраст', align: 'center', key: 'average_age' },
      { title: 'Количество пар', align: 'center', key: 'pair_amount' },
    ]
    const displaing_data = ref([])
    onMounted(async () => {
      await getStatistics()
    })

    const getStatistics = async () => {
      const res = await fetch(`http://${store.domain}:${store.serverPort}/getStatistics/${userId}`)
      displaing_data.value = await res.json()
    }

    return{
      itemsPerPage,
      headers,
      displaing_data
    }
  }
}
</script>
