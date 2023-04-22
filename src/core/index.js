
import EventEmitter from 'events';
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
  del(id){
    var a = this.canvas.getObjects().forEach((item) => {
              if(item.id == "empty"){
                return false;
              }else{
                if(item.id == id){
                  this.canvas.remove(item)
                }
              }
            });
    this.canvas.requestRenderAll();
    this.canvas.discardActiveObject();            
  }
  clone() {
    const activeObject = this.canvas.getActiveObject();
    if(activeObject.id == "empty"){
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
    return this.canvas.toJSON(['id', 'gradientAngle', 'selectable', 'hasControls']);
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
}

export default Editor;
