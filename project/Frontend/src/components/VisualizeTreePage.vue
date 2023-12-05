

<template>
<MainNavigation/>
<v-network-graph
  :nodes="nodes"
  :edges="edges"
  :configs="configs"
>
  <template #edge-label="{ edge, ...slotProps }">
    <v-edge-label :text="edge.label" align="center" vertical-align="above" v-bind="slotProps" />
  </template>
</v-network-graph>
</template>

<style scoped lang="scss">
@import "src/styles/styles";
.graph {
  width: 800px;
  height: 600px;
  border: 1px solid #000;
}
</style>

<script>
import MainNavigation from "@/components/UI/MainNavigation.vue";
import {VEdgeLabel, VNetworkGraph} from "v-network-graph";
import * as vNG from "v-network-graph"
import {onMounted, reactive, ref} from "vue";
import {useAppStore} from "@/store/app";
import {generateInfo} from "../../methods/informationCreator"
export default{
  name: 'visualizeTreePage',
  components: {
    VEdgeLabel,
    VNetworkGraph,
    MainNavigation,
  },
  setup(){
    const treeInfo = ref(undefined)
    const store = useAppStore()
    const nodes = ref({})
    const edges = ref({})
    const initialConfigs = vNG.defineConfigs({
      node: {
        normal: {
          color: "#4466cc88",
        },
      },
      edge: {
        selectable: true,
        normal: {
          width: 3,
          color: "#4466cc",
          dasharray: "0",
          linecap: "butt",
          animate: false,
          animationSpeed: 50,
        },
        hover: {
          width: 4,
          color: "#3355bb",
          dasharray: "0",
          linecap: "butt",
          animate: false,
          animationSpeed: 50,
        },
        selected: {
          width: 3,
          color: "#dd8800",
          dasharray: "6",
          linecap: "round",
          animate: false,
          animationSpeed: 50,
        },
        gap: 5,
        type: "straight",
        margin: 2,
        marker: {
          source: {
            type: "none",
            width: 4,
            height: 4,
            margin: -1,
            offset: 0,
            units: "strokeWidth",
            color: null,
          },
          target: {
            type: "arrow",
            width: 4,
            height: 4,
            margin: -1,
            offset: 0,
            units: "strokeWidth",
            color: null,
          },
        },
      },
    })
    onMounted(async () => {
      const res = await fetch(`http://localhost:${store.serverPort}/get_tree/${store.userId}`)
      treeInfo.value  = await res.json()
      generateGraph()
    })

    const configs = reactive(initialConfigs)
    const generateGraph = () =>{
      const relationTranslate = {
        SON: 'Сын',
        DAUGHTER: 'Дочь',
        FATHER: 'Отец',
        MOTHER: 'Мать',
        WIFE: 'Супруга',
        HUSBAND: 'Супруг',
        BROTHER: 'Брат',
        SISTER: 'Сестра',
      }
      nodes.value = {}
      edges.value = {}
      const nameNodes = []
      treeInfo.value.forEach((relation,edgeIndex) => {
        const relative = relation.rel
        const start = relative.startNodeElementId === relation.start.elementId ? relation.start : relation.end
        const end = relative.startNodeElementId === relation.end.elementId ? relation.start : relation.end
        const startName = generateInfo(start.properties)
        const endName = generateInfo(end.properties)
        if(!nameNodes.includes(start.elementId)){
          nameNodes.push(start.elementId)
          nodes.value[`node${start.elementId}`] = {
            name: startName
          }
        }
        if(!nameNodes.includes(end.elementId)){
          nameNodes.push(end.elementId)
          nodes.value[`node${end.elementId}`] = {
            name: endName
          }
        }
        edges.value[`edge${edgeIndex}`] = {
          source: `node${start.elementId}`,
          target: `node${end.elementId}`,
          label: relationTranslate[relative.type]
        }
      })
    }
    return{
      nodes,
      edges,
      configs
    }
  }
}
</script>
