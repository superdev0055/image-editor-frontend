<template>
  <div class="home">
    <header class="header text-center">

      <Button icon="md-arrow-round-back" class="left-btn" @click="selectM()"></Button>
      <img src="@/assets/img/person.png" class="img-person" />
      <div style="">
        <Button icon="ios-flash" size="small">Liver Preview</Button>
        <Button icon="md-grid" size="small">Design Mode</Button>
      </div>
    </header>    
    <Content style="display: flex; height: calc(100vh - 64px)">
    <Dropdown class="m-md-4 plus-btn" v-if="show" placement="bottom-start">
        <Button type="primary" icon="md-add">
        </Button>
        <template #list>
          <DropdownMenu>
              <import-file></import-file>
              <tools></tools>
          </DropdownMenu>
        </template>
    </Dropdown>
      <div id="workspace" style="width:70%; position: relative; background: #f1f1f1;">
        <div class="canvas-box">
          <div class="inside-shadow"></div>
          <div v-if="ruler" class="coordinates-bar coordinates-bar-top" style="width: 100%"></div>
          <div v-if="ruler" class="coordinates-bar coordinates-bar-left" style="height: 100%"></div>
          <canvas id="canvas" :class="ruler ? 'design-stage-grid' : ''"></canvas>
          <div class="bottomBar" v-if="show">
            <zoom></zoom>
          </div>
        </div>
      </div>
      <div class="right-box">
        <div v-if="show">
          <set-size></set-size>
          <group></group>
        </div>
          <attribute v-if="show"></attribute>
      </div>
    </Content>
  </div>
</template>
<script>
// import element
import importFile from '@/components/importFile.vue';
import importTmpl from '@/components/importTmpl.vue';
// top assembly
import align from '@/components/align.vue';
import centerAlign from '@/components/centerAlign.vue';
import flip from '@/components/flip.vue';
import save from '@/components/save.vue';
import lang from '@/components/lang.vue';
import clone from '@/components/clone.vue';
import group from '@/components/group.vue';
import zoom from '@/components/zoom.vue';
import lock from '@/components/lock.vue';
import dele from '@/components/del.vue';

// left component
import tools from '@/components/tools.vue';
import svgEl from '@/components/svgEl.vue';
import bgBar from '@/components/bgBar.vue';
import setSize from '@/components/setSize.vue';

// right side component
import history from '@/components/history.vue';
import layer from '@/components/layer.vue';
import attribute from '@/components/attribute.vue';
import ColorPicker from '@/components/color.vue';

// right click menu
import mouseMenu from '@/components/contextMenu/index.vue';

// functional components
import EventHandle from '@/utils/eventHandler';

import { fabric } from 'fabric';
import $ from "jquery";
import Editor from '@/core';

const event = new EventHandle();
event.setMaxListeners(100)
const canvas = {};
export default {
  name: 'Editor',
  provide() {
    return {
      "canvas":canvas,
      "fabric":fabric,
      "event":event,
      "path":this.$route.path,
      "param_id":this.$route.params.id
    }
  },    
  
  data() {
    return {
      show: false,
      select: null,
      ruler: true,
      param_id:this.$route.params.id
    };
  },
  components: {
    ColorPicker,
    setSize,
    tools,
    bgBar,
    lock,
    layer,
    align,
    attribute,
    dele,
    importFile,
    save,
    lang,
    clone,
    flip,
    importTmpl,
    centerAlign,
    group,
    zoom,
    svgEl,
    history,
    mouseMenu,
  },
  created() {
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
  },
};
</script>
<style scoped lang="less">
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