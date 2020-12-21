<template>
  <Layout>
    <Icon name="left"></Icon>
    <span>编辑标签</span>
    <FormItem field-name="标签名" placeholder="请输入标签名"></FormItem>
    <Button>删除标签</Button>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import tagListModel from "@/models/tagListModel";
import {Component} from "vue-property-decorator";
import FormItem from "@/views/FormItem.vue";
import Button from "@/components/Button.vue";
@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue{
  created(){
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(t=>t.id===id)[0];
    if(tag){
      console.log(tag);
    }else{
      this.$router.replace('/404')
    }
  }
}
</script>

<style lang ="scss" scoped>

</style>