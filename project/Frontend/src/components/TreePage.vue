<template>
  <MainNavigation/>
  <v-container class="mt-10">
    <v-row>
      <v-btn
        class="green-button rounded-button"
        min-width="200px"
      >
        Добавить
      </v-btn>
      <v-btn
        class="green-button rounded-button ml-15"
        min-width="200px"
      >
        Древо
      </v-btn>
    </v-row>
    <v-row class="mt-10">
      <v-btn
        class="ml-4"
        append-icon="mdi-database-import"
        @click="handleFileImport"
      >
        Импорт
      </v-btn>
      <v-btn
        class="ml-16"
        append-icon="mdi-database-export"
        @click="handleFileImport"
      >
        Экспорт
      </v-btn>
      <input
        ref="uploader"
        class="d-none"
        type="file"
        @change="onFileChanged"
      >
    </v-row>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="Array.from(tableDict.keys())"
      item-value="name"
      class="elevation-1 mt-10"
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ generateInfo(tableDict.get(row.item).information.properties) }}</td>
          <td>{{ tableDict.get(row.item).relationship }}</td>
          <td>
              <v-btn>
                <v-icon icon="mdi-pencil"/>
              </v-btn>
            <v-btn>
              <v-icon icon="mdi-close"/>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<style scoped lang="scss">
@import "src/styles/styles";
</style>
<script>
import MainNavigation from "@/components/UI/MainNavigation.vue";
import {computed, onMounted, ref} from "vue";
import {useAppStore} from "@/store/app";
import {generateInfo} from "../../methods/informationCreator"
export default {
  name: 'treePage',
  components: {
    MainNavigation
  },
  setup() {
    const uploader = ref(null)
    const selectedFile = ref(null)
    const itemsPerPage = 5
    const store = useAppStore()
    const treeInfo = ref([])
    const tableDict = ref(new Map())
    onMounted(async () => {
      const res = await fetch(`http://localhost:3000/get_tree/${store.userId}`)
      treeInfo.value = await res.json()
      tableDict.value = generateTableInfo(treeInfo.value)
    })

    const generateTableInfo = (data) => {
      const table = new Map()
      data.forEach((relation) => {

        const relative = relation.rel
        const start = relative.startNodeElementId === relation.start.elementId ? relation.start : relation.end
        const end = relative.startNodeElementId === relation.end.elementId ? relation.start : relation.end
        if (!table.has(start.elementId)) {
          table.set(start.elementId, {
            information: start,
            relationship: []
          })
        }
        if (!table.has(end.elementId)) {
          table.set(end.elementId, {
            information: end,
            relationship: []
          })
        }
        const relationship = table.get(start.elementId).relationship // достаём уже существующий список отношений
        const fullName = end.patronymic === '' ? `${end.properties.name} ${end.properties.surname}` : `${end.properties.name} ${end.properties.patronymic} ${end.properties.surname}`
        const gender = end.properties.gender
        if (relative.type === 'MOTHER' || relative.type === 'FATHER') {
          if (gender === 'Ж') {
            relationship.push(`Дочь: ${fullName}`)
          } else {
            relationship.push(`Сын: ${fullName}`)
          }
        } else if (relative.type === 'SON' || relative.type === 'DAUGHTER') {
          if (gender === 'Ж') {
            relationship.push(`Мать: ${fullName}`)
          } else {
            relationship.push(`Отец: ${fullName}`)
          }
        } else if (relative.type === 'HUSBAND' || relative.type === 'WIFE') {
          if (gender === 'Ж') {
            relationship.push(`Супруга: ${fullName}`)
          } else {
            relationship.push(`Супруг: ${fullName}`)
          }
        }

      })
      return table
    }

    /*const generateInfo = (node) => {
      return node.name + ' ' +
        node?.patronymic + ' ' + node.surname + ' ' +
        node.gender + ' ' +
        generateDate(node.dateOfBirth) + (node.dateOfDeath === undefined ? '' : ' - ' + generateDate(node.dateOfDeath))
    }

    const generateDate = (date) => {
      return (+date.day.low < 10 ? `0${date.day.low}.` : `${date.day.low}.`) +
        (+date.month.low < 10 ? `0${date.month.low}.` : ` ${date.month.low}.`) +
        date.year.low
    }*/
    const headers = [
      {title: 'Информация', align: 'center', key: 'information'},
      {title: 'Родство', align: 'center', key: 'relationship'},
      {title: '', align: 'center', key: 'btn'},
    ]
    const hardcoded_data = [
      {
        information: 'Петр Петрович Петров\n М\n 01.01.1900 -  01.01.2000\n',
        relationship: 'Супруга: Александра Александровна Александрова\n Сын: Василий Петрович Петров',
      },
      {
        information: 'Александра Александровна Александрова\n Ж\n 01.01.1900',
        relationship: 'Супруг: Петр Петрович Петров\n Сын: Василий Петрович Петров',
      },
    ]

    const handleFileImport = () => {
      uploader.value.click()
      // Trigger click on the FileInput
    }
    const onFileChanged = (e) => {
      selectedFile.value = e.target.files[0];

      // Do whatever you need with the file, liek reading it with FileReader
    }
    return {
      itemsPerPage,
      headers,
      hardcoded_data,
      selectedFile,
      tableDict,
      handleFileImport,
      onFileChanged,
      generateInfo,
      uploader
    }

  }
}
</script>
