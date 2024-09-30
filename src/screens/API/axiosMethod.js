import axios from "axios";
import React from "react";

export const getRequest = async(url)=>{
   const header = {
    headers:{
      'Content-Type': 'application/json',
      Accept: '*/*'
    }
   };
   return axios.get(url, header);
};

export const postRequest = async (url,data) =>{
  const header = {
    headers: {
      'Content-Type' : 'application/json',
      Accept:'*/*'
    }
  };
  return axios.post(url,data,header);
}

export const patchRequest = async (url, data) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`
      }
    };
    return axios.patch(url, data, header);
  };

export const deleteRequest = async (url) => {
    const header = {
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: `Bearer ${token}`
      }
    };
    return axios.delete(url, header);
};
