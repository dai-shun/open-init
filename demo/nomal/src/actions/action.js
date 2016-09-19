/**
 * Created by daishun on 2016/9/19.
 */
import $ from 'jquery';
/*
同步action
 */
export function setAppList(data) {
    return{
        type:"SET_APPLIST",
        data:data
    }
}
/*
异步action
 */
export function queryAppList() {
    return function(dispatch,getState){
        $.getJSON('/openAdmin/app/appList.do',function(data){
            dispatch(setAppList(data));
        })
    }
}
