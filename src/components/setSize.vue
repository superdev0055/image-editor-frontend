<template>
  <div v-if="!mSelectMode" class="row">
    <Tabs value="name1" size="default" type="line" style="width:100%" class="mt-3">
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
                <b-form-input  size="sm" type="number" :max="2000" :min="1" v-model="width" @on-change="setSize">

                </b-form-input>
              </div>
              <div class="image-height mt-2 col-md-5" style="float:right">
                <label class="font-s">Height</label>                  
                <b-form-input size="sm" type="number" :max="2000" :min="1" v-model="height" @on-change="setSize"></b-form-input>
              </div>                
            </div>  

          </div>              
          <div class="mt-4"  style="border-top: solid 1px #d7d2d2;padding-left:35px;padding-right:35px">
            <div style="" class="">
              <label class="mt-4 font-s" style="float:left;">Background Color</label>
              <bg-bar></bg-bar>
            </div>
          </div>
          <div class="mt-4">       

          </div>          
        </div>      
      </TabPane>
      <TabPane label="Layer" icon="md-reorder" name="name2" class="col-md-4"><layer></layer></TabPane>
      <TabPane label="Preview" icon="md-fastforward" name="name3" class="col-md-4">preview</TabPane>
    </Tabs> 

  </div>
</template>
<script>
import select from '@/mixins/select';
import EditorWorkspace from '@/core/EditorWorkspace';
import layer from "./layer.vue"
import bgBar from "./colorBar.vue"
export default {
  name: 'canvasSize',
  mixins: [select],
  inject: ['canvas', 'fabric'],
  data() {
    return {
      selected: "900x900",
      width: 900,
      height: 900,
    };
  },
  components:{
    layer,
    bgBar
  },
  mounted() {
    // console.log(this.selectMode)
    // setTimeout(() => {
    //     this.temp = this.mSelectMode
    // },500);    
    // this.set
    // this.mSelectMode = ""
    this.canvas.editor.editorWorkspace = new EditorWorkspace(this.canvas.c, {
      width: this.width,
      height: this.height,
    });
  },
  methods: {
    test(){
      console.log("asd")
    },
    setSizeBy(width, height) {
      this.width = width;
      this.height = height;
      this.setSize();
    },
    setSize() {
      this.canvas.editor.editorWorkspace.setSize(this.width, this.height);
    },
  },
  watch:{
    selected(){
      var resolution = this.selected.split("x")
      this.width = Number(resolution[0]);
      this.height = Number(resolution[1]);
      this.setSize();
    },
    width(){
      this.width = Number(this.width)
      this.setSize()
    },
    height(){
      this.height = Number(this.height)
      this.setSize()
    },

    selectMode(){
      console.log("aaaaa");        
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
