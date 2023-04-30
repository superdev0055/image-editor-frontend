<template>
    <div class="setBox">

      <div v-show="textType.includes(mSelectOneTypeProps[0])" class="mt-3 mb-3">
        <!-- control part -->
        <div class="control" style="margin-left:15px">
          <div class="row mt-3 mb-3" style="align-items: center;">
            <div class="col col-lg-7">
              Size
            </div>
            <div class="col col-lg-2">
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
            <div class="col col-lg-2">
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
            <div class="col col-lg-2">
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
            <div class="col col-lg-2">
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
        <div class="customborder mt-3"></div>
        <div class="mt-3" style="margin-left: 30px;"> 
          <label>Text</label>
          <Input v-model="this.fontAttr.string" @on-change="(value) =>changeString(value)" @on-keyup="(value) =>textKeyPress(value)" class="mb-2 mt-2" style="width:91%">
            <template #append>
              <Select style="width:70px" @on-change="changeAddTag" v-model="shortTag" size="small">
                  <Option value="[avability]">[avability]</Option>
                  <Option value="[brand]">[brand]</Option>
                  <Option value="[channel]">[channel]</Option>
              </Select>
            </template>
          </Input>
        </div>

        <!-- -------------------  Text Setting  ---------------- -->
        <div class="customborder mt-3"></div>
        <div class="mt-3" style="margin-left:14px;">
          <!-- -------------------  text handling  ---------------- -->
          <div class="row" style="margin-left: 3px;">
            <div class="col-8" >
            <Select @on-change="changeFontFamily">
                <Option v-for="item in fontFamilyList" :value="item"  :key="'font-' + item">{{ item }}</Option>
            </Select>              
            </div>
            <div class="col-3" style="">
              <Button class="ivu-btn ivu-btn-text">
                Add custom font
                <Icon type="ios-cloud-upload-outline" />
              </Button>
            </div>
          </div>
          <!-- -------------------  End text handling  ---------------- -->

          <!-- -------------------  font setting  ---------------- -->
          <div class="mt-4 row" style="margin-left: 1px;">
            <!-- -------------------  font size & color  ---------------- -->
            <div class="col-6 row">
              <div class="col-6">
                <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text" style="width: auto;">
                  <i class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
                  <input 
                    v-model="this.fontAttr.fontSize"
                    type="number" 
                    class="ivu-input ivu-input-default ivu-input-with-prefix" 
                    @change="(value) => changeCommon('fontSize', value)"
                  />
                    <span class="ivu-input-prefix">
                      <i class="ivu-icon ivu-icon-ios-appstore"></i>
                    </span>
                </div>
              </div>
              <div class="col-6">
                <Color style="margin-top:-10px;margin-left:10px;width:100%" :color="baseAttr.fill" @change="(value) => changeCommon('fill', value)"></Color>
              </div>
            </div>
            <!-- -------------------  End font size & color  ---------------- -->

            <!-- -------------------  font style  ---------------- -->
            <div class="col-6" style="text-align: right;">
              <ButtonGroup class="button-group">
                <Button @click="changeFontWeight('fontWeight', this.fontAttr.fontWeight)" class="border-btn" style="margin-left:5px">
                  <svg viewBox="0 0 1024 1024" width="14" height="14">
                    <path
                      d="M793.99865 476a244 244 0 0 0 54-130.42C862.75865 192.98 743.01865 64 593.85865 64H195.01865a32 32 0 0 0-32 32v96a32 32 0 0 0 32 32h63.74v576H195.01865a32 32 0 0 0-32 32v96a32 32 0 0 0 32 32h418.64c141.6 0 268.28-103.5 282-244.8 9.48-96.9-32.78-184.12-101.66-239.2zM418.33865 224h175.52a96 96 0 0 1 0 192h-175.52z m175.52 576h-175.52V576h175.52a112 112 0 0 1 0 224z"
                      :fill="this.fontAttr.fontWeight === 'bold' ? '#305ef4' : '#666'"
                    ></path>
                  </svg>
                </Button>
                <Button @click="changeFontStyle('fontStyle', this.fontAttr.fontStyle)" class="border-btn" style="margin-left:5px">
                  <svg viewBox="0 0 1024 1024" width="14" height="14">
                    <path
                      d="M832 96v64a32 32 0 0 1-32 32h-125.52l-160 640H608a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32H224a32 32 0 0 1-32-32v-64a32 32 0 0 1 32-32h125.52l160-640H416a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32h384a32 32 0 0 1 32 32z"
                      :fill="this.fontAttr.fontStyle === 'italic' ? '#305ef4' : '#666'"
                    ></path>
                  </svg>
                </Button>
                <Button @click="changeUnderline('underline', this.fontAttr.underline)" class="border-btn" style="margin-left:5px">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <path d="M12.12,19.16 C8.78,19.16 6.4,16.98 6.4,13.48 L6.4,4.8 L8.72,4.8 L8.72,13.54 C8.72,15.74 10.1,16.96 12.12,16.96 C14.14,16.96 15.5,15.74 15.5,13.54 L15.5,4.8 L17.82,4.8 L17.82,13.48 C17.82,16.98 15.46,19.16 12.12,19.16 Z" fill="#000000"/>
                          <rect fill="#000000" opacity="0.3" x="4" y="21" width="16" height="2" rx="1"/>
                      </g>
                  </svg>
                </Button>
                <Button @click="changeLineThrough('linethrough', this.fontAttr.linethrough)" class="border-btn" style="margin-left:5px">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <rect fill="#000000" opacity="0.3" x="4" y="11" width="17" height="2" rx="1"/>
                          <path d="M12.06,19.16 C10,19.16 8.28,18.16 7.44,16.96 L8.82,15.76 C9.5,16.64 10.66,17.42 12.04,17.42 C13.68,17.42 14.72,16.66 14.72,15.42 C14.72,14.12 13.92,13.44 12.4,12.78 L11.1,12.22 C8.94,11.3 8,9.98 8,8.2 C8,6.04 10.04,4.64 12.14,4.64 C13.8,4.64 15.16,5.3 16.12,6.46 L14.84,7.74 C14.1,6.86 13.32,6.38 12.08,6.38 C10.88,6.38 9.82,7.06 9.82,8.24 C9.82,9.28 10.42,9.98 11.92,10.64 L13.22,11.2 C15.14,12.04 16.56,13.22 16.56,15.22 C16.56,17.54 14.84,19.16 12.06,19.16 Z" fill="#000000"/>
                      </g>
                  </svg>
                </Button>
              </ButtonGroup>
            </div>
            <!-- -------------------  End font style  ---------------- -->

          </div>
          <!-- -------------------  End font setting  ---------------- -->
          
          <!-- -------------------  Long text handling  ---------------- -->
          <div class="mt-3 row" style="margin-left: 1px;">
            <div class="col-7 mt-1">
              Long text handling
            </div>  
            <div class="col-4" style="margin: 0;">
              <Select @on-change="handleLongText">
                <Option value="automatic" selected>Automatic font size</Option>
                <Option value="shorten">Shorten text</Option>
              </Select>
            </div>   
          </div>
          <!-- -------------------  End Long text handling  ---------------- --> 
          
          <!-- -------------------  Text alignment  ---------------- -->
        <div class="row mb-3 mt-3" style="margin-left: 1px;">
          <div class="col col-lg-6">
            Alignment
          </div>                
          <div class="col col-lg-5">
            <align></align>
          </div>
        </div>
          <!-- -------------------  End Text alignment  ---------------- --> 
          
          <!-- -------------------  Text padding  ---------------- -->
          <div class="row mt-3" style="margin-left: 1px;">
            <div class="col-8 mt-1">
              Text padding
            </div>  
            <div class="col-3">
              <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                <span class="ivu-input-suffix">
                  <i style="font-style: normal; font-size: 11px;">px</i>
                <!-- Pixel -->
                </span>
                <input
                  type="number" 
                  class="ivu-input ivu-input-default ivu-input-with-suffix" 
                  :max="360"
                  :min="10"
                  v-model="baseAttr.padding"
                  @change="(value)=>changeCommon('padding', value)"
                />
              </div>
            </div>   
          </div>
          <!-- -------------------  End Text padding  ---------------- -->
        </div>
        <!-- -------------------  End Text Setting  ---------------- -->

        <!-- -------------------  Round Corners  ---------------- -->
        <div class="customborder mt-3"></div>
        <div class="mt-3 row" style="margin-left:15px;">
          <div class="col-8 mt-1">
            Round Corners
          </div>  
          <div class="col-3">
            <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
              <span class="ivu-input-suffix">
                <i style="font-style: normal; font-size: 11px;">px</i>
              </span>
              <input
                autocomplete="off" 
                type="number" 
                class="ivu-input ivu-input-default ivu-input-with-suffix" 
                v-model="baseAttr.angle"
                :max="80"
                @change="(value)=>changeCommon('round', value)"
              />
            </div>
          </div>
        </div>
        <!-- -------------------  End Round Corners  ---------------- -->

        <!-- -------------------  Fill  ---------------- -->
        <div class="customborder mt-3"></div>
        <div class="row">
          <div class="row mt-3" style="margin-left:15px;">
            <div class="col-9 mt-1">
              Fill
            </div>                
            <div class="col col-2" style="text-align: right;">
              <Switch size="small" v-model="fillState" true-color="#13ce66"/>
            </div>
          </div>
          <div v-if="fillState" class="row mt-4" style="margin-left:10px;">
            <div class="col-5">
              <Color style="margin-top:-10px;margin-left:10px;width:100%"  @change="(value) => changeSelectFillType('colorFilter', value)"></Color>
            </div>
            <div class="col-6">
              <Select @on-change="changeSelectFillType">
                <Option  v-for="item in fillType" :value="item" :key="'fill-' + item">{{ item }}</Option>
              </Select>
            </div>
          </div>
        </div>
        <!-- -------------------  End Fill  ---------------- -->

        <!-- -------------------  Text Border  ---------------- -->
        <div class="customborder mt-3"></div>
        <div style="margin-left:25px">
          <div class="row mt-3" style="">
            <div class="col-9">
              Border
            </div>                
            <div class="col-2" style="text-align: right;">
              <Switch size="small" v-model="borderState" @on-change="changeBorderState" true-color="#13ce66"/>
            </div>   
          </div>
          <div v-if="borderState">
            <div class="row mb-3 mt-4" style="">
              <div class="col col-lg-5">
                <ColorPicker
                  v-model="baseAttr.stroke"
                  @on-change="(value) => changeCommon('stroke', value)"
                  alpha
                />                 
              </div>                
              <div class="col col-lg-6">
                <Select v-model="baseAttr.strokeDashArray" @on-change="borderSet">
                  <Option
                    v-for="item in strokeDashList"
                    :value="item.label"
                    :key="'stroke-' + item.label"
                  >
                    {{ item.label }}
                  </Option>
                </Select>
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
                    :max="40"
                    @change="(value)=>changeCommon('strokeWidth', value)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>        
        <!-- -------------------  End Text Border  ---------------- -->

      </div>  
    </div>  
