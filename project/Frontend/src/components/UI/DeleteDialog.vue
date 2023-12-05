<template>
  <v-dialog activator="parent" :model-value="dialog">
    <v-card>
      <v-card-text>
        Вы точно хотите удалить узел {{info}}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="deleteNode">Да</v-btn>
        <v-btn color="primary" @click="closeDialog">Нет</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>

<script>
import {ref} from "vue";

export default{
  name: 'deleteDialog',
  props: {
    nodeId: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    }
  },
  emits: ['update:dialog','deleteNode'],
  setup(props,{emit}){
    const dialog = ref(false);
    const closeDialog = () => {
      dialog.value = false
      emit('update:dialog',false)
    }
    const deleteNode = () => {
      emit('deleteNode',props.nodeId)
      closeDialog()
    }
    return{
      dialog,
      closeDialog,
      deleteNode
    }
  }
}
</script>
