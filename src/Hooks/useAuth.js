import axios from "axios";
import axiosClient from "../axiosClient";

export const useAuthApi=()=>{
    const login = async (values)=>{
        const {data} = await axiosClient.post('/Users/Login' , values)
        return data
    }
       const register = async (values)=>{
        const {data} = await axiosClient.post('/Users/Register' , values)
        return data
    }
         const forgetPassword = async (values)=>{
        const {data} = await axiosClient.post('/Users/Reset/Request' , values)
        return data
    }
         const resetPassword = async (values)=>{
        const {data} = await axiosClient.post('/Users/Reset' , values)
        return data
    }
            const verifyAccount = async (values)=>{
        const {data} = await axiosClient.post('/Users/verify' , values)
        return data
    }



    return {login , register , forgetPassword , resetPassword , verifyAccount}
}