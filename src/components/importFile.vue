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
        :loading="loading"
        >
        <div class="row">
          <div class="col-md-3">
            asdfasdf
          </div>
          <div class="col-md-9" >
            <div class="template-header row">
              <div  class="col-md-8">
                <Input suffix="ios-search" placeholder="Enter text" />
              </div>
              <div  class="col-md-4">
                <Select clearable>
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>              
            </div>
            
            <div
              id="main"
              class="template-content"
              v-for="(item, index) in demoTempLists"
              :key="index"
              >

              <div class="image-box" imgId = {{item.template_id}} @click="()=>insertDemoTemplate(item.template_id)">
                <img v-bind:src="item.template_image_url" style="width:150px;height:150px;" id="images0"/>
                <div><span>{{item.template_name}}</span></div>
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
        :loading="loading"
        >
        <div class="row">
          <div class="col-md-3">
            asdfasdf
          </div>
          <div class="col-md-9" >
            <div class="template-header row">
              <div  class="col-md-8">
                <Input suffix="ios-search" placeholder="Enter text" />
              </div>
              <div  class="col-md-4">
                <Select clearable>
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>              
            </div>
            
            <div
              id="main"
              class="template-content"
              v-for="(item, index) in elementLists"
              :key="index"
              >

              <div class="image-box" imgId = {{item.id}} @click="()=>insertElement(item.id)">
                <img v-bind:src="item.image_url" style="width:150px;height:150px;" id="images0"/>
                <div><span>{{item.name}}</span></div>
              </div>

            </div>            
            
          </div>
        </div>


    </Modal>        

  </div>
</template>

<script>
import { getImgStr, selectFiles,downFontByJSON } from '@/utils/utils';
import select from '@/mixins/select';
import { v4 as uuid } from 'uuid';
import {productImage} from '@/utils/imgConstant';
import {getAllTemps,getTempById,getUserTempById,getAllElements,getElementById} from "@/service/endpoint";
export default {
  name: 'ToolBar',
  mixins: [select],
  inject:["path","param_id"],
  data() {
    return {
      element:false,
      template:false,
      loading: true,
      border: true,
      hover: true,
      cityList: [
                  {
                      value: 'New York',
                      label: 'New York'
                  },
                  {
                      value: 'London',
                      label: 'London'
                  },
                  {
                      value: 'Sydney',
                      label: 'Sydney'
                  },
                  {
                      value: 'Ottawa',
                      label: 'Ottawa'
                  },
                  {
                      value: 'Paris',
                      label: 'Paris'
                  },
                  {
                      value: 'Canberra',
                      label: 'Canberra'
                  }
              ],        
      demoTempLists:'',
      elementLists:''
    };
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
    canvasUpdateByJson(jsonFile){
      this.canvas.c.loadFromJSON(jsonFile, () => {
        this.canvas.c.renderAll.bind(canvas.c);
        const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
        const { left, top, width, height } = workspace;                  
        workspace.set('selectable', false);
        workspace.set('hasControls', false);
        this.canvas.editor.editorWorkspace.setSize(workspace.width, workspace.height);
        this.canvas.c.renderAll();
        this.canvas.c.requestRenderAll();
      });      
    },

    insertDemoTemplate(id){
      getTempById(id).then(res=>{

        var data = res.data;
        var jsonFile = JSON.stringify(data);
        this.canvasUpdateByJson(jsonFile)
        this.modal = false;
        
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

          var data = data.objects.forEach((item)=>{
            if(item.id != "workspace"){
              dataUrl.objects.push(item);
            }
          });

        }

        this.canvasUpdateByJson(dataUrl);
        this.element = false;

      });      
    },

    loadTemplate(){
      this.template = true; 
      getAllTemps().then((resp)=>{
        var templist = new Array();
        var data = resp.data;
        if(data){
          data.forEach((e ,i)=> {
            var template_id = data[i].template_id;
            var template_name = data[i].template_name;
            var template_image_url = data[i].template_image_url;
            templist.push({
              template_id:template_id,
              template_name:template_name,
              template_image_url:template_image_url
            });           

          });     
          this.demoTempLists = templist;
        }
      }).catch(error => {
            console.log(error);
      });
    },
    
    loadElement(){
      this.element = true;

      getAllElements().then((resp)=>{

        var lists = new Array();
        var data = resp.data;
        if(data){
          data.forEach((e ,i)=> {
            var id = data[i].id;
            var name = data[i].name;
            var image_url = data[i].image_url;

            lists.push({
              id:id,
              name:name,
              image_url:image_url
            });           

          });  
          this.elementLists = lists;
        }

      }).catch(error => {
        console.log(error);
      });         
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
          var name = this.canvas.editor.getName("image");
          const imgInstance = new this.fabric.Image(imgEl, {
            id: "productImage",
            item_name:name,
            layerShowPeriod:{
              mode:'',
              startDate:'',
              endDate:''
            }
          });
          
          this.canvas.c.add(imgInstance);
          this.canvas.c.centerObject(imgInstance);
          this.canvas.c.setActiveObject(imgInstance);
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
        const imgInstance = new this.fabric.Image(imgEl, {
          id: uuid(),
          item_name:name,
          layerShowPeriod:{
            mode:'',
            startDate:'',
            endDate:''
          }          
        }).setCoords();

        this.canvas.c.add(imgInstance);

        this.canvas.c.centerObject(imgInstance);
        this.canvas.c.setActiveObject(imgInstance);

        // // Remove image elements from the page
        imgEl.remove();
      };
    },
    
    insertFileFromJSON(id){
      getUserTempById(id)
        .then(resp => {
          var data = resp.data;
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
</style>
