
import EventEmitter from 'events';
// import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';

// alignment guidelines
import initAligningGuidelines from '@/core/initAligningGuidelines';
import initControlsRotate from '@/core/initControlsRotate';
import InitCenterAlign from '@/core/initCenterAlign';
import initHotkeys from '@/core/initHotKeys';
import initControls from '@/core/initControls';
import axios from "axios";
class Editor extends EventEmitter {
  constructor(canvas) {
    super();

    this.canvas = canvas;
    this.editorWorkspace = null;

    initAligningGuidelines(canvas);
    initHotkeys(canvas);
    initControls(canvas);
    
    initControlsRotate(canvas);
    this.centerAlign = new InitCenterAlign(canvas);
  }
  getName(type){

    var items = this.canvas.getObjects().filter(arg=>{
      if(arg.id != "workspace"){
        return arg.type == type;
      }
    });
    if(type == "rect"){
      return type+"#"+(items.length);
    }else{
      return type+"#"+(items.length);
    }
  }
  getPosition(obj){
    var positionX;
    var positionY;
    if(obj.position.positionX == "left"){
      positionX = 0 - (obj.width) / 2;
    }      
    if(obj.position.positionX == "right"){
      positionX = obj.width / 2 - obj._objects[1].width * obj._objects[1].scaleX;
    }
    if(obj.position.positionX == "xCenter"){
      positionX = 0 - (obj._objects[1].width * obj._objects[1].scaleX) / 2;
    }
    if(obj.position.positionY == "yCenter"){
      positionY = 0 - (obj._objects[1].height * obj._objects[1].scaleY) / 2;
    }
    
    if(obj.position.positionY == "top"){
      positionY = -(obj.height / 2);
    }
    if(obj.position.positionY == "bottom"){
      positionY = obj.height / 2 - obj._objects[1].height * obj._objects[1].scaleY;
    }
      
    var position = {
      left:positionX,
      top:positionY
    };
    return position
  }  
  getNameClone(name){
    var items = this.canvas.getObjects().filter(arg=>{
      if(arg.id != "workspace"){
        return arg.item_name.split("#")[0] == name.split("#")[0];
      }
    }); 

    return name.split("#")[0]+'#'+items.length;

  }
  clone() {
    const activeObject = this.canvas.getActiveObject();
    if(activeObject.id == "showBg"){
      return true;
    }
    if (activeObject.length === 0) return;
    activeObject.clone((cloned) => {
      this.canvas.discardActiveObject();
      // Spacing settings
      const grid = 10;
      cloned.set({
        left: cloned.left + grid,
        top: cloned.top + grid,
        id: uuid(),
      });
      this.canvas.add(cloned);
      this.canvas.setActiveObject(cloned);
      this.canvas.requestRenderAll();
    });
  }

  // split group
  unGroup() {
    // Get the currently selected object first, and then break it up
    this.canvas.getActiveObject().toActiveSelection();
    this.canvas
      .getActiveObject()
      .getObjects()
      .forEach((item) => {
        item.set('id', uuid());
      });
    this.canvas.discardActiveObject().renderAll();
  }

  group(name) {
    // composite element
    const activeObj = this.canvas.getActiveObject();
    const activegroup = activeObj.toGroup();
    const objectsInGroup = activegroup.getObjects();
    activegroup.clone((newgroup) => {
      newgroup.set('id', uuid());
      newgroup.set({
        id:uuid(),
        item_name:"group",
        customType:"real-group",
        item_name:name,
        layerShowPeriod:{
          mode:'',
          startDate:'',
          endDate:''
        },
      });
      this.canvas.remove(activegroup);
      objectsInGroup.forEach((object) => {
        this.canvas.remove(object);
      });
      this.canvas.add(newgroup);
      this.canvas.setActiveObject(newgroup);
    });
  }

  up(list = '') {
    if(list != ''){
      list.bringForward();
      this.canvas.renderAll();
      this._workspaceSendToBack();   
    }else{
      const actives = this.canvas.getActiveObjects();
      if (actives && actives.length === 1) {
        const activeObject = this.canvas.getActiveObjects()[0];
        activeObject && activeObject.bringForward();
        this.canvas.renderAll();
        this._workspaceSendToBack();
      }   
    }
  }

  upTop() {
    const actives = this.canvas.getActiveObjects();
    if (actives && actives.length === 1) {
      const activeObject = this.canvas.getActiveObjects()[0];
      activeObject && activeObject.bringToFront();
      this.canvas.renderAll();
      this._workspaceSendToBack();
    }
  }

  down(list = '') {
    if(list != ''){
      list.sendBackwards();
      this.canvas.renderAll();
      this._workspaceSendToBack();
    }else{
      const activeObject = this.canvas.getActiveObjects()[0];
      activeObject && activeObject.sendBackwards();
      this.canvas.renderAll();
      this._workspaceSendToBack();      
    }
  }

