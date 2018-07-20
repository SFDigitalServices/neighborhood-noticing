import Vue from 'vue'
import Router from 'vue-router'

import StartPage from '../components/StartPage.vue'
import NoticesMap from '../components/NoticesMap.vue'
import EventPane from '../components/EventPane.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: StartPage },
    { name: 'map', path: '/map', component: NoticesMap },
    { name: 'event', path: '/event/:id', component: EventPane }
  ]
})
