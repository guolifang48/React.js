import axios from "axios";
import fetch from "unfetch";
import * as api from "./index";
import { postApi, getApi } from "./";

const host_address = api.getHostAddress();
const apiUrl = `${host_address}/api/seller`;

export const get_chatting_users = (info, callback) => {
    const url = `${apiUrl}/get_chatting_users`;
    postApi(url, info, callback);
}

export const get_chat_history_by_user = (info, callback) => {
    const url = `${apiUrl}/get_chat_history_by_user`;
    postApi(url, info, callback);
}

export const get_unread_chat_count = (info, callback) => {
	const url = `${apiUrl}/get_unread_chat_count`;
    postApi(url, info, callback);
}

export const get_all_unread_chat_history = (info, callback) => {
	const url = `${apiUrl}/get_all_unread_chat_history`;
    postApi(url, info, callback);
}

export const add_chat = (info, callback) => {
	const url = `${apiUrl}/add_chat`;
    postApi(url, info, callback);
}

export const set_chat_read = (info, callback) => {
    const url = `${apiUrl}/set_chat_read`;
    postApi(url, info, callback);
}

export const get_unread_chat_count_by_user = (info, callback) => {
    const url = `${apiUrl}/get_unread_chat_count_by_user`;
    postApi(url, info, callback);
}

//made by somi

//profile

export const get_profile_info = (info, callback) => { 
    const url = `${apiUrl}/get_profile_info`;  //new
    getApi(url,info,callback);
}
export const update_profile = (info, callback) => { 
    const url = `${apiUrl}/update_profile_info`;
    postApi(url, info, callback);
}
//dashboard
export const get_all_month_data = (info, callback) => { 
    const url = `${apiUrl}/get_all_month_data`;
    postApi(url, info, callback);
}

export const get_all_year_data = (info, callback) => { 
    const url = `${apiUrl}/get_all_year_data`;
    postApi(url, info, callback);
}

export const get_all_day_data = (info, callback) => { 
    const url = `${apiUrl}/get_all_day_data`;
    postApi(url, info, callback);
}
//category
export const get_store_category = (info, callback) => {  //made by somi
    var url = `${apiUrl}/get_all_categories`;
    getApi(url, info ,callback);
}
export const get_product_category = (info,callback) => { //made by somi
    var url = `${apiUrl}/get_all_categories`;
    getApi(url, info ,callback);
}

export const get_store_sub_category = (info,callback) => { //made by somi
    var url = `${apiUrl}/get_store_sub_category`;
    getApi(url, info ,callback);
}

//store api
export const get_all_store = (info, callback) => { 
	const url = `${apiUrl}/get_all_stores`;
    getApi(url, info ,callback);
}
export const edit_store = (info , callback) => {
    const url = `${apiUrl}/update_store`;
    postApi(url, info, callback);
}
export const add_store = (info , callback) => {
    const url = `${apiUrl}/add_store`;
    postApi(url, info, callback);
}

export const get_store_by_id = (info,callback) => {
    const url = `${apiUrl}/get_store_by_id`;
    getApi(url,info, callback);
}

export const delete_store_by_id = (info,callback) => {
    const url = `${apiUrl}/delete_store_by_id`;
    postApi(url,info,callback);
}

//product api
export const get_all_product = (info, callback) => { 
    const url = `${apiUrl}/get_all_products`;
    getApi(url,info,callback);
}
export const get_product_by_id = (info,callback) => {
    const url = `${apiUrl}/get_product_by_id`;
    getApi(url,info ,callback);
}
export const update_product_by_id = (info , callback) => {
    const url = `${apiUrl}/update_product`;
    postApi(url, info, callback);
}
export const add_product = (info , callback) => {
    const url = `${apiUrl}/add_product`;
    postApi(url, info, callback);
}

export const delete_product_by_id = (info, callback) => {
    const url = `${apiUrl}/delete_product`;
    postApi(url, info , callback);
    //getApi(url, callback);
}

//transactions
export const get_all_transactions = (info, callback) => { 
    const url = `${apiUrl}/get_all_transactions`;
    postApi(url, info, callback);
}

//fee
export const get_all_fee = (info, callback) => { 
    const url = `${apiUrl}/get_all_fee`;
    postApi(url, info, callback);
}

export const update_fee_by_id = (info, callback) => {
    const url = `${apiUrl}/update_fee_by_id`;
    postApi(url, info, callback);
}
export const delete_fee_by_id = (id, callback) => {
    const url = `${apiUrl}/delete_fee_by_id?id=` + id;
    // getApi(url, callback);
}
export const add_fee = (info , callback) => {
    const url = `${apiUrl}/add_fee`;
    postApi(url, info, callback);
}

//orders api
export const get_all_orders_in_store = (info, callback) => {
    const url = `${apiUrl}/get_all_orders_in_store`;
    postApi(url, info, callback);
}

export const set_order_status = (info, callback) => {
	const url = `${apiUrl}/set_order_status`;
	postApi(url, info, callback);
}

//notification
export const get_all_notification = (info, callback) => {
    const url = `${apiUrl}/get_all_notifications`;
    postApi(url, info, callback);
}
export const get_unread_notification_count = (info, callback) => {
    const url = `${apiUrl}/get_unread_notifications_count`;
    postApi(url, info, callback);
}
