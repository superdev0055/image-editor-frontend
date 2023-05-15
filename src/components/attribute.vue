<template>
  <div v-if="mSelectMode === 'one'" style="font-size:12px" id="attribute">
    <!-- general properties -->
    <div class="right_header" style="position: sticky; width: 100%; top: 0px; z-index: 4;background-color:white">

      <!-- Right Head -->
      <right-header :mSelectOneTypeProps="[mSelectOneType,this.baseAttr]"></right-header>
      <!-- Right Head -->

      <!-- layer setting -->
      <div class="mt-2 customborder"></div>
      <div class="mt-2" style="height:40px;margin-right:40px;">
        <div style="float:left;margin-left:30px"><layer1></layer1></div>
        <div style="float:right">
          <Tooltip v-if="mSelectMode === 'one'" content="Click to unlock or lock" placement="top">
            <Button v-if="isLock" @click="doLock(false)" icon="md-lock" type="text"></Button>
            <Button v-else @click="doLock(true)" icon="ios-unlock-outline" type="text"></Button>
          </Tooltip>
          <Tooltip v-if="mSelectMode === 'one'" content="Click to view or unview" placement="top">
            <Button v-if="isView" icon="ios-eye-off-outline" @click="doView(true)" type="text"></Button>
            <Button v-else @click="doView(false)" icon="ios-eye-outline" type="text"></Button>
          </Tooltip>
          <Dropdown placement="bottom-end">
              <Button icon="ios-more" type="text">
              </Button>
              <template #list>
                  <DropdownMenu>
                    <clone></clone>
                    <dele></dele>
                  </DropdownMenu>
              </template>
          </Dropdown>
        </div>
      </div>
      <!-- layer setting -->    
      <div class="customborder"></div>
    </div>
    <div class="setBox">
      <div v-show="imgType.includes(mSelectOneType)">
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
                    pattern="^\d*(\.\d{0,2})?$" />
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
      </div>
      <div v-show="imgType.includes(mSelectOneType)" style="margin-left:15px"> 
        <div class="row mb-3">
          <flip></flip>
          <div class="input-size">
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
        <!-- emptypattern part -->
        <div v-if="showProduct" >
          <div class="" style="height:40px;margin-right:15px;">
            <div style="float:left">
              Remove white background
            </div>                
            <div  style="float:right">
              <Switch size="small" v-model="nonBgImageState" @on-change="nonproductImage"/>
            </div>
          </div>          
          <div class="" style="height:40px;margin-right:15px;">
            <div class="float:left">
              Trim image
            </div>                
            <div class="" style="float:right">
              <Switch size="small" v-model="trimImageState" @on-change="trimImage"/>
            </div>
          </div>          
        </div>
        <!---------------fit mode -------------->
        <!-- <div class="row mb-3" style="">
          <div class="col col-lg-8">
            Fit mode
          </div>                
          <div class="col-lg-3" style="text-align: right; maring-right: 5px;">
            <Button type="text" @click="()=>fitImage('clip')">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect id="bound" x="0" y="0" width="24" height="24"/>
                    <rect id="Rectangle-151" fill="#000000" opacity="0.3" x="4" y="4" width="8" height="16"/>
                    <path d="M6,18 L9,18 C9.66666667,18.1143819 10,18.4477153 10,19 C10,19.5522847 9.66666667,19.8856181 9,20 L4,20 L4,15 C4,14.3333333 4.33333333,14 5,14 C5.66666667,14 6,14.3333333 6,15 L6,18 Z M18,18 L18,15 C18.1143819,14.3333333 18.4477153,14 19,14 C19.5522847,14 19.8856181,14.3333333 20,15 L20,20 L15,20 C14.3333333,20 14,19.6666667 14,19 C14,18.3333333 14.3333333,18 15,18 L18,18 Z M18,6 L15,6 C14.3333333,5.88561808 14,5.55228475 14,5 C14,4.44771525 14.3333333,4.11438192 15,4 L20,4 L20,9 C20,9.66666667 19.6666667,10 19,10 C18.3333333,10 18,9.66666667 18,9 L18,6 Z M6,6 L6,9 C5.88561808,9.66666667 5.55228475,10 5,10 C4.44771525,10 4.11438192,9.66666667 4,9 L4,4 L9,4 C9.66666667,4 10,4.33333333 10,5 C10,5.66666667 9.66666667,6 9,6 L6,6 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero"/>
                </g>
              </svg>
            </Button>
            <Button type="text" @click="()=>fitImage('fit')">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <polygon id="Bound" points="0 0 24 0 24 24 0 24"/>
                      <path d="M6,18 L9,18 C9.66666667,18.1143819 10,18.4477153 10,19 C10,19.5522847 9.66666667,19.8856181 9,20 L4,20 L4,15 C4,14.3333333 4.33333333,14 5,14 C5.66666667,14 6,14.3333333 6,15 L6,18 Z M18,18 L18,15 C18.1143819,14.3333333 18.4477153,14 19,14 C19.5522847,14 19.8856181,14.3333333 20,15 L20,20 L15,20 C14.3333333,20 14,19.6666667 14,19 C14,18.3333333 14.3333333,18 15,18 L18,18 Z M18,6 L15,6 C14.3333333,5.88561808 14,5.55228475 14,5 C14,4.44771525 14.3333333,4.11438192 15,4 L20,4 L20,9 C20,9.66666667 19.6666667,10 19,10 C18.3333333,10 18,9.66666667 18,9 L18,6 Z M6,6 L6,9 C5.88561808,9.66666667 5.55228475,10 5,10 C4.44771525,10 4.11438192,9.66666667 4,9 L4,4 L9,4 C9.66666667,4 10,4.33333333 10,5 C10,5.66666667 9.66666667,6 9,6 L6,6 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero"/>
                  </g>
              </svg>
            </Button>
          </div>
        </div>        -->
        <!---------------fit mode -------------->
        <div class="mt-4" style="height:30px;margin-right:15px;">
          <div class="" style="float:left">
            Alignment
          </div>                
          <div class="" style="float:right">
            <align-image></align-image>
          </div>
        </div>      
      </div>

      <!----------------- shape and text ----------------------->

      <shape-type :mSelectOneTypeProps="[mSelectOneType,this.baseAttr]"></shape-type>
      <text-type :mSelectOneTypeProps="[mSelectOneType,this.baseAttr,this.fontAttr]" @textGroupSet = textGroupSet($event)></text-type>

      <!----------------- shape and text ----------------------->
                  
      <!-- Layer restriction -->
      <div class="customborder mt-3" ></div>
      <div class="mt-4" style="margin-left:15px">
        <div class="" style="height:40px;margin-right:15px;">
          <div style="float:left">
            Layer time restriction
          </div>                
          <div  style="float:right">
            <Switch size="small" v-model="restrictionState" true-color="#13ce66"/>
          </div>
        </div>           
        <div v-if="restrictionState" class="" style="align-items: center;">
          <div class="" style="height:40px;margin-right:15px;">
            <div style="float:left">
              Generate
            </div>                
            <div class="input-size" style="float:right">
              <Select v-model="this.baseAttr.layerShowPeriod.mode" @on-change="(value)=>changeLayerShowPeriod('mode',value)">
                  <Option v-for="item in modes" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>     
          <div class="" style="height:40px;margin-right:15px;">
            <div style="float:left">
              From
            </div>                
            <div style="float:right">
              <DatePicker type="date" style="width:100%" placeholder="Start date" v-model="this.baseAttr.layerShowPeriod.startDate" @on-change="(value)=>changeLayerShowPeriod('startDate',value)"/>
            </div>
          </div>   
          <div class="" style="height:40px;margin-right:15px;">
            <div style="float:left">
              Until
            </div>                
            <div style="float:right">
              <DatePicker type="date" style="width:100%" placeholder="End date" v-model="this.baseAttr.layerShowPeriod.endDate" @on-change="(value)=>changeLayerShowPeriod('endDate',value)"/>
            </div>
          </div>      
          <div class="mt-3">
            <input type="text" class="ivu-input" value="Generated all the time." id="genLayerPeriod" readonly> 
          </div>                                    
        </div>  
      </div>

      <!-- Layer restriction -->    
    </div>
  </div>
