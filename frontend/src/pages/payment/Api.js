import axios from "axios";
import basename from "../Home/basename.js";

export const api = axios.create({
  baseURL: basename,
  headers: {
    "Content-type": "application/json"
  }
});
export default class ApiService{
  static saveStripeInfo(data={}){
    return api.post(`${basename}/auth/api/payment/save-stripe-info/`, data)
  }
}