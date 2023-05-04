<template>
  <div>
    <div v-if="mSelectMode =='multiple'||!mSelectMode=='one' || mSelectMode ==''" class="row">
      <Tabs value="name1" size="default" type="line" style="width:100%" class="mt-3"  model-value="name2" :animated=false> 
        <TabPane label="Setup" name="name1" class="col-md-4" icon="md-apps">
          <div class="row d-flex justify-content-center">
            <div class="col-md-11">
              <div class="image-name mt-2">
                <label class="font-s">Image name</label>         
                <b-form-input size="sm"></b-form-input>
              </div>
              <div class="image-size mt-2" style="">
                <label class="font-s">Image size</label>  
                  <b-form-select v-model="selected" class="mb-3" size="sm">
                    <b-form-select-option :value="'900x900'" :selected="true">900x900</b-form-select-option>
                    <b-form-select-option :value="'1200x628'">Facebook - single image(1200x628)</b-form-select-option>
                    <b-form-select-option :value="'1920x1080'">1920x1080(16:9)</b-form-select-option>
                    <b-form-select-option :value="'1024x1280'">1080x1080</b-form-select-option>
                    <b-form-select-option :value="'1024x1280'">1024x1280(4:5)</b-form-select-option>
                    <b-form-select-option :value="'1024x1536'">1024x1536(2:3)</b-form-select-option>
                    <b-form-select-option :value="'1080x1920'">1080x1920(9:6)</b-form-select-option>
                  </b-form-select>
              </div>
              <div class="mt-2">
                <div class="image-width mt-2 col-md-5" style="float:left">
                  <label class="font-s">Width</label>      
                  <input
                    autocomplete="off" 
                    type="number" 
                    class="ivu-input ivu-input-default ivu-input-with-suffix" 
                    placeholder="Enter text"
                    v-model="width"
                    @change="(value) => changeSize('width', value)"
                    number="true" />                  
                  <!-- <input  size="sm" type="number" :max="2000" :min="1" v-model="width" @change="(value) => setSize('width', value)"/> -->
                </div>
                <div class="image-height mt-2 col-md-5" style="float:right">
                  <label class="font-s">Height</label>    
                  <input
                    autocomplete="off" 
                    type="number" 
                    class="ivu-input ivu-input-default ivu-input-with-suffix" 
                    placeholder="Enter text"
                    v-model="height"
                    @change="(value) => changeSize('height', value)"
                    number="true" />                                                  
                  <!-- <input size="sm" type="number" :max="2000" :min="1" v-model="height" @change="(value) => setSize('height', value)"/> -->
                </div>                
              </div>  

            </div>              
            <div class="mt-4"  style="border-top: solid 1px #d7d2d2;padding-left:35px;padding-right:35px">
              <div style="" class="">
                <label class="mt-4 font-s" style="float:left;">Background Color</label>
                <colorBar></colorBar>
              </div>
            </div>       
          </div>      
        </TabPane>
        <TabPane label="Layer" icon="md-reorder" name="name2" class="col-md-4"><layer></layer></TabPane>
        <TabPane label="Preview" icon="md-fastforward" name="name3" id="preview" class="col-md-4"><preview :list="list"/></TabPane>
      </Tabs> 

    </div>
  </div>
</template>
<script>
import select from '@/mixins/select';
import EditorWorkspace from '@/core/EditorWorkspace';
import layer from "./layer.vue";
import colorBar from "./colorBar.vue";
import preview from "./preview.vue";
import { keyNames, hotkeys } from '@/core/initHotKeys';
import $ from "jquery";
const maxStep = 10;

export default {
  name: 'canvasSize',
  mixins: [select],
  inject: ['canvas', 'fabric'],
  data() {
    return {
      index: 0,
      redoList: [],
      list: [],
      time: '',      
      selected: "900x900",
      width: 900,
      height: 900,
    };
  },
  components:{
    layer,
    colorBar,
    preview
  },
  created() {
       
    // When selecting an object in the canvas, the object does not appear on top.
    this.event.on('selectMultiple', (e) => {
      this.mSelectMode = 'multiple';
      this.$forceUpdate();
    });    
    this.canvas.c.on({
      'object:modified': this.save,
      'selection:updated': this.save,
    });   
    hotkeys(keyNames.ctrlz, this.undo);        
  },    
  mounted() {
    this.canvas.editor.editorWorkspace = new EditorWorkspace(this.canvas.c, {
      width: this.width,
      height: this.height,
    });
    
  },
  methods: {

    save(event) {
      // Filter select element events
      const isSelect = event.action === undefined && event.e;
      if (isSelect) return;
      const data = this.canvas.editor.getJson();
      if (this.list.length > maxStep) {
        this.list.shift();
      }
      this.list.push(data);
      this.getTime();
    },    
    getTime() {
      const myDate = new Date();
      const str = myDate.toTimeString();
      const timeStr = str.substring(0, 8);
      this.time = timeStr;
    },    
    setSizeBy(width, height) {
      this.width = width;
      this.height = height;
      this.setSize();

    },
    changeSize(key,evt) {
      var value = evt.target.value
      if(key == "width"){
        this.width = value
      }else{
        this.height = value
      }
      // this.canvas.c.discardActiveObject();
      console.log("asdfasdf")
      this.$Spin.show(); 
      this.canvas.editor.editorWorkspace.setSize(Number(this.width), Number(this.height));
      this.$Spin.hide(); 
    },
    setSize() {
      this.canvas.c.discardActiveObject();
      this.canvas.editor.editorWorkspace.setSize(Number(this.width), Number(this.height));
    },
  },
  watch:{
    selected(){
      var resolution = this.selected.split("x")
      this.width = Number(resolution[0]);
      this.height = Number(resolution[1]);
      this.setSize();
    },
    // width(){
    //   this.width = Number(this.width)
    //   this.setSize();

    // },
    // height(){
    //   this.height = Number(this.height)
    //   this.setSize()
    // },

    selectMode(){
      if(this.selectMode === '1'){
        this.mSelectMode = '';
        this.$forceUpdate();
      }else{
        this.mSelectMode = '';
        this.$forceUpdate();
      }
    }
  }
};
</script>

<style>
.font-s{
  font-size: 11px;
}
</style>
