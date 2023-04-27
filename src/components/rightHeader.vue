<template>
    <div style="margin-left:15px"> 
        <div class="flex-item right-top mt-3" v-if="textType.includes(mSelectOneTypeProps)">
            <Button icon="md-arrow-round-back" class="border-btn" @click="mainPanel()"></Button>
            <h2 style="font-family: initial;margin-left:10px">T</h2>
            <Input style="margin-left:20px;width:75%">
            </Input>
        </div>
        <div class="flex-item right-top mt-3" v-if="imgType.includes(mSelectOneTypeProps)">
            <Button icon="md-arrow-round-back" class="border-btn left" @click="mainPanel()"></Button>
            <h2 style="margin-left:10px"><Icon type="ios-image" /></h2>
            <Input style="margin-left:20px;width:75%" ></Input>
        </div>
        <div class="flex-item right-top mt-3" v-if="rectType.includes(mSelectOneTypeProps)">
            <Button icon="md-arrow-round-back" class="border-btn left" @click="mainPanel()"></Button>
            <h2 style="margin-left:10px"><Icon type="ios-square-outline" /></h2>
            <Input style="margin-left:20px;width:75%" ></Input>
        </div> 
        <div class="flex-item right-top mt-3" v-if="circleType.includes(mSelectOneTypeProps)">
            <Button icon="md-arrow-round-back" class="border-btn left" @click="mainPanel()"></Button>
            <h2 style="margin-left:10px"><Icon type="ios-radio-button-off" /></h2>
            <Input style="margin-left:20px;width:75%"></Input>
        </div>
    </div>    
</template>

<script>
import select from '@/mixins/select';

export default {
    name: 'ToolBar',
    mixins: [select],
    props:['mSelectOneTypeProps'],
    data(){
        return{
            rectType:["rect"],
            circleType:["circle"],            
            imgType: ['image'],
            textType: ['i-text', 'textbox', 'text'],
        }        
    },
    methods:{
        
        mainPanel(){
            this.canvas.c.discardActiveObject();
            this.canvas.c.requestRenderAll();
        }

    }
}
</script>
<style scoped lang="less">
Button {
  padding: 0px 5px;
}
.box {
  width: 100%;
}

.flex-item {
  display: inline-flex;
  flex: 1;
  .label {
    width: 32px;
    height: 32px;
    line-height: 32px;
    display: inline-block;
    font-size: 14px;
    color: #333333;
  }
}
</style>