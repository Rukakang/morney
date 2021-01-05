<template>
  <Layout>
    <Tabs :data-source="recodeTypeList" class-prefix="type" :value.sync="type"></Tabs>
    <Tabs :data-source="intervalList" class-prefix="interval" :value.sync="interval" height="48px"></Tabs>
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{group.title}}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="recode">
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
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
  tagString(tag: Tag[]){
    if (tag.length === 0){
      return '无';
    }else{
      let newItem = '';
      for (let i = 0; i < tag.length; i++){
        if (tag[i].name){
          newItem +=tag[i].name+',';
        }

      }
      return newItem.substring(0,newItem.length-1);
    }
  }
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
  %item{
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title{
    @extend %item;
  }
  .recode{
    @extend %item;
    background: white;
  .notes{
    margin-right: auto;
    margin-left: 16px;
    color: #999999;
  }
  }


</style>