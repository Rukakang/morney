<template>
  <div>
    <Layout  class-prefix="layout">
      <NumberPads :value.sync = "recode.amount" @submit="saveRecode"/>
      <Tabs :data-source="recodeTypeList" :value.sync ="recode.type"></Tabs>
      <div class="createAt">
        <FormItem type="date" field-name="日期" placeholder="在这里输入日期" :value.sync="recode.createAt"/>
      </div>
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
import FormItem from "@/views/FormItem.vue";
import Tags from "@/views/Tags.vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recodeTypeList from "@/constants/recodeTypeList";
import dayjs from "dayjs";


@Component({
  components: {Tabs, Tags, FormItem,  NumberPads},
  //可以在store.recodeList发生改变时,让recodeList同步改变,理论上对象存的是地址,赋值也没问题,
  // 但是如果是变量,存的是值,采用赋值写法,当store.recodeList发生改变时,变量值不会同步,所以统一改写成放到computer里
  /*computed:{
    recodeList(){
      return this.$store.state.recodeList;
    }
  }*/
})
export default class Money extends  Vue{
  recodeTypeList = recodeTypeList;
  recode: RecodeItem = {
    tags:[],notes:'',type:'-',amount:0, createAt: dayjs(new Date()).format('YYYY-MM-DD')
  }
  get recodeList(){
    return this.$store.state.recodeList;
  }
  created(){
    this.$store.commit('fetchRecodes')
  }
  onUpdateTags(value: Tag[]){
    this.recode.tags=value;
  }
  onUpdateNotes(value: string){
    this.recode.notes = value;
  }
  saveRecode(){
    if (!this.recode.tags || this.recode.tags.length ===0){
      return window.alert('请至少选择一个标签');
    }
    console.log(this.recode);
    this.$store.commit('createRecode',this.recode);

    if (this.$store.state.createRecodeError === null){
      this.recode.notes = '';
    }
  }
}
</script>

<style lang ="scss" >
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