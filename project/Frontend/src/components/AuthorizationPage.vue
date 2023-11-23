<template>
  <v-container class="round-container gray-background-color mt-auto mb-auto" style="backdrop-filter: blur(100px)">
    <v-row justify="center">
      <p class="dark-blue-color authorization-title">
        Авторизация
      </p>
    </v-row>
    <v-row justify="center">
      <v-text-field
        v-model="login"
        class="white-input"
        :rules="[notEmptyField,LoginFormat]"
        density="compact"
        placeholder="Логин"
        variant="outlined"
      />
    </v-row>
    <v-row justify="center">
      <v-text-field
        v-model="password"
        :rules="[notEmptyField,PasswordFormat]"
        class="white-input"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Пароль"
        variant="outlined"
        @click:append-inner="visible = !visible"
      />
    </v-row>
    <v-row justify="space-around">
      <v-col>
        <v-btn
          @click="$router.push('/profile')"
          class="green-button rounded-button"
          min-width="100px"
        >
          Регистрация
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          class="white-button rounded-button"
          min-width="150px"
          @click="Autorize"
        >
          Войти
        </v-btn>
      </v-col>
    </v-row>
    <MainSnackBar text="Неверный логин и/или пароль" v-model="uncorrectUserSnack"/>
  </v-container>

</template>

<style lang="scss" scoped>
@import "../styles/styles";

.round-container {
  border-radius: 40px;
  max-width: 400px;
}


.authorization-title {
  font-size: 24px;
}

.white-input {
  :deep(.v-field) {
    background-color: $main-color-dark-white;
  }

  max-width: 300px;
}
</style>

<script>
import {ref} from "vue";
import mainNavigation from "@/components/UI/MainNavigation.vue";
import {useRouter} from 'vue-router'
import MainSnackBar from "@/components/UI/MainSnackBar.vue";
import {useAppStore} from "@/store/app";
export default {
  name: "authorizationPage",
  components: {
    mainNavigation,
    MainSnackBar
  },
  setup() {
    const store = useAppStore()
    const login = ref("")
    const password = ref("")
    const visible = ref(false)
    const uncorrectUserSnack = ref(false)
    const router = useRouter()
    const notEmptyField = (v) => {
      return !!v || 'Поле должно быть заполнено!'
    }
    const LoginFormat = (v) => {
      const loginRegex = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/
      return loginRegex.test(v) || 'Логин должен начинаться с латиницы и быть не более 20 знаков(используя только латиницу и цифры)!'
    }
    const Autorize = async () => {
      if (LoginFormat(login.value) === true && PasswordFormat(password.value) === true && notEmptyField(login.value) && notEmptyField(password.value)) {
        const res = await fetch(`http://localhost:3000/get_user/${login.value}/${password.value}`)
        const data = await res.json()
        if (data.hasOwnProperty('elementId')) {
          store.userId = data.elementId
          router.push('/myTree')
        } else {
          uncorrectUserSnack.value = true
        }
        login.value = ''
        password.value = ''
      }

    }
    const PasswordFormat = (v) => {
      const passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      return passwordRegex.test(v) || 'Пароль должен содержать строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов!)!'
    }
    return {
      login,
      password,
      visible,
      uncorrectUserSnack,
      notEmptyField,
      LoginFormat,
      PasswordFormat,
      Autorize
    }
  }
}
</script>
