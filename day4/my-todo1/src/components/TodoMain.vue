<template>
  <div class="page">
    <header><h1>Vue Fire todo1</h1></header>
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
          <div class="write edit" v-else key="edit"><!-- 수정 -->
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
  methods: {
    addItem() {
      if (!this.addItemText) {return;}
      db.collection('todos').add({
        text: this.addItemText,
        state: 'yet'
      }).then(sn => {
        db.collection('todos').doc(sn.id).update({
          id: sn.id
        })
      });
      // this.todos.push({
      //   text: this.addItemText,
      //   state: 'yet'
      // })
      this.addItemText = '';
    },
    checkItem(idx) {
      this.todos[idx].state = this.todos[idx].state === 'yet' ? 'done' : 'yet';
    },
    editShow(idx) {
      this.crrEditText = idx,
      this.writeState = 'edit';
      this.editItemText = this.todos[idx].text;
      this.$refs.list.children[idx].classList.add('editing');
    },
    editSave() {
      if (!this.editItemText) {return;}
      // this.todos[this.crrEditText].text = this.editItemText;
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
      // this.todos.splice(idx, 1);
      db.collection('todos').doc(this.todos[idx].id).delete();
    },
  },
  mounted() {
    this.$refs.writeArea.focus();
    db.collection('todos').get().then((result) => {
      result.forEach((doc)=>{
          console.log(doc.data())
          this.todos.push(doc.data());
      })
    });
  },
  firestore: {
    todos: db.collection('todos')
  }
}
</script>

<style>

</style>