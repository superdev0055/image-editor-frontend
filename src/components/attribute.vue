<template>
  <div v-if="mSelectMode === 'one'" style="font-size:12px" id="attribute">
    <!-- general properties -->
    <div style="">
      <!-- Right Head -->
      <div style="margin-left:15px"> 
        <div class="flex-item right-top mt-3" v-if="textType.includes(mSelectOneType)">
          <Button icon="md-arrow-round-back" class="border-btn" @click="mainPanel()"></Button>
          <h2 style="font-family: initial;margin-left:10px">T</h2>
          <Input style="margin-left:20px;width:75%">
          </Input>
        </div>
        
        <div class="flex-item right-top mt-3" v-if="imgType.includes(mSelectOneType)">
          <Button icon="md-arrow-round-back" class="border-btn left" @click="mainPanel()"></Button>
          <h2 style="margin-left:10px"><Icon type="ios-image" /></h2>
          <Input style="margin-left:20px;width:75%" ></Input>
        </div>      
        <div class="flex-item right-top mt-3" v-if="rectType.includes(mSelectOneType)">
          <Button icon="md-arrow-round-back" class="border-btn left" @click="mainPanel()"></Button>
          <h2 style="margin-left:10px"><Icon type="ios-square-outline" /></h2>
          <Input style="margin-left:20px;width:75%" ></Input>
        </div> 
        <div class="flex-item right-top mt-3" v-if="circleType.includes(mSelectOneType)">
          <Button icon="md-arrow-round-back" class="border-btn left" @click="mainPanel()"></Button>
          <h2 style="margin-left:10px"><Icon type="ios-radio-button-off" /></h2>
          <Input style="margin-left:20px;width:75%" ></Input>
        </div>     
      </div>
      <!-- Right Head -->

      <!-- layer setting -->
      <div class="mt-2 customborder"></div>
      <div class="mt-2" style="height: 40px;margin-right:40px">
        <div style="float:left"><layer1></layer1></div>
        <div style="float:right">
          <Tooltip v-if="mSelectMode === 'one'" content="Click to unlock or lock" placement="top">
            <Button v-if="isLock" @click="doLock(false)" icon="md-lock" type="text"></Button>
            <Button v-else @click="doLock(true)" icon="md-unlock" type="text"></Button>
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
    </div>
    <div class="setBox">
      <div class="customborder"></div>
      <div v-show="baseType.includes(mSelectOneType)">
        <!-- control part -->
        <div class="control" style="margin-left:15px">
          <div class="row mt-3 mb-3" style="align-items: center;">
            <div class="col col-lg-7">
              Size
            </div>
            <div class="col col-lg-2">
              <div class="content">
                <Input
                  v-model="baseAttr.width"
                  @on-change="(value) => changeCommon('width', value)"
                  show-input
                  size="small"
                  type="number"
                  style="width: 80px"
                >
                <template #append>
                  <span>W</span>
                </template>              
                </Input>
              </div>
            </div>
            <div class="col col-lg-2">
              <div class="content">
                <Input
                  type="number"
                  v-model="baseAttr.height"
                  @on-change="(value) => changeCommon('height', value)"
                  size="small"
                  show-input
                  style="width: 80px"
                >
                  <template #append>
                    <span>H</span>
                  </template>                   
                </Input>
              </div>
            </div>
          </div>
          <div class="row mb-3" style="align-items: center;">
            <div class="col col-lg-7">
              Position
            </div>
            <div class="col col-lg-2">
              <div class="content">
                <Input
                  v-model="baseAttr.left"
                  @on-change="(value) => changeCommon('left', value)"
                  size="small"
                  show-input
                  type="number"
                  style="width: 80px"
                >
                  <template #append>
                    <span>X</span>
                  </template>                 
                </Input>
              </div>
            </div>
            <div class="col col-lg-2">
              <div class="content">
                <Input
                  v-model="baseAttr.top"
                  @on-change="(value) => changeCommon('top', value)"
                  size="small"
                  show-input
                  type="number"
                  style="width: 80px"
                >
                  <template #append>
                    <span>Y</span>
                  </template>                 
                </Input>
              </div>
            </div>
          </div>

        </div>
        <!-- control part -->
      </div>
      <div v-show="imgType.includes(mSelectOneType)" style="margin-left:15px"> 
        <div class="row mb-3" style="display: flex; align-items: center;">
          <flip></flip>
          <div class="col col-lg-2">
            <Input type="number" v-model="baseAttr.angle" :max="360" @on-change="(value)=>changeCommon('angle', value)" style="width:80px">
              <template #append>
                <span>o</span>
              </template> 
            </Input>
          </div>
        </div>
        <div class="row mb-3" style="display: flex; align-items: center;">
          <div class="col col-lg-8">
            Fit mode
          </div>                
          <div class="col col-lg-3">
            <Button icon="ios-expand"></Button>
            <Button icon="md-expand" style="margin-left:20px"></Button>
          </div>
        </div>       
        <div class="row mb-3" style="display: flex; align-items: center;">
          <div class="col col-lg-6">
            Alignment
          </div>                
          <div class="col col-lg-6">
            <align></align>
          </div>
        </div>      



      </div>
      <div v-show="shapeType.includes(mSelectOneType)" style="margin-left:15px">
        <div class="row mb-3" style="display: flex; align-items: center;">
          <div class="col col-lg-9">
            Rotate
          </div>                
          <div class="col col-lg-2">
            <Input type="number" v-model="baseAttr.angle" :max="360" @on-change="(value)=>changeCommon('angle', value)" style="width:80px">
              <template #append>
                <span>o</span>
              </template> 
            </Input>
          </div>
        </div>      
        <div v-show="rectType.includes(mSelectOneType)" class="row mb-3" style="display: flex; align-items: center;">
          <div class="col col-lg-9">
            Round
          </div>                
          <div class="col col-lg-2">
            <Input type="number" v-model="baseAttr.round" :max="360" @on-change="(value)=>changeCommon('round', value)" style="width:80px">
              <template #append>
                <span>o</span>
              </template> 
            </Input>
          </div>
        </div>
        <!-- shape fill -->
        <div>
        <div class="customborder mt-2"></div>
          <div class="row mb-3 mt-3" style="display: flex; align-items: center;">
            <div class="col col-lg-10">
              Fill
            </div>                
            <div class="col col-lg-2">
              <Switch size="small" @on-change="showFill" true-color="#13ce66"/>
            </div>   
          </div>
          <div v-if="fillState">
            <div class="row mb-3" style="display: flex; align-items: center;">
              <div class="col col-lg-6">
                Color
              </div>                
              <div class="col col-lg-5">
                <Color :color="baseAttr.fill" @change="(value) => changeCommon('fill', value)" style="width:100%"></Color>
              </div>
            </div>   
          </div>             
        </div>
        <!-- shape fill -->        
        <!-- shape border -->
        <div class="customborder mt-2"></div>
        <div>
          <div class="row mb-3 mt-3" style="display: flex; align-items: center;">
            <div class="col col-lg-10">
              Border
            </div>                
            <div class="col col-lg-2">
              <Switch size="small" @on-change="showBorder" true-color="#13ce66"/>
            </div>   
          </div>
          <div v-if="borderState">
            <div class="row mb-3" style="display: flex; align-items: center;">
              <div class="col col-lg-6">
                Color
              </div>                
              <div class="col col-lg-5">
                <ColorPicker
                  style="width:100%"
                  v-model="baseAttr.stroke"
                  @on-change="(value) => changeCommon('stroke', value)"
                  alpha
                />
              </div>
            </div>   
            <div class="row mb-3" style="display: flex; align-items: center;">
              <div class="col col-lg-9">
                Line thickness
              </div>                
              <div class="col col-lg-2">
                <Input
                  type="number"
                  v-model="baseAttr.strokeWidth"
                  :max="360"
                  @on-change="(value) => changeCommon('strokeWidth', value)"
                  show-input
                  style="width:80px"
                >
                  <template #append>
                    <span>px</span>
                  </template>             
                </Input>   
              </div>
            </div> 
          </div>             
        </div>
        <!-- shape border -->

      </div>
                  
      <div v-show="textType.includes(mSelectOneType)" class="mt-4">
        <div class="customborder mt-2"></div>
        <div class="text-part" style="margin-left:15px"> 
          <label>Text</label>
          <Input v-model="fontAttr.string" @on-change="(value) =>changeString(value)" @on-keyup="(value) =>textKeyPress(value)" class="mb-2 mt-2" style="width:91%">
            <template #append>
              <Select style="width: 70px" @on-change="changeAddTab" size="small">
                  <Option value="[avability]">[avability]</Option>
                  <Option value="[brand]">[brand]</Option>
                  <Option value="[channel]">[channel]</Option>
              </Select>
            </template>      
          </Input>        
        </div>

        <div class="customborder mt-4"></div>
        <div class="mt-4 row" style="margin-left:15px;">
          <div class="col-md-8" style="margin-right:23px">
            <Select v-model="fontAttr.fontFamily" @on-change="changeFontFamily">
              <Option v-for="item in fontFamilyList" :value="item" :key="'font-' + item">
                {{ item }}
              </Option>
            </Select>
          </div>
          <div class="col-md-3" style="">
            <Button>Upload Font</Button>
          </div>
          <div class="mt-4" style="margin-top:20px">
            <div class="flex-item" style="float:left">
              <InputNumber
                v-model="fontAttr.fontSize"
                @on-change="(value) => changeCommon('fontSize', value)"
                show-input
                style="width:30%"
              ></InputNumber>
              <Color style="margin-top:-10px;margin-left:10px;width:100%" :color="baseAttr.fill" @change="(value) => changeCommon('fill', value)"></Color>
            </div>           
            <div style="float:right;margin-right:40px">
              <ButtonGroup class="button-group">
                <Button @click="changeFontWeight('fontWeight', fontAttr.fontWeight)" class="border-btn" style="margin-left:10px">
                  <svg viewBox="0 0 1024 1024" width="14" height="14">
                    <path
                      d="M793.99865 476a244 244 0 0 0 54-130.42C862.75865 192.98 743.01865 64 593.85865 64H195.01865a32 32 0 0 0-32 32v96a32 32 0 0 0 32 32h63.74v576H195.01865a32 32 0 0 0-32 32v96a32 32 0 0 0 32 32h418.64c141.6 0 268.28-103.5 282-244.8 9.48-96.9-32.78-184.12-101.66-239.2zM418.33865 224h175.52a96 96 0 0 1 0 192h-175.52z m175.52 576h-175.52V576h175.52a112 112 0 0 1 0 224z"
                      :fill="fontAttr.fontWeight === 'bold' ? '#305ef4' : '#666'"
                    ></path>
                  </svg>
                </Button>
                <Button @click="changeFontStyle('fontStyle', fontAttr.fontStyle)" class="border-btn" style="margin-left:10px">
                  <svg viewBox="0 0 1024 1024" width="14" height="14">
                    <path
                      d="M832 96v64a32 32 0 0 1-32 32h-125.52l-160 640H608a32 32 0 0 1 32 32v64a32 32 0 0 1-32 32H224a32 32 0 0 1-32-32v-64a32 32 0 0 1 32-32h125.52l160-640H416a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32h384a32 32 0 0 1 32 32z"
                      :fill="fontAttr.fontStyle === 'italic' ? '#305ef4' : '#666'"
                    ></path>
                  </svg>
                </Button>
                <Button @click="changeLineThrough('linethrough', fontAttr.linethrough)" class="border-btn" style="margin-left:10px">
                  <svg viewBox="0 0 1024 1024" width="14" height="14">
                    <path
                      d="M893.088 501.792H125.344a32 32 0 0 0 0 64h767.744a32 32 0 0 0 0-64zM448 448h112V208h288V96H160v112h288zM448 640h112v288H448z"
                      :fill="fontAttr.linethrough ? '#305ef4' : '#666'"
                    ></path>
                  </svg>
                </Button>
                <Button @click="changeUnderline('underline', fontAttr.underline)" class="border-btn" style="margin-left:10px">
                  <svg viewBox="0 0 1024 1024" width="14" height="14">
                    <path
                      d="M703.232 67.008h127.488v413.248c0 158.016-142.656 286.016-318.72 286.016-176 0-318.72-128-318.72-286.016V67.008h127.488v413.248c0 39.872 18.176 78.144 51.136 107.776 36.8 32.96 86.528 51.072 140.096 51.072s103.36-18.112 140.032-51.136c33.024-29.632 51.2-67.968 51.2-107.776V67.008zM193.28 871.616h637.44v85.376H193.28v-85.376z"
                      :fill="fontAttr.underline ? '#305ef4' : '#666'"
                    ></path>
                  </svg>
                </Button>
              </ButtonGroup>              
            </div>   
          </div>          
        </div>
        <div class="customborder mt-4"></div>
        <div class="row mb-3 mt-4" style="display: flex; align-items: center;margin-left:15px">
          <div class="col col-lg-7">
            Border
          </div>          
          <div class="col col-lg-2">
            <ColorPicker
              v-model="baseAttr.stroke"
              @on-change="(value) => changeCommon('stroke', value)"
              alpha
            />
          </div>                
          <div class="col col-lg-2">
            <Input
              type="number"
              v-model="baseAttr.strokeWidth"
              :max="360"
              @on-change="(value) => changeCommon('strokeWidth', value)"
              show-input
              style="width:80px"
            >
              <template #append>
                <span>o</span>
              </template>             
            </Input>          
          </div>
        </div>      
        <div class="row mb-3 mt-3" style="display: flex; align-items: center;margin-left:15px;">
          <div class="col col-lg-9">
            Round
          </div>                
          <div class="col col-lg-2">
            <Input type="number" v-model="baseAttr.round" :max="360" @on-change="(value)=>changeCommon('round', value)" style="width:80px">
              <template #append>
                <span>o</span>
              </template> 
            </Input>
          </div>
        </div>   
        <div class="row mb-3 mt-3" style="display: flex; align-items: center;margin-left:15px;">
          <div class="col col-lg-6">
            Alignment
          </div>                
          <div class="col col-lg-6">
            <align></align>
          </div>
        </div>         
      </div>
      <div class="customborder"></div>
      <!-- Layer restriction -->
      <div class="row mb-3 mt-3" style="display: flex; align-items: center;margin-left:5px;">
        <div class="col col-lg-10">
          Layer time restriction
        </div>                
        <div class="col col-lg-2">
          <Switch size="small" @on-change="showRestriction" true-color="#13ce66"/>
        </div>
        <div v-if="restrictionState" class="row">
          <div class="col col-lg-9 mt-3">
            Generate
          </div>                
          <div class="col col-lg-3 mt-3">
            <Select v-model="model1" size="small" @on-change="selectMode">
                <Option v-for="item in modes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>          
          <div class="col col-lg-6 mt-3">
            From
          </div>                
          <div class="col col-lg-6 mt-3">
            <DatePicker size="small" type="date" style="width:100%" placeholder="Start date" @on-change="startDate"/>
          </div>
          <div class="col col-lg-6 mt-3">
            To
          </div>                
          <div class="col col-lg-6 mt-3">
            <DatePicker size="small" type="date" style="width:100%" placeholder="End date" @on-change="endDate"/>
          </div>                      
        </div>        
      </div>      
      <!-- Layer restriction -->    
    </div>
  </div>
