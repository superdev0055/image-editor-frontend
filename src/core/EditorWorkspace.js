/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */


import { fabric } from 'fabric';
import {transParent} from '@/utils/imgConstant'
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
  }

  //Initialize the background
  _initBackground() {
    this.canvas.setBackgroundColor('#F1F1F1', this.canvas.renderAll.bind(this.canvas));
    this.canvas.backgroundImage = '';
    this.canvas.setWidth(this.workspaceEl.offsetWidth);
    this.canvas.setHeight(this.workspaceEl.offsetHeight);
    // last canvas size
    this.width = this.workspaceEl.offsetWidth;
    this.height = this.workspaceEl.offsetHeight;
  }

  //Initialize the canvas
  _initWorkspace() {
    const { width, height } = this.option;
    const workspace = new fabric.Rect({
      fill: '#ffffff',
      width,
      height,
      id: 'workspace',
    });
    workspace.set('selectable', false);
    workspace.set('hasControls', false);
    workspace.hoverCursor = 'selection';
    this.canvas.add(workspace);
    this.canvas.centerObject(workspace);
    this.canvas.renderAll();

    this.workspace = workspace;
    this.auto();

    // const { width, height } = this.option;
    // console.log("Ddddddd")
    // console.log(width,height)
    // const workspace = new fabric.Image();
    // workspace.set({
    //   width,
    //   height,
    //   id: 'workspace',      
    // })
    // workspace.scale(1.7);
    // workspace.setSrc(transParent);    
    // workspace.set('selectable', false);
    // workspace.set('hasControls', false);
    // workspace.hoverCursor = 'selection';
    // this.canvas.add(workspace);
    // this.canvas.centerObject(workspace);
    // this.canvas.renderAll();

    // this.workspace = workspace;
    // this.auto();


    
    // const { width, height } = this.option;
    // var workspace = new fabric.Image();
         
    // workspace.setSrc(transParent);    
    // workspace.set({
    //   left: 0,
    //   id: 'workspace',
    //   top: 0,
    //   width,
    //   height,
    //   selectable:false,
    //   hasControls:false,
    // });    
    // workspace.scale(1.7);

    // this.canvas.add(workspace);
    // this.canvas.renderAll();
    // this.workspace = workspace;
    // this.auto();         
   
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

  setSize(width, height) {
    console.log("setsize");
    this._initBackground();
    this.option.width = width;
    this.option.height = height;
    //reset workspace
    this.workspace = this.canvas.getObjects().find((item) => item.id === 'workspace');
    var shadow = new fabric.Shadow({
      color: "gray",
      blur: 50,
      offsetX: 0,
      offsetY: 0,
    });     
    this.workspace.set('width', width);
    this.workspace.set('height', height);
    // this.workspace.set('shadow', shadow);
    this.workspace.shadow = shadow;
    console.log(this.workspace)
    // get offset
    const l1 = Number(this.workspace.left);
    const t1 = Number(this.workspace.top);
    this.canvas.centerObject(this.workspace);
    this.moveEl(this.workspace.left - l1, this.workspace.top - t1);
    this.auto();
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
    this.canvas.centerObject(this.workspace);
    this.canvas.renderAll();

    //Do not display beyond the canvas
    this.workspace.clone((cloned) => {
      this.canvas.clipPath = cloned;
      this.canvas.requestRenderAll();
    });
    if (cb) cb(this.workspace.left, this.workspace.top);
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
        this.requestRenderAll();
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
        this.requestRenderAll();
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
      this.requestRenderAll();
    });

    this.canvas.on('mouse:wheel', function (opt) {
      const delta = opt.e.deltaY;
      let zoom = this.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      const center = this.getCenter();
      this.zoomToPoint(new fabric.Point(center.left, center.top), zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }

  _setDring() {
    this.canvas.selection = false;
    // this.canvas.defaultCursor = 'grab';
    // this.workspace.hoverCursor = 'grab';
    this.canvas.getObjects().forEach((obj) => {
      obj.selectable = false;
    });
    this.canvas.renderAll();
    this.canvas.requestRenderAll();
  }

  scaleImageToSlot(image, slot) {
    // Find smallest ratio of slot:width / image:width and slot:height / image: height
    let ratio = Math.min(slot.width / image.width, slot.height / image.height);
    console.log(`ratio width ${slot.width/image.width}, height ${slot.height/image.height}`);
    console.log('=> ratio', ratio);
    
    if(ratio <= 1) {
      image.scaleToWidth(slot.width);
      let newHeight = image.height * image.scaleY;
      if(newHeight < slot.height) {
        image.scaleToHeight(slot.height);
      }
    }
    else {
      image.scaleToHeight(slot.height);
      let newWidth = image.width * image.scaleX;
      
      if(newWidth < slot.width) {
        image.scaleToWidth(slot.width);
      }
    }
    
    var shiftLeft = (slot.width - (image.width*image.scaleX)) / 2;
    var shiftTop = (slot.height - (image.height*image.scaleY)) / 2;
    
    if(this.alignCenter) {
      image.set("left",slot.left + shiftLeft);
      image.set("top",slot.top + shiftTop);
    }
    else {
      if(image.left < slot.left) {
        // align image to center.
        image.set("left",slot.left);
      }
      if(image.top < slot.top) {
        image.set("top",slot.top);
      }    
    }
    
  }

  clipBySlot(ctx, image, slot) {
    var scaleXTo1 = (1 / image.scaleX);
    var scaleYTo1 = (1 / image.scaleY);
    
    // Save context of the canvas so it can be restored after the clipping
    ctx.save();
    
    ctx.translate(0, 0);
    ctx.rotate(degToRad(image.angle * -1));
    ctx.scale(scaleXTo1, scaleYTo1);
    
    ctx.beginPath();
    
    const boundingRect = image.getBoundingRect();
    // console.log(`[left] ${image.left} - (${boundingRect.width} / 2)`);
    
    ctx.rect(
      slot.left - image.left - Math.floor(boundingRect.width / 2),
      slot.top - image.top - Math.floor(boundingRect.height / 2),
      slot.width,
      slot.height
    );
    ctx.stroke()
    ctx.closePath();
    
    // Restore the original context.
    ctx.restore();
  }

  // Since the `angle` property of the Image object is stored 
  // in degrees, we'll use this to convert it to radians.
  degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }   
}

export default EditorWorkspace;
