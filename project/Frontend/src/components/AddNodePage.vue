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
              @click="addNodeInDB"
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
            <v-btn
              min-width="350px"
              class="green-button mt-7 ml-5"
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
import {ref} from "vue";


export default {
  name: "addNodePage",
  components: {MainNavigation},
  setup() {
    const addNodeInDB = async () =>{
      const dataNode ={
        UserId:'4:3a60676e-a8e6-488e-8033-bd8204f859b7:5',
        name: name.value,
        surname: surname.value,
        patronymic: patronymic.value,
        dateOfBirth: dateOfBirth.value,
        dateOfDeath: dateOfDeath.value,
        gender: gender.value,
        generation: '1'
      };
      let res = await fetch(`http://localhost:3000/create_node`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(dataNode)
      });
      //console.log("Gпроверка на действие функциилалалалалла")
    }
    const changeFlag = ref(true)
    const name = ref("")
    const surname = ref("")
    const patronymic = ref("")
    const dateOfBirth = ref("")
    const dateOfDeath = ref("")
    const gender = ref("")
    return {
      changeFlag,
      name,
      surname,
      patronymic,
      gender,
      dateOfBirth,
      dateOfDeath,
      addNodeInDB
    }
  }
}
</script>
