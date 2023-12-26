<template>
  <div class="list-container">
    <div v-for="(item,index) in list" :key="index">
      <span class="number">{{ index + 1 }}</span>
      <span class="name">{{ item.name }}</span>
      <span class="phone">{{ item.phone }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      default(){
        return [];
      }
    },
    
  }
}
</script>

<style scoped>
  .list-container {
    margin: 24px 5px 0 5px;
  }
  .list-container > div {
    display: flex;
    justify-content: space-between;
  }
  .list-container > div > span {
    /* border: 1px solid #eee; */
    border-radius: 4px;
    padding: 8px;
    margin-top: 8px;
  }
  .list-container .name {
    width: 25%;
  }
  .list-container .phone {
    width: 60%;
  }
</style>