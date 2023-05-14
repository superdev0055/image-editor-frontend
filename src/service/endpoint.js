import axios from 'axios';

const server_url='https://localhost:5000';

//user template

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
