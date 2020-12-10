<template>
  <div>
    <ul class="types">
      <li :class= "type ==='-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type ==='+' && 'selected'"  @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Types extends Vue {
  type = '-';
  @Prop(Number)xxx: number|undefined;
  //Prop告诉Vue: xxx不是data是prop;
  //Number告诉Vue xxx运行时是个Nmuber;
  //number|undefined 告诉TS xxx编译时类型；
  //xxx 属性名

  selectType(type: string){
    if(type !== '+' && type !== '-'){
      throw new Error('type is unknown')
    }
    this.type = type;
  }
  mounted(){
    if(this.xxx === undefined){
      console.log('undefined')
    }else {
      console.log(this.xxx.toString())
    }

  }
}


//lang="js"时的写法
/*export default {
  name: "Types",
  props:['xxx'],
  data(){
    return {type: "-"} //-表示支出，+表示收入
  },
  mounted() {
    console.log(this)
  },
  methods:{
    selectType(type){
      if(type !== '+' && type !== '-'){
        throw new Error('type is unknown')
      }
      this.type =type;
    }
  }
}*/
</script>

<style lang ="scss" scoped>
.types{
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