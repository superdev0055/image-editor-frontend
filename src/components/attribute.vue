<template>
  <div v-if="mSelectMode === 'one'" style="font-size:12px" id="attribute">
    <!-- general properties -->
    <div class="right_header" style="position: sticky; width: 100%; top: 0px; z-index: 45555555555;background-color:white">
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
          <Input style="margin-left:20px;width:75%"></Input>
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
                <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                  <span class="ivu-input-suffix">
                    <i style="font-style: normal; font-size: 11px;">w</i>
                  <!-- W -->
                  </span>
                  <input
                    autocomplete="off" 
                    type="number" 
                    class="ivu-input ivu-input-default ivu-input-with-suffix" 
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
        <div class="row mb-3" style="">
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
      <div v-show="shapeType.includes(mSelectOneType)" style="margin-left:15px">
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
        <div v-show="rectType.includes(mSelectOneType)" class="row mb-3" style="">
          <div class="col col-lg-9">
            Round
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
            <div class="row mb-3" style="">
              <div class="col col-lg-6">
                Color
              </div>                
              <div class="col col-lg-5">
                <input
                  type="color"
                  v-model="baseAttr.stroke"
                  @change="(value) => changeCommon('stroke', value)"
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
        <!-- shape border -->
      </div>
                  
      <div v-show="textType.includes(mSelectOneType)" class="mt-3 mb-3">
        <div class="customborder mt-3"></div>
        <div class="mt-3" style="margin-left: 30px;"> 
          <label>Text</label>
          <Input v-model="fontAttr.string" @change="(value) =>changeString(value)" @on-keyup="(value) =>textKeyPress(value)" class="mb-2 mt-2" style="width:91%">
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
              <Select v-model="fontAttr.fontFamily" @change="changeFontFamily">
                <Option v-for="item in fontFamilyList" :value="item" :key="'font-' + item">
                  {{ item }}
                </Option>
              </Select>
            </div>
            <div class="col-3" style="">
              <Button :size="buttonSize" type="button" class="ivu-btn ivu-btn-text">
                Add custom font
                <Icon type="ios-cloud-upload-outline" />
              </Button>
            </div>
          </div>
          <!-- -------------------  End text handling  ---------------- -->

          <!-- -------------------  font setting  ---------------- -->
          <div class="mt-3 row" style="margin-left: 1px;">
            <!-- -------------------  font size & color  ---------------- -->
            <div class="col-6 row">
              <div class="col-6">
                <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text" style="width: auto;">
                  <i class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
                  <input 
                    v-model="fontAttr.fontSize"
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
            <div class="col-5" style="text-align: right; margin-left: 20px;">
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
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <path d="M12.12,19.16 C8.78,19.16 6.4,16.98 6.4,13.48 L6.4,4.8 L8.72,4.8 L8.72,13.54 C8.72,15.74 10.1,16.96 12.12,16.96 C14.14,16.96 15.5,15.74 15.5,13.54 L15.5,4.8 L17.82,4.8 L17.82,13.48 C17.82,16.98 15.46,19.16 12.12,19.16 Z" fill="#000000"/>
                          <rect fill="#000000" opacity="0.3" x="4" y="21" width="16" height="2" rx="1"/>
                      </g>
                  </svg>
                </Button>
                <Button @click="changeUnderline('underline', fontAttr.underline)" class="border-btn" style="margin-left:10px">
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
              <Select>
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
            <div class="col col-7" style="text-align: right;">
              <ButtonGroup class="button-group">
                <Button @click="changeFontWeight('fontWeight', fontAttr.fontWeight)" class="border-btn" style="margin-left:10px">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24"/>
                          <rect fill="#000000" opacity="0.3" x="11" y="7" width="2" height="14" rx="1"/>
                          <path d="M6.70710678,14.7071068 C6.31658249,15.0976311 5.68341751,15.0976311 5.29289322,14.7071068 C4.90236893,14.3165825 4.90236893,13.6834175 5.29289322,13.2928932 L11.2928932,7.29289322 C11.6714722,6.91431428 12.2810586,6.90106866 12.6757246,7.26284586 L18.6757246,12.7628459 C19.0828436,13.1360383 19.1103465,13.7686056 18.7371541,14.1757246 C18.3639617,14.5828436 17.7313944,14.6103465 17.3242754,14.2371541 L12.0300757,9.38413782 L6.70710678,14.7071068 Z" fill="#000000" fill-rule="nonzero"/>
                          <rect fill="#000000" opacity="0.3" x="3" y="3" width="18" height="2" rx="1"/>
                      </g>
                  </svg>
                </Button>
                <Button @click="changeFontStyle('fontStyle', fontAttr.fontStyle)" class="border-btn" style="margin-left:10px">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect fill="#000000" x="4" y="11" width="16" height="2" rx="1"/>
                          <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x="4" y="11" width="16" height="2" rx="1"/>
                      </g>
                  </svg>
                </Button>
                <Button @click="changeLineThrough('linethrough', fontAttr.linethrough)" class="border-btn" style="margin-left:10px">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <polygon points="0 0 24 0 24 24 0 24"/>
                          <rect fill="#000000" opacity="0.3" x="11" y="3" width="2" height="14" rx="1"/>
                          <path d="M6.70710678,16.7071068 C6.31658249,17.0976311 5.68341751,17.0976311 5.29289322,16.7071068 C4.90236893,16.3165825 4.90236893,15.6834175 5.29289322,15.2928932 L11.2928932,9.29289322 C11.6714722,8.91431428 12.2810586,8.90106866 12.6757246,9.26284586 L18.6757246,14.7628459 C19.0828436,15.1360383 19.1103465,15.7686056 18.7371541,16.1757246 C18.3639617,16.5828436 17.7313944,16.6103465 17.3242754,16.2371541 L12.0300757,11.3841378 L6.70710678,16.7071068 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000003, 12.999999) scale(1, -1) translate(-12.000003, -12.999999) "/>
                          <rect fill="#000000" opacity="0.3" x="3" y="19" width="18" height="2" rx="1"/>
                      </g>
                  </svg>
                </Button>
                <Button @click="changeUnderline('underline', fontAttr.underline)" class="border-btn" style="margin-left:10px">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <rect fill="#000000" opacity="0.3" x="4" y="5" width="16" height="2" rx="1"/>
                          <rect fill="#000000" opacity="0.3" x="4" y="13" width="16" height="2" rx="1"/>
                          <path d="M5,9 L13,9 C13.5522847,9 14,9.44771525 14,10 C14,10.5522847 13.5522847,11 13,11 L5,11 C4.44771525,11 4,10.5522847 4,10 C4,9.44771525 4.44771525,9 5,9 Z M5,17 L13,17 C13.5522847,17 14,17.4477153 14,18 C14,18.5522847 13.5522847,19 13,19 L5,19 C4.44771525,19 4,18.5522847 4,18 C4,17.4477153 4.44771525,17 5,17 Z" fill="#000000"/>
                      </g>
                  </svg>
                </Button>
                <Button @click="changeUnderline('underline', fontAttr.underline)" class="border-btn" style="margin-left:10px">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 24 24" version="1.1" class="kt-svg-icon">
                      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <rect x="0" y="0" width="24" height="24"/>
                          <path d="M5,5 L19,5 C19.5522847,5 20,5.44771525 20,6 C20,6.55228475 19.5522847,7 19,7 L5,7 C4.44771525,7 4,6.55228475 4,6 C4,5.44771525 4.44771525,5 5,5 Z M5,13 L19,13 C19.5522847,13 20,13.4477153 20,14 C20,14.5522847 19.5522847,15 19,15 L5,15 C4.44771525,15 4,14.5522847 4,14 C4,13.4477153 4.44771525,13 5,13 Z" fill="#000000" opacity="0.3"/>
                          <path d="M8,9 L16,9 C16.5522847,9 17,9.44771525 17,10 C17,10.5522847 16.5522847,11 16,11 L8,11 C7.44771525,11 7,10.5522847 7,10 C7,9.44771525 7.44771525,9 8,9 Z M8,17 L16,17 C16.5522847,17 17,17.4477153 17,18 C17,18.5522847 16.5522847,19 16,19 L8,19 C7.44771525,19 7,18.5522847 7,18 C7,17.4477153 7.44771525,17 8,17 Z" fill="#000000"/>
                      </g>
                  </svg>
                </Button>
                <Button @click="changeUnderline('underline', fontAttr.underline)" class="border-btn" style="margin-left:10px">
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
                  v-model="baseAttr.angle"
                  :max="80"
                  @change="(value)=>changeCommon('angle', value)"
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

        <!-- -------------------  Border  ---------------- -->
        <div class="customborder mt-3"></div>
        <div class="row mt-3" style="margin-left:15px">
          <div class="col-7 mt-1">
            Border
          </div>          
          <div class="col col-lg-2">
            <input
              type="color"
              v-model="baseAttr.stroke"
              @change="(value) => changeCommon('stroke', value)"
              alpha
            />
          </div>                
          <div class="col col-lg-2">
            <Input
              type="number"
              v-model="baseAttr.strokeWidth"
              :max="360"
              @change="(value) => changeCommon('strokeWidth', value)"
              show-input
            >
              <template #append>
                <span>&deg;</span>
              </template>
            </Input>
          </div>
        </div>
        <!-- -------------------  End Border  ---------------- -->

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
          <div v-if="showState" class="row mt-4" style="margin-left:15px;">
            <div class="col-5">
              <input
                type="color"
                v-model="baseAttr.stroke"
                @change="(value) => changeCommon('stroke', value)"
                alpha
              />
            </div>
            <div class="col-6">
              <Select @change="changeSelectFillType" size="normal">
                <Option  v-for="item in fillType" :value="item" :key="'fill-' + item">{{ item }}</Option>
              </Select>
            </div>
          </div>
        </div>
        <!-- -------------------  End Fill  ---------------- -->

        <!-- -------------------  Text Border  ---------------- -->
        <div class="customborder mt-3"></div>
        <div class="row mt-3">
          <div class="row" style="margin-left:15px;">
            <div class="col-9">
              Border
            </div>                
            <div class="col-2" style="text-align: right;">
              <Switch size="small" @on-change="showTextBorder" true-color="#13ce66"/>
            </div>
          </div>
          <div v-if="textBorderState" class="mt-3">
            <div class="row" style="margin-left:15px;">
              <div class="col-5">
                <input
                  type="color"
                  v-model="baseAttr.stroke"
                  @change="(value) => changeCommon('stroke', value)"
                  alpha
                />
              </div>
              <div class="col-6">
                <Select @change="changeSelectBorderType" size="normal">
                  <Option  v-for="item in textBorderType" :value="item" :key="'fill-' + item">{{ item }}</Option>
                </Select>
              </div>
            </div>

            <!-- -------------------  Line thickness  ---------------- -->
            <div class="mt-3 row" style="margin-left:15px;">
              <div class="col-8 mt-1">
                Line thickness
              </div>  
              <div class="col-3">
                <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text">
                  <span class="ivu-input-suffix">
                    <i style="font-style: normal; font-size: 11px;">px</i>
                  </span>
                  <input
                    type="number" 
                    class="ivu-input ivu-input-default ivu-input-with-suffix" 
                    v-model="baseAttr.angle"
                    :max="80"
                    @change="(value)=>changeCommon('angle', value)"
                  />
                </div>
              </div>
            </div>
            <!-- -------------------  End Line thickness  ---------------- -->
          </div>

        </div>
        <!-- -------------------  End Text Border  ---------------- -->



      </div>
      
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
              <Select v-model="model1" size="normal" @on-change="selectMode">
                  <Option v-for="item in modes" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-5">
              From
            </div>                
            <div class="col-6">
              <DatePicker size="normal" type="date" style="width:100%" placeholder="Start date" @on-change="startDate"/>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col col-5">
              Until
            </div>                
            <div class="col col-6">
              <DatePicker size="normal" type="date" style="width:100%" placeholder="End date" @on-change="endDate"/>
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
import fontList from '@/assets/fonts/font';
import select from '@/mixins/select';
import FontFaceObserver from 'fontfaceobserver';
import layer1 from './layer1.vue'
import Color from './color.vue';
import dele from "./del.vue";
import clone from "./clone.vue"
import flip from "./flip.vue"
import align from "./align.vue"
import {removeBg,trimBg,emptyData} from '@/utils/imgConstant' 
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
      loading1: false,
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
      showState:false,
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
      shapeType:["rect","circle"],
      rectType:["rect"],
      circleType:["circle"],
      // text element
      textType: ['i-text', 'textbox', 'text'],
      // image element
      imgType: ['image'],
      // FillType element
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
      textBorderState: false,
      textBorderType: [
        'dotted',
        'dashed',
        'solid',
        'double',
        'groove',
        'ridge',
        'inset',
        'outset',
        'none'
      ],
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
    remoteMethod1 (query) {
        if (query !== '') {
            this.loading1 = true;
            setTimeout(() => {
                this.loading1 = false;
                const list = this.list.map(item => {
                    return {
                        value: item,
                        label: item
                    };
                });
                this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 200);
        } else {
            this.options1 = [];
        }
    },
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
    //layer restriction
    startDate(evt){
    },
    endDate(evt){
    },                
    selectMode(evt){
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
    showTextFill(){
      this.showState ? this.showState = false : this.showState = true
    },
    showTextBorder() {
      this.textBorderState ? this.textBorderState = false : this.textBorderState = true
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
        imgInstance.scale(0.7);

        // set zoom
        this.canvas.c.remove(this.canvas.c.getActiveObjects()[0])
        this.canvas.c.add(imgInstance);
        this.canvas.c.setActiveObject(imgInstance);
        // this.canvas.c.renderAll();
        // // Remove image elements from the page
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
