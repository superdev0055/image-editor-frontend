/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */


import { fabric } from 'fabric';
import {transParent} from '@/utils/imgConstant';

class EditorWorkspace {
  constructor(canvas, option) {
    this.canvas = canvas;
    this.workspaceEl = document.querySelector('#workspace');
    this.workspace = null;
    this.option = option;
    this._initBackground();
    this._initWorkspace();
    this._initResizeObserve();
    this._initDring();  
    this.imageW = 0;
    this.imageH = 0;

  }

  //Initialize the background
  _initBackground() {
    this.canvas.setBackgroundColor('', this.canvas.renderAll.bind(this.canvas));
    this.canvas.backgroundImage = '';
    this.canvas.setWidth(this.workspaceEl.offsetWidth);
    this.canvas.setHeight(this.workspaceEl.offsetHeight);
    // last canvas size
    this.width = this.workspaceEl.offsetWidth;
    this.height = this.workspaceEl.offsetHeight;
  }

  setSize(width, height) {
    this._initBackground();
    this.option.width = width;
    this.option.height = height;
    // //reset workspace
    this.workspace = this.canvas.getObjects().find((item) => item.id === 'workspace');
    
    if(this.workspace.name != "rectworks"){

      this.workspace.set("scaleX",width/this.imageW);
      this.workspace.set("scaleY",height/this.imageH);
      this.workspace.set("originW",width);
      this.workspace.set("originH",height);

    }else{

      this.workspace.set("width",width);
      this.workspace.set("height",height);
      this.workspace.set("originW",width);
      this.workspace.set("originH",height);  

    }

    // get offset
    const l1 = Number(this.workspace.left);
    const t1 = Number(this.workspace.top);
    this.canvas.centerObject(this.workspace);
    this.moveEl(this.workspace.left - l1, this.workspace.top - t1);
    this.auto();
  }
  //Initialize the canvas
  _initWorkspace() {
    const { width, height } = this.option;
    // <!-----------------backgroundImage-------------->

    fabric.Image.fromURL(transParent, (workspace) => {
      this.imageW = workspace.width;
      this.imageH = workspace.height;
      workspace.set({
        id: 'workspace',
        originW:width,       
        originH:height,     
        selectable:false,
        hasControls:false,
        left:0,
        top:0,
      });
      workspace.set("scaleX",width/this.imageW);
      workspace.set("scaleY",height/this.imageH);
      workspace.hoverCursor = 'selection';
      this.canvas.centerObject(workspace);
      this.canvas.add(workspace);
      this.canvas.renderAll();
      this.workspace = workspace;
      this.auto();      
    });
    // <!-----------------backgroundImage-------------->
  }

  // Initialize the listener
  _initResizeObserve() {
    const resizeObserver = new ResizeObserver((entries) => {
      this.auto();
      const diffWidth = entries[0].contentRect.width / 2 - this.width / 2;
      const diffHeight = entries[0].contentRect.height / 2 - this.height / 2;
      this.width = entries[0].contentRect.width;
      this.height = entries[0].contentRect.height;
      this.canvas.getObjects().forEach((obj) => {
        if (obj.id !== 'workspace') {
          const left = obj.left + diffWidth;
          const top = obj.top + diffHeight;
          obj.set({
            left,
            top,
          });
          obj.setCoords();
        }
      });
      this.canvas.renderAll.bind(this.canvas);
      this.canvas.renderAll();
      this.canvas.requestRenderAll();
    });

    resizeObserver.observe(this.workspaceEl);
  }



  moveEl(diffWidth, diffHeight) {
    this.canvas.getObjects().forEach((obj) => {
      if (obj.id !== 'workspace') {
        const left = obj.left + diffWidth;
        const top = obj.top + diffHeight;
        obj.set({
          left,
          top,
        });
        obj.setCoords();
      }
    });
    this.canvas.renderAll();
    this.canvas.requestRenderAll();
  }

  setZoomAuto(scale, cb) {
    const { workspaceEl } = this;
    const width = workspaceEl.offsetWidth;
    const height = workspaceEl.offsetHeight;
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    const center = this.canvas.getCenter();
    this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), scale);
    // this.canvas.centerObject(this.workspace);
    this.canvas.renderAll();

    //Do not display beyond the canvas
    setTimeout(() => {
      this.workspace.clone((cloned) => {
        this.canvas.clipPath = cloned;
        this.canvas.renderAll();
      });      
    }, 100);
    // if (cb) cb(this.workspace.left, this.workspace.top);
  }

  _getScale() {
    const viewPortWidth = this.workspaceEl.offsetWidth;
    const viewPortHeight = this.workspaceEl.offsetHeight;
    // by width
    if (viewPortWidth / viewPortHeight < this.option.width / this.option.height) {
      return viewPortWidth / this.option.width;
    } // 按照宽度缩放
    return viewPortHeight / this.option.height;
  }

  // enlarge
  big() {
    let zoomRatio = this.canvas.getZoom();
    zoomRatio += 0.05;
    const center = this.canvas.getCenter();
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
  }

  // zoom out
  small() {
    let zoomRatio = this.canvas.getZoom();
    zoomRatio -= 0.05;
    const center = this.canvas.getCenter();
    this.canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoomRatio);
  }

  // auto scaling
  auto() {
    const scale = this._getScale();
    this.setZoomAuto(scale - 0.08);
  }

  // 1:1 enlarge
  one() {
    this.setZoomAuto(0.8 - 0.08);
    this.canvas.requestRenderAll();
  }

  // drag mode
  _initDring() {
    const This = this;
    this.canvas.on('mouse:down', function (opt) {
      const evt = opt.e;
      if (evt.altKey === true) {
        this.defaultCursor = 'grab';
        This._setDring();
        this.selection = false;
        this.isDragging = true;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
        this.renderAll();
      }
    });

    this.canvas.on('mouse:move', function (opt) {
      if (this.isDragging) {
        this.defaultCursor = 'grabbing';
        const { e } = opt;
        const vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
        this.renderAll();
      }
    });

    this.canvas.on('mouse:up', function () {
      this.setViewportTransform(this.viewportTransform);
      this.isDragging = false;
      this.selection = true;
      this.defaultCursor = 'default';
      This.workspace.hoverCursor = 'default';
      this.getObjects().forEach((obj) => {
        if (obj.id !== 'workspace' && obj.hasControls) {
          obj.selectable = true;
        }
      });
      this.renderAll();
    });

    this.canvas.on('mouse:wheel', function (opt) {
      // const delta = opt.e.deltaY;
      // let zoom = this.getZoom();
      // zoom *= 0.999 ** delta;
      // if (zoom > 20) zoom = 20;
      // if (zoom < 0.01) zoom = 0.01;
      // const center = this.getCenter();
      // this.zoomToPoint(new fabric.Point(center.left, center.top), zoom);
      // opt.e.preventDefault();
      // opt.e.stopPropagation();
      // this.renderAll();
    });
  }

  _setDring() {
    this.canvas.selection = false;
    this.canvas.defaultCursor = 'grab';
    this.workspace.hoverCursor = 'grab';
    this.canvas.getObjects().forEach((obj) => {
      obj.selectable = false;
    });
    this.canvas.renderAll();
    this.canvas.requestRenderAll();
  }

  // Since the `angle` property of the Image object is stored 
  // in degrees, we'll use this to convert it to radians.
  degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }   
}

export default EditorWorkspace;
