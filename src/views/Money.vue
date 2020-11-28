<template>
  <div>
    <Layout  class-prefix="layout">
      <NumberPads />
      <Types xxx = "hi"/>
      <Notes/>
      <Tags />
    </Layout>
  </div>

</template>

<script lang="ts">
import NumberPads from "@/views/NumberPads.vue";
import Types from "@/views/Types.vue";
import Notes from "@/views/Notes.vue";
import Tags from "@/views/Tags.vue";
export default {
name: "Money",
  components: {Tags, Notes, Types, NumberPads},
}
</script>

<style lang ="scss">
.layout-wrapper{

}
.layout-content{
  display: flex;
  flex-direction: column-reverse;
}
</style>

<style lang="scss" scoped>

</style>