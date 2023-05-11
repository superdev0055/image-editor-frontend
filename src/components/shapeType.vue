<template>
    <div>

      <div v-show="shapeType.includes(mSelectOneTypeProps[0])" style="">
        <!-- control part -->
        <div class="control" style="margin-left:15px">
          <div class="row mt-3 mb-3" style="align-items: center;">
            <div class="col col-lg-7">
              Size
            </div>
            <div class="input-size">
              <div class="content">
                <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                  <span class="ivu-input-suffix">
                    <i style="font-style: normal; font-size: 11px;">w</i>
                  <!-- W -->
                  </span>
                  
                  <input
                    style="width:100%"
                    autocomplete="off" 
                    type="number" 
                    class="ivu-input ivu-input-with-suffix" 
                    placeholder="Enter text"
                    v-model="baseAttr.width"
                    @change="(value) => changeCommon('width', value)"
                    number="true" />

                </div>
              </div>
            </div>
            <div class="input-size">
              <div class="content">
                <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                  <span class="ivu-input-suffix">
                    <i style="font-style: normal; font-size: 11px;">h</i>
                  <!-- H -->
                  </span>
                  <input
                    autocomplete="off" 
                    type="number" 
                    class="ivu-input ivu-input-default ivu-input-with-suffix" 
                    placeholder="Enter text"
                    v-model="baseAttr.height"
                    @change="(value) => changeCommon('height', value)"
                    number="true" />
                </div>
              </div>
            </div>
          </div>

          <!-- --------------------- Position ----------------------->
          <div class="row mb-3" style="align-items: center;">
            <div class="col col-lg-7">
              Position
            </div>
            <div class="input-size">
              <div class="content">
                <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                  <span class="ivu-input-suffix">
                    <i style="font-style: normal; font-size: 11px;">x</i>
                  <!-- X -->
                  </span>
                  <input
                    autocomplete="off" 
                    type="number" 
                    class="ivu-input ivu-input-default ivu-input-with-suffix" 
                    placeholder="Enter text"
                    v-model="baseAttr.left"
                    @change="(value) => changeCommon('left', value)"
                    number="true" />
                </div>
              </div>
            </div>
            <div class="input-size">
              <div class="content">
                <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                  <span class="ivu-input-suffix">
                    <i style="font-style: normal; font-size: 11px;">y</i>
                  <!-- Y -->
                  </span>
                  <input
                    autocomplete="off" 
                    type="number" 
                    class="ivu-input ivu-input-default ivu-input-with-suffix" 
                    placeholder="Enter text"
                    v-model="baseAttr.top"
                    @change="(value) => changeCommon('top', value)"
                    number="true" />
                </div>
              </div>
            </div>
          </div>
          <!-- --------------------- End Position ----------------------->

        </div>        
        <!-- control part -->
        <div style="margin-left:15px;">
          <div class="mt-3 row">
            <div style="width:78%">
              Rotate
            </div>  
            <div class="input-size">
              <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                <span class="ivu-input-suffix">
                  <i style="font-style: normal; font-size: 11px;">px</i>
                <!-- Pixel -->
                </span>
                <input
                  autocomplete="off" 
                  type="number" 
                  class="ivu-input ivu-input-default ivu-input-with-suffix" 
                  placeholder="Enter text"
                  v-model="baseAttr.angle"
                  :max="360"
                  @change="(value)=>changeCommon('angle', value)"
                />
              </div>
            </div>   
          </div>  
          <div class="mt-3 row" v-show="rectType.includes(mSelectOneTypeProps[0])">
            <div style="width:78%">
              Round Coner
            </div>  
            <div class="input-size">
              <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                <span class="ivu-input-suffix">
                  <i style="font-style: normal; font-size: 11px;">px</i>
                <!-- Pixel -->
                </span>
              <input
                autocomplete="off" 
                type="number" 
                class="ivu-input ivu-input-default ivu-input-with-suffix" 
                placeholder="Enter text"
                v-model="baseAttr.round"
                :max="360"
                @change="(value)=>changeCommon('round', value)"
              />
              </div>
            </div>   
          </div>            
        </div>

        <!-- shape fill -->
        <div>
          <div class="customborder mt-2"></div>
          <div class="mt-4" style="margin-left:15px">
            <div class="" style="height:20px;margin-right:15px;">
              <div style="float:left">
                Fill
              </div>                
              <div style="float:right">
                <Switch size="small" v-model="fillState" @on-change="changeFillState" true-color="#13ce66"/>
              </div>
            </div>   
          <div v-if="fillState" class="mt-4" style="align-items: center;margin-right:20px;">
            <div class="" style="height:40px;">
              <div style="float:left">
                Color
              </div>                
              <div class="input-size" style="float:right;width:40%">
                <Color :color="baseAttr.fill" @change="(value) => changeCommon('fill', value)" style="width:100%;padding:0"></Color>
              </div>
            </div>                                             
          </div>                    
          </div>          
        </div>
          <!-- shape fill -->        
          <!-- shape border -->
        <div class="mt-4" style="margin-left:15px">
          <div class="" style="height:20px;margin-right:15px;">
            <div style="float:left">
              Border
            </div>                
            <div  style="float:right">
              <Switch size="small" v-model="borderState" @on-change="changeBorderState" true-color="#13ce66"/>
            </div>
          </div>   
          <div v-if="borderState" class="mt-4">
            <div class="" style="height:20px;">
              <div style="float:left">
                Color
              </div>                
              <div style="float:right;width:40%;margin-right:15px">
                <Color :color="baseAttr.stroke" @change="(value) => changeCommon('stroke', value)" class="image-size" style="padding:0"></Color>
              </div>
            </div>    
            <div class="mt-4 row" style="align-items: center;margin-right:5px;"> 
              <div style="width:80%">
                Line thickness
              </div>  
              <div class="input-size">
                <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                  <span class="ivu-input-suffix">
                    <i style="font-style: normal; font-size: 11px;">px</i>
                  </span>
                  <input
                    type="number" 
                    class="ivu-input ivu-input-default ivu-input-with-suffix" 
                    v-model="baseAttr.strokeWidth"
                    :max="360"
                    @change="(value)=>changeCommon('strokeWidth', value)"
                  />
                </div>
              </div>   
            </div>              
          </div>                        
        </div>           
        <!-- shape border -->
      </div>  
    </div>  
