import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tableData: []
  },
  mutations: {
    SET_TODO_LIST(state, todoList) {
      state.tableData = todoList
    },
    UPDATE_TODO(state, todo) {
      const index = state.tableData.findIndex(({ id }) => id === todo.id)
      const deleteCount = index === -1 ? 0 : 1
      state.tableData.splice(index, deleteCount, todo)
    },
    REMOVE_TODO(state, removeId) {
      state.tableData = state.tableData.filter(todo => todo.id !== removeId)
    },
    CREATE_TODO(state, newTodo) {
      state.tableData.push(newTodo)
    }
  },
  actions: {
    createTodo(context, item) {
      context.commit('CREATE_TODO', item)
    },
    removeTodo(context, item) {
      context.commit('REMOVE_TODO', item)
    },
    updateTodo(context, item) {
      context.commit('UPDATE_TODO', item)
    },
    getTodoList(context, item) {
      context.commit('SET_TODO_LIST', item)
    }
  },
  getters: {
    // getTodoListFromServer: state => state.tableData
  }
})