</template>
<script>
import select from '@/mixins/select';
import Color from './color.vue';
import Align from './align.vue';

export default {
    mixins: [select],
    props:['mSelectOneTypeProps'],
    components: {
        Color,
        Align
    },  
    data(){
        return{
          showModeText:'',
          shortTag:"ppppppp",
          activeObject:'',
          borderState:false,
          fillState:false,
          showState:false,            
          rectType:["rect"],
          shapeType:["rect","circle"],
          circleType:["circle"],            
          imgType: ['image'],
          textType: ['i-text', 'textbox', 'text'],
          baseAttr: this.mSelectOneTypeProps[1],
          strokeDashArray: [],
          
          // font properties
          fontFamilyList: ["Arial","Helvetica","Myriad Pro","Delicious","Verdana","Georgia","Hoefler Text","Courier", "Comic Sans MS" ,"Impact" ,"Monaco" ,"Optima"],
          fillType: [
              'normal',
              'multiply',
              'screen',
              'overlay',
              'darken',
              'lighten',
              'color-dodge',
              'color-burn',
              'hard-light',
              'soft-light',
              'different',
              'exclusion',
              'hue',
              'saturation',
              'color',
              'luminosity'
          ],
          // font properties
          fontAttr: this.mSelectOneTypeProps[2],   
          // Font drop-down list
          strokeDashList: [
            {
              value: {
                strokeUniform: true,
                strokeDashArray: [1, 10],
                strokeLineCap: 'round',
              },
              label: 'dotted',
            },
            {
              value: {
                strokeUniform: true,
                strokeDashArray: [15, 15],
                strokeLineCap: 'square',
              },
              label: 'dashed',
            },
            {
              value: {
                strokeUniform: true,
                strokeDashArray: [0, 0],
                strokeLineCap: 'square',

              },
              label: 'solid',
            },
            {
              value: {
                strokeUniform: true,
                strokeDashArray: [],
                strokeLineCap: 'square',
              },
              label: 'double',
            },
            {
              value: {
                strokeUniform: true,
                strokeDashArray: [],
                strokeLineCap: 'round',
              },
              label: 'groove',
            },
            {
              value: {
                strokeUniform: true,
                strokeDashArray: [],
                strokeLineCap: 'square',
              },
              label: 'ridge',
            },
            {
              value: {
                strokeUniform: true,
                strokeDashArray: [],
                strokeLineCap: 'round',
              },
              label: 'inset',
            },
            {
              value: {
                strokeUniform: true,
                strokeDashArray: [],
                strokeLineCap: 'round',
              },
              label: 'outset',
            },
            {
              label: 'none',
            },                        
          ],                     
        }        
    },
    created(){
      this.canvas.c.on("object:moving",(e)=>{
        this.baseAttr.top = this.canvas.c.getActiveObject().top;
        this.baseAttr.left =this.canvas.c.getActiveObject().left;
      })       
      this.event.on('selectOne', (e) => {
        if(e[0].type == "group"){
          if(e[0]._objects[1].type == "i-text"){
            const activeObject = e[0]._objects[1];
            this.activeObject = activeObject;
            this.fontAttr.string = activeObject.get('text');
            this.fontAttr.fontSize = activeObject.get('fontSize');
            this.fontAttr.fontFamily = activeObject.get('fontFamily');
            this.fontAttr.lineHeight = activeObject.get('lineHeight');
            this.fontAttr.textAlign = activeObject.get('textAlign');
            this.fontAttr.underline = activeObject.get('underline');
            this.fontAttr.linethrough = activeObject.get('linethrough');
            this.fontAttr.charSpacing = activeObject.get('charSpacing');
            this.fontAttr.overline = activeObject.get('overline');
            this.fontAttr.fontStyle = activeObject.get('fontStyle');
            this.fontAttr.textBackgroundColor = activeObject.get('textBackgroundColor');
            this.fontAttr.fontWeight = activeObject.get('fontWeight');            
          }
        }
      });



    },
    mounted(){
      this.initSet();
    },

    methods:{
        //stroke boder set
        borderSet(key) {
          const activeObject = this.canvas.c.getActiveObject()._objects[0];
          if (activeObject) {
            const stroke = this.strokeDashList.find((item) => item.label === key);
            if(stroke.label){
              activeObject.set('strokeWidth',0);
            }
            activeObject.set(stroke.value);
            this.canvas.c.renderAll();
          }
        },      
        changeBorderState(value){
          if(value == false){
            const activeObject = this.canvas.c.getActiveObject()._objects[0];
            activeObject.set('stroke','');
            activeObject.set('strokeWidth',0);
            this.baseAttr.strokeWidth = 0;
            this.baseAttr.stroke = '';
            this.canvas.c.renderAll();
          }
        },
        initSet(){
          var activeObject = this.canvas.c.getActiveObject();
          if(activeObject != null){
            if(activeObject._objects){

              //<---------------fill of rect setting ------------->
              if(activeObject._objects[0].fill != ''){
                this.fillState = true;
                this.baseAttr.fill = activeObject._objects[0].fill;
              }
              //<---------------fill of rect setting ------------->

              // if(activeObject.)  filter portion

              // <---------border of rect setting ---------->
              if(activeObject._objects[0].stroke != ''){
                this.borderState = true;
                this.baseAttr.stroke = activeObject._objects[0].stroke;
              }

              if(activeObject._objects[0].strokeWidth != 0){
                this.borderState = true;
                this.baseAttr.strokeWidth = activeObject._objects[0].strokeWidth;
              }            
              // <---------border of rect setting ---------->
            }
          }
          
        },
        reSetObj(){
          const activeObject = this.canvas.c.getActiveObject();
          this.baseAttr.width = activeObject.width;
          this.baseAttr.height = activeObject.height;
          this.baseAttr.left = activeObject.left;
          this.baseAttr.top = activeObject.top;
        },
        // <!----------- control box size   -------->
        checkTextboxSize(){
          const activeObject = this.canvas.c.getActiveObject();
          if(activeObject){
            if(activeObject.type == "group"){
              if(activeObject.width<activeObject._objects[1].width){
                activeObject.set("width",activeObject._objects[1].width);
                activeObject._objects[0].set("width",activeObject._objects[1].width);
                activeObject._objects[0].set("left",-(activeObject._objects[1].width/2));
                activeObject.set("width",activeObject._objects[1].width);
                activeObject._objects[1].set("left",-activeObject._objects[1].width/2);
                this.canvas.c.renderAll();
                this.reSetObj();
                return;
              }
              if(activeObject.height<activeObject._objects[1].height){
                activeObject.set("height",activeObject._objects[1].height).setCoords();
                activeObject._objects[1].set("top",-activeObject._objects[1].height/2);
                this.canvas.c.renderAll();
                return;
              }              
            }
          }


        },      
        // <!----------- control box size   -------->
        changeSelectFillType(value){
          
            // switch(value){
            //     case "hue":
            //             let filter = new fabric.Image.filters.HueRotation({
            //                             rotation: value,
            //                             });
            //         console.log(this.canvas.c.getActiveObject())
            //             this.canvas.c.getActiveObject()[0].filters = [];
            //             this.canvas.c.getActiveObject()[0].filters.push(filter);
            //             this.canvas.c.getActiveObject()[0].applyFilters();                                        
            //         // console.log(this.canvas.c.getActiveObject().filters)
            //         // console.log(this.canvas.c.getActiveObject())
            //         // this.canvas.c.getActiveObject()[0].applyFilterValue(21, this.checked && new f.HueRotation({
            //         //     rotation: value,
            //         // }));
            // }
            // console.log(value)
        },        
        showBorder(){
            this.borderState ? this.borderState = false : this.borderState = true
        },
        showTextFill(){
            this.showState ? this.showState = false : this.showState = true
        },
        showTextBorder() {
            this.textBorderState ? this.textBorderState = false : this.textBorderState = true
        },        
        handleLongText(evt){
          var activeObject = this.canvas.c.getActiveObject()._objects[1];
          var string = this.fontAttr.string;
            if(evt == 'shorten'){
              this.showModeText = "shorten"
              if(150 >=string.length && string.length >= 50){
                console.log("150")
                activeObject.set("fontSize",21);
                this.canvas.c.renderAll();
                return;
              }
              if(250>=string.length&&string.length >= 150){
                console.log("250")
                activeObject.set("fontSize",18);
                this.canvas.c.renderAll();
                return;
              }
              if(350>=string.length&&string.length >= 250){
                console.log("350")
                activeObject.set("fontSize",16);
                this.canvas.c.renderAll();
                return;
              }
            }else{
              this.showModeText = "automatic"
                // // activeObject
                // if(string.length >20){
                  
                // }
                activeObject.set("fontSize",activeObject.fontSize);
            }
            this.canvas.c.renderAll();
        },
        changeAddTag(value){
            this.changeString(this.fontAttr.string+value);
            // this.handleLongText(this.showModeText)
        },        
        // bold
        changeFontWeight(key, value) {
            const nValue = value === 'normal' ? 'bold' : 'normal';
            this.fontAttr.fontWeight = nValue;
            this.canvas.c.getActiveObject()._objects[1].set(key, nValue);
            this.canvas.c.renderAll();
        },
        // italics
        changeFontStyle(key, value) {
            const nValue = value === 'normal' ? 'italic' : 'normal';
            this.fontAttr.fontStyle = nValue;
            this.canvas.c.getActiveObject()._objects[1].set(key, nValue);
            this.canvas.c.renderAll();
        },
        // middle stroke
        changeLineThrough(key, value) {
            const nValue = value === false;
            this.fontAttr.linethrough = nValue;
            this.canvas.c.getActiveObject()._objects[1].set(key, nValue);
            this.canvas.c.renderAll();
        },
        // underline
        changeUnderline(key, value) {
            const nValue = value === false;
            this.fontAttr.underline = nValue;
            this.canvas.c.getActiveObject()._objects[1].set(key, nValue);
            this.canvas.c.renderAll();
        },        
        //delete shortTag
        textKeyPress(value){
            var string = this.fontAttr.string
            if(value.keyCode == 8){
                string = string.slice(0,string.lastIndexOf('['));
                this.changeString(string) 
            }

        },

        //change string
        changeString(value){
            if(typeof(value)=="string"){
                var string = value;
            }else{
                var string = value.target.value;
            }
            this.fontAttr.string = string;
            
            this.changeCommon('text',string);
            this.handleLongText(this.showModeText)

        },
        // modify font
        changeFontFamily(fontName) {
          if (!fontName) return;
          this.canvas.c.getActiveObject()._objects[1].set("fontFamily",fontName);
          this.canvas.c.renderAll();

        },   

        //change activeObject
        changeCommon(key,evt){
          if(key=="width" ||key=="height" ||key=="top" ||key=="left"||key=="padding"){
            this.activeObject = this.canvas.c.getActiveObject();
            this.changeProperty(key,evt);
            return;
          }else if(key=="stroke" || key=="strokeWidth"){
            this.activeObject = this.canvas.c.getActiveObject()._objects[0]
            this.changeProperty(key,evt);
            return;
          }else{
            this.activeObject = this.canvas.c.getActiveObject()._objects[1]
            this.changeProperty(key,evt);
            return;            
          }
        },     
        //change property
        changeProperty(key, evt) {
            if (key === 'width'|| key === 'height') {
              this.activeObject.set(key, Number(evt.target.value));
              this.activeObject._objects[0].set("width",this.activeObject.width);
              this.activeObject._objects[0].set("left",-(this.activeObject.width/2));    
              this.activeObject._objects[0].set("height",this.activeObject.height);              
              this.activeObject._objects[0].set("top",-(this.activeObject.height / 2));
              console.log(this.fontAttr);
              console.log(this.activeObject._objects[0])
              this.canvas.c.requestRenderAll();
              this.reSetObj();
              return;
            }       
            
            if (key === 'stroke') {
              this.activeObject.set(key, evt);
              this.canvas.c.renderAll();
              return;
            }      
            if (key === 'strokeWidth') {
              this.activeObject.set(key, Number(evt.target.value));
              this.canvas.c.renderAll();
              return;
            }                  
            // control rect's size and group's size depending on padding value
            if (key === 'padding') {
              var rect = this.canvas.c.getActiveObject()._objects[0];
              //
              if(!this.activeObject.tempValue){
                this.activeObject.tempValue = evt.target.value;
              }
              if(this.activeObject.tempValue<evt.target.value){
                
                rect.set("width",Number(this.activeObject.width)+ Number(evt.target.value)*2);
                rect.set("height",Number(this.activeObject.height) + Number(evt.target.value)*2);
                this.activeObject.set("width",Number(this.activeObject.width) + Number(evt.target.value)*2);
                this.activeObject.set("height",Number(this.activeObject.height) + Number(evt.target.value)*2);
                rect.set("left",rect.left+evt.target.value);
                rect.set("top",rect.top+evt.target.value);


              }else{

                rect.set("width",Number(this.activeObject.width)- Number(this.activeObject.tempValue)*2);
                rect.set("height",Number(this.activeObject.height) - Number(this.activeObject.tempValue)*2);
                this.activeObject.set("width",Number(this.activeObject.width) - Number(this.activeObject.tempValue)*2);
                this.activeObject.set("height",Number(this.activeObject.height) - Number(this.activeObject.tempValue)*2);
                rect.set("left",rect.left+this.activeObject.tempValue);
                rect.set("top",rect.top+this.activeObject.tempValue);     

              }

              this.activeObject.tempValue = evt.target.value;
              this.canvas.c.requestRenderAll();
              this.reSetObj();

              return;                
            }
            if(key == "text"){
              this.activeObject.set("text",evt);
              const activeObject = this.canvas.c.getActiveObject();
              if(activeObject.width<activeObject._objects[1].width){
                activeObject._objects[1].set("scaleX",activeObject.width/activeObject._objects[1].width);
                activeObject._objects[1].set("scaleY",activeObject.width/activeObject._objects[1].width);
                activeObject._objects[0].set("width",activeObject.width);
                activeObject._objects[1].set("width",activeObject.width);
                this.canvas.c.renderAll();
              }
              return;
            }
            // Rotation Angle Adaptation
            if (key === 'angle') {
                this.activeObject.rotate(Number(evt.target.value));
                this.canvas.c.renderAll();
                return;
            }
            if(key == "fill"){
              console.log("asdfsdaf")
              this.activeObject = this.canvas.c.getActiveObject()._objects[1];
              this.activeObject.set("fill", evt)
              this.canvas.c.renderAll();
              return;              
            }
            if(key == "round"){
              this.activeObject = this.canvas.c.getActiveObject()._objects[0];
              this.activeObject.set("ry", Number(evt.target.value))
              this.activeObject.set("rx", Number(evt.target.value))
              this.canvas.c.renderAll();
              return;
            }
            
            this.activeObject && this.activeObject.set(key, Number(evt.target.value));
            // this.checkTextboxSize();
            this.canvas.c.renderAll();
        },    
  }    
}
</script>
<style scoped>

</style>