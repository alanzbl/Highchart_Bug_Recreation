<template>
  <div>
    <vue-highcharts :options="options" ref="lineCharts"></vue-highcharts>
  </div>
</template>
 
<script>
import VueHighcharts from 'vue2-highcharts'
import highcharts from 'highcharts';
const asyncData = {
  name: 'Tokyo',
  marker: {
    symbol: 'square'
  },
  data: [3, 212, 170, 29, 226, 100, 226, 30, 223, 241, 168, 255,
        19, 55, 115, 225, 95, 6, 133, 6, 91, 0, 0, 37, 121, 1, {
    y: 26.5,
    marker: {
      symbol: 'url(http://www.highcharts.com/demo/gfx/sun.png)'
    }
  }, 23.3, 18.3, 13.9, 9.6]
}
export default{
    components: {
        VueHighcharts
    },
    data(){
      return{
        pubsub: null,
        options: {
          chart: {
            type: 'spline'
          },
          title: {
            text: 'Monthly Average Temperature'
          },
          subtitle: {
            text: 'Source: WorldClimate.com'
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          yAxis: {
            title: {
              text: 'Temperature'
            },
            labels: {
              formatter: function () {
                return this.value + '°';
              }
            }
          },
          tooltip: {
            crosshairs: true,
            shared: true
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            spline: {
              marker: {
                radius: 4,
                lineColor: '#666666',
                lineWidth: 1
              }
            }
          },
          series: [asyncData]
        }
      }
    },
    mounted(){
      this.pubsub = require('electron').remote.require('electron-pubsub');
      this.pubsub.subscribe('pong', this.testFunction);
      this.pubsub.publish('test');
    },
    methods: {
        getGraph() {
            return (this.$refs['lineCharts'].chart);
        },
        testFunction(event, input){
          console.log('received: ' + input.point);
            let lineCharts = this.$refs.lineCharts.chart;
            lineCharts.series[0].addPoint(input.point, true, false, false);
        }

    },
    beforeDestroy() {
        console.log("graph destroyed");
      this.pubsub.unsubscribe('pong');
    }
}
</script>