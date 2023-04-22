<template>
<div style="">
  <div style="float:left"> sadfsadf</div>
  <div style="float:right">:asfdasdf</div>
</div>
</template>
<script>
    export default {
          data () {
            return {
                modes: [
                    {
                        value: 'only',
                        label: 'only'
                    },
                    {
                        value: 'except',
                        label: 'except'
                    }
                ],
                model1: '',
                state:true
            }
        },      
      methods:{
        startDate(evt){
          console.log(evt)
        },
        endDate(evt){
          console.log(evt)
        },                
        selectMode(evt){
          console.log(this.model1)
        },
        createStriction(){
          console.log(this.state);
          this.state ? this.state = false : this.state = true
        }
      }
    }
</script>