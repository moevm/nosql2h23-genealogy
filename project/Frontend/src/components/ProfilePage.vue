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
              @click="changeProfile"
            >
              Сохранить
            </v-btn>
          </v-row>
          <v-row>
            <v-btn
              min-width="350px"
              class="white-button mt-5 ml-5"
              @click="closeChanges"
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
              {{ secretPassword }}
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
              :rules="[notEmptyField]"
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
              :rules="[notEmptyField]"
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
              :rules="[notEmptyField]"
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
              :rules="[notEmptyField, LoginFormat]"
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
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              v-model="password"
              class="dark-white-input"
              density="compact"
              variant="outlined"
              :rules="[notEmptyField, PasswordFormat]"
              @click:append-inner="visible = !visible"
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
import {ref, onMounted, computed} from "vue";
import {useAppStore} from "@/store/app";

export default {
  name: "profilePage",
  components: {MainNavigation},
  setup() {
    const store = useAppStore()
    const visible = ref(false)
    const changeFlag = ref(false)
    const name = ref('')
    const surname = ref('')
    const patronymic = ref('')
    const date = ref('')
    const gender = ref('')
    const login = ref('')
    const password = ref('')
    onMounted(async () => {
     await getProfileInfo()
    })
    const getProfileInfo = async () => {
      const res = await fetch(`http://localhost:3000/get_user_info/${store.userId}`)
      let info_json = await res.json()
      console.log(info_json)
      name.value = info_json.name;
      surname.value = info_json.surname;
      patronymic.value = info_json.patronymic;
      date.value = info_json.dateOfBirth.year.low + '-' + info_json.dateOfBirth.month.low + '-' + info_json.dateOfBirth.day.low;
      gender.value = info_json.gender;
      login.value = info_json.login;
      password.value = info_json.password
    }
    const notEmptyField = (v) => {
      return !!v || 'Поле должно быть заполнено!'
    }
    const LoginFormat = (v) => {
      const loginRegex = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/
      return loginRegex.test(v) || 'Логин должен начинаться с латиницы и быть не более 20 знаков(используя только латиницу и цифры)!'
    }
    const PasswordFormat = (v) => {
      const passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      return passwordRegex.test(v) || 'Пароль должен содержать строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов!)!'
    }
    const closeChanges =  () => {
      changeFlag.value = !changeFlag.value
      getProfileInfo()
    }
    const secretPassword = computed(() => {
      return '*'.repeat(password.value.length)
    })
    const changeProfile = async () => {
      if(notEmptyField(name.value) && notEmptyField(surname.value) && notEmptyField(date.value)
      && notEmptyField(login.value) && notEmptyField(password.value)
        && LoginFormat(login.value) && PasswordFormat(password.value)){
        const data = {
          userId: store.userId,
          dateOfBirth: date.value,
          gender: gender.value,
          login: login.value,
          name: name.value,
          surname: surname.value,
          password: password.value,
          patronymic: patronymic.value,
        }
        const res = await fetch(`http://localhost:3000/change_user_info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        })
        closeChanges()
      }
    }
    return {
      changeFlag,
      name,
      surname,
      patronymic,
      date,
      gender,
      login,
      password,
      visible,
      secretPassword,
      notEmptyField,
      LoginFormat,
      PasswordFormat,
      closeChanges,
      changeProfile
    }
  }
}
</script>
