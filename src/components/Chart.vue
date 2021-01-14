<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from  'vue';
import {Component, Prop} from "vue-property-decorator";
const echarts =require ('echarts');

@Component
export default class Chart extends Vue{
  @Prop()options?: any;
  mounted(){
    //常规写法
    //const myChart = echarts.init(document.getElementsByClassName('wrapper')[0]);
    //ref写法
    const myChart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    myChart.setOption(this.options);
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  height: 400px;
}
</style>