<template>
  <Layout>
    <Tabs :data-source="recodeTypeList" class-prefix="type" :value.sync="type"></Tabs>
    <Tabs :data-source="intervalList" class-prefix="interval" :value.sync="interval" height="48px"></Tabs>
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{beautify(group.title)}}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="recode">
            <span>{{tagString(item.tags)}}</span>
            <span class="itemNotes">{{item.notes}}</span>
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
import dayjs from "dayjs";

const oneDay = 86400*1000; //一天等于86400秒，js的单位是毫秒，所以再乘1000
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
  beautify(time: string){
    //js自带的date不好用，一般使用dayjs,yarn add dayjs,然后引用即可，dayjs是个api,可以进行链式操作;
    //dayjs(time)可以把toISOString以后的时间转换回中国时间，等价于new Date(Date.parse(time));
    const day = dayjs(time);
    const now =dayjs();//也可以写成const now =  new  Date();
    if(day.isSame(now,'day')){
        return '今天';
    }else if(day.isSame(now.subtract(1,'day'),'day')){ //subtract是dayjs的api
    //或者这样写 else if(dayjs(time).isSame(now.valueOf()-oneDay,'day')){
        return '昨天';
    }else if(day.isSame(now.subtract(2,'day'),'day')) {
        return '前天';
    }else if(day.isSame(now,'year')){
      return day.format('M月D日');
    }else{
      return day.format('YYYY年M月D日');
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
  .itemNotes{
    margin-right: auto;
    margin-left: 16px;
    color: #999999;
  }
  }


</style>