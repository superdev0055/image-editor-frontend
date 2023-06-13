<template>
  <div>
     
    <DropdownItem @click="insertImg"><Icon type="ios-image" /><span style="margin-left:10px">Upload image</span></DropdownItem>
    <!-- <DropdownItem @click="insert"><Icon type="ios-image" /><span style="margin-left:10px">json</span></DropdownItem> -->
    <DropdownItem @click="loadTemplate"><Icon type="ios-image" /><span style="margin-left:10px">templates</span></DropdownItem>
    <DropdownItem @click="loadElement"><Icon type="ios-image" /><span style="margin-left:10px">elements</span></DropdownItem>
    
    <Modal
      v-model="template"
      title="Choose the Template"
      :footer-hide="true"
      width="60%"
      >
      <div class="row">
        <div class="col-md-2">
        </div>
        <div class="col-md-9" >
          <div class="template-header row">
            <div  class="col-md-8">
              <Input suffix="ios-search" placeholder="Enter word for search" v-model="keyword_template"/>
            </div>
            <div  class="col-md-4">
              <b-form-select class="mb-3" v-model="selected_template_type" @change="groupChange" size="sm">
                <option v-for="item in group_types_template" :value="item" :key="item">{{item}}</option>
              </b-form-select>              
            </div>              
          </div>

          <Loader :active="loading" class="child"/>
          <div
            id="main"
            class="template-content"
            v-for="(item, index) in filterResultDemoLists"
            :key="index"
            >
            
            <div class="image-box" imgId = {{item.id}} @click="()=>insertDemoTemplate(item.id)">
              <img v-bind:src="item.image_url" style="width:150px;height:150px;" id="images0"/>
              <div><span>{{item.name}}</span></div>
            </div>

          </div>
        </div>
      </div>
    </Modal>

    <Modal
        v-model="element"
        title="Choose the Template"
        :footer-hide="true"
        width="60%"
        >
        <div class="row">
          <div class="col-md-2">
          </div>
          <div class="col-md-9" >
            <div class="template-header row">
              <div  class="col-md-8">
                <Input suffix="ios-search" placeholder="Enter word for search" v-model="keyword_element"/>
              </div>

                <div class="col-md-4">
                  <b-form-select class="mb-3" v-model="selected_element_type" @change="elementChange" size="sm">
                    <option v-for="item in group_types_element" :value="item" :key="item">{{item}}</option>
                  </b-form-select>                        
                </div>              
            </div>
            <Loader :active="loading" class="child"/>
            <div
              id="main"
              class="template-content"
              v-for="(item, index) in filterResultElementLists"
              :key="index"
              >
  
              <div class="image-box" imgId = {{item.id}} @click="()=>insertElement(item.id)">
                <img v-bind:src="item.image_url" style="width:150px;height:150px;" id="images0"/>
                <div><span style="color:red;font-weight:bold">{{item.name}}</span></div>
              </div>

            </div>            
          </div>
        </div>


    </Modal>        

  </div>
</template>

<script>

