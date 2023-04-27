<template>
      <div v-show="shapeType.includes(mSelectOneTypeProps[0])" style="margin-left:15px">
        <div class="row mb-3" style="">
          <div class="col col-lg-9">
            Rotate
          </div>                
          <div class="col col-lg-2">
            <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
              <span class="ivu-input-suffix">
                <i style="font-style: normal; font-size: 11px;">&deg;</i>
              <!-- Degree -->
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
        <div v-show="rectType.includes(mSelectOneTypeProps[0])" class="row mb-3" style="">
          <div class="col col-lg-9">
            Round Coner
          </div>                
          <div class="col col-lg-2">
            <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
              <span class="ivu-input-suffix">
                <i style="font-style: normal; font-size: 11px;">&deg;</i>
              <!-- Degree -->
              </span>
              <input
                autocomplete="off" 
                type="number" 
                class="ivu-input ivu-input-default ivu-input-with-suffix" 
                placeholder="Enter text"
                v-model="baseAttr.angle"
                :max="360"
                @change="(value)=>changeCommon('round', value)"
              />
            </div>
          </div>
        </div>
        <!-- shape fill -->
        <div>
          <div class="customborder mt-2"></div>
          <div class="row mt-3">
            <div class="col-9">
              Fill
            </div>                
            <div class="col-2" style="text-align: right;">
              <Switch size="small" @on-change="showFill" true-color="#13ce66"/>
            </div>
          </div>
          <div v-if="fillState">
            <div class="row mb-3">
              <div class="col-5">
                <Color :color="baseAttr.fill" @change="(value) => changeCommon('fill', value)" style="width:100%"></Color>
              </div>
            </div>
          </div>             
        </div>
          <!-- shape fill -->        
          <!-- shape border -->
        <div class="customborder mt-3"></div>
        <div>
          <div class="row mt-3" style="">
            <div class="col-9">
              Border
            </div>                
            <div class="col-2" style="text-align: right;">
              <Switch size="small" @on-change="showBorder" true-color="#13ce66"/>
            </div>   
          </div>
          <div v-if="borderState">
            <div class="row mb-3 mt-4" style="">
              <div class="col col-lg-9">
                Color
              </div>                
              <div class="col col-lg-2">
                <ColorPicker
                  v-model="baseAttr.stroke"
                  @on-change="(value) => changeCommon('stroke', value)"
                  alpha
                />                
                <!-- <Color :color="baseAttr.stroke" @change="(value) => changeCommon('stroke', value)"></Color> -->
              </div>
            </div>

            <div class="row mb-3" style="">
              <div class="col col-lg-9">
                Line thickness
              </div>
              <div class="col col-lg-2">
                <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                  <span class="ivu-input-suffix">
                    <i style="font-style: normal; font-size: 11px;">px</i>
                  <!-- Pixel -->
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
      fillState:false,
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
  methods:{
    showBorder(){
        this.borderState ? this.borderState = false : this.borderState = true
    },
    showFill(){
        this.fillState ? this.fillState = false : this.fillState = true
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
