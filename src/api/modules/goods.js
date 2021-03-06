/*
 * @Author: xch
 * @Date: 2020-08-30 01:22:39
 * @LastEditTime: 2020-09-15 03:08:39
 * @LastEditors: Chenhao Xing
 * @FilePath: \epdemoc:\wamp64\www\vue-frame\src\api\modules\goods.js
 * @Description:推广商品API
 */

export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
    // 上传商品表格信息
    GOODS_UPLOAD_EXCEL(data = {}) {
        return request({
            url: process.env.VUE_APP_AJAX_URL + '/goods/uploadExcel',
            method: 'post',
            data
        })
    },
    // 查询信息
    GOODS_SELECT(data = {}) {
        return request({
            url: process.env.VUE_APP_AJAX_URL + '/goods/selectGoods',
            method: 'post',
            data
        })
    },
    GOODS_GET_SPEED() {
        return request({
            url: process.env.VUE_APP_AJAX_URL + '/goods/getSpeed',
            method: 'get'
            // data
        })
    }

})

