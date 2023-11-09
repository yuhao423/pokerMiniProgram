
export const apiKey = "f18664f60f1450dcace9598b8d80719f";
const host = "http://127.0.0.1:5000";
export const roomWebsocket = "ws://127.0.0.1:8080/v2/websocket/room/";

export function post(url: string, data: any = {}, loading: boolean = false): Promise<any> {
  if (loading) {
    wx.showLoading({ title: '', mask: true });
  }
  return new Promise((resolve) => {
    wx.request({
      url: host + url,
      data: data,
      method: "POST",
      header: {
        "content-type": "application/x-www-form-urlencoded",
        //  "opneid":'o3VBY5NzLLVcaHmI3uQ3-u4GQHmY',
        "openid": wx.getStorageSync("openid"),
        "apiKey": apiKey
      },
      success: function (res) {
        console.log(res,'true');
        
        var rData: any = res.data;
        console.log(rData,'rdata');
        
        if (rData.code == '10508') {
          console.log('die');
          
          loginAndSaveOpenId().then(() => {
            post(url, data).then((res) => {
              if (loading) {
                wx.hideLoading();
              }
              resolve(res)
            });
          })
        } else {
          if (loading) {
            wx.hideLoading();
          }
          if (!rData.success) {
           
            
            wx.showToast({ title: rData.message, icon: 'none', duration: 3000 })
          } else {
           
            
            resolve(rData.result)
          }
        }
      },
      fail: function () {
        if (loading) {
          wx.hideLoading();
        }
        wx.showToast({ title: '网络异常', icon: 'none', duration: 3000 });
      }
    });
  });
}


export function upload(url: string, filePath: string, fileName: string, data: any = {}): Promise<any> {
  return new Promise((resolve) => {
    wx.uploadFile({
      url: host + url,
      filePath: filePath,
      name: fileName,
      formData: data,
      header: {
        "content-type":"multipart/form-data",
        "openid": wx.getStorageSync("openid"),
        "apiKey": apiKey
      },
      success: function (res) {
        console.log(res,'7979');
        
        var data: any = JSON.parse(res.data);
        console.log(data,'upload data');
        
        if (data.code == '10508') {
          loginAndSaveOpenId().then(() => {
            upload(url, filePath, fileName, data).then((res) => {
              resolve(res)
            });
          })
        } else {
          if (!data.success) {
            wx.showToast({ title: data.message, icon: 'none', duration: 3000 })
          } else {
            resolve(data.result)
          }
        }
      },
      fail: function () {
        wx.showToast({ title: '网络异常', icon: 'none', duration: 3000 });
      }
    });
  });
}



function loginAndSaveOpenId(): Promise<void> {
  return new Promise((resolve) => {
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: host + "/mini/users/getOpenId",
            data: { jscode: res.code },
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded",
              "apiKey": apiKey
            },
            success: function (res) {
              var data: any = res.data;
              if (data.success) {
                wx.setStorageSync("openid", data.result.openid)
                wx.setStorageSync("nickname",data.result.nickname)
                resolve()
              } else {
                wx.showToast({ title: data.message, icon: 'none', duration: 3000 })
              }
            }, fail: function () {
              wx.showToast({ title: '网络异常', icon: 'none', duration: 3000 })
            }
          })
        }
      }
    })
  })
}

export default {
  post,
  upload,
  roomWebsocket,
  apiKey
}