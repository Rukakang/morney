<template>
  <div>
    <Layout  class-prefix="layout">
      <NumberPads :value.sync = "recode.amount" @submit="saveRecode"/>
      <Types :value.sync = "recode.type" />  <!-- 如果项这个type一样给了初始值，在子组件中又传回了值就可以改成用sync-->
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
import {Component, Watch} from "vue-property-decorator";
const model = require('@/model.js').default;

const recodeList: Recode[] = model.fetch();
type Recode ={
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createaAt?: Date;
}
@Component({
  components: {Tags, Notes, Types, NumberPads}
})
export default class Money extends  Vue{
  tags = ['衣','食','住','行'];
  recodeList: Recode[]= recodeList;
  recode: Recode = {
    tags:[],notes:'',type:'-',amount:0
  }

  onUpdateTags(value: string[]){
    this.recode.tags=value;
  }
  onUpdateNotes(value: string){
    this.recode.notes = value;
  }
  saveRecode(){
    //深拷贝以后再push 到数组中，否则，
    // recode每改变一次，loacalstorage中存着的recode都会改变，因为recode是地址，该地址里面变量值变了，所有引用这个对象的值都变了
    const recode2: Recode = JSON.parse(JSON.stringify(this.recode));
    recode2.createaAt = new Date();
    this.recodeList.push(recode2);
    //localStorage.setItem('recodeList',JSON.stringify(this.recodeList)) //不太合适，每次修改recode都会改变，应该watch
  }
  @Watch('recodeList')
  onRecodeListChanged(){
    model.save(this.recodeList)
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