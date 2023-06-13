<template>
    <div class="setBox">
      <div v-show="textType.includes(mSelectOneTypeProps[0])" class="mt-3 mb-3">
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
                    @change="(value) => changeGroup('width', value)"                    
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
                    @change="(value) => changeGroup('height', value)"                    
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
                    @change="(value) => changeGroup('left', value)"                    
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
                    @change="(value) => changeGroup('top', value)"                    
                    number="true" />
                </div>
              </div>
            </div>
          </div>
          <!-- --------------------- End Position ----------------------->
          <!-- -------------------  Text Rotate  ---------------- -->
          <div class="mt-3 row">
            <div style="width:78%">
              Rotate
            </div>  
            <div class="input-size">
              <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                <span class="ivu-input-suffix">
                  <i style="font-style: normal; font-size: 11px;">px</i>
                </span>
                <input
                  type="number" 
                  class="ivu-input ivu-input-default ivu-input-with-suffix" 
                  v-model="baseAttr.angle"
                  @change="(value) => changeGroup('angle', value)"                     
                  :max="360"
                />
              </div>
            </div>   
          </div>
          <!-- -------------------  End Text Rotate  ---------------- -->
        </div>
        <!-- control part -->        
        <div class="customborder mt-3"></div>
        <div class="mt-3" style="margin-left: 15px;"> 
          <label>Text</label>
          <Input v-model="fontAttr.text" @on-keyup="(value) =>textKeyPress(value)" class="mb-2 mt-2" style="width:98%;">
            <template #append>
              <Select style="width:70px" @on-change="(value) =>changeCommonText('addTag',value)" size="small">
                <Option v-for="tag in tags" :value="'['+tag+']'" :key="tag"></Option>
              </Select>
            </template>
          </Input>
        </div>

        <!-- -------------------  Text Setting  ---------------- -->
        <div class="customborder mt-3"></div>
        <div class="mt-3" style="margin-left:15px;">
          <!-- -------------------  text handling  ---------------- -->
          <div class="row" style="">
            <div class="col-8" >
              <!-- <b-form-select class="mb-3" v-model="fontAttr.selected_fontfamily" @change="changeFontFamily" size="sm"> -->
              <b-form-select class="mb-3" v-model="fontAttr.selected_fontfamily" @change="(value)=>changeCommonText('fontFamily', value)" size="sm">
                
                <option v-for="item in fontAttr.fontLists" :value="item.name"  :key="item.name">{{ item.name }}</option>
              </b-form-select>                
            </div>
            <div class="col-3" style="">
              <Button class="ivu-btn ivu-btn-text" @click="uploadFontClick">
                Add custom font
                <Icon type="ios-cloud-upload-outline" />
                <input type="file" id="uploadFont" @change="uploadFont" style="display:none" accept=".woff,.ttf"/>
              </Button>
            </div>
          </div>
          <!-- -------------------  End text handling  ---------------- -->

          <!-- -------------------  font setting  ---------------- -->
          <div class="mt-4 row" style="">
            <!-- -------------------  font size & color  ---------------- -->
            <div class="col-6 row">
              <div class="col-6">
                <Tooltip :content="'Font Size'">
                  <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text" style="width: auto;">
                    <i class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
                    <input 
                      v-model="this.fontAttr.fontSize"
                      type="number" 
                      class="ivu-input ivu-input-default ivu-input-with-prefix" 
                      @change="(value) => changeCommonText('fontSize', value)"
                    />
                      <span class="ivu-input-prefix">
                        <i class="ivu-icon ivu-icon-ios-appstore"></i>
                      </span>
                  </div>
                </Tooltip>
              </div>
              <div class="col-6">
                <Tooltip :content="'Font Color'">
                  <Color style="margin-top:-10px;margin-left:10px;width:100%" :color="fontAttr.fill" @change="(value) => changeCommonText('fill', value)"></Color>
                </Tooltip>
              </div>
            </div>
            <!-- -------------------  End font size & color  ---------------- -->

            <!-- -------------------  font style  ---------------- -->
            <div class="col-6" style="text-align: right;">
                <ButtonGroup class="button-group">
                  <Button @click="changeFontWeight('fontWeight', fontAttr.fontWeight)">
                    <svg viewBox="0 0 1024 1024" width="14" height="14">
                      <path
                        d="M793.99865 476a244 244 0 0 0 54-130.42C862.75865 192.98 743.01865 64 593.85865 64H195.01865a32 32 0 0 0-32 32v96a32 32 0 0 0 32 32h63.74v576H195.01865a32 32 0 0 0-32 32v96a32 32 0 0 0 32 32h418.64c141.6 0 268.28-103.5 282-244.8 9.48-96.9-32.78-184.12-101.66-239.2zM418.33865 224h175.52a96 96 0 0 1 0 192h-175.52z m175.52 576h-175.52V576h175.52a112 112 0 0 1 0 224z"
                        :fill="fontAttr.fontWeight === 'bold' ? '#305ef4' : '#666'"
                      ></path>
                    </svg>
                  </Button>
                  <Button @click="changeFontStyle('fontStyle', fontAttr.fontStyle)">
                    <svg viewBox="0 0 1024 1024" width="14" height="14">
                      <path
                        d="M832 96v64a32 32 0 0 1-32 32h-125.52l-160 640H608a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32H224a32 32 0 0 1-32-32v-64a32 32 0 0 1 32-32h125.52l160-640H416a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32h384a32 32 0 0 1 32 32z"
                        :fill="fontAttr.fontStyle === 'italic' ? '#305ef4' : '#666'"
                      ></path>
                    </svg>
                  </Button>
                  <Button @click="changeLineThrough('linethrough', fontAttr.linethrough)">
                    <svg viewBox="0 0 1024 1024" width="14" height="14">
                      <path
                        d="M893.088 501.792H125.344a32 32 0 0 0 0 64h767.744a32 32 0 0 0 0-64zM448 448h112V208h288V96H160v112h288zM448 640h112v288H448z"
                        :fill="fontAttr.linethrough ? '#305ef4' : '#666'"
                      ></path>
                    </svg>
                  </Button>
                  <Button @click="changeUnderline('underline', fontAttr.underline)">
                    <svg viewBox="0 0 1024 1024" width="14" height="14">
                      <path
                        d="M703.232 67.008h127.488v413.248c0 158.016-142.656 286.016-318.72 286.016-176 0-318.72-128-318.72-286.016V67.008h127.488v413.248c0 39.872 18.176 78.144 51.136 107.776 36.8 32.96 86.528 51.072 140.096 51.072s103.36-18.112 140.032-51.136c33.024-29.632 51.2-67.968 51.2-107.776V67.008zM193.28 871.616h637.44v85.376H193.28v-85.376z"
                        :fill="fontAttr.underline ? '#305ef4' : '#666'"
                      ></path>
                    </svg>
                  </Button>
                </ButtonGroup>
            </div>
            <!-- -------------------  End font style  ---------------- -->

          </div>
          <!-- -------------------  End font setting  ---------------- -->
          
          <!-- -------------------  Long text handling  ---------------- -->
          <div class="mt-3 row" style="">
            <div class="" style="width:65%">
              Long text handling
            </div>  
            <div class="col-4" style="margin: 0;">
              <Tooltip :content="'Controls the length of the input string'" :placement="'left-start'">
                <b-form-select class="mb-3" v-model="fontAttr.selected_text_manage_type" @change="changeHandleLongText" size="sm">
                  <option value="automatic" selected>Automatic font size</option>
                  <option value="shorten">Shorten text</option>                
                </b-form-select>   
              </Tooltip>
            </div>   
          </div>
          <!-- -------------------  End Long text handling  ---------------- --> 
          
          <!-- -------------------  Text alignment  ---------------- -->
        <div class="mt-3" style="height:40px;">
          <div class="" style="float:left;">
            Alignment
          </div>           

          <div class="" style="float:right;">
            <align :strokeWidth="Number(fontAttr.strokeWidth)"></align>
          </div>
        </div>
          <!-- -------------------  End Text alignment  ---------------- --> 
          
          <!-- -------------------  Text padding  ---------------- -->
          <!-- <div class="mt-3 row">
            <div style="width:78%">
              Text padding
            </div>  
            <div class="input-size">
              <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                <span class="ivu-input-suffix">
                  <i style="font-style: normal; font-size: 11px;">px</i>
                </span>
                <input
                  type="number" 
                  class="ivu-input ivu-input-default ivu-input-with-suffix" 
                  :max="360"
                  :min="0"
                  v-model="baseAttr.padding"
                  @change="(value)=>changeGroup('padding', value)"
                />
              </div>
            </div>   
          </div> -->
          <!-- -------------------  End Text padding  ---------------- -->
        </div>
        <!-- -------------------  End Text Setting  ---------------- -->

        <!-- -------------------  Round Corners  ---------------- -->
        <div class="customborder mt-3"></div>
        <div class="mt-3 row" style="margin-left:5px;">
          <div style="width:78%">
            Round Corners
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
                v-model="fontAttr.round"
                :max="80"
                @change="(value)=>changeCommonRect('round', value)"                
              />
            </div>
          </div>   
        </div>        

        <!-- -------------------  End Round Corners  ---------------- -->

        <!-- -------------------  Fill  ---------------- -->
        <div class="customborder mt-3"></div>
        <div class="mt-4" style="margin-left:15px;align-items: center;">
          <div class="" style="height:40px;margin-right:15px;">
            <div style="float:left">
              Fill
            </div>                
            <div  style="float:right">
              <Switch size="small" v-model="fillState" @on-change="changeFillState" true-color="#13ce66"/>
            </div>
          </div>   
        <div v-if="fillState" class="" style="align-items: center;margin-right:20px;">
          <div class="" style="height:40px;">
            <div style="float:left">
              Color
            </div>                
            <div class="input-size" style="float:right;width:40%">
              <Color style="width:100%;padding:0" :color="fontAttr.rectFill" @change="(value) => changeCommonRect('fill', value)"></Color>
            </div>
          </div>                                                
        </div>                    
        </div>
        <!-- -------------------  End Fill  ---------------- -->

        <!-- -------------------  Text Border  ---------------- -->
        <div class="mt-4" style="margin-left:15px;align-items: center;">
          <div class="" style="height:40px;margin-right:15px;">
            <div style="float:left">
              Border
            </div>                
            <div  style="float:right">
              <Switch size="small" v-model="borderState" @on-change="changeBorderState" true-color="#13ce66"/>
            </div>
          </div>   
          <div v-if="borderState">
            <div style="height:40px;margin-right:15px;">
              <div style="float:left;width:40%;">
                <Color :color="fontAttr.stroke" @change="(value)=>changeCommonRect('stroke', value)" style="padding:0"></Color>
              </div>                        
              <div style="float:right;width:40%;">
                <b-form-select class="mb-3" v-model="fontAttr.strokeLabel" @change="(value)=>changeCommonRect('strokeType', value)" size="sm">
                  <option 
                    v-for="item in strokeDashList" 
                    :value="item.label"
                    :key="'stroke-' + item.label"
                    default-label="solid"
                  >
                    {{ item.label }}
                  </option>
                </b-form-select>                 
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
                    v-model="fontAttr.strokeWidth"
                    :max="40"
                    @change="(value)=>changeCommonRect('strokeWidth', value)"
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
import $ from "jquery";
import {getShortTags} from "@/service/endpoint.js";
import OpenType from 'opentype.js';
import {fontLists} from "@/utils/fontConstant.js";


