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
            >
              Сохранить
            </v-btn>
          </v-row>
          <v-row>
            <v-btn
              min-width="350px"
              class="white-button mt-5 ml-5"
              @click="changeFlag = !changeFlag"
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
        <v-row class="mt-5">
          <v-col>
            <p class="blue-color">
              Имя
            </p>
          </v-col>
          <v-col>
            <p class="blue-color">
              {{ name }}
            </p>

          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="blue-color">
              Фамилия
            </p>

          </v-col>
          <v-col>
            <p class="blue-color">
              {{ surname }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="blue-color">
              Отчество
            </p>
          </v-col>
          <v-col>
            <p class="blue-color">
              {{ patronymic }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="blue-color">
              Дата рождения
            </p>
          </v-col>
          <v-col>
            <p class="blue-color">
              {{ date }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="blue-color">
              Пол
            </p>
          </v-col>
          <v-col>
            <p class="blue-color">
              {{ gender }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="blue-color">
              Логин
            </p>
          </v-col>
          <v-col>
            <p class="blue-color">
              {{ login }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="blue-color">
              Пароль
            </p>
          </v-col>
          <v-col>
            <p class="blue-color">
              {{ password }}
            </p>
          </v-col>
        </v-row>
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
              v-model="date"
              @change="console.log(date)"
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
          <v-col>
            <p class="ml-15 blue-color">
              Логин
            </p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="login"
              density="compact"
              class="dark-white-input"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="ml-15 blue-color">
              Пароль
            </p>
          </v-col>
          <v-col>
            <v-text-field
              v-model="password"
              class="dark-white-input"
              density="compact"
              variant="outlined"
            />
          </v-col>
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
import {ref, onMounted} from "vue";
import {useAppStore} from "@/store/app";

export default {
  name: "profilePage",
  components: {MainNavigation},
  setup() {
    const store = useAppStore()
    const changeFlag = ref(false)
    const name = ref('')
    const surname = ref('')
    const patronymic = ref('')
    const date = ref('')
    const gender = ref('')
    const login = ref('')
    const password = ref("********")
    onMounted(async () => {
      const res = await fetch(`http://localhost:3000/get_user_info/${store.userId}`)
      let info_json = await res.json()
      console.log(info_json)
      name.value = info_json.name;
      surname.value = info_json.surname;
      patronymic.value = info_json.patronymic;
      date.value = info_json.dateOfBirth.day.low + '-' + info_json.dateOfBirth.month.low + '-' + info_json.dateOfBirth.year.low;
      gender.value = info_json.gender;
      login.value = info_json.login;
    })
    return {
      changeFlag,
      name,
      surname,
      patronymic,
      date,
      gender,
      login,
      password
    }
  }
}
</script>
