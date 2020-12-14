<template>
  <div>
    <Layout  class-prefix="layout">
      <NumberPads :value.sync = recode.amount />
      <Types :value.sync = recode.type />  <!-- 如果项这个type一样给了初始值，在子组件中又传回了值就可以改成用sync-->
      <Notes @update:value = "onUpdateNotes"/>
      <Tags :data-source.sync="tags" @update:value="onUpdateTags"  />
    </Layout>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import NumberPads from "@/views/NumberPads.vue";
import Types from "@/views/Types.vue";
import Notes from "@/views/Notes.vue";
import Tags from "@/views/Tags.vue";
import {Component} from "vue-property-decorator";

type Recode ={
  tags: string[];
  notes: string;
  type: string;
  amount: number;
}
@Component({
  components: {Tags, Notes, Types, NumberPads}
})
export default class Money extends  Vue{
  tags = ['衣','食','住','行'];
  recode: Recode = {
    tags:[],notes:'',type:'-',amount:0
  }

  onUpdateTags(value: string[]){
    this.recode.tags=value;
  }
  onUpdateNotes(value: string){
    this.recode.notes = value;
  }

}
</script>

<style lang ="scss">
.layout-wrapper{

}
.layout-content{
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>

</style>