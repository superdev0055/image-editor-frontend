<template>
    <div class="row d-flex justify-content-center">
        <div class="row">
            <div class="ivu-space ivu-space-horizontal ivu-space-center row">
                <div class="col-1"></div>
                <div class="ivu-space-item col-2">
                    <h6 style="color: rgb(226, 253, 255);font-weight: bold;">Preview</h6>
                </div>
                <div class="ivu-space-item col-3">
                    <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text" style="width: auto;">
                        <button class="ivu-btn ivu-btn-text ivu-btn-large" type="button">
                            <p style="color: rgb(61, 210, 255);" @click="showPreview"><Icon type="md-sync" /> Refresh</p>
                        </button>
                    </div>
                </div>
                <div class="ivu-space-item col-6">
                    <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text" style="width: 100%">
                        <i class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
                        <input autocomplete="off" v-model="keyword" spellcheck="false" type="text" class="ivu-input ivu-input-default ivu-input-with-prefix" placeholder="Search phrase">
                        <span class="ivu-input-prefix">
                            <Icon type="ivu-icon ivu-icon-ios-search" />
                        </span>
                    </div>
                </div>
                <br />
            </div>
        </div>
        <hr style="margin: 10px 0px;"/>
        <div class="col-md-11">
            <div
                id="main"
                class="template-content"
                v-for="(item, index) in product_images"
                :key="index"
                >
                <div class="row">
                    <div class="col-10">
                        <div class="font-s">{{item.title}}</div>
                        <div class="font-s">{{item.id}}</div>
                        <div class="font-s">{{item.brand}}</div>
                    </div>
                    <div class="col-2">
                        <button class="ivu-btn ivu-btn-text ivu-btn-large ivu-btn-circle ivu-btn-icon-only" type="button">
                            <Icon type="ios-information-circle-outline" />
                        </button>
                    </div>
                </div>
                <div class="image-size mt-2">
                    <img class="ivu-image-img" alt="" :id="'preview'+index" src="@/assets/img/preview.png" loading="eager">
                </div>
                <hr style="margin: 10px 0px;"/>                

            </div>              
        </div>       
        <hr />   
    </div> 
</template>
<script>
import select from '@/mixins/select';
import {getPreviewImage} from "@/service/endpoint.js"
export default {
  name: 'ToolBar',
  mixins: [select],
  props:['list'],
  data() {

    return{
        keyword:'',
        product_images:'',
    }

  },
  created() {
     
  },  
  mounted(){
    this.product_images = [1,2,3,4,5];
  },
  methods: {

    showPreview(){

        getPreviewImage(this.keyword).then((res)=>{
            this.product_images = res.data;
        }).then((result)=>{
            this.product_images.forEach(async (item,index)=>{

                var first_product_image =  item;
                if(first_product_image!=null){
                    await this.canvas.editor.changeProductImageLists(first_product_image,index);
                }

            });
    });     


           
    },
  },
};
</script>

<style>
    #preview1 {
      max-height: 600px;
      max-width: 600px;
      object-fit: cover;        
    }
    .Heading--md, .Modal--confirm h5 {
        font-family: Lato Bold;
        /* font-size: 16px; */
        /* color: rgb(226, 253, 255); */
        color: white;
        line-height: 20px;
        padding-top: 2px;
        padding-bottom: 2px;
        margin-bottom: 0!important;
    }

</style>
<script>

</script>