<template>
<ul class="list">
  <li v-for="item,i in chipsData" :key="item.title">
    <img :src="require(`@/assets/${item.img}`)" />
    <strong>{{item.title}}</strong>
    <span>{{item.desc}}</span>
    <b>{{item.price}}</b>
    <button @click="add(i)">구입하기</button>
  </li>
</ul>
</template>

<script>
export default {
  props:['chipsData'],
  methods: {
    add(idx) {
      this.$emit('add-item',idx);
    },
  },
}
</script>

<style>

</style>