<template>
  <div id="app">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <div class="list" ref="mainList">
          <p class="message" v-for="(message, index) in list" :key="index"><span v-if="message.user" class="user-label">You: </span> <span v-if="!message.user" class="chatbot-label">Chatbot: </span> {{ message.text }}</p>
        </div>
        <div class="action">
          <el-input class="text" type="textarea" :rows="2" placeholder="Please input" v-model="message">
          </el-input>
          <el-button type="primary" @click="addMessage" :disabled="!allow">Default Button</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Aiml from 'aimlinterpreter'

export default {
  name: 'app',
  data () {
    return {
      message: '',
      list: [],
      allow: true,
      user: undefined
    }
  },
  methods: {
    addMessage () {
      if (!this.allow || !this.message.length) {
        return
      }

      this.allow = false

      this.list.push(
        {
          user: true,
          text: this.message
        }
      )
      this.scrollList()
      this.response()
      this.message = ''
    },
    response (mesage) {
      const _this = this
      setTimeout(function () {
        _this.list.push(
          {
            user: false,
            text: 'Some response'
          }
        )
        _this.allow = true
        _this.scrollList()
      }, 1000)
    },
    scrollList () {
      // this.$refs.mainList.scrollTop = this.$refs.mainList.scrollHeight
    }
  }
}
</script>

<style scoped>
#app {

}

.list {
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 20px;
  overflow-y: auto;
}

.action {
  text-align: right;
}

.user-label {
  font-weight: 600;
  color: red;
}

.chatbot-label {
  font-weight: 600;
  color: blue;
}

.text {
  margin-bottom: 10px;
}

.message {
  word-wrap: break-word;
  margin-bottom: 5px;
}
</style>
