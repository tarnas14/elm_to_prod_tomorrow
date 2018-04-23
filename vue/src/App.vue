<template lang="html">
  <div>
    <div id="focus-mode"></div>
    <tab-bar @filter="onFilter" :colors="colors"></tab-bar>
    <ul>
    <item v-for="item in todoList.filter((x) => filter === 'all' ? x : filter === 'starred' ? x.starred : filter === x.color)"
          :key="item.id" :data="item" :colors="colors" :filter="filter"
          @check="onCheck(item.id)" @color-change="onColorChange(item.id)" @new-color="onNewColor"
          @star-change="onStarChange(item.id)" @remove="onRemove(item.id)" @focus="onFocus(item.id)"></item>
    </ul>
    <add-form @add-item="addItem"></add-form>
    <button @click="focus">focus</button>
  </div>
</template>

<script>
import Item from './Item.vue'
import TabBar from './TabBar.vue'
import AddForm from './AddForm.vue'
import {Main} from './elmfocus/Main.elm'

console.log(Main)

let startArray = [
  {text: 'Add Todo Items with the + Button', color: 'ice',
  checked: false, focused: false, starred: false, id: 1},
  {text: 'Star Items for Priority', color: 'jewel',
   checked: true, focused: false, starred: true, id: 2 },
  {text: 'Filter Items by Color or Star', color: 'tang',
   checked: false, focused: false, starred: true, id: 3 },
   {text: 'All Saved in Local Browser Storage', color: 'ice', checked: true, starred: false, id: 4}
]

let elmApp

export default  {
  props: ['stored-id', 'stored-data'],
  components: { AddForm, Item, TabBar },
  mounted: function () {
    const node = document.getElementById('focus-mode')
    elmApp = Main.embed(node)
    elmApp.ports.done.subscribe(id => this.onCheck(id, true))
  },
  data: function(){
    return {
      colors: ['all', 'ice', 'tang', 'jewel', 'rose'],
      newId: this.storedId || 5,
      todoList: this.storedData || startArray,
      filter: 'all',
      recentColor: 'ice'
    }
  },
  watch: {
    todoList: {
      handler: function(){ this.$emit('update-list', this.todoList)},
      deep: true
    }
  },
  methods: {
    onFilter: function(filter){
      this.filter = filter
      if(filter !== 'all' && filter !== 'starred'){
        this.recentColor = filter
      }
    },
    onCheck: function(id, force){
      let el = this.todoList.find((x) => x.id === id)
      el.checked = force || !el.checked
      el.focused = !el.checked && el.focused
    },
    onColorChange: function(id){
      let el = this.todoList.find((x) => x.id === id)
      el.color = this.recentColor
    },
    onNewColor: function(color){
      this.recentColor = color
    },
    onFocus: function(id){
      let el = this.todoList.find((x) => x.id === id)
      el.focused = !el.focused
    },
    focus: function(){
      elmApp.ports.todos.send(this.todoList.filter(todo => todo.focused).map(todo => Object.assign({}, todo, {title: todo.text})))
    },
    onStarChange: function(id){
      let el = this.todoList.find((x) => x.id === id)
      el.starred = !el.starred
    },
    onRemove: function(id){
      let el = this.todoList.find((x) => x.id === id)
      let idx = this.todoList.indexOf(el)
      this.todoList.splice(idx, 1)
    },
    addItem: function(text){
      this.todoList.push({
        text: text,
        color: this.recentColor,
        checked: false,
        starred: false,
        id: this.newId
      })
      this.newId++
      this.$emit('update-id', this.newId)
    }
  }
}
</script>

<style lang="css">
</style>
