<template>
    <draggable class="dragArea list-group w-full" :list="list" @change="log">
      <div
          class="list-styles"
          v-for="element in list"
          :key="element.id"
      >
        <div class="layerBox row">
          <div class="col-md-8" style="margin-top:5px">
            <Icon type="md-apps" style="margin-right:15px;"/>
            <Checkbox/>
            <label>{{element.name}}</label>
          </div>

          <div class="col-md-4">
            <Tooltip content="Click to unlock or lock" placement="top">
              <Button v-if="element.lock" @click="doLock(false,element.id)" icon="md-lock" type="text"></Button>
              <Button v-else @click="doLock(true,element.id)" icon="md-unlock" type="text"></Button>
            </Tooltip>
            <Tooltip content="Click to view or unview" placement="top">
              <Button v-if="element.view" icon="ios-eye-off-outline" @click="doView(true,element.id)" type="text"></Button>
              <Button v-else @click="doView(false,element.id)" icon="ios-eye-outline" type="text"></Button>
            </Tooltip>
            <Dropdown>
              <Button icon="ios-more" style="border: none;" size="sm">
              </Button>
              <template #list>
                  <DropdownMenu>
                    <DropdownItem  size="small">
                      <Button @click="clone(element.id)" icon="ios-copy" type="text" size="small"></Button>
                      <span style="font-size:10px">Duplicate layer1</span>
                    </DropdownItem>
                    <DropdownItem size="small">
                      <Button @click="del(element.id)" icon="ios-trash" type="text" size="small"></Button>
                      <span style="font-size:10px">Delete</span>
                    </DropdownItem>
                  </DropdownMenu>
              </template>
            </Dropdown>
          </div>    
        </div>      
      </div>
    </draggable>
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
</style>
<script>
import { defineComponent } from 'vue'
import select from '@/mixins/select';
import { VueDraggableNext } from 'vue-draggable-next'
import dele from "./del.vue";
import clone from "./clone.vue";
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
  components: {
    draggable: VueDraggableNext,
    dele,
    clone
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
    checkLock(){
      // console.log("asdfsadfsadfasdf")
      return true;
    },
    doView(isView,id){
      var item = this.list.filter((arg)=>{
        return arg.id == id;
      });
      isView ? this.view(item) : this.unView(item);
      this.list = this.list.map((arg)=>{
        if(arg.id == id){
          arg.view = isView;
        }
        return arg;
      });  
    },
    view(item){
      this.isView = false;
      console.log(item[0])
      item[0].set('opacity',0/100);
      this.canvas.c.renderAll();
      this.lock();
    },
    unView(item){
      console.log(item)
      this.isView = true
      item[0].set('opacity',100/100);
      this.canvas.c.renderAll();
      this.unLock();      
    },
    doLock(isLock,id) {
      var item = this.list.filter((arg)=>{
        return arg.id == id;
      });
      
      isLock ? this.lock(item) : this.unLock(item);
      this.list = this.list.map((arg)=>{
        if(arg.id == id){
          arg.lock = isLock;
        }
        return arg;
      });      
    },
    lock(item) {
      // Modify custom properties
      item[0].hasControls = false;
      // Modify default properties
      lockAttrs.forEach((key) => {
        item[0][key] = true;
      });

      item[0].selectable = false;

    },
    unLock(item) {
      // Modify custom properties
      item[0].hasControls = true;
      // Modify default properties
      lockAttrs.forEach((key) => {
        item[0][key] = false;
      });
      item[0].selectable = true;

      this.isLock = false;
    },
    clone(id) {
      var item = this.list.filter((arg)=>{
        return arg.id == id;
      });      
      item[0].clone((cloned) => {
        this.canvas.c.discardActiveObject();
        // Spacing settings
        const grid = 10;
        cloned.set({
          left: cloned.left + grid,
          top: cloned.top + grid,
          id: uuid(),
        });
        this.canvas.c.add(cloned);
        this.canvas.c.setActiveObject(cloned);
        this.canvas.c.requestRenderAll();
      })
    },
    del(id) {
      this.canvas.editor.del(id);
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
      // Do not change the original array Inversion
      console.log(this.canvas.c.getObjects())
      console.log(this.canvas.c.getObjects())
      this.list = [...this.canvas.c.getObjects()]
        .reverse()
        .map((item) => {
          item.view = true;
          item.lock = false;
          return item;
          // const { type, id, name, text } = item;
          // return {
          //   type,
          //   id,
          //   name,
          //   text,
          // };
        })
        .filter((item) => {
            return item.id !== 'workspace'
          });        
         
    },    
    //for drag and drop

  }
})
</script>