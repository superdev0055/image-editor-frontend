<template>
  <div v-if="!mSelectMode" style="float:right;margin-top:22px">
    <Button @click="set_bg" size="small">{{bg_set_title}}</Button>
    <ColorPicker v-if="showColor" v-model="color" @on-change="setThisColor" alpha size="small" transfer />
  </div>
</template>

<script>
import select from '@/mixins/select';
import {transParent} from '@/utils/imgConstant';
export default {
  name: 'bgBar',
  // inject: ['canvas', 'fabric'],
  mixins: [select],
  data() {
    return {
      bg_set_title:"Add color",
      showColor: false,
      color: '',
      imgFile: '',
      colorList: [
        {
          label: ('scenary_x', { number: 1 }),
          color: ['#5F2B63', '#B23554', '#F27E56', '#FCE766'],
        },
        {
          label: ('scenary_x', { number: 2 }),
          color: ['#86DCCD', '#E7FDCB', '#FFDC84', '#F57677'],
        },
        {
          label: ('scenary_x', { number: 3 }),
          color: ['#5FC2C7', '#98DFE5', '#C2EFF3', '#DDFDFD'],
        },
        {
          label: ('scenary_x', { number: 4 }),
          color: ['#9EE9D3', '#2FC6C8', '#2D7A9D', '#48466d'],
        },
        {
          label: ('scenary_x', { number: 5 }),
          color: ['#61c0bf', '#bbded6', '#fae3d9', '#ffb6b9'],
        },
        {
          label: ('scenary_x', { number: 6 }),
          color: ['#ffaaa5', '#ffd3b6', '#dcedc1', '#a8e6cf'],
        },
      ],
    };
  },
  mounted(){
    this.canvas.c.on('after:render', this.setBgState); 
    // this.canvas.c.on('after:render', function(){
    //   if(this.canvas){
    //     console.log("asdf")
    //     console.log(this.canvas.c.getObjects())
    //   }
    // });
    // showColor
  },
  methods: {
    setBgState(){
      // console.log(this.canvas.c)
      console.log(this.canvas.c.getObjects())
      var obj = this.canvas.c.getObjects();
      obj.forEach((item)=>{
        if(item.id == "workspace"){
          if(item.fill == ""){
            this.showColor = false;
          }else{
            this.showColor = true;
            console.log(item)
            this.color = item.fill
          }
        }
      })
    },    
    clearColor(){
      const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
      workspace.set('fill', '');
      this.canvas.c.renderAll();
    },    
    // getOriginSize(){
    //     var oldWorkspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
    //     var size = {originW:oldWorkspace.originW,originH:oldWorkspace.originH,left:oldWorkspace.left,top:oldWorkspace.top};
    //     return size;
    // },
    // oldBgRemove(){
    //     var oldWorkspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
    //     this.canvas.c.remove(oldWorkspace);
    // },
    set_bg(){
      var objs = this.canvas.c.getObjects().filter((item)=>{
        return item.id == "workspace";
      });      
      if(this.showColor == true){
        this.showColor = false;
        objs[0].set("fill", "");
        this.canvas.c.renderAll();              
      }else{
        this.showColor = true;
        objs[0].set("fill", "#ffffff");
        this.canvas.c.renderAll();
      }
    },
    // background color setting
    setThisColor() {
      this.setColor(this.color);
    },
    // background color setting
    setColor(color) {
      const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
      workspace.set('fill', color);
      this.canvas.c.renderAll();
    },
  },
};
</script>
