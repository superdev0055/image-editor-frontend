import axios from 'axios';

const server_url='http://localhost:3000' ;

export const createUserTemp=(data) =>{
    return axios.post(server_url+'/user/create-template',data);
}

export const updateUserTemp=(id,data) =>{
    console.log(id,data)
    return axios.post(server_url+'/user/update-template/'+id,data);
}

export const getAllUserTemps=() =>{
    return axios.get(server_url+'/user/get-all-templates');
}

export const getUserTempById=(id) =>{
    return axios.get(server_url+'/user/get-specific-template/'+id);
}




export const getAllTemps=() =>{
    return axios.get(server_url+'/demo/get-all-templates');
}

export const getTempById = (id) =>{
    return axios.get(server_url+'/demo/get-specific-template/'+id);
}
