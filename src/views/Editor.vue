<template>
  <div class="home">
    <header class="header text-center row" style="width: 100%;z-index:100000">
      <div class="">

        <div style="text-align: left; cursor:pointer" @click="modal = true">
            <Icon type="ios-create-outline" style="font-weight: bolder;"/>
            <span style="font-weight: bolder;">Custom image template</span>
        </div>
        <Modal
          v-model="modal"
          title="Name"
          :on-ok="saveName"
          >
          <div class="row">

            <label class="col-md-3">Name</label>
            <b-form-input class="col-md-8" size="sm" v-model="canvasName"></b-form-input>

          </div>
        </Modal>          
      </div>
      <div class="col-6">
        <!-- <Button class="ivu-btn ivu-btn-text" icon="ios-flash" size="small">Liver Preview</Button>
        <Button class="ivu-btn ivu-btn-text" icon="md-grid" size="small">Design Mode</Button> -->
      </div>
      <!-- <div class="col-3" style="text-align: right;"> -->
        <!-- <button class="ivu-btn ivu-btn-primary ivu-btn-circle ivu-btn-icon-only" type="button">
            <Icon type="md-person" />
        </button>
      </div> -->
    </header>
    <div>
      <Content style="display: flex; height: calc(100vh - 64px);">
        
        <!-- --------------------------------- Import Button(+) ----------------------------------- -->
        <Dropdown class="m-md-4 plus-btn" v-if="show" placement="bottom-start">
            <Button type="primary" icon="md-add" />
            <template #list>
              <DropdownMenu>
                  <import-file></import-file>
                  <tools></tools>
              </DropdownMenu>
            </template>
        </Dropdown>
        <!-- --------------------------------- End Import Button(+) ----------------------------------- -->

        <!-- --------------------------------- Left Side ----------------------------------- -->
        <div id="workspace">
          <!-- <div class="canvas-box"> -->
          <div>
            <div class="inside-shadow">
            
            </div>
            <div v-if="ruler" class="coordinates-bar coordinates-bar-top" style="width: 100%">
            
            </div>
            <div v-if="ruler" class="coordinates-bar coordinates-bar-left" style="height: 100%">
            
            </div>

            <!-- --------------------------------- Main Content ----------------------------------- -->
            <canvas id="canvas" :class="ruler ? 'design-stage-grid' : ''"></canvas>
            <!-- --------------------------------- End Main Content ----------------------------------- -->

            <!-- --------------------------------- Footer ----------------------------------- -->
            <footer class="bottomBar" v-if="show">
              <zoom></zoom>
            </footer>
            <!-- --------------------------------- End Footer ----------------------------------- -->
          </div>
        </div>
        <!-- --------------------------------- End Left Side ----------------------------------- -->
         <!-- --------------------------------- Right Side ----------------------------------- -->
        <div class="right-box">
          <div v-if="show">
            <set-size :canvasName="this.canvasName"></set-size> 
          </div>
            <attribute v-if="show"></attribute>
        </div>
        <!-- --------------------------------- End Right Side ----------------------------------- -->
      </Content>
    </div>
  
  </div>
  
</template>
<script>

// import element
import importFile from '@/components/importFile.vue';

// top assembly
import save from '@/components/save.vue';
import zoom from '@/components/zoom.vue';
// left component
import tools from '@/components/tools.vue';
import setSize from '@/components/setSize.vue';

// right side component
import attribute from '@/components/attribute.vue';

// functional components
import EventHandle from '@/utils/eventHandler';

import "@/assets/css/main.css"

import { fabric } from 'fabric';
import Editor from '@/core';

const event = new EventHandle();
event.setMaxListeners(0)
const canvas = {};
export default {
  name: 'Editor',
  provide() {
    return {
      "canvas":canvas,
      "fabric":fabric,
      "event":event,
      "path":this.$route.path,
      "param_id":this.$route.params.id,
      "canvasName":this.canvasName
    }
  },
  data() {
    return {
      canvasName:'',
      modal: false,
      show: false,
      select: null,
      ruler: true,
      param_id:this.$route.params.id
    };
  },
  components: {
    setSize,
    tools,
    attribute,
    importFile,
    save,
    zoom,
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
    setTimeout(() => {
      console.log(canvas.c.template_name);
      this.canvasName = canvas.c.template_name
    },2000);
  },
  
};
</script>
<style scoped lang="less">

#canvas {
  filter: drop-shadow(0px 5px 10px #d1d1d1);
}
span {
  font-size: 12px !important;
}
.bottomBar {
  margin: auto; 
  background-color: white;
  position: absolute;
  right: 10px;
  bottom: 10px;
  width:95%;
  padding: 10px;
  border-radius:10px
}

</style>