  downTop() {
    const actives = this.canvas.getActiveObjects();
    if (actives && actives.length === 1) {
      const activeObject = this.canvas.getActiveObjects()[0];
      activeObject && activeObject.sendToBack();
      this.canvas.renderAll();
      this._workspaceSendToBack();
    }
  }

  getWorkspace() {
    const workspace = this.canvas.getObjects().find((item) => item.id === 'workspace');
    return workspace;
  }

  _workspaceSendToBack() {
    const workspace = this.getWorkspace();
    workspace && workspace.sendToBack();
  }

  getJson() {
    return this.canvas.toJSON(['id','bgState','originPoistion','fontLists','strokeLabel','ttf_base64','fontFamilyList','name','texthandle','scaling','item_name','position','layerShowPeriod','customType', 'gradientAngle', 'selectable', 'hasControls',"fillState","borderState"]);
  }

  /**
   * @description: Drag and drop to add to canvas
   * @param {Event} event
   * @param {Object} item
   */
  dragAddItem(event, item) {
    
    const { left, top } = this.canvas.getSelectionElement().getBoundingClientRect();
    if (event.x < left || event.y < top) return;

    const point = {
      x: event.x - left,
      y: event.y - top,
    };
    const pointerVpt = this.canvas.restorePointerVpt(point);
    item.left = pointerVpt.x - item.width / 2;
    item.top = pointerVpt.y;
    this.canvas.add(item);
    this.canvas.requestRenderAll();
  }

  checkLayerPeriod(items){
      // var items = this.canvas.getObjects();
      var nowDate = new Date();
      var date = nowDate.getDate();
      var month = nowDate.getMonth()+1;

      var year = nowDate.getFullYear();
      if(month.toString().length == 1){
        month = '0'+month;
      }
      if(date.toString().length == 1){
        date = '0'+date;
      }
      var today = `${year}-${month}-${date}`;      
      var isShow=true;      

      items.forEach(item => {
        if(item.layerShowPeriod){

          if(item.layerShowPeriod.startDate != ''){

            if(item.layerShowPeriod.mode == "except"){
              if(item.layerShowPeriod.startDate>=today){
                isShow = true;
              }else{
                isShow = false;
              }
            }else{
              if(item.layerShowPeriod.startDate<=today){
                isShow = true;
              }else{
                isShow = false;
              }              
            }
          }

          if(item.layerShowPeriod.endDate != ""){
            if(item.layerShowPeriod.mode == "except"){
              if(item.layerShowPeriod.endDate>=today){
                isShow = false;
              }else{
                isShow = true;
              }
            }else{

              if(item.layerShowPeriod.endDate<=today){
                isShow = true;
              }else{
                isShow = false;
              }  



            }        
          }
          if(item.layerShowPeriod.startDate != "" && item.layerShowPeriod.endDate != ""){
            
            if(item.layerShowPeriod.mode == "except"){

              if(item.layerShowPeriod.startDate<=today && item.layerShowPeriod.endDate>=today){
                isShow=false;
              }else{
                isShow=true;
              }
            
            }else{
              if(item.layerShowPeriod.startDate<=today && item.layerShowPeriod.endDate>=today){
                isShow=true;
              }else{
                isShow=false;
              }              
            }             
          }

          if(item.layerShowPeriod.startDate == "" && item.layerShowPeriod.endDate == ""){
            isShow=true;
          }

          if(isShow == true){
            item.set("visible",true);
          }else{
            item.set("visible",false);
          }

        }
        
      });
  }

  getImageUrl(){
    const workspace = this.canvas.getObjects().find((item) => item.id === 'workspace');
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
    var oldViewport = this.canvas.viewportTransform;
    
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    const imgUrl = this.canvas.toDataURL(option);
    this.canvas.setViewportTransform(oldViewport);
    return imgUrl;

  }
  //change short tag
  changeTags(jsonFile,tags,final_product_image){
    var obj = jsonFile.objects.map((item)=>{
      if(item.customType == "text" && item.type == "group"){
        tags.forEach((el)=>{
          if(item.objects[1].text.includes(el)){
            item.objects[1].text = item.objects[1].text.replace('['+el+']',final_product_image[el]);

          }
        });
      }

      return item;
    });
    jsonFile.objects = obj;
    return jsonFile;
  }

