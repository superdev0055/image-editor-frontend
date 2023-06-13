export default {
  inject: ['canvas', 'fabric', 'event'],
  data() {
    return {
      mSelectMode: '', // one | multiple
      mSelectOneType: '', // i-text | group ...
      mSelectId: '', // select id
      mSelectIds: [], // select id
    };
  },
  created() {
    this.event.on('selectOne', (e) => {
      if(e[0].type == "group"){
        if(e[0]._objects[1].type == "i-text"){
          this.mSelectMode = 'one';
          this.mSelectId = e[0].id;
          this.mSelectOneType = "i-text";
          this.mSelectIds = e.map((item) => item.id);          
          return;
        }
        if(e[0].customType == "real-group"){
          this.mSelectMode = 'one';
          this.mSelectId = e[0].id;
          this.mSelectOneType = "image";
          this.mSelectIds = e.map((item) => item.id);          
          return;          
        }
        if(e[0].customType == "productImage"){
          this.mSelectMode = 'one';
          this.mSelectId = e[0].id;
          this.mSelectOneType = "image";
          this.mSelectIds = e.map((item) => item.id);          
          return;          
        }        
      }
      this.mSelectMode = 'one';
      this.mSelectId = e[0].id;
      this.mSelectOneType = e[0].type;
      this.mSelectIds = e.map((item) => item.id);
    });

    this.event.on('selectMultiple', (e) => {
      this.mSelectMode = 'multiple';
      this.mSelectId = '';
      this.mSelectIds = e.map((item) => item.id);      
    });

    this.event.on('selectCancel', () => {
      this.mSelectId = '';
      this.mSelectIds = [];
      this.mSelectMode = '';
      this.mSelectOneType = '';
    });
    
  },
  methods: {
    /**
     * @description: Save data data
     * @param {Object} data Room Details Data
     */
    _mixinSelected({ selected }) {
      if (selected.length === 1) {
        const selectItem = selected[0];
        this.mSelectMode = 'one';
        this.mSelectOneType = selectItem.type;
        this.mSelectId = [selectItem.id];
        this.mSelectActive = [selectItem];
      } else if (selected.length > 1) {
        this.mSelectMode = 'multiple';
        this.mSelectActive = selected;
        this.mSelectId = selected.map((item) => item.id);
      } else {
        this._mixinCancel();
      }
    },
    /**
     * @description: Save data data
     * @param {Object} data Save data data
     */
    _mixinCancel() {
      this.mSelectMode = '';
      this.mSelectId = [];
      this.mSelectActive = [];
      this.mSelectOneType = '';
    },
    /**
     * @description: copy to clipboard
     * @param {String} clipboardText copy to clipboard
     */
    _mixinClipboard(clipboardText) {
      this.$copyText(clipboardText, undefined, (error) => {
        if (error) {
          this.$Message.error('error');
        } else {
          this.$Message.success('success');
        }
      });
    },
  }
};
