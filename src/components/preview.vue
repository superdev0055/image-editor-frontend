<template>
    <div>
        <Loader :active="loaderActive" style="margin-left:40%;margin-top:200px"/>
            <div class="row">
                <div class="ivu-space-center row" >
                    <div class="ivu-space-item col-3" style="margin-left:10px">
                        <h6 style="font-weight: bold;">Preview</h6>
                    </div>

                    <div class="ivu-space-item col-5">
                        <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text" style="width: 100%">
                            <i class="ivu-icon ivu-icon-ios-loading ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
                            <input autocomplete="off" v-model="keyword" spellcheck="false" type="text" class="ivu-input ivu-input-default ivu-input-with-prefix" placeholder="Search phrase">
                            <span class="ivu-input-prefix">
                                <Icon type="ivu-icon ivu-icon-ios-search" />
                            </span>
                        </div>
                    </div>

                    <div class="ivu-space-item col-3">
                        <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text" style="width: auto;">
                            <p class="refresh-btn ivu-btn ivu-btn-text ivu-btn-normal" @click="showPreview"><Icon type="md-sync" />Refresh</p>
                        </div>
                    </div>

                    <br />
                </div>
            </div>
            <hr style="margin: 10px 0px;"/>
            <div>
                <div
                    style="padding:10px"
                    id="main"
                    class="template-content"
                    v-for="(item, index) in product_images"
                    :key="index"
                    >
                    <div class="row">
                        <div class="col-10">
                            <div class="font-s">{{item.brand}}</div>
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
import {getPreviewImage,getShortTags} from "@/service/endpoint.js";
import Loader from "./loader.vue";
export default {
    name: 'ToolBar',
    mixins: [select],
    components:{
        Loader,
    },
    data() {

        return{
            keyword:'',
            product_images:'',
            loaderActive: false,
        }

    },

  created() {
     
  },

  mounted(){
    this.product_images = [1,2,3,4,5];
  },

  methods: {
    showPreview(){
        this.loaderActive = true;

        getShortTags().then((tags)=>{
            getPreviewImage(this.keyword).then((res)=>{
                this.product_images = res.data;
            }).then(()=>{
                this.product_images.forEach(async (item,index)=>{
                    var first_product_image =  item;
                    if(first_product_image!=null){
                        await this.canvas.editor.changeProductImageLists(first_product_image,tags.data,index);
                    }
                });
            });   
        });
        setTimeout(() => {
          this.loaderActive = false;
        }, 7000);
    },
    }
};
</script>
<style scoped>
    .refresh-btn{
        color: #fff;
        border-color: #0053b8 !important;
        background-color: #0053b8 !important;
        padding: 5px 10px !important;
        border-radius: 8px;       
    }

</style>

<script>

</script>