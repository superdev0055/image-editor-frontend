<template>
      <div v-show="textType.includes(mSelectOneTypeProps[0])" class="mt-3 mb-3">
        <div class="customborder mt-3"></div>
        <div class="mt-3" style="margin-left: 30px;"> 
          <label>Text</label>
          <Input v-model="this.fontAttr.string" @change="(value) =>changeString(value)" @on-keyup="(value) =>textKeyPress(value)" class="mb-2 mt-2" style="width:91%">
            <template #append>
              <Select style="width: 70px" @on-change="changeAddTab" size="small">
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
            <Select v-model="this.fontAttr.fontFamily" @on-change="changeFontFamily">
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
          <div class="row mt-3" style="margin-left: 1px;">
            <div class="col-4 mt-1">
              Text alignment
            </div>
            <div class="col col-7" style="text-align: right;margin-left:20px">
              <ButtonGroup class="button-group">
                <Button @click="changeFontWeight('fontWeight', this.fontAttr.fontWeight)" class="border-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24"/>
                          <rect fill="#000000" opacity="0.3" x="11" y="7" width="2" height="14" rx="1"/>
                          <path d="M6.70710678,14.7071068 C6.31658249,15.0976311 5.68341751,15.0976311 5.29289322,14.7071068 C4.90236893,14.3165825 4.90236893,13.6834175 5.29289322,13.2928932 L11.2928932,7.29289322 C11.6714722,6.91431428 12.2810586,6.90106866 12.6757246,7.26284586 L18.6757246,12.7628459 C19.0828436,13.1360383 19.1103465,13.7686056 18.7371541,14.1757246 C18.3639617,14.5828436 17.7313944,14.6103465 17.3242754,14.2371541 L12.0300757,9.38413782 L6.70710678,14.7071068 Z" fill="#000000" fill-rule="nonzero"/>
                          <rect fill="#000000" opacity="0.3" x="3" y="3" width="18" height="2" rx="1"/>
                      </g>
                  </svg>
                </Button>
                <Button @click="changeFontStyle('fontStyle', this.fontAttr.fontStyle)" class="border-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect fill="#000000" x="4" y="11" width="16" height="2" rx="1"/>
                          <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x="4" y="11" width="16" height="2" rx="1"/>
                      </g>
                  </svg>
                </Button>
                <Button @click="changeLineThrough('linethrough', this.fontAttr.linethrough)" class="border-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24"/>
                          <rect fill="#000000" opacity="0.3" x="11" y="3" width="2" height="14" rx="1"/>
                          <path d="M6.70710678,16.7071068 C6.31658249,17.0976311 5.68341751,17.0976311 5.29289322,16.7071068 C4.90236893,16.3165825 4.90236893,15.6834175 5.29289322,15.2928932 L11.2928932,9.29289322 C11.6714722,8.91431428 12.2810586,8.90106866 12.6757246,9.26284586 L18.6757246,14.7628459 C19.0828436,15.1360383 19.1103465,15.7686056 18.7371541,16.1757246 C18.3639617,16.5828436 17.7313944,16.6103465 17.3242754,16.2371541 L12.0300757,11.3841378 L6.70710678,16.7071068 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000003, 12.999999) scale(1, -1) translate(-12.000003, -12.999999) "/>
                          <rect fill="#000000" opacity="0.3" x="3" y="19" width="18" height="2" rx="1"/>
                      </g>
                  </svg>
                </Button>
                <Button @click="changeUnderline('underline', this.fontAttr.underline)" class="border-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <rect fill="#000000" opacity="0.3" x="4" y="5" width="16" height="2" rx="1"/>
                          <rect fill="#000000" opacity="0.3" x="4" y="13" width="16" height="2" rx="1"/>
                          <path d="M5,9 L13,9 C13.5522847,9 14,9.44771525 14,10 C14,10.5522847 13.5522847,11 13,11 L5,11 C4.44771525,11 4,10.5522847 4,10 C4,9.44771525 4.44771525,9 5,9 Z M5,17 L13,17 C13.5522847,17 14,17.4477153 14,18 C14,18.5522847 13.5522847,19 13,19 L5,19 C4.44771525,19 4,18.5522847 4,18 C4,17.4477153 4.44771525,17 5,17 Z" fill="#000000"/>
                      </g>
                  </svg>
                </Button>
                <Button @click="changeUnderline('underline', this.fontAttr.underline)" class="border-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <path d="M5,5 L19,5 C19.5522847,5 20,5.44771525 20,6 C20,6.55228475 19.5522847,7 19,7 L5,7 C4.44771525,7 4,6.55228475 4,6 C4,5.44771525 4.44771525,5 5,5 Z M5,13 L19,13 C19.5522847,13 20,13.4477153 20,14 C20,14.5522847 19.5522847,15 19,15 L5,15 C4.44771525,15 4,14.5522847 4,14 C4,13.4477153 4.44771525,13 5,13 Z" fill="#000000" opacity="0.3"/>
                          <path d="M8,9 L16,9 C16.5522847,9 17,9.44771525 17,10 C17,10.5522847 16.5522847,11 16,11 L8,11 C7.44771525,11 7,10.5522847 7,10 C7,9.44771525 7.44771525,9 8,9 Z M8,17 L16,17 C16.5522847,17 17,17.4477153 17,18 C17,18.5522847 16.5522847,19 16,19 L8,19 C7.44771525,19 7,18.5522847 7,18 C7,17.4477153 7.44771525,17 8,17 Z" fill="#000000"/>
                      </g>
                  </svg>
                </Button>
                <Button @click="changeUnderline('underline', this.fontAttr.underline)" class="border-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <path d="M5,5 L19,5 C19.5522847,5 20,5.44771525 20,6 C20,6.55228475 19.5522847,7 19,7 L5,7 C4.44771525,7 4,6.55228475 4,6 C4,5.44771525 4.44771525,5 5,5 Z M5,13 L19,13 C19.5522847,13 20,13.4477153 20,14 C20,14.5522847 19.5522847,15 19,15 L5,15 C4.44771525,15 4,14.5522847 4,14 C4,13.4477153 4.44771525,13 5,13 Z" fill="#000000" opacity="0.3"/>
                          <path d="M11,9 L19,9 C19.5522847,9 20,9.44771525 20,10 C20,10.5522847 19.5522847,11 19,11 L11,11 C10.4477153,11 10,10.5522847 10,10 C10,9.44771525 10.4477153,9 11,9 Z M11,17 L19,17 C19.5522847,17 20,17.4477153 20,18 C20,18.5522847 19.5522847,19 19,19 L11,19 C10.4477153,19 10,18.5522847 10,18 C10,17.4477153 10.4477153,17 11,17 Z" fill="#000000"/>
                      </g>
                  </svg>
                </Button>
              </ButtonGroup>
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
                  v-model="baseAttr.padding"
                  :max="80"
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
                @change="(value)=>changeCommon('angle', value)"
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
              <Switch size="small" @on-change="showTextFill" true-color="#13ce66"/>
            </div>
          </div>
          <div v-if="showState" class="row mt-4" style="margin-left:10px;">
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
              <Switch size="small" @on-change="showTextBorder" true-color="#13ce66"/>
            </div>   
          </div>
          <div v-if="textBorderState">
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
        <!-- -------------------  End Text Border  ---------------- -->

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
    data(){
        return{
            borderState:false,
            textBorderState:false,
            fillState:false,
            showState:false,            
            rectType:["rect"],
            shapeType:["rect","circle"],
            circleType:["circle"],            
            imgType: ['image'],
            textType: ['i-text', 'textbox', 'text'],
            baseAttr: this.mSelectOneTypeProps[1],
            // font properties
            fontAttr: this.mSelectOneTypeProps[2],
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
        }        
    },
    mounted(){
    },
    methods:{
        changeSelectFillType(){
            console.log("dkjsis")
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
            const activeObject = this.canvas.c.getActiveObject();
            if(evt == 'shorten'){
                activeObject.set("fontSize",21);
            }else{
                console.log(activeObject);
                // activeObject
                activeObject.set("fontSize",16);
            }
            this.canvas.c.renderAll();
        },
        changeAddTab(value){
            this.changeString(this.fontAttr.string+value);
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
            console.log("asdfasdf")
            console.log(fontName);
            const activeObject = this.canvas.c.getActiveObject();
            console.log(activeObject)
            activeObject.set("fontFamily",fontName);
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
