import EventEmitter from 'events';
class EventHandle extends EventEmitter {
  init(handler) {
    this.handler = handler;
    this.handler.on('selection:created', (e) =>{
      this._selected(e);
    })
    this.handler.on('selection:updated', (e) => this._selected(e));
    this.handler.on('selection:cleared', (e) =>{
      this._selected(e);
    })
  }

  // Expose single-select multi-select events

  _selected() {
    const actives = this.handler.getActiveObjects();
    if (actives && actives.length === 1) {
      this.emit('selectOne', actives);
    } else if (actives && actives.length > 1) {
      this.mSelectMode = 'multiple';
      this.emit('selectMultiple', actives);
    } else {
      this.emit('selectCancel');
    }
  }
}

export default EventHandle;
