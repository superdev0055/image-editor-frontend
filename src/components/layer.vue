<template>
  <div>
    <draggable class="dragArea list-group w-full" :list="list" @change="log" :animation="300" style="margin-bottom:100px">
      <div
          class="list-styles"
          v-for="element in list"
          :key="element.id"
      >
        <div class="layerBox row">
          <div class="col-md-8" style="margin-top:5px;">
            <Icon type="md-apps" style="margin-right:15px;"/>
            <Checkbox v-model="element.select" @change="changeSelect(element)"/>
            <!-- <h4><Icon type="ios-image"/></h4> -->
            <label style="cursor:pointer;" @click="selectElem(element)">{{element.item_name}}</label>
          </div>

          <div class="col-md-4">
            <Tooltip content="Click to unlock or lock" placement="top" class="hover_class">
              <Button v-if="element.lock" @click="doLock(element.id)" icon="md-lock" type="text"></Button>
              <Button v-else @click="doLock(element.id)" icon="ios-unlock-outline" type="text"></Button>
            </Tooltip>
            <Tooltip content="Click to view or unview" placement="top" class="hover_class">
              <Button v-if="element.view" icon="ios-eye-off-outline" @click="doView(element.id)" type="text"></Button>
              <Button v-else @click="doView(element.id)" icon="ios-eye-outline" type="text"></Button>
            </Tooltip>
            <Dropdown>
              <Button icon="ios-more" type="text">
              </Button>
              <template #list>
                  <DropdownMenu>
                    <DropdownItem  size="small" @click="clone(element.id)">
                      <Button  icon="ios-copy" type="text" size="small"></Button>
                      <span style="font-size:10px">Duplicate layer1</span>
                    </DropdownItem>
                    <DropdownItem size="small" @click="del(element.id)">
                      <Button  icon="ios-trash" type="text" size="small"></Button>
                      <span style="font-size:10px">Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
              </template>
            </Dropdown>
          </div>    
        </div>      
      </div>
    </draggable>

    <!-- <group></group> -->
    </div>
</template>
<style scoped>
  .layerBox{
    width:90%;
    margin-left:auto;
    margin-right:auto;
    margin-top: 10px;
    border-radius: 5px;
    border:solid 1px rgb(214, 213, 213);
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    cursor: pointer;
  }
  .hover_class {
    visibility: hidden;
  }
  .layerBox:hover .hover_class { 
    visibility: visible;
    color: red;
  }
</style>
<script>
import { defineComponent } from 'vue'
import select from '@/mixins/select';
import { VueDraggableNext } from 'vue-draggable-next'
import dele from "./del.vue";
import clone from "./clone.vue";
// import group from "./group.vue";

