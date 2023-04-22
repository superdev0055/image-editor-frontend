
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
  const delImg = document.createElement('img');

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
      activeObject.map((item) => canvas.remove(item));
      canvas.requestRenderAll();
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
}

export default initControls;
