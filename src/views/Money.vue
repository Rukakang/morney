<template>
  <div>
    <Layout  class-prefix="layout">
      <NumberPads :value.sync = "recode.amount" @submit="saveRecode"/>
      <Types :value.sync = "recode.type" />  <!-- 如果项这个type一样给了初始值，在子组件中又传回了值就可以改成用sync-->
      <div class="notes">
        <FormItem field-name="备注" placeholder="在这里输入备注" @update:value = "onUpdateNotes"/>
      </div>
      <Tags  @update:value="onUpdateTags"  />
    </Layout>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import NumberPads from "@/views/NumberPads.vue";
import Types from "@/views/Types.vue";
import FormItem from "@/views/FormItem.vue";
import Tags from "@/views/Tags.vue";
import {Component} from "vue-property-decorator";
import store from "@/store/index2";


@Component({
  components: {Tags, FormItem, Types, NumberPads}
})
export default class Money extends  Vue{
  tags = store.tagList;
  recodeList: RecodeItem[]= store.recodeList;
  recode: RecodeItem = {
    tags:[],notes:'',type:'-',amount:0
  }

  onUpdateTags(value: string[]){
    this.recode.tags=value;
  }
  onUpdateNotes(value: string){
    this.recode.notes = value;
  }
  saveRecode(){
    store.createRecode(this.recode);
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
.notes{
  padding: 12px 0;
}
</style>

<style lang="scss" scoped>

</style>