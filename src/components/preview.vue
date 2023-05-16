<template>
    <div>
        <Loader :active="loaderActive" style="margin-left:40%;margin-top:200px"/>
        <div class="row d-flex justify-content-center">
            <div class="row">
                <div class="ivu-space ivu-space-horizontal ivu-space-center row">
                    <div class="col-1"></div>

                    <div class="ivu-space-item col-2">
                        <h5 style="font-weight: bold;">Preview</h5>
                    </div>

                    <div class="ivu-space-item col-3">
                        <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type-text" style="width: auto;">
                            <button class="ivu-btn ivu-btn-text ivu-btn-large" type="button">
                                <p class="refresh-btn" @click="showPreview"><Icon type="md-sync" />Refresh</p>
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
            getShortTags().then((tags)=>{
                getPreviewImage(this.keyword).then((res)=>{
                    this.product_images = res.data;
                }).then((result)=>{
                    this.product_images.forEach(async (item,index)=>{
                        var first_product_image =  item;
                        if(first_product_image!=null){
                            await this.canvas.editor.changeProductImageLists(first_product_image,tags.data,index);
                        }
                    });
                });   
            });
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
    .Heading--md, .Modal--confirm h5 {
        font-family: Lato Bold;
        line-height: 20px;
        padding-top: 2px;
        padding-bottom: 2px;
        margin-bottom: 0!important;
    }  
</style>

<script>

</script>