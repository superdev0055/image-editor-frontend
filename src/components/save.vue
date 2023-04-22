<template>
  <div class="save-box">

    <Dropdown style="margin-left: 10px" @on-click="saveWith">
      <Button type="primary" size="small" style="font-size:11px" @click="saveJson">
        {{saveType}}
      </Button>
      <!-- <template #list>
        <DropdownMenu>
          <DropdownItem name="clipboard">{{ $t('copy_to_clipboard') }}</DropdownItem>
          <DropdownItem name="saveImg">{{ $t('save_as_picture') }}</DropdownItem>
          <DropdownItem name="saveJson" divided>{{ $t('save_as_json') }}</DropdownItem>
        </DropdownMenu>
      </template> -->
    </Dropdown>
  </div>
</template>

<script>
import select from '@/mixins/select';
import { v4 as uuid } from 'uuid';
import axios from "axios";
export default {
  name: 'saveBar',
  inject:["path","param_id"],
  mixins: [select],
  data() {
    return {
      saveType:"Save Image"
    };
  },

  mounted(){
    if(this.path.slice(8) == "create"){
      this.saveType = "Save Image"
    }else{
      this.saveType = "Edit Image"
    }
    
  },  
  methods: {
    saveWith(type) {
      this[type]();
    },
    saveJson() {
      if(this.saveType == "Save Image"){
        const dataUrl = this.canvas.editor.getJson();
        const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(dataUrl, null, '\t')
        )}`;
        axios.post("http://localhost:3000/feed-image/create",{data:dataUrl}).then((res)=>{
          alert(res.data)
        })
        console.log(fileStr);
        // this.downFile(fileStr, 'json');
      }else{
        console.log("edit")

        const dataUrl = this.canvas.editor.getJson();
        const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(dataUrl, null, '\t')
        )}`;
        axios.post("http://localhost:3000/feed-image/edit/"+this.param_id,{data:dataUrl}).then((res)=>{
          alert(res.data)
        })
        // this.downFile(fileStr, 'json');        
      }

    },
    saveSvg() {
      const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
      const { left, top, width, height } = workspace;
      const dataUrl = this.canvas.c.toSVG({
        width,
        height,
        viewBox: {
          x: left,
          y: top,
          width,
          height,
        },
      });
      const fileStr = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(dataUrl)}`;
      this.downFile(fileStr, 'svg');
    },
    saveImg() {
      const workspace = this.canvas.c.getObjects().find((item) => item.id === 'workspace');
      const { left, top, width, height } = workspace;
      const option = {
        name: 'New Image',
        format: 'png',
        quality: 1,
        left,
        top,
        width,
        height,
      };
      this.canvas.c.setViewportTransform([1, 0, 0, 1, 0, 0]);
      const dataUrl = this.canvas.c.toDataURL(option);
      this.downFile(dataUrl, 'png');
    },
    downFile(fileStr, fileType) {
      const anchorEl = document.createElement('a');
      anchorEl.href = fileStr;
      anchorEl.download = `${uuid()}.${fileType}`;
      document.body.appendChild(anchorEl); // required for firefox
      anchorEl.click();
      anchorEl.remove();
    },
    clipboard() {
      const jsonStr = this.canvas.editor.getJson();
      this._mixinClipboard(JSON.stringify(jsonStr, null, '\t'));
    },
    clear() {
      this.canvas.c.getObjects().forEach((obj) => {
        if (obj.id !== 'workspace') {
          this.canvas.c.remove(obj);
        }
      });
      this.canvas.c.discardActiveObject();
      this.canvas.c.renderAll();
    },
  },
};
</script>

<style scoped lang="less">
.save-box {
  display: inline-block;
}
</style>
