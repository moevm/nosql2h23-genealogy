<template>
  <MainNavigation/>
  <v-container class="ma-0">
    <v-row>
      <v-col
        cols="4"
        class="ml-0"
      >
        <v-img src="../assets/avatar.png"/>
        <v-btn
          class="mt-5 ml-3 green-button rounded-button"
          min-width="350px"
          v-if="!changeFlag"
          @click="changeFlag = !changeFlag"
        >
          Редактировать
        </v-btn>
        <template v-else>
          <v-row>
            <v-btn
              min-width="350px"
              class="green-button mt-7 ml-5"
              @click="addNode"
            >
              Сохранить
            </v-btn>
          </v-row>
          <v-row>
            <v-btn
              value="myTree"
              min-width="350px"
              class="white-button mt-5 ml-5"
              @click="$router.push('/myTree')"
            >
              Назад
            </v-btn>
          </v-row>
        </template>
      </v-col>
      <v-col
        v-if="!changeFlag"
        cols="4"
        offset="1"
      >
      </v-col>
      <v-col
        v-else
        cols="6"
        offset="1"
      >
        <v-row class="mt-5">
          <v-col>
            <p class="ml-15 blue-color">
              Имя
            </p>
          </v-col>
          <v-col>
            <v-text-field
              class="dark-white-input"
              density="compact"
              variant="outlined"
              v-model="name"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="ml-15 blue-color">
              Фамилия
            </p>
          </v-col>
          <v-col>
            <v-text-field
              class="dark-white-input"
              density="compact"
              variant="outlined"
              v-model="surname"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="ml-15 blue-color">
              Отчество
            </p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="patronymic"
              class="dark-white-input"
              density="compact"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="ml-15 blue-color">
              Дата рождения
            </p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="dateOfBirth"
              @change="console.log(dateOfBirth)"
              class="dark-white-input"
              density="compact"
              variant="outlined"
              type="date"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="ml-15 blue-color">
              Дата смерти
            </p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="dateOfDeath"
              @change="console.log(dateOfDeath)"
              class="dark-white-input"
              density="compact"
              variant="outlined"
              type="date"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="ml-15 blue-color">
              Пол
            </p>
          </v-col>
          <v-col>
            <v-row>
              <v-radio-group
                v-model="gender"
                inline
              >
                <v-radio label="М" value="М"></v-radio>
                <v-radio label="Ж" value="Ж"></v-radio>
              </v-radio-group>
            </v-row>

          </v-col>
        </v-row>

        <v-row>
          <p class="ml-15 blue-color">
            Родство
          </p>
        </v-row>
        <v-row v-for="(section,index) in selectNameSections">
          <!-- Первый выпадающий список -->
          <v-col>
            <v-select
              v-model="selectNameSections[index].value"
              item-title="name"
              item-value="nodeId"
              return-object
              :items="getAllNodeSelections"
            />
          </v-col>
          <!-- Второй выпадающий список -->
          <v-col>
            <v-select
              v-model="selectTypeRelationshipSections[index].value"
              :items="typeRelationships"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-btn
            min-width="350px"
            class="green-button mt-7 ml-5"
            @click="addSection"
          >
            Добавить
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
@import "src/styles/styles";
</style>

<script>
import MainNavigation from "@/components/UI/MainNavigation.vue";
import {computed, onMounted, ref} from "vue";
import {useAppStore} from "@/store/app";
import {generateNPS} from "../../methods/informationCreator";
import {useRouter} from 'vue-router'

