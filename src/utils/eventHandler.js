import EventEmitter from 'events';

class EventHandle extends EventEmitter {
  init(handler) {
    this.handler = handler;
    this.handler.on('selection:created', (e) =>{
      this._selected(e);
    })
    this.handler.on('selection:updated', (e) => this._selected(e));
    this.handler.on('selection:cleared', (e) =>{
      console.log("ffffffff");
      this._selected(e);
    })
  }

  // Expose single-select multi-select events

  _selected() {
    const actives = this.handler.getActiveObjects();
    if (actives && actives.length === 1) {
      console.log("one")
      this.emit('selectOne', actives);
    } else if (actives && actives.length > 1) {
      this.mSelectMode = 'multiple';
      this.emit('selectMultiple', actives);
    } else {
      console.log("ddddddd")
      this.emit('selectCancel');
    }
  }
}

export default EventHandle;
