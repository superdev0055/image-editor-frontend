<template>
    <DropdownItem @click="insertImg"><Icon type="ios-image" /><span style="margin-left:10px">Upload image</span></DropdownItem>
</template>

<script>
import { getImgStr, selectFiles,downFontByJSON } from '@/utils/utils';
import select from '@/mixins/select';
import { v4 as uuid } from 'uuid';
import {emptyData} from '@/utils/emptyConstant' 
import axios from "axios";
export default {
  name: 'ToolBar',
  mixins: [select],
  inject:["path","param_id"],
  data() {
    return {
      showModal: false,
      svgStr: ''
    };
  },
  // created() {
  //   this.event.on('selectOne', (items) => {
  //     this.isLock = !items[0].hasControls;
  //     this.mSelectActive = items[0];
  //   });
  // },
  mounted(){
    if(this.path.slice(8) == "create"){
      this.insertEmptyFile(emptyData);
    }else{
      this.insertFileFromJSON(this.param_id);
    }
    
  },  
  methods: {
    insertTypeHand(type) {
      this[type]();
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
    insertEmptyFile(file,type) {
      
      const imgEl = document.createElement('img');
      imgEl.src = file || this.imgFile;
      document.body.appendChild(imgEl);
      imgEl.onload = () => {
        // Create a picture object
        const imgInstance = new this.fabric.Image(imgEl, {
          id: "empty",
          name: 'picture1',
          left: 100,
          top: 100,
        });
        // set zoom
        this.canvas.c.add(imgInstance);
        this.canvas.c.setActiveObject(imgInstance);
        this.canvas.c.renderAll();
        // // Remove image elements from the page
        imgEl.remove();
      };

    },    
    // insert image file
    insertImgFile(file,type) {
      const imgEl = document.createElement('img');
      imgEl.src = file || this.imgFile;
      // insert page
      document.body.appendChild(imgEl);
      imgEl.onload = () => {
        // Create a picture object
        const imgInstance = new this.fabric.Image(imgEl, {
          id: uuid(),
          name: 'picture1',
          left: 100,
          top: 100,
        });
        // set zoom
        this.canvas.c.add(imgInstance);
        this.canvas.c.setActiveObject(imgInstance);
        this.canvas.c.renderAll();
        // // Remove image elements from the page
        imgEl.remove();
      };
    },
    insertFileFromJSON(id){
      axios.get('http://localhost:3000/feed-image/'+id)
        .then(resp => {
            var data = resp.data;
            var jsonFile = JSON.stringify(data);
            downFontByJSON(jsonFile).then(() => {
                this.canvas.c.loadFromJSON(jsonFile, () => {
                  this.canvas.c.renderAll.bind(canvas.c);
                    const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
                    const { left, top, width, height } = workspace;                  
                    workspace.set('selectable', false);
                    workspace.set('hasControls', false);
                    this.insertEmptyFile(emptyData);
                    this.canvas.c.requestRenderAll();
                    this.canvas.c.renderAll();
                });
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
</style>
