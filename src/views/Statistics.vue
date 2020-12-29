<template>
  <Layout>
    <Tabs :data-source="typeList" class-prefix="type" :value.sync="type"></Tabs>
    <Tabs :data-source="intervalList" class-prefix="interval" :value.sync="interval"></Tabs>
    <div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from "vue-property-decorator";
import Types from "@/views/Types.vue";
import Tabs from "@/components/Tabs.vue";
@Component({
  components: {Tabs, Types}
})
export default class Statistics extends Vue{
  type = '-';
  interval = 'day';
  intervalList=[
      {text:"按天",value:"day"},
      {text:"按周",value:"week"},
      {text: "按月",value:"month"}
  ];
  typeList=[
    {text:"支出",value:"-"},
    {text:"收入",value:"+"},
  ]

}
</script>

<style scoped lang="scss">
  //deep语法可以深入到里面,本来加了scoped是不可以的
  ::v-deep .type-tabs-item{
    background: white;
    border: 1px solid red;
    &.selected{
      background: #C4C4C4;
      &::after{
        display: none;
      }
  }
  }


</style>