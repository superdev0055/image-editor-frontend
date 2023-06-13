
import { fabric } from 'fabric';
import verticalImg from '@/assets/editor/middlecontrol.svg';
import horizontalImg from '@/assets/editor/middlecontrolhoz.svg';
import edgeImg from '@/assets/editor/edgecontrol.svg';
import rotateImg from '@/assets/editor/rotateicon.svg';

// middle bar
function intervalControl() {
  const verticalImgIcon = document.createElement('img');
  verticalImgIcon.src = verticalImg;

  const horizontalImgIcon = document.createElement('img');
  horizontalImgIcon.src = horizontalImg;

  function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    const wsize = 20;
    const hsize = 25;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(verticalImgIcon, -wsize / 2, -hsize / 2, wsize, hsize);
    ctx.restore();
  }

  function renderIconHoz(ctx, left, top, styleOverride, fabricObject) {
    const wsize = 25;
    const hsize = 20;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(horizontalImgIcon, -wsize / 2, -hsize / 2, wsize, hsize);
    ctx.restore();
  }
  // middle bar
  fabric.Object.prototype.controls.ml = new fabric.Control({
    x: -0.5,
    y: 0,
    offsetX: -1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIcon,
  });

  fabric.Object.prototype.controls.mr = new fabric.Control({
    x: 0.5,
    y: 0,
    offsetX: 1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIcon,
  });

  fabric.Object.prototype.controls.mb = new fabric.Control({
    x: 0,
    y: 0.5,
    offsetY: 1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIconHoz,
  });

  fabric.Object.prototype.controls.mt = new fabric.Control({
    x: 0,
    y: -0.5,
    offsetY: -1,
    cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
    getActionName: fabric.controlsUtils.scaleOrSkewActionName,
    render: renderIconHoz,
  });
}

// vertex
function peakControl() {
  const img = document.createElement('img');
  img.src = edgeImg;

  function renderIconEdge(ctx, left, top, styleOverride, fabricObject) {
    const wsize = 25;
    const hsize = 25;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -wsize / 2, -hsize / 2, wsize, hsize);
    ctx.restore();
  }
  // Four Corners Icon
  fabric.Object.prototype.controls.tl = new fabric.Control({
    x: -0.5,
    y: -0.5,
    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingEqually,
    render: renderIconEdge,
  });
  fabric.Object.prototype.controls.bl = new fabric.Control({
    x: -0.5,
    y: 0.5,
    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingEqually,
    render: renderIconEdge,
  });
  fabric.Object.prototype.controls.tr = new fabric.Control({
    x: 0.5,
    y: -0.5,
    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingEqually,
    render: renderIconEdge,
  });
  fabric.Object.prototype.controls.br = new fabric.Control({
    x: 0.5,
    y: 0.5,
    cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
    actionHandler: fabric.controlsUtils.scalingEqually,
    render: renderIconEdge,
  });
}

// delete
function deleteControl(canvas) {
  const deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
  const delImg = document.createElement('img');
  delImg.src = deleteIcon;

  function renderDelIcon(ctx, left, top, styleOverride, fabricObject) {
    const size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(delImg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  // delete selected elements
  function deleteObject() {
    const activeObject = canvas.getActiveObjects();
    if (activeObject) {
      activeObject.map((item) => {
        if(item.id == "productImage" || item.id == "trimImage" || item.id == "nonBgImage"){
          return false;
        }else{
          canvas.remove(item);
        }
      }); 
      canvas.renderAll();
      canvas.discardActiveObject();      
    }
  }

  // delete icon
  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderDelIcon,
    cornerSize: 24,
  });
}

// to rotate
function rotationControl() {
  const img = document.createElement('img');
  img.src = rotateImg;
  function renderIconRotate(ctx, left, top, styleOverride, fabricObject) {
    const wsize = 40;
    const hsize = 40;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(img, -wsize / 2, -hsize / 2, wsize, hsize);
    ctx.restore();
  }
  // Rotate icon
  fabric.Object.prototype.controls.mtr = new fabric.Control({
    x: 0,
    y: 0.5,
    cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    offsetY: 30,
    withConnecton: false,
    actionName: 'rotate',
    render: renderIconRotate,
  });
}


function initControls(canvas) {
  // delete icon
  deleteControl(canvas);
  // apex icon
  peakControl(canvas);
  // middle bar icon
  intervalControl(canvas);
  // Rotate icon
  rotationControl(canvas);
  fabric.util.addListener(document.getElementsByClassName('upper-canvas')[0], 'contextmenu', function(e) {
    e.preventDefault();
  });
  // selected style
  fabric.Object.prototype.set({
    transparentCorners: false,
    borderColor: '#51B9F9',
    cornerColor: '#FFF',
    borderScaleFactor: 2.5,
    cornerStyle: 'circle',
    cornerStrokeColor: '#0E98FC',
    borderOpacityWhenMoving: 1,
  });
  fabric.Arrow = fabric.util.createClass(fabric.Line, {
    type: 'Arrow',
    initialize: function(points, options) {
      options || (options = { });
      this.callSuper('initialize',points, options);
    this.strokeWidth=1;
    this.fill= '#444';
    this.stroke= '#444';
    this.id= 'Arrow' + canvas.linecounter;
    this.name= 'arrow';
    this.selectable= true;		//if turn this off hovercursor doesn't work. So arrow is selectable. But setting hasBorders to false stops blue rectangle appearing around it so there's no problem.
    this.lockMovementX= true;
    this.lockMovementY= true;
    this.lockScalingX= true;
    this.lockScalingY= true;
    this.lockRotation= true;
    this.hasControls= true;
    this.lockRotation= true;
    this.hasBorders= false;
    this.cornerColor= 'rgba(255,0,0,1)';
    this.cornerSize=9;
    var vx1,vy1,vx2,vy2;
    
    /** [Create triangle attached to the end of the line pointing to the target entity] */
    this.triangle = new fabric.Triangle({
      originX: 'left',
      originY: 'top',
      hasBorders: true,
      id: 'triangle' + canvas.linecounter,
      lockScalingX: true,
      lockScalingY: true,
      lockRotation: true,
      hasControls: false,
      pointType: 'arrow_start',
      fill:  '#444',
      stroke: "#444444",
      strokeWidth: 1,
      selectable: false,
    });
    
    this.text= new fabric.Text("", {
      id: 'text' + canvas.linecounter,
      fontSize:20,
      selectable: false,
    });
  
    
    },
    toObject: function() {
      return fabric.util.object.extend(this.callSuper('toObject'), {
      });
    },
    
    length: function(){
    return Math.sqrt(Math.pow(this.y2-this.y1,2) + Math.pow(this.x2-this.x1,2));},
   
  });
  
    
  fabric.Arrow.fromObject = function(object, callback) {
      return fabric.Object._fromObject('Arrow', object, callback);
    };  
}

export default initControls;
