<template>
<div>
  <!-- <DropdownItem :draggable="true" @dragend="onDragend('text')" @click="getFeedImage()"><Icon type="md-keypad" /><span style="margin-left:10px">FeedImage</span></DropdownItem> -->
  <DropdownItem :draggable="true" @dragend="onDragend('rect')"><Icon type="ios-square-outline" /><span style="margin-left:10px">Templates</span></DropdownItem>  
  <Modal
      v-model="modal"
      width="800"
      :styles="{top: '55px'}">
      <template #header>
          <span style="font-weight:bold;font-size:16px !important;">Choose the image</span>
      </template>
      <div>
      <Tabs type="card">
          <TabPane label="Feed images" id="feed-images">
            <Grid square col=4 padding=15px>
                <GridItem>
                  <div><img style="width:100%;height:300px" src="../assets/img/empty.png"/></div>
                </GridItem>
                <GridItem>
                  <div><img style="width:150px;height:300px" src="../assets/img/empty.png"/></div>
                </GridItem>
                <GridItem>
                  <div><img style="width:100%;height:300px" src="../assets/img/empty.png"/></div>
                </GridItem>
                <GridItem>
                  <div><img style="width:100%;height:300px" src="../assets/img/empty.png"/></div>
                </GridItem>                
            </Grid>            
          </TabPane>
          <TabPane label="All images">All images</TabPane>
          <TabPane label="Custome images">Custome images</TabPane>
      </Tabs>
        
      </div>

  </Modal>

</div>

</template>

<script>
import select from '@/mixins/select';
import { downFontByJSON } from '@/utils/utils';
import $ from "jquery";
import axios from 'axios';

export default {
    data () {
        return {
            modal: false
        }
    },
    methods: {
        getFeedImage(){
          this.modal = true;
          // console.dir(document.getElementById("feed-images"))
          // console.dir()
          axios.get('http://localhost:3000/feed-image/feed-image')
            .then(resp => {
                var data = resp.data;
                data.forEach((e ,i)=> {
                  $("#feed-images img")[i].src = data[i].objects[2].src;
                });
            })
            .catch(error => {
                console.log(error);
          });
        },      
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        }
    }
}
</script>