export default {
    mixins: [select],
    props:['mSelectOneTypeProps'],
    components: {
        Color,
        Align
    },
    data(){
      return {
        textType: ['i-text', 'textbox', 'text'],        
        baseAttr: this.mSelectOneTypeProps[1],
        fontAttr: this.mSelectOneTypeProps[2],  
        tags:'',     
        borderState:false,
        fillState:false,                  
        strokeDashList: [
          {
            value: {
              strokeUniform: true,
              strokeDashArray: [1, 10],
              strokeLineCap: 'round',
              strokeLabel: 'dotted',
            },
            label: 'dotted',
          },
          {
            value: {
              strokeUniform: true,
              strokeDashArray: [15, 15],
              strokeLineCap: 'square',
              strokeLabel: 'dashed',
            },
            label: 'dashed',
          },
          {
            value: {
              strokeUniform: true,
              strokeDashArray: [0, 0],
              strokeLineCap: 'square',
              strokeLabel: 'solid',

            },
            label: 'solid',
          },
          {
            value: {
              strokeUniform: true,
              strokeDashArray: [],
              strokeLineCap: 'square',
              strokeLabel: 'double',
            },
            label: 'double',
          },
          {
            value: {
              strokeUniform: true,
              strokeDashArray: [],
              strokeLineCap: 'round',
              strokeLabel: 'groove',
            },
            label: 'groove',
          },
          {
            value: {
              strokeUniform: true,
              strokeDashArray: [],
              strokeLineCap: 'square',
              strokeLabel: 'ridge',
            },
            label: 'ridge',
          },
          {
            value: {
              strokeUniform: true,
              strokeDashArray: [],
              strokeLineCap: 'round',
              strokeLabel: 'inset',
            },
            label: 'inset',
          },
          {
            value: {
              strokeUniform: true,
              strokeDashArray: [],
              strokeLineCap: 'round',
              strokeLabel: 'outset',
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
    
      this.canvas.c.on("object:moving",(opt)=>{
        this.baseAttr.top = this.canvas.c.getActiveObject().top;
        this.baseAttr.left =this.canvas.c.getActiveObject().left;
      });

      this.canvas.c.on("object:scaling",(opt)=>{    
        if(this.canvas.c.getActiveObject().customType == "text"){
          if(this.fontAttr.selected_text_manage_type == "automatic"){
            this.fixTextPosition();
          }else{
            // var textObj = this.canvas.c.getActiveObject()._objects[1];
            this.fixTextPosition();
            this.changeHandleLongText(this.fontAttr.selected_text_manage_type);
          }
        }               
     
      });

      this.canvas.c.on("object:modified",(opt)=>{
        this.baseAttr.width = this.canvas.c.getActiveObject().width;
        this.baseAttr.height =this.canvas.c.getActiveObject().height;
        this.baseAttr.angle =this.canvas.c.getActiveObject().angle;
        opt.e.preventDefault();
        opt.e.stopPropagation();
        this.canvas.c.renderAll();        
      });   

      this.event.on('selectOne', (e) => {

        if(e[0].type == "group"){
          if(window.globalFonts){
            this.fontAttr.fontLists = window.globalFonts; 
          }else{
            this.fontAttr.fontLists = window.globalFonts = fontLists;
          }                    
          const groupObj = e[0];
          const rectObj = e[0]._objects[0];
          const textObj = e[0]._objects[1];

          //<!----------------- group property --------------->
          this.fontAttr.position = groupObj.position;
          this.fontAttr.selected_text_manage_type = groupObj.texthandle || "automatic";
          //<!----------------- end group property --------------->

          //<!----------------- rect property --------------->
          this.fontAttr.rectFill = rectObj.get('fill') || '';
          this.fontAttr.round = rectObj.get('ry') || 0;
          this.fontAttr.stroke = rectObj.get('stroke') || '';
          this.fontAttr.strokeWidth = rectObj.get('strokeWidth') || 0;     
          this.fontAttr.strokeLabel = rectObj.get('strokeLabel') || "solid";  
          //<!----------------- end rect property --------------->

          //<!----------------- end text property --------------->
          this.fontAttr.fill = textObj.get('fill') || '';
          this.fontAttr.text = textObj.get('text') || '';
          this.fontAttr.fontSize = textObj.get('fontSize');
          this.fontAttr.fontFamily = textObj.get('fontFamily');
          this.fontAttr.underline = textObj.get('underline');
          this.fontAttr.overline = textObj.get('overline');
          this.fontAttr.fontStyle = textObj.get('fontStyle');
          this.fontAttr.fontWeight = textObj.get('fontWeight');
          this.fontAttr.selected_fontfamily = textObj.fontFamily;   
          //<!----------------- end text property --------------->
          this.initSet();       
        }
            
      });
    },    
    mounted(){
      getShortTags().then((res)=>{
        this.tags = res.data
      });     
    },    
    methods:{

        initSet(){
          var activeObject = this.canvas.c.getActiveObject();
          if(activeObject.customType == "text"){
              //<---------------fill of rect setting ------------->
              if(activeObject._objects[0].fill != ''){
                this.fillState = true;
                this.fontAttr.rectFill = activeObject._objects[0].fill;
              }
              //<---------------fill of rect setting ------------->

              // <---------border of rect setting ---------->
              if(activeObject._objects[0].stroke != ''){
                this.borderState = true;
              }

              if(activeObject._objects[0].strokeWidth != 0){
                this.borderState = true;
                this.baseAttr.strokeWidth = activeObject._objects[0].strokeWidth;
              }  
              // <---------border of rect setting ---------->
          }
        },      
        changeFillState(value){

          if(value == false){
            const activeObject = this.canvas.c.getActiveObject();
            activeObject._objects[0].set('fill','').setCoords();
            this.fontAttr.rectFill = '';
            this.canvas.c.renderAll();
          }
        } ,       
        changeBorderState(value){
          if(value == false){
            const activeObject = this.canvas.c.getActiveObject();
            activeObject._objects[0].set('stroke','').setCoords();
            activeObject._objects[0].set('strokeWidth',0).setCoords();
            this.fontAttr.strokeWidth = 0;
            this.fontAttr.stroke = '';
            activeObject._objects[0].set("width",activeObject.width);
            activeObject._objects[0].set("height",activeObject.height);
            //center text object
            activeObject._objects[0].set({
              left: 0 - (activeObject.width) / 2,
              top: 0 - (activeObject.height) / 2,
            }); 
            activeObject._objects[1].set({
              left: 0 - (activeObject.width) / 2,
              top: 0 - (activeObject.height) / 2,
            });                  
            this.canvas.c.renderAll();
          }
        },      
        //<!--------------- when textobjectbox's size increase ad decrease, text position and size fix    ---------------->
        fixTextPosition(){
          const activeObject = this.canvas.c.getActiveObject();
         
          if(activeObject.customType == "text"){

            const w = activeObject.width * activeObject.scaleX,
            h = activeObject.height * activeObject.scaleY
            // var borderWidth = Number(document.getElementById("borderWidth").value);
            var borderWidth = Number(this.fontAttr.strokeWidth);

            activeObject.set({
              'height'     : h,
              'width'      : w,
              'scaleX'     : 1,
              'scaleY'     : 1,
            });
            
            activeObject._objects[0].set({
              'height'     : h-borderWidth,
              'width'      : w-borderWidth,
              'scaleX'     : 1,
              'scaleY'     : 1,
              "left":0 - (activeObject.width) / 2,
              "top":0 - (activeObject.height) / 2
            });
            var rectW = activeObject.width - borderWidth*2;
            var textW = activeObject._objects[1].width ;           
            var textS = rectW/textW;
            if(textW>rectW){
              activeObject.set({
                  position:{
                    "positionX":"left",
                    "positionY":activeObject.position.positionY
                  }
              });									
              activeObject._objects[1].set("scaleX",textS);
              activeObject._objects[1].set("scaleY",textS);			
            }else{

              if(activeObject.originPoistion == "right"){
                activeObject.set({
                    position:{
                      "positionX":"right",
                      "positionY":activeObject.position.positionY
                    }
                });                      
              }		              
              if(activeObject.originPoistion == "xCenter"){
                activeObject.set({
                    position:{
                      "positionX":"xCenter",
                      "positionY":activeObject.position.positionY
                    }
                });                
              }
	
              if(textS <= 1){
                activeObject._objects[1].set("scaleX",textS).setCoords();
                activeObject._objects[1].set("scaleY",textS).setCoords();	
              }			
            }
            var position = this.canvas.editor.getPosition(activeObject);
            if(activeObject.position.positionX == "right"){
              activeObject._objects[1].set({
                "left":position.left -borderWidth,
                "top":position.top + borderWidth
              });				
            }

            if(activeObject.position.positionX == "left"){
              activeObject._objects[1].set({
                "left":position.left+borderWidth,
                "top":position.top+	borderWidth
              });				
            }	

            if(activeObject.position.positionX == "xCenter"){
              activeObject._objects[1].set({
                "left":position.left,
                "top":position.top + borderWidth
              });				
            }			
            if(activeObject.position.positionY == "top"){
              activeObject._objects[1].top = position.top + borderWidth
            }

            if(activeObject.position.positionY == "bottom"){
              activeObject._objects[1].top = position.top - borderWidth
            }	

            if(activeObject.position.positionY == "yCenter"){
              activeObject._objects[1].top = position.top
            }
            this.canvas.c.renderAll();
          }            
        },
        //<!--------------- when textobjectbox's size increase ad decrease, text position and size fix    ---------------->

        hiddenOutArea(activeObject){

          var textObject = activeObject._objects[1];
          var clipRect = new fabric.Rect({
            originX: 'left',
            originY: 'top',
            left: activeObject.left,
            top: activeObject.top,
            width: activeObject.width - this.fontAttr.strokeWidth,
            height: activeObject.height,
            angle:activeObject.angle,
            absolutePositioned: true,
          });     
          
          textObject.clipPath = clipRect;
          this.canvas.c.renderAll();  

        },      
        //<!---------------- handle long text -------------->
        changeHandleLongText(evt){
          var activeObject = this.canvas.c.getActiveObject()._objects[1];
            if(evt == 'automatic'){

              this.fontAttr.selected_text_manage_type = "automatic";
              this.canvas.c.getActiveObject().set("texthandle",this.fontAttr.selected_text_manage_type);
              this.fixTextPosition();

            }else{

              activeObject.set("fontSize",this.fontAttr.fontSize).setCoords();
              this.fontAttr.selected_text_manage_type = "shorten";
              this.canvas.c.getActiveObject().set("texthandle",this.fontAttr.selected_text_manage_type);
              activeObject.set("fontSize",activeObject.fontSize).setCoords();
              activeObject.set("scaleX",1);
              activeObject.set("scaleY",1);
              this.hiddenOutArea(this.canvas.c.getActiveObject());

            }
            this.canvas.c.renderAll();
        },
        //<!----------------end handle long text -------------->
        textKeyPress(value){
          var string = this.fontAttr.text;
          if(value.keyCode == 8){
            if(string.includes('[')){
              string = string.slice(0,string.lastIndexOf('['));
            }
          }
          this.changeCommonText('text',string);
          this.changeHandleLongText(this.fontAttr.selected_text_manage_type);

        },

        //<!----------------------------  upload font   --------------------->
        uploadFontClick(){
          $("#uploadFont").click();
        },

        uploadFont(e){
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            const activeObject = this.canvas.c.getActiveObject()._objects[1];
            const fontBuffer = reader.result;
            const font = OpenType.parse(fontBuffer);
            var fontName = font.names.fontFamily.en;            
            this.fontFace = new FontFace(fontName, fontBuffer);
            document.fonts.add(this.fontFace);
            activeObject.set("fontFamily",fontName);

              activeObject && activeObject.set('fontFamily', fontName).setCoords();
              if(!window.globalFonts){
                window.globalFonts = this.fontAttr.fontLists;
              }
              const values = Object.values(window.globalFonts);
              const searchValue = fontName;
              const includesValue = values.includes(searchValue);         
              var stringforBuffer = new Uint8Array(fontBuffer).reduce(function (accumulator, value) {
                return accumulator + String.fromCharCode(value);
              }, '');                   
              if(!includesValue){
                window.globalFonts.push({
                  name:fontName,
                  ttf_base64:stringforBuffer
                });               
              }
 
              activeObject && activeObject.set('fontFamily', fontName).setCoords();
              this.canvas.c.renderAll();
              this.fontAttr.selected_fontfamily = fontName;
            }            
          reader.readAsArrayBuffer(file);      
        },

        //<!----------------------------  upload font   --------------------->
                  
        changeFontWeight(key, value) {
            const nValue = value === 'normal' ? 'bold' : 'normal';
            this.fontAttr.fontWeight = nValue;
            this.canvas.c.getActiveObject()._objects[1].set(key, nValue).setCoords();
            this.canvas.c.renderAll();
        },
        // italics
        changeFontStyle(key, value) {
            const nValue = value === 'normal' ? 'italic' : 'normal';
            this.fontAttr.fontStyle = nValue;
            this.canvas.c.getActiveObject()._objects[1].set(key, nValue).setCoords();
            this.canvas.c.renderAll();
        },
        // middle stroke
        changeLineThrough(key, value) {
            const nValue = value === false;
            this.fontAttr.linethrough = nValue;
            this.canvas.c.getActiveObject()._objects[1].set(key, nValue).setCoords();
            this.canvas.c.renderAll();
        },
        // underline
        changeUnderline(key, value) {
            const nValue = value === false;
            this.fontAttr.underline = nValue;
            this.canvas.c.getActiveObject()._objects[1].set(key, nValue).setCoords();
            this.canvas.c.renderAll();
        },      
        changeGroup(key,evt){
          const activeObject = this.canvas.c.getActiveObject();
          if(evt.target != undefined){
            if(typeof(Number(evt.target.value)) == "NAN"){
              evt = Number(evt.target.value);
            }else{
              evt = evt.target.value;
            } 
          }      
          if (key === 'angle') {
            activeObject.rotate(evt);
            this.canvas.c.renderAll();
            return;
          }          
          activeObject && activeObject.set(key,evt);
          this.canvas.c.renderAll();
        },
        changeCommonRect(key,evt){
          const activeObject = this.canvas.c.getActiveObject()._objects[0];
          if(key == "strokeType"){
            const stroke = this.strokeDashList.find((item) => item.label === evt);
            activeObject.set(stroke.value).setCoords();
            this.canvas.c.renderAll();            
            return;         
          }      

          if(key == "stroke"){
            activeObject.set("stroke", evt);
            this.canvas.c.renderAll();
            return;              
          }  
          if(key == "strokeWidth"){
            activeObject.set("strokeWidth", Number(evt.target.value));
            this.fixTextPosition();
            this.changeHandleLongText(this.fontAttr.selected_text_manage_type);
            this.canvas.c.renderAll();
            return;              
          }                                   
          if(key === "round"){
            this.activeObject = this.canvas.c.getActiveObject()._objects[0];
            this.activeObject.set("ry", Number(evt.target.value)).setCoords();
            this.activeObject.set("rx", Number(evt.target.value)).setCoords();
            this.canvas.c.renderAll();
            return;
          }
          if(key == "fill"){
            activeObject.set("fill", evt);
            this.canvas.c.renderAll();
            return;              
          }          
          activeObject && activeObject.set(key, Number(evt.target.value));
      
          this.canvas.c.renderAll();
        },

        changeCommonText(key, evt) {

          const activeObject = this.canvas.c.getActiveObject()._objects[1];
          if(evt.target != undefined){
            if(typeof(Number(evt.target.value)) == "NAN"){
              evt = Number(evt.target.value);
            }else{
              evt = evt.target.value;
            } 
          }

          if(key == "deleteText"){
            if(value.keyCode == 8){
              evt = evt.slice(0,evt.lastIndexOf('['));
            }            
          }

          if(key == "addTag"){
            evt = this.fontAttr.text + evt;
            key = "text";
          }

          this.fontAttr[key] = evt;
          activeObject && activeObject.set(key, evt);
          this.changeHandleLongText(this.fontAttr.selected_text_manage_type);      
        },           
    }
    
}
</script>
<style scoped>
.input-size{
  width:20%
}  
</style>