</template>

<script>
import select from '@/mixins/select';
import Color from './color.vue';

export default {
  mixins: [select],
  props:['mSelectOneTypeProps'],
  components: {
    Color,
  },  
  data() {
    return {
      loading1: false,
      borderState:false,
      fillState:false,
      showState:false,       
      borderState:false,
      // common element
      baseType: [
        'text',
        'i-text',
        'textbox',
        'triangle',
        'image',
        'group',
        'line',
        'arrow',
        "rect",
        "circle"
      ],
      shapeType:["rect","circle"],
      rectType:["rect"],
      circleType:["circle"],

      // general properties
      baseAttr: this.mSelectOneTypeProps[1],
    };
  },
  mounted(){
    this.initSet();
  },
  created(){
    this.event.on('selectOne', (items) => {
          // base
          var activeObject = this.canvas.c.getActiveObjects()[0];        
          this.baseAttr.round = activeObject.get('rx');
          this.baseAttr.height =activeObject.get('height');
          this.baseAttr.width = activeObject.get('width');
          this.baseAttr.opacity =activeObject.get('opacity') * 100;
          this.baseAttr.fill = activeObject.get('fill');
          this.baseAttr.left = activeObject.get('left');
          this.baseAttr.top = activeObject.get('top');
          this.baseAttr.stroke = activeObject.get('stroke');
          if(this.baseAttr.stroke == null){
            this.baseAttr.stroke = '';
          }
          this.baseAttr.strokeWidth = activeObject.get('strokeWidth');
          this.baseAttr.shadow = activeObject.get('shadow') || {};
          this.baseAttr.angle = activeObject.get('angle') || 0;   
          this.initSet()         
    });      
  },  
  methods:{
    initSet(){
      var activeObject = this.canvas.c.getActiveObject();
      if(activeObject != null){

          //<---------------fill of rect setting ------------->
          if(activeObject.fill == "#ffffff"){
            this.fillState = false            

          }else{
            this.fillState = true;
            this.baseAttr.fill = activeObject.fill;
          }
          //<---------------fill of rect setting ------------->

          // if(activeObject.)  filter portion

          // <---------border of rect setting ---------->
          if(activeObject.stroke != null){
            this.borderState = true;
            this.baseAttr.stroke = activeObject.stroke;
          }else{
            this.borderState = false
          }
          if(activeObject.strokeWidth != 0){
            this.borderState = true;
            this.baseAttr.strokeWidth = activeObject.strokeWidth;
          }   else{
            this.borderState = false
          }         
          // <---------border of rect setting ---------->
      }      
    },
    changeFillState(value){
      if(value == false){
        const activeObject = this.canvas.c.getActiveObject();
        activeObject.set('fill','#ffffff');
        this.baseAttr.fill = '';
        this.canvas.c.renderAll();
      }      
    } ,   
    changeBorderState(value){
      if(value == false){
        const activeObject = this.canvas.c.getActiveObject();
        activeObject.set('stroke','');
        activeObject.set('strokeWidth',0);
        this.baseAttr.strokeWidth = 0;
        this.baseAttr.stroke = '';
        this.canvas.c.renderAll();
      }
    },    
    showBorder(){
      this.baseAttr.borderState ? this.baseAttr.borderState = false : this.baseAttr.borderState = true;
      const activeObject = this.canvas.c.getActiveObjects()[0];     
      activeObject.set("borderState", this.baseAttr.borderState);
      this.canvas.c.renderAll();         
    },
    showFill(){
      this.baseAttr.fillState ? this.baseAttr.fillState = false : this.baseAttr.fillState = true;
      const activeObject = this.canvas.c.getActiveObjects()[0];     
      activeObject.set("fillState", this.baseAttr.fillState);
      this.canvas.c.renderAll(); 
    },    
    changeCommon(key, evt) {
      const activeObject = this.canvas.c.getActiveObjects()[0];
      if (key === 'fill') {
        activeObject.set(key, evt);
        this.canvas.c.renderAll();
        return;
      }
      if (key === 'stroke') {
        activeObject.set(key, evt);
        this.canvas.c.renderAll();
        return;
      }      
      // Transparency special conversion
      if (key === 'opacity') {
        
        if(typeof(evt) == "number"){
          evt = Number(evt)
        }else{
          evt = Number(evt.target.value)
        }
        activeObject && activeObject.set(key, evt / 100);
        this.canvas.c.renderAll();
        return;
      }
      // Rotation Angle Adaptation
      if (key === 'angle') {
        activeObject.rotate(Number(evt.target.value));
        this.canvas.c.renderAll();
        return;
      }
      if(key == "round"){
        activeObject.set("ry", Number(evt.target.value))
        activeObject.set("rx", Number(evt.target.value))
        this.canvas.c.renderAll();
        return;
      }
      activeObject && activeObject.set(key, Number(evt.target.value));
      this.canvas.c.renderAll();
    },    
  }    
}
</script>
<style scoped>
.input-size{
  width:20%
}  
</style>