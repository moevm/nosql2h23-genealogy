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
      <p>Поиск по имени:</p>
    </v-row>

    <v-row class="mt-5">
      <v-text-field
        v-model="nameSearch"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
      />
    </v-row>
    <v-row class="mt-5">
      <p>Поиск по отчеству:</p>
    </v-row>
    <v-row class="mt-5">
      <v-text-field
        v-model="patronymicSearch"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
      />
    </v-row>
    <v-row class="mt-5">
      <p>Поиск по фамилии:</p>
    </v-row>
    <v-row class="mt-5">
      <v-text-field
        v-model="surnameSearch"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
      />
    </v-row>
    <v-row class="mt-5">
      <p>Поиск по полу:</p>
    </v-row>
    <v-row class="mt-5">
      <v-text-field
        v-model="genderSearch"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
      />
    </v-row>
    <v-row class="mt-5">
      <p>Поиск по дате рождения:</p>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="1"
             class="mt-4">
        От:
      </v-col>
      <v-col cols="2">
      <v-text-field
        v-model="startBirth"
        single-line
        variant="outlined"
        type="date"
        hide-details
      />
      </v-col>
      <v-col cols="1" class="mt-4">
        До:
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="endBirth"
          single-line
          variant="outlined"
          type="date"
          hide-details
        />
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <p>Поиск по дате смерти:</p>
    </v-row>
    <v-row class="mt-5">
      <v-col cols="1"
             class="mt-4">
        От:
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="startDeath"
          single-line
          variant="outlined"
          type="date"
          hide-details
        />
      </v-col>
      <v-col cols="1" class="mt-4">
        До:
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="endDeath"
          single-line
          variant="outlined"
          type="date"
          hide-details
        />
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <p>Поиск по родству:</p>
    </v-row>
    <v-row class="mt-5">
      <v-text-field
        v-model="relationSearch"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
      />
    </v-row>
    <v-row>
      <v-container class="gray-background-color mt-5">
        <v-radio-group column v-model="selectedSearch">
          <v-row>
            <v-col>
              <p>Поиск по родству:</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-radio label="Сын" value="Сын"></v-radio>
              <v-radio label="Дочь" value="Дочь"></v-radio>
              <v-radio label="Отец" value="Отец"></v-radio>
              <v-radio label="Мать" value="Мать"></v-radio>
            </v-col>
            <v-col>
              <v-radio label="Супруга" value="Супруга"></v-radio>
              <v-radio label="Супруг" value="Супруг"></v-radio>
              <v-radio label="Брат" value="Брат"></v-radio>
              <v-radio label="Сестра" value="Сестра"></v-radio>
            </v-col>
          </v-row>
        </v-radio-group>

      </v-container>
    </v-row>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="filteredItems"
      class="elevation-1 mt-10"
    >
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.name }}</td>
          <td>{{ row.item.patronymic }}</td>
          <td>{{ row.item.surname }}</td>
          <td>{{ row.item.gender }}</td>
          <td>{{ row.item.dateOfBirth }}</td>
          <td>{{ row.item.dateOfDeath }}</td>
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
import {dateToObjectDate, generateDate, generateInfo} from "../../methods/informationCreator"
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
    const nameSearch = ref("")
    const patronymicSearch = ref("")
    const surnameSearch = ref("")
    const genderSearch = ref("")
    const relationSearch = ref("")
    const startBirth = ref("")
    const endBirth = ref("")
    const startDeath = ref("")
    const endDeath= ref("")
    const selectedFile = ref(null)
    const itemsPerPage = 5
    const store = useAppStore()
    const userId = store.userId
    const treeInfo = ref([])
    const tableDict = ref(new Map())
    const dialog = ref(false)
    const selectedSearch = ref("Сын")
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
        } else if (relative.type === 'BROTHER' || relative.type === 'SISTER') {
          if (gender === 'Ж') {
            relationship.push(`Сестра: ${fullName}`)
          } else {
            relationship.push(`Брат: ${fullName}`)
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
      {title: 'Имя', align: 'center', key: 'name', value: 'name', filter: value => customFilter('name', value)},
      {
        title: 'Отчество',
        align: 'center',
        key: 'patronymic',
        value: 'patronymic',
        filter: value => customFilter('patronymic', value)
      },
      {
        title: 'Фамилия',
        align: 'center',
        key: 'surname',
        value: 'surname',
        filter: value => customFilter('surname', value)
      },
      {title: 'Пол', align: 'center', key: 'gender', value: 'gender', filter: value => customFilter('gender', value)},
      {
        title: 'Дата рождения',
        align: 'center',
        key: 'dateOfBirth',
        value: 'dateOfBirth',
        filter: value => customFilter('dateOfBirth', value)
      },
      {
        title: 'Дата смерти',
        align: 'center',
        key: 'dateOfDeath',
        value: 'dateOfDeath',
        filter: value => customFilter('dateOfDeath', value)
      },
      {
        title: 'Родство',
        align: 'center',
        key: 'relationship',
        value: 'relationship',
        filter: value => customFilter('relationship', value)
      },
      {title: '', align: 'center', key: 'btn'},
    ]

    const handleFileImport = () => { // Импорт файла JSON
      uploader.value.click()// Trigger click on the FileInput
      //const res = await fetch(`http://${store.domain}:${store.serverPort}/get_tree/${store.userId}`)
    }

    const handleFileExport = async () => { // Экспорт файла JSON
      window.open(`http://${store.domain}:${store.serverPort}/ExportData/${store.userId}`, 'database.pdf');
    }

    const sendData = async (e) => {
      const res = await fetch(`http://${store.domain}:${store.serverPort}/ImportData/${store.userId}`, {
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
      const res = await fetch(`http://${store.domain}:${store.serverPort}/delete_node`, {
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
          name: tableDict.value.get(el).information.properties.name,
          surname: tableDict.value.get(el).information.properties.surname,
          patronymic: tableDict.value.get(el).information.properties.patronymic,
          gender: tableDict.value.get(el).information.properties.gender,
          dateOfBirth: generateDate(tableDict.value.get(el).information.properties.dateOfBirth),
          dateOfDeath: generateDate(tableDict.value.get(el).information.properties.dateOfDeath),
          relationship: tableDict.value.get(el).relationship,
          nodeId: el,
          visible: false,
        }
        tableData.push(data)
      })
      return tableData
    })
    const filteredItems = computed(() => {
      let filteredRes = parseDataToTable.value.filter(item => item["name"].toLowerCase().includes(nameSearch.value.toLowerCase().trim()));
      filteredRes = filteredRes.filter(item => item["patronymic"].toLowerCase().includes(patronymicSearch.value.toLowerCase().trim()));
      filteredRes = filteredRes.filter(item => item["surname"].toLowerCase().includes(surnameSearch.value.toLowerCase().trim()));
      filteredRes = filteredRes.filter(item => item["gender"].toLowerCase().includes(genderSearch.value.toLowerCase().trim()));
      if(startBirth.value !== ""){
        filteredRes = filteredRes.filter(item => {
          return new Date(startBirth.value) <= dateToObjectDate(item?.dateOfBirth)})
      }
      if(endBirth.value !== ""){
        filteredRes = filteredRes.filter(item => dateToObjectDate(item?.dateOfBirth) <= new Date(endBirth.value));
      }
      if(startDeath.value !== ""){
        filteredRes = filteredRes.filter(item => {
          if(item?.dateOfDeath === "undefined.undefined.undefined"){
            return false
          }
          return new Date(startDeath.value) <= dateToObjectDate(item?.dateOfDeath)})
      }
      if(endDeath.value !== ""){

        filteredRes = filteredRes.filter(item => {
          if(item?.dateOfDeath === "undefined.undefined.undefined"){
            return false
          }
          return dateToObjectDate(item?.dateOfDeath) <= new Date(endDeath.value)});
      }
      filteredRes = filteredRes.map(item => {
        return {
          name: item.name,
          surname: item.surname,
          patronymic: item.patronymic,
          gender: item.gender,
          dateOfBirth: item.dateOfBirth,
          dateOfDeath: item.dateOfDeath === "undefined.undefined.undefined" ? "" : item.dateOfDeath,
          relationship: item.relationship,
          nodeId: item.nodeId,
          visible: item.visible,
        }
      })
      if (["Сын", "Дочь", "Отец", "Мать", "Супруга", "Супруг", "Брат", "Сестра"].includes(selectedSearch.value)) {
        if(relationSearch.value !== "") {
          filteredRes = filteredRes.filter(item => {
            const lowerRelationship = item.relationship.map(arrItem => arrItem.toLowerCase())
            console.log(lowerRelationship)
            return lowerRelationship.findIndex(lowerItem => lowerItem.includes(selectedSearch.value.toLowerCase() + ": " + relationSearch.value.toLowerCase().trim())) !== -1
          });
        }
        return filteredRes
      }
      // Фильтруем только по первому столбцу
    })


    return {
      selectedSearch,
      itemsPerPage,
      headers,
      selectedFile,
      tableDict,
      nameSearch,
      patronymicSearch,
      surnameSearch,
      genderSearch,
      relationSearch,
      startBirth,
      endBirth,
      startDeath,
      endDeath,
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


