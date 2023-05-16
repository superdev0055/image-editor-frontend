import axios from 'axios';

// const server_url='https://image-editro-backend.onrender.com';
const server_url='http://localhost:3000';

//user template

export const test=() =>{
    return axios.get(server_url+'/test');
}

export const createUserTemp=(data) =>{
    return axios.post(server_url+'/user/create-template',data);
}

export const updateUserTemp=(id,data) =>{
    return axios.post(server_url+'/user/update-template/'+id,data);
}

export const getAllUserTemps=() =>{
    return axios.get(server_url+'/user/get-all-templates');
}

export const getUserTempById=(id) =>{
    return axios.get(server_url+'/user/get-specific-template/'+id);
}

//demo template
export const getAllTemps=() =>{
    return axios.get(server_url+'/demo/get-all-templates');
}

export const getTempById = (id) =>{
    return axios.get(server_url+'/demo/get-specific-template/'+id);
}
export const updateTempName=(id,name) =>{
    return axios.post(server_url+'/user/update-template/'+id,{name:name});
}

// /product/get-preview-image/:id
export const getPreviewImage = (keyword) =>{
    return axios.post(server_url+"/product/get-preview-image/",{keyword:keyword});
}

//get element
export const getAllElements = () =>{
    return axios.get(server_url+'/element/get-all-elements');
}

export const getElementById = (id) =>{
    return axios.get(server_url+'/element/get-specific-element/'+id);
}

export const getShortTags = () =>{
    return axios.get(server_url+'/tags/get-all-tags');
}

export const getCanvasSizes = () =>{
    return axios.get(server_url+'/get-all-canvas-sizes');
}

//get shortTag