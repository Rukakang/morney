<template>
  <Layout>
    <div class="chartWrapper" ref="chartWrapper">
      <Chart class="chart" :options="x"></Chart>
    </div>
    <Tabs :data-source="recodeTypeList" class-prefix="type" :value.sync="type"></Tabs>
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{beautify(group.title)}}<span>￥{{group.total}}</span></h3>
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
import recodeTypeList from "@/constants/recodeTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from "@/components/Chart.vue";

//const oneDay = 86400*1000; //一天等于86400秒，js的单位是毫秒，所以再乘1000
@Component({
  components: {Chart, Tabs}
})
export default class Statistics extends Vue{
  mounted(){
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft=div.scrollWidth;
  }
  get x(){
    return{
      //grid用于控制折线图四周的空白
      grid:{
        left:0,
        right:0
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
          'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
          'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
          'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
          'Mon', 'Tue'],
        axisTick:{alignWithLabel:true},
        axisLine:{lineStyle:{color: '#666'}}
      },
      yAxis: {
        type: 'value',
        show:'false'
      },
      series: [{
        symbol:'circle',
        symbolSize:12,
        itemStyle:{color: '#666',borderColor:'#666'},
        data: [820, 932, 901, 934, 1290, 1330, 1320,
        820, 932, 901, 934, 1290, 1330, 1320,
        820, 932, 901, 934, 1290, 1330, 1320,
        820, 932, 901, 934, 1290, 1330, 1320,
        820, 932],
        type: 'line'
      }],
      tooltip:{show: true,triggerOn:'click',formatter:'{c}',position:'top'}
    }
  }
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
  get groupedList(){
    const {recodeList} = this;
    let newList = clone(recodeList).filter(r=>r.type===this.type);
        if(newList.length > 0){
          newList = newList.sort((a,b)=>dayjs(b.createAt).valueOf()-dayjs(a.createAt).valueOf());
          type Result = {title: string; total?: number; items: RecodeItem[]}[];
          const result: Result = [{title:dayjs(newList[0].createAt).format('YYYY-MM-DD'),items:[newList[0]]}];
          for (let i = 1; i < newList.length; i++){
            const current = newList[i];
            const last = result[result.length-1];
            if (dayjs(current.createAt).isSame(last.title,'day')){
              last.items.push(current);
            }else {
              result.push({title:dayjs(current.createAt).format('YYYY-MM-DD'),items:[current]});
            }
          }
          result.map(group=>{
            group.total = group.items.reduce((sum,item)=>{return sum + item.amount},0)
          })
          return result;
        }else{
          return [];
        }
  }
  beforeCreate(){
    this.$store.commit('fetchRecodes');
  }
  type = '-';
  interval = 'day';
  recodeTypeList=recodeTypeList;
}
</script>

<style scoped lang="scss">
.chart {
  width: 430%;
  &Wrapper{
    overflow: auto;
    &::-webkit-scrollbar{
      display: none;
    }
  }

}
  //deep语法可以深入到里面,本来加了scoped是不可以的
  ::v-deep .type-tabs-item{
    background: #C4C4C4;
    &.selected{
      background: white;
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