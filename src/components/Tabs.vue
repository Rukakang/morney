<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.text"
        :class="liClass(item)"
        @click="select(item)"
    >{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from "vue-property-decorator";

type DataSourceItem = {text: string;value: string};
@Component
export default class Tabs extends Vue{
  @Prop({required:true,type:Array})dataSource!: DataSourceItem[];
  @Prop(String)readonly value!: string;
  @Prop(String) classPrefix?: string;

  liClass(item: DataSourceItem){
    return {[this.classPrefix + '-tabs-item']: this.classPrefix, selected: item.value === this.value} //加中括号才能写变量
  }
  select(item: DataSourceItem){
    this.$emit("update:value",item.value)
  }
}
</script>

<style lang ="scss" scoped>
.tabs{
  display: flex;
  text-align: center;
  font-size: 24px;
  background:#C4C4C4;
  >li{
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #333333;
    }
  }
}
</style>