import { v4 as uuid } from 'uuid';
const lockAttrs = [
  'lockMovementX',
  'lockMovementY',
  'lockRotation',
  'lockScalingX',
  'lockScalingY',
];
export default defineComponent({
  name: 'ToolBar',
  mixins: [select],
  props:['mSelectOneTypeProps'],
  components: {
    draggable: VueDraggableNext,
    dele,
    clone,
    // group
  },
  data() {
    return {
      isLock: false,
      isView:true,      
      enabled: true,
      list: [],
      tempList:'',
      dragging: false,
    }
  },
  created() {
    // When selecting an object in the canvas, the object does not appear on top.
    this.canvas.c.preserveObjectStacking = true;
    this.canvas.c.on('after:render', this.getList);
 
  },  
  mounted(){
    setTimeout(() => {
      this.tempList = this.list.map(item=>{
        return item;
      });
    }, 500);
  },
  methods: {
    changeSelect(item){
      this.canvas.c.discardActiveObject();
      var aaa = this.list.filter(item=>{
        if(item.select == true){
          return item;
        }
      });    
    	var c = [];
    	this.canvas.c.getObjects().forEach(arg=>{
    		aaa.forEach(arg1=>{
    			if(arg.id == arg1.id){
    				c.push(arg);
    			}
    		})
    	})

      if(c.length == 1){
        return false;         
      }else{
        var gfg = new fabric.ActiveSelection(c, {
          canvas:this.canvas.c,
        });        
        this.canvas.c.setActiveObject(gfg);
        this.canvas.c.requestRenderAll();          
      }
   

    },


    selectElem(item){
      this.canvas.c.setActiveObject(item);
      this.canvas.c.requestRenderAll();      
    },    
    checkLock(){
      return true;
    },
    doView(id){
      this.list.forEach((arg)=>{
        if(arg.id == id){
          arg.view ? this.view(arg) : this.unView(arg);
        }
      });
    },
    view(item){
      item.set('opacity',(0/100));
      this.canvas.c.renderAll();
    },
    unView(item){
      item.set('opacity',(100/100));
      this.canvas.c.renderAll();
    },
    doLock(id) {
      this.list.forEach((arg)=>{
        if(arg.id == id){
          arg.lock ? this.unLock(arg):this.lock(arg) ;
        }
      });      
       
    },
    lock(item) {
      // Modify custom properties
      item.hasControls = false;
      // Modify default properties
      lockAttrs.forEach((key) => {
        item[key] = true;
      });
      item.selectable = false;
      this.canvas.c.renderAll();
    },
    unLock(item) {
      // Modify custom properties
      item.hasControls = true;
      // Modify default properties
      lockAttrs.forEach((key) => {
        item[key] = false;
      });
      item.selectable = true;
      this.canvas.c.renderAll();
    },

    clone(id) {
      if(id == "productImage" || id == "trimImage" || id == "nonBgImage"){
        return false; 
      }

      var item = this.list.filter((arg)=>{
        return arg.id == id;
      });      

      item[0].clone((cloned) => {

        // Spacing settings
        const grid = 10;
        var item_name = this.canvas.editor.getNameClone(item[0].item_name);
        cloned.set({
          left: cloned.left + grid,
          top: cloned.top + grid,
          id: uuid(),
          layerShowPeriod:item[0].layerShowPeriod,
          item_name:item_name
        });

        this.canvas.c.add(cloned);
        this.canvas.c.discardActiveObject();
        this.canvas.c.setActiveObject(cloned);
        this.canvas.c.requestRenderAll();
      })
    },
    del(id) {
      if(id == "productImage" || id == "trimImage" || id == "nonBgImage"){
        return false;
      }else{
        const activeObject = this.canvas.c.getObjects();
        if (activeObject) {
          activeObject.map((item) => {
            if(item.id == id){
              this.canvas.c.remove(item);
            }
          });
        }
      }      

      
      this.canvas.c.requestRenderAll();
      this.canvas.c.discardActiveObject();      
    },    
    //for drag and drop
    onMoveCallback(evt, originalEvent) {
    },
    log(event,original) {
      var arr = {id:'',index:0,direction:"",moveCount:0};
      //after search element's move and re-render
      for(var i=0;i<this.tempList.length;i++){
        var tempIn = this.list.findIndex(arg=>this.tempList[i].id == arg.id);
        if(Math.abs(tempIn - i) > arr.index){
          arr.index = tempIn;
          arr.id = this.tempList[i];
          arr.moveCount = Math.abs(tempIn - i)

          if(tempIn - i > 0){
            arr.direction = "down";
          }else{
            arr.direction = "up"
          }
        }
      };     
      
      if(arr.direction == "up"){
        for(var i=0;i<arr.moveCount;i++){
          this.tempList = this.list.map(item=>item);       
          this.canvas.editor.up(arr.id);
        }
      }else{
        for(var i=0;i<arr.moveCount;i++){
          this.tempList = this.list.map(item=>item);       
          this.canvas.editor.down(arr.id);
        }        
      }
    },
    getList() {

      if(this.mSelectMode == "one"){
        this.list = [...this.canvas.c.getObjects()]
          .reverse()
          .map((item,index) => {
            item.select = false;
            if(item.opacity == 0){
              item.view = false;
            }else{
              item.view = true;
            }
            if(item.hasControls == false && item.selectable == false){
              item.lock = true;
            }else{
              item.lock = false;
            }  
            return item;
          })
          .filter((item) => {
              return item.id !== 'workspace'
            });
      }else{

        //multiple mode
        this.list = [...this.canvas.c.getObjects()]
          .reverse()
          .map((item) => {
            item.select = false;
            this.canvas.c.getActiveObjects().forEach(arg=>{
              if(arg.id == item.id){
                item.select = true;
              }
            })            
            if(item.opacity == 0){
              item.view = false;
            }else{
              item.view = true;
            }
            if(item.hasControls == false && item.selectable == false){
              item.lock = true;
            }else{
              item.lock = false;
            }   
            return item;
          })
          .filter((item) => {
              return item.id !== 'workspace'
            });        
      }
        
         
    },    
    //for drag and drop
  }
})
</script>

<style lang="less" scoped>
.ivu-select-dropdown{
  z-index: 1000;
}
</style>