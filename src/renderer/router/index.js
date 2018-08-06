import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/graph',
      name: 'poc-graph',
      component: require('@/components/graph').default
    },
    {
      path: '/landingPage',
      name: 'landingPage',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/backPage',
      name: 'backPage',
      component: require('@/components/background').default
    },
    {
      path: '*',
      redirect: '/landingPage'
    }
  ]
})
