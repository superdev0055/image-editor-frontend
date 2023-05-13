<template>
<div>
  <div style="display:none">
    <div>asdfasdf</div>
      <div id="workspace" style="width: 920px;height:500px; position: relative; background: #f1f1f1;">
        <div class="canvas-box">
          <div class="inside-shadow"></div>
          <div class="coordinates-bar coordinates-bar-top" style="width: 100%"></div>
          <div class="coordinates-bar coordinates-bar-left" style="height: 100%"></div>
          <canvas id="canvas"></canvas>
        </div>
      </div>
    </div>
    <div class="templateBox">
      <div
        id="main"
        class="template-content"
        v-for="(item, index) in user_templates"
        :key="index"
        >
        
          <router-link :to="'/editor/edit/'+item.template_id">
            <div class="image-box" imgId = {{item.template_id}}>
              <img v-bind:src="item.template_image_url" style="width:150px;height:150px;"/>
            </div>
          </router-link>

      </div>      
    </div>
  </div>

</template>
<script>
// import element
// functional components
import EventHandle from '@/utils/eventHandler';
import EditorWorkspace from '@/core/EditorWorkspace';

import { fabric } from 'fabric';
import Editor from '@/core';
import {getAllUserTemps} from "@/service/endpoint";
const event = new EventHandle();
const canvas = {};
export default {
  name: 'Templates',
  data(){
    return{
      user_templates:[]
    }
  },
  mounted() {
    
    this.canvas = new fabric.Canvas('canvas', {
      fireRightClick: true,
      stopContextMenu: true,
      controlsAboveOverlay: true,
    });

    canvas.c = this.canvas;
    event.init(canvas.c);
    canvas.editor = new Editor(canvas.c);
    this.show = true;
    this.$Spin.hide();      
    canvas.c.renderAll();
    canvas.editor.editorWorkspace = new EditorWorkspace(canvas.c, {
      width: 900,
      height: 900,
    });
    
    getAllUserTemps().then((resp)=>{
      var data = resp.data;
      data.forEach((e ,i)=> {
        var template_id = data[i].template_id;
        var template_name = data[i].template_name;
        var template_image_url = data[i].template_image_url;

        this.user_templates.push({
          template_id:template_id,
          template_name:template_name,
          template_image_url:template_image_url
        });         
      });
    }).catch(error => {
          console.log(error);
    });      
  },
};
</script>
<style scoped>
.templateBox{
  display: flex;
  margin-top:100px;
  width:80%;
  padding:30px;
  border:1px solid black  
}

#main {
  display: flex;
  flex-wrap: wrap;
  float:left;
  margin-top:20px;
}

.image-box{
  width:180px;
  height:200px;
  border-radius:10px;
  border: 1px solid #c3c3c3;
  cursor: pointer;  
  text-align: center;
  padding:10px;
}
.image-item{
  width:150px;
  height:150px;
  margin-left:auto;
}
.template-style{
  border-radius:10px;
  cursor: pointer;
}
</style>