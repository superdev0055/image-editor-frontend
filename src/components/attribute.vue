<template>
  <div v-if="mSelectMode === 'one'" style="font-size:12px" id="attribute">
    <!-- general properties -->
    <div class="right_header" style="position: sticky; width: 100%; top: 0px; z-index: 45555555555;background-color:white">
      <!-- Right Head -->
      <right-header :mSelectOneTypeProps="mSelectOneType"></right-header>
      <!-- Right Head -->
      <!-- layer setting -->
      <div class="mt-2 customborder"></div>
      <div class="mt-2" style="height: 40px;margin-right:40px">
        <div style="float:left"><layer1></layer1></div>
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
      </div>
      <div v-show="imgType.includes(mSelectOneType)" style="margin-left:15px"> 
        <div class="row mb-3">
          <flip></flip>
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
        <!-- emptypattern part -->
        <div class="row mb-3" style="">
          <div class="col col-lg-10">
            Remove white background
          </div>                
          <div class="col col-lg-2">
            <Switch size="small" v-model="removeBgState" @on-change="nonShowBg"/>
          </div>
        </div>          
        <div class="row mb-3" style="">
          <div class="col col-lg-10">
            Trim image
          </div>                
          <div class="col col-lg-2">
            <Switch size="small" v-model="trimBgState" @on-change="trimBg"/>
          </div>
        </div>          

        <div class="row mb-3" style="">
          <div class="col col-lg-8">
            Fit mode
          </div>                
          <div class="col-lg-3" style="text-align: right; maring-right: 5px;">
            <Button type="text">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect id="bound" x="0" y="0" width="24" height="24"/>
                      <rect id="Rectangle-151" fill="#000000" opacity="0.3" x="4" y="4" width="8" height="16"/>
                      <path d="M6,18 L9,18 C9.66666667,18.1143819 10,18.4477153 10,19 C10,19.5522847 9.66666667,19.8856181 9,20 L4,20 L4,15 C4,14.3333333 4.33333333,14 5,14 C5.66666667,14 6,14.3333333 6,15 L6,18 Z M18,18 L18,15 C18.1143819,14.3333333 18.4477153,14 19,14 C19.5522847,14 19.8856181,14.3333333 20,15 L20,20 L15,20 C14.3333333,20 14,19.6666667 14,19 C14,18.3333333 14.3333333,18 15,18 L18,18 Z M18,6 L15,6 C14.3333333,5.88561808 14,5.55228475 14,5 C14,4.44771525 14.3333333,4.11438192 15,4 L20,4 L20,9 C20,9.66666667 19.6666667,10 19,10 C18.3333333,10 18,9.66666667 18,9 L18,6 Z M6,6 L6,9 C5.88561808,9.66666667 5.55228475,10 5,10 C4.44771525,10 4.11438192,9.66666667 4,9 L4,4 L9,4 C9.66666667,4 10,4.33333333 10,5 C10,5.66666667 9.66666667,6 9,6 L6,6 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero"/>
                  </g>
              </svg>
            </Button>
            <Button type="text">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <polygon id="Bound" points="0 0 24 0 24 24 0 24"/>
                      <path d="M6,18 L9,18 C9.66666667,18.1143819 10,18.4477153 10,19 C10,19.5522847 9.66666667,19.8856181 9,20 L4,20 L4,15 C4,14.3333333 4.33333333,14 5,14 C5.66666667,14 6,14.3333333 6,15 L6,18 Z M18,18 L18,15 C18.1143819,14.3333333 18.4477153,14 19,14 C19.5522847,14 19.8856181,14.3333333 20,15 L20,20 L15,20 C14.3333333,20 14,19.6666667 14,19 C14,18.3333333 14.3333333,18 15,18 L18,18 Z M18,6 L15,6 C14.3333333,5.88561808 14,5.55228475 14,5 C14,4.44771525 14.3333333,4.11438192 15,4 L20,4 L20,9 C20,9.66666667 19.6666667,10 19,10 C18.3333333,10 18,9.66666667 18,9 L18,6 Z M6,6 L6,9 C5.88561808,9.66666667 5.55228475,10 5,10 C4.44771525,10 4.11438192,9.66666667 4,9 L4,4 L9,4 C9.66666667,4 10,4.33333333 10,5 C10,5.66666667 9.66666667,6 9,6 L6,6 Z" id="Combined-Shape" fill="#000000" fill-rule="nonzero"/>
                  </g>
              </svg>
            </Button>
          </div>
        </div>       
        <div class="row mb-3" style="">
          <div class="col col-lg-6">
            Alignment
          </div>                
          <div class="col col-lg-5">
            <align></align>
          </div>
        </div>      
      </div>

      <!----------------- shape and text ----------------------->

      <shape-type :mSelectOneTypeProps="[mSelectOneType,this.baseAttr]"></shape-type>
      <text-type :mSelectOneTypeProps="[mSelectOneType,this.baseAttr,this.fontAttr]" @textGroupSet = textGroupSet($event)></text-type>

      <!----------------- shape and text ----------------------->
                  
      <!-- Layer restriction -->
      <div class="customborder mt-3" ></div>
      <div class="row mt-3 mb-3" style="margin-left:15px;">
        <div class="col-9">
          Layer time restriction
        </div>
        <div class="col-2" style="text-align: right;">
          <Switch size="small" @on-change="showRestriction" true-color="#13ce66"/>
        </div>
        <div v-if="restrictionState">
          <div class="row mt-3">
            <div class="col-8">
              Generate
            </div>
            <div class="col-3">
              <Select v-model="model1" @on-change="selectMode">
                  <Option v-for="item in modes" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-5">
              From
            </div>                
            <div class="col-6">
              <DatePicker type="date" style="width:100%" placeholder="Start date" @on-change="startDate"/>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col col-5">
              Until
            </div>                
            <div class="col col-6">
              <DatePicker type="date" style="width:100%" placeholder="End date" @on-change="endDate"/>
            </div>
          </div>
          <div class="col-11 mt-3">
            <input type="text" class="ivu-input" value="Generated all the time."> 
          </div>
        </div>
      </div>
      <!-- Layer restriction -->    
    </div>
  </div>
