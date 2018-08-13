import Vue from 'vue'
import Router from 'vue-router'

import StartPage from '../components/StartPage.vue'

import Event from '../components/Event.vue'

import Events from '../components/Events.vue'
import EventList from '../components/EventList.vue'
import EventMap from '../components/EventMap.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: StartPage },
    {
      name: 'events',
      path: '/events',
      component: Events,
      children: [
        { name: 'events_map', path: 'map', component: EventMap },
        { name: 'events_list', path: 'list', component: EventList }
      ]
    },
    { name: 'event', path: '/events/:id', component: Event }
  ]
})
