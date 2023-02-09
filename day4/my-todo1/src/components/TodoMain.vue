<template>
  <div class="page">
    <header><h1>Vue Fire todo1</h1></header>
    <main>
      <div class="todos">
        <div class="write" v-if="writeState === 'add'"> <!-- 등록 -->
          <input 
            type="text" 
            v-model="addItemText" 
            @keyup.enter="addItem"
            ref="writeArea"/>
          <button class="btn add" @click.prevent="addItem">Add</button>
        </div>
        <div class="write" v-else><!-- 수정 -->
          <input 
            type="text" 
            v-model="editItemText" 
            @keyup.enter="editSave"
            ref="writeArea"/>
          <button class="btn add" @click.prevent="editSave">Save</button>
        </div>
        <ul class="list" v-for="todo,i in todos" :key="i">
          <li>
            <i 
              @click="checkItem(i)"
              class="fa-check-square" :class="(todo.state==='yet' ? 'far':'fas')"></i>
            <span>
              {{ todo.text }}
              <b>
                <a href="" @click.prevent="editShow(i)">Edit</a>
                <a href="" @click.prevent="delItem(i)">Del</a>
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
      writeState: 'add',
      addItemText: '',
      editItemText: '',
      crrEditText: '',
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
      this.addItemText = ''
    },
    checkItem(idx) {
      this.todos[idx].state = this.todos[idx].state === 'yet' ? 'done' : 'yet';
    },
    editShow(idx) {
      this.crrEditText = idx,
      this.writeState = 'edit';
      this.editItemText = this.todos[idx].text;
    },
    editSave() {
      if (!this.editItemText) {
        return;
      }
      this.todos[this.crrEditText].text = this.editItemText;
      this.editItemText = ''
      this.writeState = 'add';
    },
    delItem(idx) {
      this.todos.splice(idx, 1);
    },
  },
  mounted() {
    this.$refs.writeArea.focus();
  }
}
</script>

<style>

</style>