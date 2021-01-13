<template>
  <div>
    <label class="formItem">
      <span class="name" >{{ fieldName }}</span>
      <template v-if="type ==='datetime-local'">
       <input :type="type||'text'" :value="x(value)"  @input ="onValueChanged($event.target.value)" :placeholder="placeholder">
      </template>
      <template v-else>
        <!-- v-model=value等价于 :value=value @input="value=$event.target.value,即把数据绑定并赋值，使用prop时会有问题" -->
        <input :type="type||'text'" :value="value"  @input ="onValueChanged($event.target.value)" :placeholder="placeholder">
      </template>

    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from "vue-property-decorator";
import dayjs from "dayjs";

@Component
export default class FormItem extends Vue{
  @Prop({default:''})readonly value!: string;
  @Prop()fieldName!: string;
  @Prop()placeholder?: string;
  @Prop()type?: string;

  x(iosString: string){
    return dayjs(iosString).format('YYYY-MM-DDTHH:mm')
  }
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