<template>
  <div>
    <div v-if="mSelectMode =='multiple'||!mSelectMode=='one' || mSelectMode ==''" class="row">
      <Tabs size="default" type="line" style="width:100%" class="mt-3" @on-click="changeTab" model-value="name2" :animated=false> 
        <TabPane label="Setup" name="name1" class="col-md-4" icon="md-apps">
          <div class="row d-flex justify-content-center">
            <div class="col-md-11">
              <div class="image-size mt-2" style="">
                <label class="font-s">Image size</label>  
                <b-form-select class="mb-3" v-model="selected" @change="changeSelect" size="sm" :options="canvasSizes">
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
                    number="true" />                  
                </div>

                <div class="image-height mt-2 col-md-5" style="float:right">
                  <label class="font-s">Height</label>    
                  <input
                    autocomplete="off" 
                    type="number" 
                    class="ivu-input ivu-input-default ivu-input-with-suffix" 
                    placeholder="Enter text"
                    v-model="height"
                    number="true" />                                                  
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
        <TabPane label="Preview" icon="md-fastforward" name="name3" id="preview" class="col-md-4"><preview ref="form" /></TabPane>
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
import {getCanvasSizes} from "@/service/endpoint";

export default {
  name: 'canvasSize',
  mixins: [select],
  inject: ['canvas', 'fabric'],

  data() {
    return {
      selected: "900x900",
      width: 900,
      height: 900,
      canvasSizes:''
    };
  },

  components:{
    layer,
    colorBar,
    preview
  },
  computed: {
    currentValue() {
      return this.canvasSizes.find(option => option.value === this.selected)
    }
  },  
  mounted() {
    getCanvasSizes().then(res=>{

      var customSizes = {
        name:"Custom resolution",
        width:'',
        height:''
      }
      
      res.data.push(customSizes);
      var tempData = res.data.map((el,index)=>{
        if(index == 3){
          return{
            selectable:true,
            value:el.width+'x'+el.height,
            text:el.width+'x'+el.height+' '+el.name,
          }
        }
        if(el.width == '' && el.height == ''){
          return{
            value:'custom-size',
            text:el.name,
          }          
        }else{
          return{
            value:el.width+'x'+el.height,
            text:el.width+'x'+el.height+' '+el.name,
          }
        }

      })
      this.canvasSizes = tempData
    });

    this.canvas.editor.editorWorkspace = new EditorWorkspace(this.canvas.c, {
      width: this.width,
      height: this.height,
    });

  },
  methods: {

    changeTab(name){
      //when preview tab is pressed,load data from endpoint. 
      if(name == "name3"){
        this.$refs.form.showPreview();
      }

    },
    setSize() {
      this.canvas.c.discardActiveObject();
      this.$Spin.show();      
      this.canvas.editor.editorWorkspace.setSize(Number(this.width), Number(this.height));
      setTimeout(() => {
        this.$Spin.hide();      
        
      }, 500);
    },    
    changeSelect(evt){
      console.log(evt);
      var resolution = evt.split("x");
      if(evt == 'custom-size'){
        this.selected = '';
      }else{
        this.width = Number(resolution[0]);
        this.height = Number(resolution[1]);
        this.setSize();
      }
      this.selected = evt
    },   
  },
  watch:{
    width(){
      this.selected = "custom-size";
      console.log(this.width,this.height);
      this.canvas.editor.editorWorkspace.setSize(Number(this.width), Number(this.height));
      this.canvas.c.discardActiveObject();
      this.canvas.c.renderAll();      
    },
    height(){
      this.selected = "custom-size";
      this.canvas.editor.editorWorkspace.setSize(Number(this.width), Number(this.height));
      this.canvas.c.discardActiveObject();
      this.canvas.c.renderAll(); 
    },
  }
};
</script>

<style>
.font-s{
  font-size: 11px;
}
</style>