import { getImgStr, selectFiles} from '@/utils/utils';
import select from '@/mixins/select';
import { v4 as uuid } from 'uuid';
import {productImage} from '@/utils/imgConstant';
import {getAllTemps,getTempById,getUserTempById,getAllElements,getElementById} from "@/service/endpoint";
import Loader from "./loader1.vue";
import OpenType from 'opentype.js';
export default {
  name: 'ToolBar',
  mixins: [select],
  inject:["path","param_id"],
  data() {
    return {
      element:false,
      template:false,
      loading: false,
      border: true,
      hover: true,
      selected_template_type:'All templates',
      selected_element_type:'All elements',
      keyword_template:'',
      keyword_element:'',
      group_types_template: '',  
      group_types_element: '',  
      demoTempLists:'',
      filterResultDemoLists:'',
      elementLists:'',
      filterResultElementLists:'',
      loaderActive:true
    };
  },
  components:{
    Loader
  },

  created() {
    this.event.on('selectOne', (items) => {
      this.isLock = !items[0].hasControls;
      this.mSelectActive = items[0];
    });
  },

  mounted(){
    if(this.path.slice(8) == "create"){
      this.insertProductImage(productImage);
    }else{
      this.insertFileFromJSON(this.param_id);
    }
  },  

  methods: {
    groupChange(evt){
      if(evt == "All templates"){
        this.filterResultDemoLists = this.demoTempLists;
      }else{
        this.filterResultDemoLists = this.filterDemoTempLists('type',evt);
      }
    },

    elementChange(evt){
      if(evt == "All elements"){
        this.filterResultElementLists = this.elementLists;
      }else{
        this.filterResultElementLists = this.filterElementLists('type',evt);
      }
    },

    filterElementLists(search_type,value){
      if(this.elementLists != ''){

        if(search_type == 'keyword'){
          let filteredElementLists = this.elementLists.filter((el) => {
            return el.name.toLowerCase().includes(value);
          })
          let orderedElementLists = filteredElementLists.sort((a, b) => {
            return b.upvoted - a.upvoted;
          })
          return orderedElementLists;          
        }else{
          let filteredElementLists = this.elementLists.filter((el) => {
            return el.group_type.toLowerCase().includes(value);
          })
          let orderedElementLists = filteredElementLists.sort((a, b) => {
            return b.upvoted - a.upvoted;
          });
          return orderedElementLists;          
        }

      }
    },

    filterDemoTempLists(search_type,value){
      if(this.demoTempLists != ''){
        if(search_type == 'keyword'){
          let filteredDemoLists = this.demoTempLists.filter((el) => {
            return el.name.toLowerCase().includes(value);
          })
          let orderedDemoLists = filteredDemoLists.sort((a, b) => {
            return b.upvoted - a.upvoted;
          })
          return orderedDemoLists;          
        }else{
          let filteredDemoLists = this.demoTempLists.filter((el) => {
            return el.group_type.toLowerCase().includes(value);
          })
          let orderedDemoLists = filteredDemoLists.sort((a, b) => {
            return b.upvoted - a.upvoted;
          });
          return orderedDemoLists;          
        }
      }
    },

    canvasUpdateByJson(jsonFile){

      this.canvas.c.loadFromJSON(jsonFile, () => {
        this.canvas.c.renderAll.bind(canvas.c);
        const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
        const { left, top, width, height } = workspace;                  
        workspace.set('selectable', false);
        workspace.set('hasControls', false);
        this.canvas.editor.editorWorkspace.setSize(workspace.width, workspace.height);
        // this.canvas.c.getObjects().filter(arg=>{
        //   arg
        // });


        this.canvas.c.renderAll();
        this.canvas.c.requestRenderAll();
      });

    },
    loadFonts(fontLists){
      if(!window.globalFonts){
        window.globalFonts = fontLists;
      }else{
        var temp = [...window.globalFonts, ... fontLists];
        window.globalFonts = Array.from(new Set(temp.map(JSON.stringify)), JSON.parse);
      }
      window.globalFonts.forEach(el=>{
        if(el.ttf_base64 != ''){
          const charArray = el.ttf_base64.split('').map(function (char) {
            return char.charCodeAt(0);
          });

          const uint8Array = new Uint8Array(charArray);
          const fontBuffer = uint8Array.buffer;   
          const font = OpenType.parse(fontBuffer);
          var fontName = font.names.fontFamily.en;            
          var fontFace = new FontFace(fontName, fontBuffer);
          document.fonts.add(fontFace);    
        }
      }); 
    },
    insertFileFromJSON(id){
      getUserTempById(id)
        .then(resp => {
          var data = resp.data;
          document.getElementById("canvasName").value = data.name;
          if(data.fontLists){
            this.loadFonts(data.fontLists);         
          }
          var jsonFile = JSON.stringify(data);
          this.canvas.c.loadFromJSON(jsonFile, () => {
            this.canvas.c.renderAll.bind(canvas.c);
              const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
              const { left, top, width, height } = workspace;                  
              workspace.set('selectable', false);
              workspace.set('hasControls', false);
              this.canvas.editor.editorWorkspace.setSize(workspace.width, workspace.height);

              this.canvas.c.requestRenderAll();
              this.canvas.c.renderAll();
          });
        })
        .catch(error => {
            console.log(error);
      }); 
    },
    insertDemoTemplate(id){
      getTempById(id).then(res=>{
        var data = res.data;
        var jsonFile = JSON.stringify(data);
        this.loadFonts(data.fontLists);         
        this.canvasUpdateByJson(jsonFile);
        document.getElementById("canvasName").value = data.template_name;
        this.template = false;

      });
    },

    insertElement(id){
      getElementById(id).then(res=>{
        var index = 0;
        var data = res.data;
        var dataUrl = this.canvas.editor.getJson();

        if(data.type == "background"){

          var data = data.objects.forEach((item)=>{
            if(item.id != "workspace"){
              dataUrl.objects =[
                ...dataUrl.objects.slice(0, index),
                item,
                ...dataUrl.objects.slice(index)
              ];
            }
            index++;
          });

        }else{
          
          data.objects.forEach((item)=>{
            if(item.id != "workspace"){
              dataUrl.objects.push(item);
            }
          });

        }

        this.loadFonts(data.fontLists);         
        this.canvasUpdateByJson(dataUrl);
        setTimeout(() => {
          var temp = [];
          var objs = this.canvas.c.getObjects();
          for(var i=objs.length-1;i>objs.length-data.objects.length;i--){
            temp.push(objs[i]);
          }
          var gfg = new fabric.ActiveSelection(temp, {
            canvas:this.canvas.c,
          });   
          this.canvas.c.centerObject(gfg);     
          this.canvas.c.setActiveObject(gfg);
          this.canvas.c.requestRenderAll();           
          this.element = false;
        }, 200);

      });      
    },

    loadTemplate(){
      this.template = true; 
      this.loading = true;
      getAllTemps().then(async (resp)=>{
        var templist = new Array();
        var tempTypes = [];
        var data = resp.data;

        if(data){

          data.forEach((e ,i)=> {
            if(i==0){
              tempTypes.push("All templates");
            }            
            var id = data[i].id;
            var name = data[i].name;
            var image_url = data[i].image_url;
            var group_type = data[i].group_type;

            if(tempTypes.includes(group_type) == false){
              tempTypes.push(group_type)
            }

            templist.push({
              id:id,
              group_type:group_type,
              name:name,
              image_url:image_url
            });           

          });     

          this.group_types_template = tempTypes;
          this.demoTempLists = templist;
          this.filterResultDemoLists = templist;
        
          await (this.loading = false);
        }
      }).catch(error => {
            console.log(error);
      });
      
    },
    
    async loadElement(){   
      this.element = true;
      this.loading = true;
      await getAllElements().then((resp)=>{
        var templist = new Array();
        var data = resp.data;
        var tempTypes = [];
        if(data){
          data.forEach((e ,i)=> {
            if(i==0){
              tempTypes.push("All elements");
            }
            var id = data[i].id;
            var name = data[i].name;
            var image_url = data[i].image_url;
            var group_type = data[i].group_type;
            if(tempTypes.includes(group_type) == false){
              tempTypes.push(group_type)
            }
            templist.push({
              id:id,
              group_type:group_type,
              name:name,
              image_url:image_url
            });           

          });  
          this.group_types_element = tempTypes;
          this.elementLists = templist;
          this.filterResultElementLists = templist;          
        }

      }).catch(error => {
        console.log(error);
      });         
      await (this.loading = false);
    },

    insert() {
      selectFiles({ accept: '.json' }).then((files) => {
        const [file] = files;
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = () => {
          this.insertSvgFile(reader.result);
        };
      });
    },

    // insert picture
    insertImg() {
      selectFiles({ accept: 'image/*', multiple: true }).then((fileList) => {
        Array.from(fileList).forEach((item) => {
          getImgStr(item).then((file) => {
            this.insertImgFile(file,"normal");
          });
        });
      });
    },

    // insert empty file
    insertProductImage(file,type) {
        setTimeout(() => {
        
          const imgEl = document.createElement('img');
          imgEl.src = file || this.imgFile;
          document.body.appendChild(imgEl);
          imgEl.onload = () => {
            // Create a picture object
            const imgInstance = new this.fabric.Image(imgEl, {
              id: "productImage",
              name: 'Product Image',
            });
            var rect = new fabric.Rect({
                height: 0,
                width: 0,
                fill: '',
                strokeWidth:0,
                opacity: 100,
                id:"virtural"
            });      

            var group = new fabric.Group([rect, imgInstance]);
            group.set({
              id: "productImage",
              item_name:'Product Image',
              layerShowPeriod:{
                mode:'',
                startDate:'',
                endDate:''
              },
              bgState:false,
              customType:"productImage",
              left:0-group.width,
            });
            
            this.canvas.c.add(group);
            rect.set("width",group.width*group.scaleX);
            rect.set("height",group.height*group.scaleY);
            this.canvas.c.centerObject(group);
            this.canvas.c.setActiveObject(group);
            this.canvas.c.renderAll();
            // set zoom
            imgEl.remove();

             
        };          
      }, 100); 
    },    
    
    // insert image file
    insertImgFile(file) {
      const imgEl = document.createElement('img');
      imgEl.src = file || this.imgFile;
      // insert page
      document.body.appendChild(imgEl);
      imgEl.onload = () => {
        // Create a picture object

        var name = this.canvas.editor.getName("image");
        var product = this.canvas.c.getObjects().filter(arg=>{
          return arg.id == "productImage"
        })
        const imgInstance = new this.fabric.Image(imgEl, {
          id: uuid(),
          item_name:name,
          nonBgImageState:false,
          layerShowPeriod:{
            mode:'',
            startDate:'',
            endDate:''
          },
       
        }).setCoords();
        this.canvas.c.add(imgInstance);
        this.canvas.c.setActiveObject(imgInstance);

        // // Remove image elements from the page
        imgEl.remove();
      };
    },
    

  },
  watch:{
    keyword_template(){

      var result = this.filterDemoTempLists("keyword",this.keyword_template);
      this.filterResultDemoLists = result;
    },
    keyword_element(){
      var result = this.filterElementLists("keyword",this.keyword_element);
      this.filterResultElementLists = result;
    }    
  }

};
</script>

<style scoped lang="less">
/deep/ .ivu-select-dropdown {
  z-index: 999;
}
#main {
  display: flex;
  flex-wrap: wrap;
  float:left;
  margin-top:20px;
}

.image-box{
  width:180px;
  height:200px;
  border-radius:10px;
  border: 1px solid #c3c3c3;
  cursor: pointer;  
  text-align: center;
  padding:10px;
}
.image-item{
  width:150px;
  height:150px;
  margin-left:auto;
}
.template-style{
  border-radius:10px;
  cursor: pointer;
}

.child {
  // width: 50px;
  // height: 50px;
  /* Center vertically and horizontally */
  z-index: 10000;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px; /* Apply negative top and left margins to truly center the element */
}
</style>
