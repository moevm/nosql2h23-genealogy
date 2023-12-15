<template>
  <MainNavigation/>
  <v-container class="mt-10">
    <v-row>
      <v-btn
        value="addNode"
        class="green-button rounded-button"
        min-width="200px"
        @click="addOrChangeNode(null)"
      >
        Добавить
      </v-btn>
      <v-btn
        class="green-button rounded-button ml-15"
        min-width="200px"
        @click="$router.push('/VisualizeTree')"
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
        @click="handleFileExport"
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
    <v-row class="mt-10">
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      single-line
      variant="outlined"
      hide-details
    />
    </v-row>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="filteredItems"
      :search="search"
      class="elevation-1 mt-10"
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.information }}</td>
          <td>{{ row.item.relationship }}</td>
          <td v-if="row.item.nodeId !== userId">
            <v-btn
            :node-id="row.item.nodeId"
            @click="addOrChangeNode(row.item.nodeId)">
              <v-icon icon="mdi-pencil"/>
              
            </v-btn>
            <v-btn>
              <v-icon icon="mdi-close"/>
              <DeleteDialog
                :info="row.item.information"
                :node-id="row.item.nodeId"
                v-model="row.item.visible"
                @update:dialog="row.item.visible = false"
                @deleteNode="deleteNode"
              />
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
import DeleteDialog from "@/components/UI/DeleteDialog.vue";
import {useRouter} from 'vue-router'

export default {
  name: 'treePage',
  components: {
    DeleteDialog,
    MainNavigation
  },
  setup() {
    const router = useRouter()
    const xhr = new XMLHttpRequest();
    const uploader = ref(null)
    const search = ref("")
    const selectedFile = ref(null)
    const itemsPerPage = 5
    const store = useAppStore()
    const userId = store.userId
    const treeInfo = ref([])
    const tableDict = ref(new Map())
    const dialog = ref(false)
    onMounted(async () => {
      await getTreeFromDb()
    })
    const getTreeFromDb = async () => {
      const res = await fetch(`http://${store.domain}:${store.serverPort}/get_tree/${store.userId}`)
      treeInfo.value = await res.json()
      tableDict.value = generateTableInfo(treeInfo.value)
    }
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
    const customFilter = (column, value) => {
      // Фильтр будет применяться только к столбцу 'column1'
      if (column === 'column1') {
        return String(this.items[column]).toLowerCase().includes(String(value).toLowerCase());
      }
      return true; // Для остальных столбцов всегда возвращаем true
    }
    const headers = [
      {title: 'Информация', align: 'center', key: 'information',value: 'information', filter: value => customFilter('information', value)},
      {title: 'Родство', align: 'center', key: 'relationship',value: 'relationship', filter: value => customFilter('relationship', value)},
      {title: '', align: 'center', key: 'btn'},
    ]

    const handleFileImport = () => { // Импорт файла JSON
      uploader.value.click()// Trigger click on the FileInput
      //const res = await fetch(`http://${store.domain}:${store.serverPort}/get_tree/${store.userId}`)
    }

    const handleFileExport = async () => { // Экспорт файла JSON
      window.open(`http://${store.domain}:${store.serverPort}/ExportData/${store.userId}`, 'database.pdf');
    }

    const sendData = async (e) =>{
      console.log(e)
      const res = await fetch(`http://${store.domain}:${store.serverPort}/ImportData/${store.userId}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(e)
      })
    }

    const onFileChanged = (e) => {   
      let fr = new FileReader()    
      fr.readAsText(e.target.files[0])
      fr.onload = async function (e) {
        let data = e.target.result
        await sendData(JSON.parse(data))
        await getTreeFromDb()
      }
    }
    
    const deleteNode = async (nodeId) => {
      const data = {
        nodeId: nodeId
      }
      const res = await fetch(`http://${store.domain}:${store.serverPort}/delete_node`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
      await getTreeFromDb()
    }

    const addOrChangeNode = (nodeId) => {
      const values = {
        value: nodeId,
      };
      router.push({
        name: 'addNode',
        query: values,
      });
    }

    const parseDataToTable = computed(() => {
      const tableData = []
      const NodeIds = []
      Array.from(tableDict.value.keys()).forEach(el => {
        NodeIds.push(el)
        const data = {
          information: generateInfo(tableDict.value.get(el).information.properties),
          relationship: tableDict.value.get(el).relationship,
          nodeId: el,
          visible: false,
        }
        tableData.push(data)
      })
      return tableData
    })

    const filteredItems = computed(() => {
      // Фильтруем только по первому столбцу
      return parseDataToTable.value.filter(item => item.information.toLowerCase().includes(search.value.toLowerCase()));
    })
    return {
      itemsPerPage,
      headers,
      selectedFile,
      tableDict,
      search,
      handleFileImport,
      handleFileExport,
      onFileChanged,
      generateInfo,
      uploader,
      parseDataToTable,
      filteredItems,
      userId,
      dialog,
      deleteNode,
      addOrChangeNode
    }

  }
}
</script>


