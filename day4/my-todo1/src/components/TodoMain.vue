<template>
  <div class="page">
    <header><h1>Vue Fire todo1</h1></header>
    <main>
      <div class="todos">
        <div class="write">
          <input type="text" v-model="addItemText"/>
          <button class="btn add" @click.prevent="addItem">Add</button>
        </div>
        <ul class="list" v-for="todo,i in todos" :key="i">
          <li>
            <i class="fa-check-square" :class="(todo.state==='yet' ? 'far':'fas')"></i>
            <span>
              {{ todo.text }}
              <b>
                <a href="">Edit</a>
                <a href="">Del</a>
              </b>
            </span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addItemText: '',
      todos:[
        {text: '공부하기', state: 'yet'},
        {text: '운동하기', state: 'done'},
        {text: '글쓰기', state: 'done'},
      ]
    }
  },
  methods: {
    addItem() {
      if (!this.addItemText) {
        return;
      }
      this.todos.push({
        text: this.addItemText,
        state: 'yet'
      })
    },
  },
}
</script>

<style>

</style>