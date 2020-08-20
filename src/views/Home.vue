<template>
  <main>
    <div class="container">
      <div class="table-wrapper">
        <div class="columns todo-input">
          <div class="column is-10">
            <input class="input" type="text" placeholder="Add new task" v-model="input" autofocus />
          </div>
          <div class="column is-2">
            <button class="button is-primary is-fullwidth" @click="inputHandler" :disabled="!input">Add</button>
          </div>
        </div>
        <div class="columns todo-list">
          <div class="column is-12">
            <table class="table is-hoverable is-fullwidth" v-if="tableData.length">
              <tbody>
                <tr v-for="item in tableData" :key="item.id">
                  <th>
                    <label class="checkbox">
                      <input v-model="item.isDone" type="checkbox" @click="completeHander(item.id)" />
                    </label>
                  </th>
                  <td class="item-value">{{ item.value }}</td>
                  <td class="item-remove-btn">
                    <span class="icon" @click="removeHandler(item.id)">
                      <i class="fas fa-times fa-lg"></i>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <p v-else>No items</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from 'vuex'
import { getTodoList, createTodo, removeTodo, updateTodo } from '@/api/index'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      input: ''
    }
  },
  computed: {
    ...mapState(['tableData'])
  },
  methods: {
    ...mapActions(['createTodo', 'removeTodo', 'updateTodo', 'getTodoList']),
    inputHandler() {
      const newTodo = { isDone: false, value: this.input }
      return createTodo(newTodo)
        .then(res => this.createTodo(res.data))
        .then((this.input = ''))
        .catch(error => console.log(error))
    },
    removeHandler(id) {
      return removeTodo(id)
        .then(res => {
          const [item] = res.data
          this.removeTodo(item.id)
        })
        .catch(error => console.log(error))
    },
    completeHander(id) {
      const [item] = this.tableData.filter(item => item.id === id)
      item.isDone = !item.isDone
      return updateTodo(item)
        .then(res => this.updateTodo(res.data))
        .catch(error => error)
    },
    init() {
      return getTodoList()
        .then(res => this.getTodoList(res.data))
        .catch(error => {
          console.log(error)
        })
    }
  },
  beforeMount() {
    this.init()
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables';

.container {
  padding: 0 20px;
  .table-wrapper {
    border: 1px solid lightgrey;
    border-radius: $border-radius;
    padding: 12px;
    background-color: $white;
    .todo-input {
      border-bottom: 1px solid lightgray;
    }
    .todo-list {
      p {
        text-align: center;
      }
      table {
        tbody {
          tr {
            .item-remove-btn {
              span {
                cursor: pointer;
                opacity: 0;
              }
            }
            .item-value {
              width: 90%;
            }
            th {
              width: 5%;
            }
          }
        }
      }
    }
  }
}
.table.is-hoverable tbody tr:not(.is-selected):hover {
  .item-remove-btn {
    span {
      opacity: 1;
    }
  }
}
</style>
