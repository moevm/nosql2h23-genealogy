<template>
  <v-container class="roundContainer grayBackgroundColor mt-auto mb-auto" style="backdrop-filter: blur(100px)">
    <v-row justify="center">
      <p class="darkBlueColor RegistrationTitle">
        Регистрация
      </p>
    </v-row>
    <v-row justify="center">
      <v-text-field
        v-model="login"
        class="WhiteInput"
        density="compact"
        placeholder="*Логин"
        variant="outlined"
      />
    </v-row>
    <v-row justify="center">
      <v-text-field
        v-model="password"
        class="WhiteInput"
        :append-inner-icon="visibleFirst ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visibleFirst ? 'text' : 'password'"
        density="compact"
        placeholder="*Пароль"
        variant="outlined"
        @click:append-inner="visibleFirst = !visibleFirst"
      />
    </v-row>
    <v-row justify="center" >
      <v-text-field
        v-model="repeatPassword"
        class="WhiteInput"
        :append-inner-icon="visibleSecond ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visibleSecond ? 'text' : 'password'"
        density="compact"
        placeholder="*Повторите пароль"
        variant="outlined"
        @click:append-inner="visibleSecond = !visibleSecond"
      />
    </v-row>
    <v-row
      justify="center"
      class="mt-10"
    >
      <v-text-field
        v-model="name"
        class="WhiteInput"
        density="compact"
        placeholder="*Имя"
        variant="outlined"
      />
    </v-row>
    <v-row justify="center">
      <v-text-field
        v-model="surname"
        class="WhiteInput"
        density="compact"
        placeholder="*Фамилия"
        variant="outlined"
      />
    </v-row>
    <v-row justify="center">
      <v-text-field
        v-model="patronymic"
        class="WhiteInput"
        density="compact"
        placeholder="Отчество"
        variant="outlined"
      />
    </v-row>
    <v-row justify="space-around">
      <v-col>
        <v-btn
          class="roundedButton"
          @click="$router.push('/')"
          variant="text"
        >
          Назад
        </v-btn>
      </v-col>
      <v-col cols="8">
        <v-btn
          class="greenButton roundedButton"
          min-width="100px"
        >
          Зарегистрироваться
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
@import "../styles/styles";

.roundContainer {
  border-radius: 40px;
  max-width: 400px;
}

.roundedButton {
  border-radius: 10px;
}

.RegistrationTitle {
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
  name: "registrationPage",
  setup() {
    const login = ref("")
    const password = ref("")
    const repeatPassword = ref("")
    const name = ref("")
    const surname = ref("")
    const patronymic = ref("")
    const visibleFirst = ref(false)
    const visibleSecond = ref(false)
    return {
      login,
      password,
      repeatPassword,
      name,
      surname,
      patronymic,
      visibleFirst,
      visibleSecond,
    }
  }
}
</script>
