const wsurl = 'ws://127.0.0.1:5000'
const yu = 'sdr'
import { post, roomWebsocket, apiKey } from "../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:'https://yuyuss.asia/boge.png',
    roomId:undefined,
    websocket:'',
    io:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(param:any) {
    //ws://127.0.0.1:5000/**/**/websockets?id=serser
  //  let io = wx.connectSocket({url:'ws://127.0.0.1:8080/'})
  //  this.setData({
  //    io
  //  })
  //roomWebsocket:ws://127.0.0.1:8080/v2/websocket/room/
  wx.connectSocket({
    url:roomWebsocket + 'uuid' +'?apiKey=' +'yu',
    success(res){
      console.log(res);
      
    },
    fail(err){
      console.log(err);
      
    }
  })
  },
  testMessage(e:any){
    console.log(e);
    
    wx.sendSocketMessage({
      data:'转账给用户'+'id1'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(opts): WechatMiniprogram.Page.ICustomShareContent {
    console.log(opts.target)
    return {}
  }
})