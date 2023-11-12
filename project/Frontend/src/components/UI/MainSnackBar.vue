<template>
  <v-snackbar
    :model-value="snackbar"
    :timeout="timeout"
  >
    {{ text }}

    <template v-slot:actions>
      <v-btn
        color="blue"
        variant="text"
        @click="$emit('update:modelValue',false)"
      >
        Закрыть
      </v-btn>
    </template>
  </v-snackbar>
</template>


<style scoped lang="scss">

</style>
<script>

import {ref} from "vue";

export default {
  name: 'MainSnackBar',
  props: {
    text:{
      type: String,
      required: true,
    },
  },
  setup(props,{emit}){
    const timeout = 2000
    const snackbar = ref(false);
    const closeSnackBar = (event) => {
      snackbar.value = false;
      emit('update:modelValue', event.target.value);
    };
    return{
      timeout,
      snackbar,
      closeSnackBar
    }
  }
}
</script>
