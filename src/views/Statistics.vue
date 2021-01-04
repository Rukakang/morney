<template>
  <Layout>
    <Tabs :data-source="recodeTypeList" class-prefix="type" :value.sync="type"></Tabs>
    <Tabs :data-source="intervalList" class-prefix="interval" :value.sync="interval" height="48px"></Tabs>

    <div v-for="(group,index) in result" :key="index">
      <h3>{{group.title}}</h3>
      <ol>
        <li v-for="item in group.items" :key="item.id">
          {{item.amount}}  {{item.createAt}}
        </li>
      </ol>
    </div>
    <div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList";
import recodeTypeList from "@/constants/recodeTypeList";
@Component({
  components: {Tabs}
})
export default class Statistics extends Vue{
  get recodeList(){
    return (this.$store.state as RootState).recodeList;
  }
  get result(){

    const {recodeList} = this;
    type HashTableValue = {title: string;items: RecodeItem[]};
    const hashTable: {[key: string]: HashTableValue }={};
    for(let i = 0 ; i < recodeList.length; i++){
        const[date,time] =recodeList[i].createAt!.split('T');
        hashTable[date] = hashTable[date]||{title:date,items:[]};
        hashTable[date].items.push(recodeList[i]);
    }
    console.log(hashTable);
    return hashTable;
  }
  beforeCreate(){
    this.$store.commit('fetchRecodes');
  }
  type = '-';
  interval = 'day';
  intervalList=intervalList;
  recodeTypeList=recodeTypeList;
}
</script>

<style scoped lang="scss">
  //deep语法可以深入到里面,本来加了scoped是不可以的
  ::v-deep .type-tabs-item{
    background: white;
    border: 1px solid #ff0000;
    &.selected{
      background: #C4C4C4;
      &::after{
        display: none;
      }
  }
  }
  ::v-deep .interval-tabs-item{
   /* height: 48px;*/
  }


</style>