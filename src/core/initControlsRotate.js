
import { fabric } from 'fabric';

// Define the rotation cursor style, and set the cursor rotation according to the rotation angle
function rotateIcon(angle) {
  return `url("data:image/svg+xml,%3Csvg height='18' width='18' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' style='color: black;'%3E%3Cg fill='none' transform='rotate(${angle} 16 16)'%3E%3Cpath d='M22.4484 0L32 9.57891L22.4484 19.1478V13.1032C17.6121 13.8563 13.7935 17.6618 13.0479 22.4914H19.2141L9.60201 32.01L0 22.4813H6.54912C7.36524 14.1073 14.0453 7.44023 22.4484 6.61688V0Z' fill='white'/%3E%3Cpath d='M24.0605 3.89587L29.7229 9.57896L24.0605 15.252V11.3562C17.0479 11.4365 11.3753 17.0895 11.3048 24.0879H15.3048L9.60201 29.7308L3.90932 24.0879H8.0806C8.14106 15.3223 15.2645 8.22345 24.0605 8.14313V3.89587Z' fill='black'/%3E%3C/g%3E%3C/svg%3E ") 12 12,crosshair`;
}

function initControlsRotate(canvas) {
  //Add rotation control response area
  fabric.Object.prototype.controls.mtr = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: -10,
    offsetX: -10,
    rotate: 20,
    actionName: 'rotate',
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    render: () => '',
  });
  // ↖ upper left
  fabric.Object.prototype.controls.mtr2 = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -10,
    offsetX: 10,
    rotate: 20,
    actionName: 'rotate',
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    render: () => '',
  }); // ↗ upper right
  fabric.Object.prototype.controls.mtr3 = new fabric.Control({
    x: 0.5,
    y: 0.5,
    offsetY: 10,
    offsetX: 10,
    rotate: 20,
    actionName: 'rotate',
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    render: () => '',
  }); // ↘bottom right
  fabric.Object.prototype.controls.mtr4 = new fabric.Control({
    x: -0.5,
    y: 0.5,
    offsetY: 10,
    offsetX: -10,
    rotate: 20,
    actionName: 'rotate',
    actionHandler: fabric.controlsUtils.rotationWithSnapping,
    render: () => '',
  }); // ↙lower left

  // When rendering, execute
  canvas.on('after:render', () => {
    if (canvas.getActiveObject()) {
      fabric.Object.prototype.controls.mtr.cursorStyle = rotateIcon(
        Number(canvas.getActiveObject().angle.toFixed(2))
      );
      fabric.Object.prototype.controls.mtr2.cursorStyle = rotateIcon(
        Number(canvas.getActiveObject().angle.toFixed(2)) + 90
      );
      fabric.Object.prototype.controls.mtr3.cursorStyle = rotateIcon(
        Number(canvas.getActiveObject().angle.toFixed(2)) + 180
      );
      fabric.Object.prototype.controls.mtr4.cursorStyle = rotateIcon(
        Number(canvas.getActiveObject().angle.toFixed(2)) + 270
      );
    }
  });

  // When rotating, update the rotation control icon in real time
  canvas.on('object:rotating', (event) => {
    const body = canvas.lowerCanvasEl.nextSibling;
    switch (event.transform.corner) {
      case 'mtr':
        body.style.cursor = rotateIcon(Number(canvas.getActiveObject().angle.toFixed(2)));
        break;
      case 'mtr2':
        body.style.cursor = rotateIcon(Number(canvas.getActiveObject().angle.toFixed(2)) + 90);
        break;
      case 'mtr3':
        body.style.cursor = rotateIcon(Number(canvas.getActiveObject().angle.toFixed(2)) + 180);
        break;
      case 'mtr4':
        body.style.cursor = rotateIcon(Number(canvas.getActiveObject().angle.toFixed(2)) + 270);
        break;
      default:
        break;
    } // Set the four-corner rotation cursor
  });
}

export default initControlsRotate;
