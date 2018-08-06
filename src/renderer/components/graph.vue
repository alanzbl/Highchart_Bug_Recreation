<template>
  <div id="app">
    <poc-graph ref="graph" ></poc-graph>
    <button @click="load">load Page</button>
    <button @click="loadBack">load background</button>
  </div>
</template>

<script>
import pocGraph from './poc-graph';
  export default {
    name: 'highchart-test',
    components:{
      pocGraph
    },
    data(){
      return{
        pubsub: null
      }
      
    },
    mounted(){
      this.SetUpPubSub();
    },

    methods:{
      SetUpPubSub: function(){
          if (this.$refs['graph'].getGraph()) {
            this.pubsub = require('electron').remote.require('electron-pubsub');
            console.log("successfully established!");
            this.pubsub.subscribe('test', this.TestFunc);
          }
      },
      TestFunc() {
        console.log('test function called');
      },
      load() {
        this.$router.push('/landingPage');
      },
      loadBack() {
        this.$router.push('/backPage');
      }
    },
    beforeDestroy() {
        console.log("graph page destroyed");
      this.pubsub.unsubscribe('test');
    }
  }
</script>

<style>
  /* CSS */
</style>
