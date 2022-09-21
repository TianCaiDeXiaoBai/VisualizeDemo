/*
 * @Author: wujian
 * @Date: 2022-08-12 09:02:30
 * @LastEditors: wujian
 * @LastEditTime: 2022-09-03 22:26:45
 * @FilePath: \web_3d_case\cases\src\utils\utils.js * @Description: 
 * @email: 281919544@qq.com
 * Copyright (c) 2022 by wujian 281919544@qq.com, All Rights Reserved. 
 */


/**
 * 时间戳格式化函数
 * @author: wujian
 * @param  {string} format    格式 yyyy-MM-dd hh:mm:ss
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 */
export const formatDate = (timestamp, format) => {
    var date = new Date(timestamp)
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(format)) {
            let str = o[k] + '';
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return format;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

/**
 * @author: wujian
 * @description: 
 * @return {*}
 */
export const getWeekDate = () => {
    var now = new Date();
    var day = now.getDay();
    var weeks = new Array(
        "周日",
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六"
    );
    var week = weeks[day];
    return week;
}

export const qiniuUrl = 'https://qiniu3d.hfwujian.cn/' 