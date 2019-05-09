import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import vueVimeoPlayer from 'vue-vimeo-player'

Vue.config.productionTip = false
Vue.use(vueVimeoPlayer)

new Vue({
  render: h => h(App)
}).$mount('#app')