  removeBg(url){

    const image = new Image();
    image.src = url;
    image.onload = ({target}) =>{

      const w = Math.round(target.width);
      const h = Math.round(target.height);
      const canvas = document.createElement("canvas");
      
      canvas.width = w;
      canvas.height = h;
      const canvasContext = canvas.getContext("2d");
      canvasContext.drawImage(target,0,0,target.width,target.height,0,0,w,h);
      const canvasImageData = canvasContext.getImageData(0,0,w,h);

      for(let index=0,dataLength = canvasImageData.data.length;index<dataLength;index += 4){
        const r = canvasImageData.data[index];
        const g = canvasImageData.data[index + 1];
        const b = canvasImageData.data[index + 2];

        if([r,g,b].every((item)=> item > 240))
          canvasImageData.data[index + 3] = 0;
      }

      target.width = w;
      target.height = h;
      canvasContext.putImageData(canvasImageData,0,0);
      return canvas.toDataURL();
    }
  }
  
  changeProductImageLists(final_product_image,tags,index){
    var productImageIndex = this.getJson().objects.findIndex(el=>{
      return el.customType === "productImage";
    });
    var jsonFile = JSON.stringify(this.changeTags(this.getJson(),tags,final_product_image));
    var canvas = document.createElement("CANVAS");
    canvas.id = "tempCanvas";
    canvas.style.display = "none";
    var canvasClone = new fabric.Canvas("tempCanvas",{
      fireRightClick: true,
      stopContextMenu: true,
      controlsAboveOverlay: true,        
    });

    canvasClone.loadFromJSON(jsonFile, async () => {
      canvasClone.renderAll.bind(canvasClone);
      this.checkLayerPeriod(canvasClone.getObjects());
      const productImage = canvasClone.getObjects().find((item) => item.id === "productImage" || item.id == "nonBgImage");
      if(productImage.bgState === true){

        var config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"               
          },      
          responseType: 'arraybuffer'    
        }

        await axios.get("https://images.tidy.shopping/removebg"+"?imgurl="+final_product_image.image_link,config).then(res=>{
          var arrayBufferView = res.data
          var blob = new Blob([arrayBufferView],{ type: "image/png" });
          var urlCreator = window.URL || window.webkitURL;
          var imageUrl = urlCreator.createObjectURL(blob);
          final_product_image.image_link = imageUrl;     
        });

      }
      fabric.Image.fromURL(final_product_image.image_link, async (final_product_image) => {
        final_product_image._element.crossOrigin = 'Anonymous';
        if(productImage.width >= productImage.height){
          
          final_product_image.set({
            scaleY:productImage.height/final_product_image.height,
            scaleX:productImage.height/final_product_image.height,
            layerShowPeriod:productImage.layerShowPeriod,
            id: productImage.id,
            angle: productImage.angle,
            item_name: "final_product_image"
          }).setCoords();

        }else{

          final_product_image.set({
            scaleY:productImage.width/final_product_image.width,
            scaleX:productImage.width/final_product_image.width,
            layerShowPeriod:productImage.layerShowPeriod,
            id: productImage.id,
            angle: productImage.angle,
            item_name: "final_product_image"
          }).setCoords();        

        }

        if(final_product_image.width*final_product_image.scaleX > productImage._objects[1].width && final_product_image.height*final_product_image.scaleY > productImage._objects[1].height){
          final_product_image.set({
            scaleY:productImage._objects[1]._element.naturalHeight/final_product_image.width,
            scaleX:productImage._objects[1]._element.naturalWidth/final_product_image.width,
            layerShowPeriod:productImage.layerShowPeriod,
            id: productImage.id,
            angle: productImage.angle,
            item_name: "final_product_image"
          }).setCoords();     
        }

        final_product_image.setPositionByOrigin(new fabric.Point(productImage.left + productImage.width*productImage.scaleX / 2, productImage.top + productImage.height*productImage.scaleX / 2), 'center', 'center')
        canvasClone.remove(productImage); 
        canvasClone.add(final_product_image);
        setTimeout(() => {
          var cloneJson = canvasClone.toJSON(['id','bgState','originPoistion','fontLists','strokeLabel','ttf_base64','fontFamilyList','name','texthandle','scaling','item_name','position','layerShowPeriod','customType', 'gradientAngle', 'selectable', 'hasControls',"fillState","borderState"])
          var finalProductImage = cloneJson.objects[cloneJson.objects.length-1];
          var temp = cloneJson.objects[productImageIndex];
          cloneJson.objects[productImageIndex] = finalProductImage;
          cloneJson.objects[cloneJson.objects.length-1] = temp;    
          var jsonFile =  JSON.stringify(cloneJson); 

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
            var oldViewport = canvasClone.viewportTransform;
            canvasClone.setViewportTransform([1, 0, 0, 1, 0, 0]);
            const imgUrl = canvasClone.toDataURL(option);
            canvasClone.setViewportTransform(oldViewport);  
            canvasClone.requestRenderAll();
            document.getElementById("preview"+(index)).src = imgUrl;
          });          
            
        }, 2000);
        });  
        
        
    });
  }

}

export default Editor;
