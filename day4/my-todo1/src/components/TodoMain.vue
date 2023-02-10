<template>
  <div class="page">
    <header>
      <h1>
        Vue Fire todo1
        <span class="pie">
          <svg viewBox="0 0 64 64">
          <circle class="pie" r="32" cx="32" cy="32" style="stroke-width: 64;"></circle>
          <circle class="slice" r="32" cx="32" cy="32" 
            :style=" {
              strokeWidth: 64,
              strokeDasharray: totalTodo + ', 201',
              transition: 'all 0.2s linear',
            }"></circle>
         </svg>
        </span>
      </h1>
    </header>
    <main>
      <div class="todos">
        <transition name="fade">
          <div class="write add" v-if="writeState === 'add'"> <!-- 등록 -->
            <input 
              type="text" 
              v-model="addItemText" 
              @keyup.enter="addItem"
              ref="writeArea"/>
            <button class="btn add" @click.prevent="addItem">Add</button>
          </div>
          <div class="write edit" v-else key="edit"> <!-- 수정 -->
            <input 
              type="text" 
              v-model="editItemText" 
              @keyup.enter="editSave"
              ref="writeArea"/>
            <button class="btn add" @click.prevent="editSave">Save</button>
          </div>
        </transition>
        <ul class="list" ref="list">
          <li v-for="todo,i in todos" :key="i">
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
import {db} from '../firebase/db';

export default {
  data() {
    return {
      writeState: 'add',
      addItemText: '',
      editItemText: '',
      crrEditText: '',
      todos:[]
    }
  },
  computed: {
    totalTodo() {
      let totalNum = 0;
      this.todos.forEach(item => {
        if (item.state === 'done') {totalNum++;}
      });
      return (totalNum / this.todos.length) * 201; 
    }
  },
  methods: {
    addItem() {
      if (!this.addItemText) {return;}
      db.collection('todos').add({
        text: this.addItemText,
        state: 'yet',
        createdAt: new Date(),
      }).then(sn => {
        db.collection('todos').doc(sn.id).update({
          id: sn.id
        })
      });
      this.addItemText = '';
    },
    checkItem(idx) {
      let flag = this.todos[idx].state === 'yet' ? 'done' : 'yet';
      db.collection('todos')
        .doc(this.todos[idx].id)
          .update({
            state: flag
          });
    },
    editShow(idx) {
      this.crrEditText = idx,
      this.writeState = 'edit';
      this.editItemText = this.todos[idx].text;
      this.$refs.list.children[idx].classList.add('editing');
    },
    editSave() {
      if (!this.editItemText) {return;}
      db.collection('todos')
        .doc(this.todos[this.crrEditText].id)
          .update({
            text: this.editItemText
          });
      this.editItemText = ''
      this.writeState = 'add';
      this.$refs.list.children[this.crrEditText].className ='';
    },
    delItem(idx) {
      db.collection('todos').doc(this.todos[idx].id).delete();
    },
  },
  firestore: {
    todos: db.collection('todos').orderBy('createdAt','desc')
  }
}
</script>

<style>

</style>