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
    <div style="margin-top:100px;">
      <Grid square padding=15px>
        <GridItem>
          <div><img src="" style="width:100%;height:250px" id="image0"/><router-link to="/editor/edit/0"><Button style="margin-top:25px" type="primary">edit</Button></router-link></div>
        </GridItem>
        <GridItem>
          <div><img src="" style="width:100%;height:250px" id="image1"/><router-link to="/editor/edit/1"><Button style="margin-top:25px" type="primary">edit</Button></router-link></div>
        </GridItem>
        <GridItem>
          <div><img src="" style="width:100%;height:250px" id="image2"/><router-link to="/editor/edit/2"><Button style="margin-top:25px" type="primary">edit</Button></router-link></div>
        </GridItem>
      </Grid>   
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
import axios from "axios"
import { downFontByJSON } from '@/utils/utils';

const event = new EventHandle();
const canvas = {};
export default {
  name: 'Templates',
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

    // axios.get('http://localhost:3000/feed-image')
    //   .then(resp => {
    //       var data = resp.data['feed-image'];
    //       data.forEach((e ,i)=> {
    //       var jsonFile = JSON.stringify(data[i]);
    //       downFontByJSON(jsonFile).then(() => {
    //           canvas.c.loadFromJSON(jsonFile, () => {
    //             canvas.c.renderAll.bind(canvas.c);
    //               const workspace = canvas.c.getObjects().find((item) => item.id === 'workspace');
    //               const { left, top, width, height } = workspace;                  
    //               workspace.set('selectable', false);
    //               workspace.set('hasControls', false);
    //               canvas.c.requestRenderAll();
    //               canvas.c.renderAll();
    //               canvas.c.requestRenderAll();

    //               const option = {
    //                 name: 'New Image',
    //                 format: 'png',
    //                 quality: 1,
    //                 left,
    //                 top,
    //                 width,
    //                 height,
    //               };
    //               canvas.c.setViewportTransform([1, 0, 0, 1, 0, 0]);
    //               const dataUrl = canvas.c.toDataURL(option);
    //               document.getElementById("image"+i).src = dataUrl
    //           });
    //         });          

    //       });          

    //   })
    //   .catch(error => {
    //       console.log(error);
    // });   
  },
};
</script>
    