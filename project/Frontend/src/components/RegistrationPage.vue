<template>
  <v-container class="round-container gray-background-color mt-auto mb-auto" style="backdrop-filter: blur(100px)">
    <v-row justify="center">
      <p class="dark-blue-color registration-title">
        Регистрация
      </p>
    </v-row>
    <v-row justify="center">
      <v-text-field
        v-model="login"
        class="white-input"
        density="compact"
        placeholder="*Логин"
        variant="outlined"
      />
    </v-row>
    <v-row justify="center">
      <v-text-field
        v-model="password"
        class="white-input"
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
        class="white-input"
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
        class="white-input"
        density="compact"
        placeholder="*Имя"
        variant="outlined"
      />
    </v-row>
    <v-row justify="center">
      <v-text-field
        v-model="surname"
        class="white-input"
        density="compact"
        placeholder="*Фамилия"
        variant="outlined"
      />
    </v-row>
    <v-row justify="center">
      <v-text-field
        v-model="patronymic"
        class="white-input"
        density="compact"
        placeholder="Отчество"
        variant="outlined"
      />
    </v-row>
    <v-row justify="space-around">
      <v-col>
        <v-btn
          class="rounded-button"
          @click="$router.push('/')"
          variant="text"
        >
          Назад
        </v-btn>
      </v-col>
      <v-col cols="8">
        <v-btn
          class="green-button rounded-button"
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

.round-container {
  border-radius: 40px;
  max-width: 400px;
}

.rounded-button {
  border-radius: 10px;
}

.registration-title {
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
