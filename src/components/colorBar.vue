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
  inject: ['canvas', 'fabric'],
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
  methods: {
    clearColor(){
      const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
      workspace.set('fill', '');
      this.canvas.c.renderAll();
    },    
    getOriginSize(){
        var oldWorkspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
        var size = {originW:oldWorkspace.originW,originH:oldWorkspace.originH,left:oldWorkspace.left,top:oldWorkspace.top};
        return size;
    },
    oldBgRemove(){
        var oldWorkspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
        this.canvas.c.remove(oldWorkspace);
    },
    set_bg(){
      var shadow = new fabric.Shadow({
        color: "#d1d1d1",
        blur: 30,
        offsetX: 0,
        offsetY: 0,
      })               
      if(this.showColor == true){
        var oldSize = this.getOriginSize();
        this.oldBgRemove();
        var workspace = new fabric.Image();
        workspace.setSrc(transParent);    
        workspace.set({
          id: 'workspace',
          left:oldSize.left,
          top:oldSize.top,
          originW:oldSize.originW,
          originH:oldSize.originH,
          shadow:shadow
        });
        workspace.set('selectable', false);
        workspace.set('hasControls', false);        
        workspace.set("scaleX",oldSize.originW/this.canvas.editor.editorWorkspace.imageW);
        workspace.set("scaleY",oldSize.originH/this.canvas.editor.editorWorkspace.imageH);        
        this.canvas.c.add(workspace);
        setTimeout(() => {
          this.canvas.c.renderAll();  
          this.canvas.editor.editorWorkspace.workspace = workspace// this.auto();
        }, 200);        
        this.canvas.c.renderAll();  
        workspace.sendToBack();                   
        this.showColor = false;
      }else{

        var oldSize = this.getOriginSize();
        this.oldBgRemove();
        var workspace = new fabric.Rect({
          fill: '#ffffff',
          width:oldSize.originW,
          height:oldSize.originH,
          originW:oldSize.originW,
          originH:oldSize.originH,
          shadow:shadow,
          id: 'workspace',
        });

        workspace.set('selectable', false);
        workspace.set('hasControls', false);
        workspace.hoverCursor = 'selection';
        this.canvas.c.add(workspace);
        this.canvas.c.centerObject(workspace);
        this.canvas.c.renderAll();
        this.canvas.editor.editorWorkspace.workspace = workspace// this.auto();
        workspace.sendToBack();                   
        this.showColor = true;
      }
      // this.showColor ?this.showColor = false:this.showColor = true;
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