</template>

<script>

import select from '@/mixins/select';
import layer1 from './layer1.vue';
import Color from './color.vue';
import dele from "./del.vue";
import clone from "./clone.vue";
import flip from "./flip.vue";
import alignImage from "./alignImage.vue";
import {nonBgImage,trimImage,productImage} from '@/utils/imgConstant';
import rightHeader from "./rightHeader.vue";
import shapeType from "./shapeType.vue";
import textType from "./textType.vue";

const lockAttrs = [
  'lockMovementX',
  'lockMovementY',
  'lockRotation',
  'lockScalingX',
  'lockScalingY',
];

export default {
  name: 'ToolBar',
  mixins: [select],
  components: {
    Color,
    layer1,
    dele,
    clone,
    flip,
    alignImage,
    rightHeader,
    shapeType,
    textType
  },
  data() {
    return {
      //layer restriction
      modes: [
          {
              value: 'only',
              label: 'only'
          },
          {
              value: 'except',
              label: 'except'
          }
      ],
      restrictionState:true,
      //layer restriction
      isLock: false,
      isView:true,

      emptyPatternState:"productImage", //emptyPatternState includes 'productImage' ,'trimImage',"nonproductImage" 
      nonBgImageState:false,
      trimImageState:false,  
      showProduct:false,
      
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
      // <!------------------------image element --->
      imgType: ['image'],
      // general properties
      baseAttr: {
        name:'',
        width:0,
        height:0,
        round:0,
        sizeX: 0,
        sizeY: 0,
        opacity: 0,
        angle: 0,
        fill: '#fff',
        left: 0,
        top: 0,
        strokeWidth: 0,
        stroke: '',
        shadow: {
          color: '#ffffff',
          blur: 0,
          offsetX: 0,
          offsetY: 0,
        },
      },
      // font properties
      fontAttr: {
        string:"",
        fontSize: 0,
        fontFamily: "",    
        lineHeight: 0, 
        charSpacing: 0,
        fontWeight: '',
        textBackgroundColor: '#fff',
        textAlign: '',
        fontStyle: '',
        underline: false,
        linethrough: false,
        overline: false,
      },      

      // font alignment
      textAlignList: ['left', 'center', 'right'],
      // Align icon
      textAlignListSvg: [
        '<svg t="1650441458823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3554" width="18" height="18"><path d="M198.4 198.4h341.333333c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533334 19.2v57.6c0 8.533333-2.133333 14.933333-8.533334 19.2-6.4 6.4-12.8 8.533333-19.2 8.533334h-341.333333c-8.533333 0-14.933333-2.133333-19.2-8.533334-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 12.8-8.533333 19.2-8.533333z m0 170.666667h569.6c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533333h-569.6c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 12.8-8.533333 19.2-8.533333z m0 170.666666h454.4c8.533333 0 14.933333 2.133333 19.2 8.533334 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533333h-454.4c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 12.8-8.533333 19.2-8.533334z m0 170.666667h625.066667c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533334h-625.066667c-8.533333 0-14.933333-2.133333-19.2-8.533334-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 12.8-8.533333 19.2-8.533333z" p-id="3555"></path></svg>',
        '<svg t="1650441512015" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3704" width="18" height="18"><path d="M313.6 198.4h398.933333c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533334 19.2v57.6c0 8.533333-2.133333 14.933333-8.533334 19.2-6.4 6.4-12.8 8.533333-19.2 8.533334h-398.933333c-8.533333 0-14.933333-2.133333-19.2-8.533334-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 10.666667-8.533333 19.2-8.533333z m-115.2 170.666667h625.066667c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533333h-625.066667c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 12.8-8.533333 19.2-8.533333z m115.2 170.666666h398.933333c8.533333 0 14.933333 2.133333 19.2 8.533334 6.4 6.4 8.533333 12.8 8.533334 19.2v57.6c0 8.533333-2.133333 14.933333-8.533334 19.2-6.4 6.4-12.8 8.533333-19.2 8.533333h-398.933333c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 10.666667-8.533333 19.2-8.533334z m-115.2 170.666667h625.066667c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533334h-625.066667c-8.533333 0-14.933333-2.133333-19.2-8.533334-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 12.8-8.533333 19.2-8.533333z" p-id="3705"></path></svg>',
        '<svg t="1650441519862" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3854" width="18" height="18"><path d="M454.4 283.733333v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 6.4-6.4 12.8-8.533333 19.2-8.533333h341.333334c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533334h-341.333334c-8.533333 0-14.933333-2.133333-19.2-8.533334-4.266667-4.266667-8.533333-10.666667-8.533333-19.2z m-226.133333 170.666667v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 6.4-6.4 12.8-8.533333 19.2-8.533333h569.6c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533333H256c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-4.266667-8.533333-10.666667-8.533333-19.2z m113.066666 170.666667v-57.6c0-8.533333 2.133333-14.933333 8.533334-19.2 6.4-6.4 12.8-8.533333 19.2-8.533334h454.4c8.533333 0 14.933333 2.133333 19.2 8.533334 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533333h-454.4c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-4.266667-8.533333-10.666667-8.533334-19.2z m-170.666666 170.666666v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 6.4-6.4 12.8-8.533333 19.2-8.533333h625.066667c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533334h-625.066667c-8.533333 0-14.933333-2.133333-19.2-8.533334-6.4-4.266667-8.533333-10.666667-8.533333-19.2z" p-id="3855"></path></svg>',
      ],
      imageShowMode:"",
      layerShowPeriod :{
          mode:'',
          startDate:'',
          endDate:''
        }      
    };
  },

  created() {

    this.event.on('selectUpdate', () => {
      if(this.canvas.c.getActiveObject().name == "picture"){
        this.canvas.c.getActiveObject().clipState = this.imageShowMode;
      }
    });

    this.event.on('selectOne', (items) => {

      this.isLock = !items[0].hasControls;
      this.mSelectActive = items[0];      
      var activeObject = this.canvas.c.getActiveObjects()[0]; 
      if(activeObject.id == "productImage" || activeObject.id =='nonBgImage' || activeObject.id == 'trimImage'){

        this.showProduct = true;

      }else{

        this.showProduct = false;
      } 
      

      if (activeObject) {

        // base
        this.baseAttr.item_name = activeObject.item_name;
        this.baseAttr.round = activeObject.get('rx');
        this.baseAttr.height = activeObject.get('height');
        this.baseAttr.width = activeObject.get('width');
        this.baseAttr.opacity = activeObject.get('opacity') * 100;
        this.baseAttr.fill = activeObject.get('fill');
        if(this.baseAttr.fill == null){
          this.baseAttr.fill = '';
        }           
        this.baseAttr.left = activeObject.get('left');
        this.baseAttr.top = activeObject.get('top');
        this.baseAttr.stroke = activeObject.get('stroke');
        if(this.baseAttr.stroke == null){
          this.baseAttr.stroke = '';
        }           
        this.baseAttr.shadow = activeObject.get('shadow') || {};
        this.baseAttr.angle = activeObject.get('angle') || 0;
        this.baseAttr.padding = activeObject.get('padding') || 0;
        this.baseAttr.layerShowPeriod = activeObject.get("layerShowPeriod");
        if(items[0].type == "group"){

          var activeObject = items[0]._objects[1];
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

        //layerRestricion
        this.setLayerShowPeriod();
        setTimeout(() => {
          this.generateLayerPeriod();     
        }, 300);
        //layerRestricion
      }

    });
  },

  mounted(){
    // setInterval(() => {
    //   this.canvas.editor.checkLayerPeriod();
    // }, 1000);    
  },

  computed:{
  },

  methods: {
    setLayerShowPeriod(){
      var state = this.baseAttr.layerShowPeriod;

      if(state.mode == '' && state.startDate == '' && state.endDate == ''){
        this.restrictionState = false;
      }else{
        this.restrictionState = true;
      }
    },

    changeLayerShowPeriod(key,value){
      var activeObject = this.canvas.c.getActiveObject();

      switch(key){
        case "mode":
          activeObject.layerShowPeriod.mode = value;    
          this.baseAttr.layerShowPeriod.mode = value
          break;

        case "startDate":

          activeObject.layerShowPeriod.startDate = value;  
          this.baseAttr.layerShowPeriod.startDate = value
          break;

        case "endDate":
          activeObject.layerShowPeriod.endDate = value;                      
          this.baseAttr.layerShowPeriod.endDate = value
          break;
      }
      this.generateLayerPeriod();     
      this.canvas.c.renderAll();
    },

    generateLayerPeriod(){

      if(document.getElementById('genLayerPeriod') != null){
        
        if(this.baseAttr.layerShowPeriod.startDate != ''){
          if(this.baseAttr.layerShowPeriod.mode == "except"){
            document.getElementById('genLayerPeriod').value = "Generation stopped from "+this.baseAttr.layerShowPeriod.startDate; 
          }else{
            document.getElementById('genLayerPeriod').value = "Generated from "+this.baseAttr.layerShowPeriod.startDate; 
          }
        }

        if(this.baseAttr.layerShowPeriod.endDate != ""){
          if(this.baseAttr.layerShowPeriod.mode == "except"){
            document.getElementById('genLayerPeriod').value = "Generation stopped until "+this.baseAttr.layerShowPeriod.endDate; 
          }else{
            document.getElementById('genLayerPeriod').value = "Generated until "+this.baseAttr.layerShowPeriod.endDate; 
          }          
        }
        if(this.baseAttr.layerShowPeriod.startDate != "" && this.baseAttr.layerShowPeriod.endDate != ""){
          
          if(this.baseAttr.layerShowPeriod.mode == "except"){
            document.getElementById('genLayerPeriod').value = "Generation stopped from "+this.baseAttr.layerShowPeriod.startDate+" until "+this.baseAttr.layerShowPeriod.endDate; 
          }else{
            document.getElementById('genLayerPeriod').value = "Generated from "+this.baseAttr.layerShowPeriod.startDate+" until "+this.baseAttr.layerShowPeriod.endDate; 
          }             
          
        }
        if(this.baseAttr.layerShowPeriod.startDate == "" && this.baseAttr.layerShowPeriod.endDate == ""){
          document.getElementById('genLayerPeriod').value = "Generated all the time"; 
        }         


      }

    },
    fitImage(value){
      var activeObject = this.canvas.c.getActiveObject();
      
      activeObject.set("width",this.baseAttr.width);
      activeObject.set("height",this.baseAttr.height);
      
      this.canvas.c.renderAll();

      if(value == "clip"){
        if(this.imageShowMode == "clip"){
          return;
        }else{
          this.imageShowMode = "clip";
          activeObject._objects[1].set({
            left:activeObject._objects[1].left/activeObject._objects[1].scaleX,
            top:activeObject._objects[1].top/activeObject._objects[1].scaleX,
          });          
          if(activeObject.width<activeObject.height){
            this.imgHeightClip(activeObject.height);
          }else{
            this.imgWidthClip(activeObject.width);
          }
        }

      }else{
        this.imageShowMode = "fit";
        
        var activeObject = this.canvas.c.getActiveObject();
        activeObject._objects[1].set({
          left:activeObject._objects[1].left/activeObject._objects[1].scaleX,
          top:activeObject._objects[1].top/activeObject._objects[1].scaleX,
          scaleX:1,
          scaleY:1,
        });        

        this.canvas.c.renderAll();
      }

    },

    //emptyImage
    nonproductImage(evt){
      this.nonBgImageState = evt
      this.checkEmpty();
    },
    trimImage(evt){
      this.trimImageState = evt
      this.checkEmpty();
    },   
    checkEmpty(){
      if(this.trimImageState == true){
        this.emptyPatternState = "trimImage"
        return;
      }
      if(this.nonBgImageState == true){
        this.emptyPatternState = "nonBgImage"
        return;
      }
      this.emptyPatternState = "productImage"
    },

    //emptyImage


    doView(isView){
      isView ? this.view() : this.unView();
    },

    view(){
      this.isView = false;
      this.changeCommon("opacity",0);
      this.lock();
    },

    unView(){
      this.isView = true
      this.changeCommon("opacity",100);
      this.unLock();      
    },

    doLock(isLock) {
      isLock ? this.lock() : this.unLock();
    },

    lock() {
      // Modify custom properties
      this.mSelectActive.hasControls = false;
      // Moify default properties
      lockAttrs.forEach((key) => {
        this.mSelectActive[key] = true;
      });

      this.mSelectActive.selectable = false;

      this.isLock = true;
      this.canvas.c.renderAll();
    },
    
    unLock() {
      // Modify custom properties
      this.mSelectActive.hasControls = true;
      // Modify default properties
      lockAttrs.forEach((key) => {
        this.mSelectActive[key] = false;
      });
      this.mSelectActive.selectable = true;
      this.isLock = false;
      this.canvas.c.renderAll();
    },

    imgWidthClip(width){
      var imgW = this.canvas.c.getActiveObject()._objects[1].getElement().width;
      var imgH = this.canvas.c.getActiveObject()._objects[1].getElement().height;  
      const activeObject = this.canvas.c.getActiveObjects()[0];
      var scale = activeObject._objects[1].scaleX;
      activeObject.set("width", width);
      activeObject._objects[1].set("scaleX",scale)
      activeObject._objects[1].set("scaleY",scale)      
      if(scale <= width/imgW){
        scale = width/imgW;
        activeObject._objects[1].set("scaleX",scale)
        activeObject._objects[1].set("scaleY",scale)        
        var top = 0 - (imgH*scale) / 2;
        var left = -(activeObject.width/2);  
        activeObject._objects[1].set("left",left);
        activeObject._objects[1].set("top", top);                  
      }
      var clipRect = new fabric.Rect({
        originX: 'left',
        originY: 'top',
        left: activeObject.left,
        top: activeObject.top,
        width: activeObject.width,
        height: activeObject.height,
        angle:activeObject.angle,
        absolutePositioned: true
      });     
      activeObject.clipPath = clipRect;

      this.canvas.c.renderAll();
      activeObject.clipPath = '';
      return;
      
    },

    imgHeightClip(height){
      const activeObject = this.canvas.c.getActiveObjects()[0];
      var imgW = this.canvas.c.getActiveObject()._objects[1].getElement().width;
      var imgH = this.canvas.c.getActiveObject()._objects[1].getElement().height;         
      var scale = this.baseAttr.width/imgW;
      var top = 0 - (imgH*scale) / 2;
      var left = -(activeObject.width/2);
      var diff = left+(activeObject.width/2*scale);

      if(scale <= height/imgH){
        scale = height/imgH; 
        top = 0 - (imgH*scale) / 2;
        left =   -(activeObject._objects.width*activeObject.scaleX/2)
      }

      activeObject.set("height", height);
      activeObject._objects[1].set("scaleX",scale)
      activeObject._objects[1].set("scaleY",scale)
      activeObject._objects[1].set("left",left);
      activeObject._objects[1].set("top", top);

      var clipRect = new fabric.Rect({
        originX: 'left',
        originY: 'top',
        left: activeObject.left,
        top: activeObject.top,
        width: activeObject.width,
        height: activeObject.height,
        angle:activeObject.angle,
        absolutePositioned: true,
      });     
      
      activeObject.clipPath = clipRect;
      this.canvas.c.renderAll();
      activeObject.clipPath = '';
      this.canvas.c.renderAll();      
      return;
    },
    // Generic property changes
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

      if(key == "width"){
        if(this.imageShowMode == "clip"){
          this.imgWidthClip(Number(evt.target.value))
          return;
        }
      }
      if(key == "height"){
        if(this.imageShowMode == "clip"){
          this.imgHeightClip(Number(evt.target.value));
          return;
        }
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
    // border settings
    borderSet(key) {
      const activeObject = this.canvas.c.getActiveObjects()[0];
      if (activeObject) {
        const stroke = this.strokeDashList.find((item) => item.label === key);
        activeObject.set(stroke.value);
        this.canvas.c.renderAll();
      }
    },

    insertEmpty(file){
      var originLeft = this.canvas.c.getActiveObjects()[0].left;
      var originTop = this.canvas.c.getActiveObjects()[0].top;
      var originHeight = this.canvas.c.getActiveObjects()[0].height;
      var originWidth = this.canvas.c.getActiveObjects()[0].width;
      var originScaleX = this.canvas.c.getActiveObjects()[0].scaleX;
      var originScaleY = this.canvas.c.getActiveObjects()[0].scaleY;      
      var item_name = this.canvas.c.getActiveObjects()[0].item_name;
      var angle = this.canvas.c.getActiveObject().angle; 
      var opacity = this.canvas.c.getActiveObject().opacity;
      var layerShowPeriod = this.canvas.c.getActiveObject().layerShowPeriod;
      const imgEl = document.createElement('img');
      imgEl.src = file
      document.body.appendChild(imgEl);
      imgEl.onload = () => {
        // Create a product image
        const imgInstance = new this.fabric.Image(imgEl, {
          id:this.emptyPatternState,
          item_name:item_name,
          left:originLeft,
          top:originTop,
          width:originWidth,
          height:originHeight,
          scaleX:originScaleX,
          scaleY:originScaleY,
          angle:angle,
          opacity:opacity,
          layerShowPeriod:layerShowPeriod
        });
        
        this.canvas.c.remove(this.canvas.c.getActiveObjects()[0])
        this.canvas.c.add(imgInstance);
        this.canvas.c.setActiveObject(imgInstance);
        this.canvas.c.renderAll();
        imgEl.remove();
      }      
    }
  },
  watch:{
    emptyPatternState(){
      var id = this.canvas.c.getActiveObjects()[0].id;
      if(id  == "nonBgImage" || id == "trimImage" || id=="productImage"){
        if(this.emptyPatternState == "nonBgImage"){
          this.insertEmpty(nonBgImage);
          return true;
        }else if(this.emptyPatternState == "trimImage"){
          this.insertEmpty(trimImage);
          return true;
        }else{
          this.insertEmpty(productImage);
          return true;
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.input-size{
  width:20%
}  
Button {
  padding: 0px 5px;
}
.box {
  width: 100%;
}

.flex-item {
  display: inline-flex;
  flex: 1;
  .label {
    width: 32px;
    height: 32px;
    line-height: 32px;
    display: inline-block;
    font-size: 14px;
    color: #333333;
  }
}
</style>