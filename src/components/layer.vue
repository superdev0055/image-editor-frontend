<template>
    <draggable class="dragArea list-group w-full" :list="list" @change="log">
      <div
          class="list-styles"
          v-for="element in list"
          :key="element.name"
          @dragenter.prevent
          @dragover.prevent
      >
        <div class="layerBox row">
          <div class="col-md-8" style="margin-top:5px">
            <Icon type="md-apps" style="margin-right:15px;"/>
            <Checkbox/>
            <label>{{element.name}}</label>
          </div>
          <div class="col-md-4">
            <Tooltip content="Click to unlock or lock" placement="top">
              <Button v-if="isLock" @click="doLock(false)" icon="md-lock" type="text"></Button>
              <Button v-else @click="doLock(true)" icon="md-unlock" type="text"></Button>
            </Tooltip>
            <Tooltip content="Click to view or unview" placement="top">
              <Button v-if="isView" icon="ios-eye-off-outline" @click="doView(true)" type="text"></Button>
              <Button v-else @click="doView(false)" icon="ios-eye-outline" type="text"></Button>
            </Tooltip>
            <Dropdown>
              <Button icon="ios-more" style="border: none;" size="sm">
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
export default defineComponent({
  name: 'ToolBar',
  mixins: [select],
  components: {
    draggable: VueDraggableNext,
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
      // Modify default properties
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

    //for drag and drop
    onMoveCallback(evt, originalEvent) {
    },
    log(event,original) {
      var arr = {id:'',index:0,direction:"",moveCount:0};
          console.log("asdds")
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
      this.list = [...this.canvas.c.getObjects()]
        .reverse()
        .map((item) => {
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

  },
  watch:{
    list(){
      console.log("watch")
        // console.log(changeIndex)
        // var tempIdx = this.tempList.findIndex((item)=>item.id == evt.draggedContext.element.id);
        // var listIdx = this.list.findIndex((item)=>item.id == evt.draggedContext.element.id);
        // if(tempIdx-listIdx < 0){
        //   this.canvas.editor.up(evt.draggedContext.element);
        // }else{
        //   this.canvas.editor.down(evt.draggedContext.element);
        // }
        // this.tempList = this.list.map(item=>item);
      // }

    }
  }  
})
</script>