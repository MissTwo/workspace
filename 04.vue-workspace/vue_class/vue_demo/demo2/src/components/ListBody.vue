<template>
  <div>
    <ListItem
        v-for="(i,index) in list"
        :key="i.id"
        :item="i"
        :delete_item="receive_d"
        :check_item="check_item"/>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem";

export default {
  name: "ListBody",
  props:['list','receive_delete','check_item'],
  components: {
    ListItem,
  },
  methods:{
    receive_d(id){
      this.receive_delete(id)
    },

  }
};
</script>

<style scoped>

</style>