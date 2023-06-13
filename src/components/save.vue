<template>
  <div class="save-box">
    <Dropdown style="margin-left: 10px" @on-click="saveJson">
      <Button type="primary" size="small" style="font-size:11px;margin-right:10px" @click="saveJson">
        {{saveType}}
      </Button>
      <Button type="primary" size="small" style="font-size:11px;margin-right:10px" @click="(value) => exportJson('template')">
        Quick Export Template JSON
      </Button>
      <Button type="primary" size="small" style="font-size:11px;margin-right:10px" @click="(value) => exportJson('element')">
        Quick Export Element JSON
      </Button>            
    </Dropdown>
  </div>
</template>

<script>
import select from '@/mixins/select';
import {createUserTemp,updateUserTemp} from "@/service/endpoint";
import {v4 as uuid} from "uuid";
export default {
  name: 'saveBar',
  inject:["path","param_id"],
  mixins: [select],
  data() {
    return {
      saveType:"Save UserTemplate"
    };
  },

  mounted(){
    if(this.path.slice(8) == "create"){
      this.saveType = "Save UserTemplate"
    }else{
      this.saveType = "Edit UserTemplate"
    }
    
  },  
  methods: {
    saveWith(type) {
      this[type]();
    },
    exportJson(type) {
      const tempUrl = this.canvas.editor.getJson();
      tempUrl.id = uuid();
      tempUrl.image_url = this.canvas.editor.getImageUrl();
      tempUrl.fontLists = window.globalFonts;
      var dataUrl = tempUrl;
      if(type == "element"){
        if(tempUrl.objects.length > 2){
          var canvas = document.createElement("CANVAS");
          canvas.id = "tempCanvas";
          canvas.style.display = "none";
          var canvasClone = new fabric.Canvas("tempCanvas",{
            fireRightClick: true,
            stopContextMenu: true,
            controlsAboveOverlay: true,        
          });
          var jsonFile = JSON.stringify(tempUrl);
          canvasClone.loadFromJSON(jsonFile, async () => {
            canvasClone.renderAll.bind(canvasClone);
            const workspace = canvasClone.getObjects().find((item) => item.id === 'workspace');
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
              canvasClone.setViewportTransform([1, 0, 0, 1, 0, 0]);
              const imgUrl = canvasClone.toDataURL(option);
              dataUrl = tempUrl.objects.slice(2);
              dataUrl = {
                "element":dataUrl,
                "base64Url":imgUrl
              }
              const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify(dataUrl, null, '\t')
              )}`;
              this.downFile(fileStr, 'json', type);              
          });    

        }
      }else{
        const fileStr = `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(dataUrl, null, '\t')
        )}`;
        this.downFile(fileStr, 'json', type);             
      }

    },
    downFile(fileStr, fileType,type) {
      const anchorEl = document.createElement('a');
      anchorEl.href = fileStr;
      anchorEl.download = `${type+ '  ' +uuid()}.${fileType}`;
      document.body.appendChild(anchorEl); // required for firefox
      anchorEl.click();
      anchorEl.remove();
    },

    saveJson() {
      var name = '';
      if(document.getElementById("canvasName") != null){
        name = document.getElementById("inputCanvasName").value;
      }

      if(this.saveType == "Save Image"){
        const dataUrl = this.canvas.editor.getJson();
        dataUrl.id = uuid();
        dataUrl.name = name;
        dataUrl.image_url = this.canvas.editor.getImageUrl();
        dataUrl.fontLists = window.globalFonts;
        createUserTemp({data:dataUrl}).then((res)=>{
          alert(res.data);
        });

      }else{
        const dataUrl = this.canvas.editor.getJson();
        dataUrl.id = this.param_id;
        dataUrl.name = name;
        dataUrl.image_url = this.canvas.editor.getImageUrl();     

        updateUserTemp(this.param_id,{data:dataUrl}).then((res)=>{
          alert(res.data)
        })
      }

    }
  }
};
</script>

<style scoped lang="less">
.save-box {
  display: inline-block;
}
</style>
