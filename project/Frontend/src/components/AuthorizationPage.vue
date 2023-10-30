<template>
    <v-container class="roundContainer grayBackgroundColor mt-auto mb-auto" style="backdrop-filter: blur(100px)">
      <v-row justify="center">
        <p class="darkBlueColor AuthorizationTitle">
          Авторизация
        </p>
      </v-row>
      <v-row justify="center">
        <v-text-field
          v-model="login"
          class="WhiteInput"
          density="compact"
          placeholder="Логин"
          variant="outlined"
        />
      </v-row>
      <v-row justify="center">
        <v-text-field
          v-model="password"
          class="WhiteInput"
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
            @click="$router.push('/registration')"
            class="greenButton roundedButton"
            min-width="100px"
          >
            Регистрация
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            class="whiteButton roundedButton"
            min-width="150px"
          >
            Войти
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
</template>

<style lang="scss" scoped>
@import "../styles/styles";

.roundContainer {
  border-radius: 40px;
  max-width: 400px;
}

.roundedButton {
  border-radius: 10px;
}

.AuthorizationTitle {
  font-size: 24px;
}

.WhiteInput {
  :deep(.v-field) {
    background-color: $main-color-dark-white;
  }

  max-width: 300px;
}
</style>

<script>
import {ref} from "vue";

export default {
  name: "authorizationPage",
  setup() {
    const login = ref("")
    const password = ref("")
    const visible = ref(false)
    return {
      login,
      password,
      visible,
    }
  }
}
</script>