</template>

<style>
/*   
  .right_header {
    position: fixed;
  } */

</style>
<script>
import select from '@/mixins/select';
import layer1 from './layer1.vue'
import Color from './color.vue';
import dele from "./del.vue";
import clone from "./clone.vue"
import flip from "./flip.vue"
import align from "./align.vue"
import {removeBg,trimBg,emptyData} from '@/utils/imgConstant';
import rightHeader from "./rightHeader.vue" 
import shapeType from "./shapeType.vue" 
import textType from "./textType.vue" 
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
    align,
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
      model1: '',
      restrictionState:false,
      //layer restriction
      isLock: false,
      isView:true,
      emptyPatternState:"showBg", //emptyPatternState includes 'showBg' ,'trimBg',"nonShowBg" 
      removeBgState:false,
      trimBgState:false,  
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
        strokeDashArray: [],
        stroke: '#fff',
        shadow: {
          color: '#fff',
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
      // Font drop-down list
      strokeDashList: [
        {
          value: {
            strokeUniform: true,
            strokeDashArray: [],
            strokeLineCap: 'butt',
          },
          label: 'Stroke',
        },
        {
          value: {
            strokeUniform: true,
            strokeDashArray: [1, 10],
            strokeLineCap: 'butt',
          },
          label: 'Dash-1',
        },
        {
          value: {
            strokeUniform: true,
            strokeDashArray: [1, 10],
            strokeLineCap: 'round',
          },
          label: 'Dash-2',
        },
        {
          value: {
            strokeUniform: true,
            strokeDashArray: [15, 15],
            strokeLineCap: 'square',
          },
          label: 'Dash-3',
        },
        {
          value: {
            strokeUniform: true,
            strokeDashArray: [15, 15],
            strokeLineCap: 'round',
          },
          label: 'Dash-4',
        },
        {
          value: {
            strokeUniform: true,
            strokeDashArray: [25, 25],
            strokeLineCap: 'square',
          },
          label: 'Dash-5',
        },
        {
          value: {
            strokeUniform: true,
            strokeDashArray: [25, 25],
            strokeLineCap: 'round',
          },
          label: 'Dash-6',
        },
        {
          value: {
            strokeUniform: true,
            strokeDashArray: [1, 8, 16, 8, 1, 20],
            strokeLineCap: 'square',
          },
          label: 'Dash-7',
        },
        {
          value: {
            strokeUniform: true,
            strokeDashArray: [1, 8, 16, 8, 1, 20],
            strokeLineCap: 'round',
          },
          label: 'Dash-8',
        },
      ],
      // font alignment
      textAlignList: ['left', 'center', 'right'],
      // Align icon
      textAlignListSvg: [
        '<svg t="1650441458823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3554" width="18" height="18"><path d="M198.4 198.4h341.333333c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533334 19.2v57.6c0 8.533333-2.133333 14.933333-8.533334 19.2-6.4 6.4-12.8 8.533333-19.2 8.533334h-341.333333c-8.533333 0-14.933333-2.133333-19.2-8.533334-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 12.8-8.533333 19.2-8.533333z m0 170.666667h569.6c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533333h-569.6c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 12.8-8.533333 19.2-8.533333z m0 170.666666h454.4c8.533333 0 14.933333 2.133333 19.2 8.533334 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533333h-454.4c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 12.8-8.533333 19.2-8.533334z m0 170.666667h625.066667c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533334h-625.066667c-8.533333 0-14.933333-2.133333-19.2-8.533334-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 12.8-8.533333 19.2-8.533333z" p-id="3555"></path></svg>',
        '<svg t="1650441512015" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3704" width="18" height="18"><path d="M313.6 198.4h398.933333c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533334 19.2v57.6c0 8.533333-2.133333 14.933333-8.533334 19.2-6.4 6.4-12.8 8.533333-19.2 8.533334h-398.933333c-8.533333 0-14.933333-2.133333-19.2-8.533334-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 10.666667-8.533333 19.2-8.533333z m-115.2 170.666667h625.066667c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533333h-625.066667c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 12.8-8.533333 19.2-8.533333z m115.2 170.666666h398.933333c8.533333 0 14.933333 2.133333 19.2 8.533334 6.4 6.4 8.533333 12.8 8.533334 19.2v57.6c0 8.533333-2.133333 14.933333-8.533334 19.2-6.4 6.4-12.8 8.533333-19.2 8.533333h-398.933333c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 10.666667-8.533333 19.2-8.533334z m-115.2 170.666667h625.066667c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533334h-625.066667c-8.533333 0-14.933333-2.133333-19.2-8.533334-6.4-6.4-8.533333-12.8-8.533333-19.2v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 4.266667-4.266667 12.8-8.533333 19.2-8.533333z" p-id="3705"></path></svg>',
        '<svg t="1650441519862" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3854" width="18" height="18"><path d="M454.4 283.733333v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 6.4-6.4 12.8-8.533333 19.2-8.533333h341.333334c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533334h-341.333334c-8.533333 0-14.933333-2.133333-19.2-8.533334-4.266667-4.266667-8.533333-10.666667-8.533333-19.2z m-226.133333 170.666667v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 6.4-6.4 12.8-8.533333 19.2-8.533333h569.6c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533333H256c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-4.266667-8.533333-10.666667-8.533333-19.2z m113.066666 170.666667v-57.6c0-8.533333 2.133333-14.933333 8.533334-19.2 6.4-6.4 12.8-8.533333 19.2-8.533334h454.4c8.533333 0 14.933333 2.133333 19.2 8.533334 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533333h-454.4c-8.533333 0-14.933333-2.133333-19.2-8.533333-6.4-4.266667-8.533333-10.666667-8.533334-19.2z m-170.666666 170.666666v-57.6c0-8.533333 2.133333-14.933333 8.533333-19.2 6.4-6.4 12.8-8.533333 19.2-8.533333h625.066667c8.533333 0 14.933333 2.133333 19.2 8.533333 6.4 6.4 8.533333 12.8 8.533333 19.2v57.6c0 8.533333-2.133333 14.933333-8.533333 19.2-6.4 6.4-12.8 8.533333-19.2 8.533334h-625.066667c-8.533333 0-14.933333-2.133333-19.2-8.533334-6.4-4.266667-8.533333-10.666667-8.533333-19.2z" p-id="3855"></path></svg>',
      ],
    };
  },

  created() {
    this.event.on('selectCancel', () => {
      this.baseAttr.fill = '';
      this.$forceUpdate();
    });
    this.event.on('selectOne', (items) => {
      if(items[0].type == "group"){
        this.isLock = !items[0].hasControls;
        this.mSelectActive = items[0];      
        var activeObject = this.canvas.c.getActiveObject()._objects[1]   
        
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
      }else{
        this.isLock = !items[0].hasControls;
        this.mSelectActive = items[0];      
        var activeObject = this.canvas.c.getActiveObjects()[0];        
      }      

      if (activeObject) {
        this.emptyPatternState = this.canvas.c.getActiveObjects()[0].id;
        if(this.emptyPatternState == "removeBg"){
          this.removeBgState = true; 
        }else if(this.emptyPatternState == "trimBg"){
          this.trimBgState = true
        }
        // base
        this.baseAttr.round = activeObject.get('rx');
        this.baseAttr.height = activeObject.get('height');
        this.baseAttr.width = activeObject.get('width');
        this.baseAttr.opacity = activeObject.get('opacity') * 100;
        this.baseAttr.fill = activeObject.get('fill');
        this.baseAttr.left = activeObject.get('left');
        this.baseAttr.top = activeObject.get('top');
        this.baseAttr.stroke = activeObject.get('stroke');
        this.baseAttr.strokeWidth = activeObject.get('strokeWidth');
        this.baseAttr.shadow = activeObject.get('shadow') || {};
        this.baseAttr.angle = activeObject.get('angle') || 0;

      }
    });

  },
  mounted(){
  },
  computed:{
  },
  methods: {
    //emptyImage
    nonShowBg(evt){
      this.removeBgState = evt
      this.checkEmpty();
    },
    trimBg(evt){
      this.trimBgState = evt
      this.checkEmpty();
    },   
    checkEmpty(){
      if(this.trimBgState == true){
        this.emptyPatternState = "trimBg"
        return;
      }
      if(this.removeBgState == true){
        this.emptyPatternState = "removeBg"
        return;
      }
      this.emptyPatternState = "showBg"
    },
    //emptyImage
    startDate(evt){
    },
    endDate(evt){
    },                
    selectMode(evt){
    },
    showRestriction(){
      this.restrictionState ? this.restrictionState = false : this.restrictionState = true
    },

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

      const imgEl = document.createElement('img');
      imgEl.src = file
      document.body.appendChild(imgEl);
      imgEl.onload = () => {
        if(originWidth > imgEl.width && originHeight>imgEl.height){
          var left = originLeft + (originWidth-imgEl.width)/2  ;
          var top = originTop + (originHeight-imgEl.height)/2;
        }else{
          var left = originLeft + (originWidth/2)-(imgEl.width/2);
          var top = originTop + (originHeight/2)-(imgEl.height/2);
        }
        // Create a picture object
        const imgInstance = new this.fabric.Image(imgEl, {
          id: this.emptyPatternState,
          name: 'picture1',
          left: left,
          top: top,
        });
        imgInstance.scale(0.4);

        // set zoom
        this.canvas.c.remove(this.canvas.c.getActiveObjects()[0])
        this.canvas.c.add(imgInstance);
        this.canvas.c.setActiveObject(imgInstance);
        imgEl.remove();
      }      
    }
  },
  watch:{
    emptyPatternState(){
      var id = this.canvas.c.getActiveObjects()[0].id;
      if(id  == "removeBg" || id == "trimBg" || id=="showBg"){
        if(this.emptyPatternState == "removeBg"){
          this.insertEmpty(removeBg);
          return true;
        }else if(this.emptyPatternState == "trimBg"){
          this.insertEmpty(trimBg);
          return true;
        }else{
          this.insertEmpty(emptyData);
          return true;
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
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
