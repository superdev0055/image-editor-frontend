
import EventEmitter from 'events';
// import { fabric } from 'fabric';
import { v4 as uuid } from 'uuid';

// alignment guidelines
import initAligningGuidelines from '@/core/initAligningGuidelines';
import initControlsRotate from '@/core/initControlsRotate';
import InitCenterAlign from '@/core/initCenterAlign';
import initHotkeys from '@/core/initHotKeys';
import initControls from '@/core/initControls';

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

  group() {
    // composite element
    const activeObj = this.canvas.getActiveObject();
    const activegroup = activeObj.toGroup();
    const objectsInGroup = activegroup.getObjects();
    activegroup.clone((newgroup) => {
      newgroup.set('id', uuid());
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
    return this.canvas.toJSON(['id','item_name','layerShowPeriod', 'gradientAngle', 'selectable', 'hasControls',"fillState","borderState"]);
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

  checkLayerPeriod(){
      var items = this.canvas.getObjects();
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
          if(item.lock == true){
            isShow = false;
          }
          if(isShow == true){
            item.set("opacity",100);
          }else{
            item.set("opacity",0);
          }

          this.canvas.renderAll();

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

}

export default Editor;