export default {
  name: "addNodePage",
  components: {MainNavigation},
  setup() {
    const router = useRouter()
    const store = useAppStore()
    const changeFlag = ref(true)
    const name = ref("")
    const surname = ref("")
    const patronymic = ref("")
    const dateOfBirth = ref("")
    const dateOfDeath = ref("")
    const gender = ref("")
    const treeNodes = ref([])
    const typeRelationships = ['Супруг\\Супруга', 'Брат\\Сестра', 'Отец\\Мать', 'Сын\\Дочь']
    const selectNameSections = ref([ref('')])
    const selectTypeRelationshipSections = ref([ref('')])
    const nodeCreated = ref({})
    const addNodeInDB = async () => {
      const dataNode = {
        UserId: store.userId,
        name: name.value,
        surname: surname.value,
        patronymic: patronymic.value,
        dateOfBirth: `${dateOfBirth.value}`,
        dateOfDeath: `${dateOfDeath.value}`,
        gender: gender.value,
        generation: '1'
      };
      const res = await fetch(`http://localhost:3000/create_node`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataNode)
      });
      const data = await res.json();
      nodeCreated.value = data
    }
    const addRelationInDB = async (relationshipTo,relationshipFrom,relativeId) => {
      const relationships = {
        id: nodeCreated.value.elementId,
        relationshipTo,
        relationshipFrom,
        relativeId
      }

      const res = await fetch(`http://localhost:3000/create_relation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(relationships)
      });

    }
    const  addNode = async () => {
      await addNodeInDB()
      for(let i = 0;i < selectNameSections.value.length;i++){
        const relationshipFrom =  selectTypeRelationshipSections.value[i].value
        let typeRelationshipFrom
        let typeRelationshipTo
        const nodeGender = nodeCreated.value.properties.gender
        switch (relationshipFrom){
          case 'Супруг\\Супруга':{
            typeRelationshipTo = nodeGender === 'М' ? 'HUSBAND' : 'WIFE'
            if(selectNameSections.value[i].value.gender === 'М'){
              typeRelationshipFrom = 'HUSBAND'
            }
            else{
              typeRelationshipFrom = 'WIFE'
            }
            break
          }
          case  'Брат\\Сестра':{
            typeRelationshipTo = nodeGender === 'М' ? 'BROTHER' : 'SISTER'
            if(selectNameSections.value[i].value.gender === 'М'){
              typeRelationshipFrom = 'BROTHER'
            }
            else{
              typeRelationshipFrom = 'SISTER'
            }
            break
          }
          case  'Отец\\Мать':{
            typeRelationshipTo = nodeGender === 'М' ? 'SON' : 'DAUGHTER'
            if(selectNameSections.value[i].value.gender === 'М'){
              typeRelationshipFrom = 'FATHER'
            }
            else{
              typeRelationshipFrom = 'MOTHER'
            }
            break
          }
          case  'Сын\\Дочь':{
            typeRelationshipTo = nodeGender === 'М' ? 'FATHER' : 'MOTHER'
            if(selectNameSections.value[i].value.gender === 'М'){
              typeRelationshipFrom = 'SON'
            }
            else{
              typeRelationshipFrom = 'DAUGHTER'
            }
            break
          }
        }
        await addRelationInDB(typeRelationshipTo,typeRelationshipFrom,selectNameSections.value[i].value.nodeId)
      }
      router.push('/myTree')
    }
    const addSection = () => {
      selectNameSections.value.push(ref(''))
      selectTypeRelationshipSections.value.push(ref(''))
    }
    onMounted(async () => {
      const res = await fetch(`http://localhost:3000/get_all_id/${store.userId}`)
      treeNodes.value = await res.json()
    })
    const getAllNodeSelections =  computed(() => {
      const nodeSelections = []
      for(let i = 0;i< treeNodes.value.length;i++){
        const node = {
          name: generateNPS(treeNodes.value[i]._fields[0].properties),
          nodeId: treeNodes.value[i]._fields[0].elementId,
          gender: treeNodes.value[i]._fields[0].properties.gender,
        }
        nodeSelections.push(node)
      }
      return nodeSelections
    })
    return {
      changeFlag,
      name,
      surname,
      patronymic,
      gender,
      dateOfBirth,
      dateOfDeath,
      selectNameSections,
      selectTypeRelationshipSections,
      treeNodes,
      typeRelationships,
      getAllNodeSelections,
      addNode,
      addRelationInDB,
      addSection
    }
  }
}
</script>
