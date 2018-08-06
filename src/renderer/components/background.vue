<template>
  <div id="app">
    <input v-model.number="amountToAdd" type="number">
    <button @click="AddMore">Add</button>
  </div>
</template>

<script>
import HighchartPoint from './HighchartPoint';
  export default {
    components:{
    },
    data(){
      return{
        amountToAdd: 100,
        pubsub: null
      }
      
    },
    mounted(){
            this.pubsub = require('electron').remote.require('electron-pubsub');

    },

    methods:{
      AddMore(){
        console.log("msg sent!");
        const data = new HighchartPoint();
        this.pubsub.publish('pong', data);
      },
    },
    beforeDestroy() {
        console.log("background page destroyed");
    }
  }
</script>

<style>
  /* CSS */
</style>