</template>

<script>
import fontList from '@/assets/fonts/font';
import select from '@/mixins/select';
import FontFaceObserver from 'fontfaceobserver';
import layer1 from './layer1.vue'
import Color from './color.vue';
import dele from "./del.vue";
import clone from "./clone.vue"
import flip from "./flip.vue"
import align from "./align.vue"
import $ from "jquery";
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
      borderState:false,
      fillState:false,
      //layer restriction


      isLock: false,
      isView:true,
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
      // text element
      textType: ['i-text', 'textbox', 'text'],
      // image element
      imgType: ['image'],
      // general properties
      baseAttr: {
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
        fontFamily: '',
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
      // image properties
      imgAttr: {
        blur: 0,
      },
      // Font drop-down list
      fontFamilyList: fontList.map((item) => item.fontFamily),
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
      selectMode:false
    };
  },

  created() {
    this.event.on('selectCancel', () => {
      this.baseAttr.fill = '';
      this.$forceUpdate();
    });
    this.event.on('selectOne', (items) => {
      this.isLock = !items[0].hasControls;
      this.mSelectActive = items[0];      
      const activeObject = this.canvas.c.getActiveObjects()[0];
      if (activeObject) {
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
        const textTypes = ['i-text', 'text', 'textbox'];
        if (textTypes.includes(activeObject.type)) {
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

        // picture filter
        if (activeObject.type === 'image') {
          this.imgAttr.blur = activeObject.filters[0] ? activeObject.filters[0].blur : 0;
        }
      }
    });
  
  },
  mounted(){

  },
  computed:{
  },
  methods: {
    //layer restriction
    startDate(evt){
      console.log(evt)
    },
    endDate(evt){
      console.log(evt)
    },                
    selectMode(evt){
      console.log(this.model1)
    },
    showRestriction(){
      this.restrictionState ? this.restrictionState = false : this.restrictionState = true
    },
    showBorder(){
      this.borderState ? this.borderState = false : this.borderState = true
    },
    showFill(){
      this.fillState ? this.fillState = false : this.fillState = true
    },    
    //layer restriction

    mainPanel(){
      this.canvas.c.discardActiveObject();
      this.canvas.c.requestRenderAll();
    },
    changeAddTab(value){
      this.changeString(this.fontAttr.string+value);
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

    //delete shortTag
    textKeyPress(value){
      var string = this.fontAttr.string
      if(value.keyCode == 8){
        string = string.slice(0,string.lastIndexOf('['));
        this.changeString(string) 
      }

    },
    changeString(value){
      if(typeof(value)=="string"){
        var string = value;
      }else{
        var string = value.target.value;
      }
      this.fontAttr.string = string;
      const activeObject = this.canvas.c.getActiveObjects()[0];
      activeObject && activeObject.set('text',string);
      this.canvas.c.renderAll();
      return;
    },
    // modify font
    changeFontFamily(fontName) {
      if (!fontName) return;

      // properties to skip loading
      const skipFonts = ['arial', 'Microsoft YaHei'];
      if (skipFonts.includes(fontName)) {
        const activeObject = this.canvas.c.getActiveObjects()[0];
        activeObject && activeObject.set('fontFamily', fontName);
        this.canvas.c.renderAll();
        return;
      }
      this.$Spin.show();
      // font loading
      const font = new FontFaceObserver(fontName);
      font
        .load(null, 15000)
        .then(() => {
          const activeObject = this.canvas.c.getActiveObjects()[0];
          activeObject && activeObject.set('fontFamily', fontName);
          this.canvas.c.renderAll();
          this.$Spin.hide();
        })
        .catch((err) => {
          console.log(err);
          this.$Spin.hide();
        }); 
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
    // shadow settings
    changeShadow() {
      const activeObject = this.canvas.c.getActiveObjects()[0];
      activeObject && activeObject.set('shadow', new this.fabric.Shadow(this.baseAttr.shadow));
      this.canvas.c.renderAll();
    },
    // bold
    changeFontWeight(key, value) {
      const nValue = value === 'normal' ? 'bold' : 'normal';
      this.fontAttr.fontWeight = nValue;
      const activeObject = this.canvas.c.getActiveObjects()[0];
      activeObject && activeObject.set(key, nValue);
      this.canvas.c.renderAll();
    },
    // italics
    changeFontStyle(key, value) {
      const nValue = value === 'normal' ? 'italic' : 'normal';
      this.fontAttr.fontStyle = nValue;
      const activeObject = this.canvas.c.getActiveObjects()[0];
      activeObject && activeObject.set(key, nValue);
      this.canvas.c.renderAll();
    },
    // middle stroke
    changeLineThrough(key, value) {
      const nValue = value === false;
      this.fontAttr.linethrough = nValue;
      const activeObject = this.canvas.c.getActiveObjects()[0];
      activeObject && activeObject.set(key, nValue);
      this.canvas.c.renderAll();
    },
    // underline
    changeUnderline(key, value) {
      const nValue = value === false;
      this.fontAttr.underline = nValue;
      const activeObject = this.canvas.c.getActiveObjects()[0];
      activeObject && activeObject.set(key, nValue);
      this.canvas.c.renderAll();
    },
  },
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
