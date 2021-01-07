<template>
  <div>
    <label class="formItem">
      <span class="name" >{{ fieldName }}</span>
      <!-- v-model=value等价于 :value=value @input="value=$event.target.value,即把数据绑定并赋值，使用prop时会有问题" -->
      <input type="text" :value="value"  @input ="onValueChanged($event.target.value)" :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from "vue-property-decorator";

@Component
export default class FormItem extends Vue{
  @Prop({default:''})readonly value!: string;
  @Prop()fieldName!: string;
  @Prop()placeholder?: string;

  onValueChanged(value: string){

    this.$emit('update:value',value)
  }
}

</script>

<style lang ="scss" scoped>
.formItem{
  font-size: 14px;
  padding-left:16px;
  display: flex;
  align-items: center;
  >.name{
    padding-right:16px ;
  }
  >input{
    height: 44px;
    border: none;
    background: transparent;
    flex-grow: 1;
    padding-right: 16px;
  }
}
</style>