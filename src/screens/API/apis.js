import React from "react";
import { API } from "./constant";
import { getRequest } from "./axiosMethod";
import { setProducts, setSingleProduct } from "../Redux_Toolkit/slice/productSlice";
import { setCarts, setSingleCart } from "../Redux_Toolkit/slice/cartsSlice";

//PRODUCTS
export const AllProductApi = ({setLoading, setError}) => {
    const url = `${API.ALLPRODUCTS}`;
    return(dispatch)=>{
      getRequest(url)
      .then((res) => {
        if (res?.data?.products) {
          dispatch(setProducts(res?.data?.products));
          setLoading(false);
        } else {
          console.log('There is no data');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log('There is an error:', error);
        setError(error);
        setLoading(false);
      });
    } 
};

export const SingleProductApi = ({productId, setLoading, setError}) => {
  const url = `${API.ALLPRODUCTS}/${productId}`;
  return(dispatch)=>{
    getRequest(url)
    .then((res) => {
      if (res?.data) {
        dispatch(setSingleProduct(res?.data));
        setLoading(false);
      } else {
        console.log('There is no data');
        setLoading(false);
      }
    })
    .catch((error) => {
      console.log('There is an error:', error);
      setError(error);
      setLoading(false);
    });
  } 
};

//CARTS
export const AllCartApi = ({setLoading, setError}) => {
  const url = `${API.ALLCARTS}`;
  console.log(url, 158)
  return(dispatch)=>{
    getRequest(url)
    .then((res) => {
      console.log(res?.data?.carts, 56)
      if (res?.data?.carts) {
        dispatch(setCarts(res?.data?.carts));
        setLoading(false);
      } else {
        console.log('There is cart list');
        setLoading(false);
      }
    })
    .catch((error) => {
      console.log('There is an error:', error);
      setError(error);
      setLoading(false);
    });
  } 
};

export const SingleCartApi = ({cartId, setLoading, setError}) => {
  const url = `${API.ALLCARTS}/${cartId}`;
  console.log(url, 143)
  return(dispatch)=>{
    getRequest(url)
    .then((res) => {
      if (res?.data) {
        dispatch(setSingleCart(res?.data));
        setLoading(false);
      } else {
        console.log('There is no data');
        setLoading(false);
      }
    })
    .catch((error) => {
      console.log('There is an error:', error);
      setError(error);
      setLoading(false);
    });
  } 
};
