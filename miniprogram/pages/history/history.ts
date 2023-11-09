// pages/history.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showGold:false,
    showGoldDetail:false,
    showOverlay:false,
    showHistoryRecord:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
  onShareAppMessage() {

  },
  onChooseAvatar(e:any){
      this.setData({
        a:e.detail.avatarUrl
      })
  },
  //gold
  getGold(){
    this.setData({
      showGold:true
    })
  },
  getGoldDetail(){
    this.setData({
      showGoldDetail:true,
      showOverlay:true
    })
  
    
  },
  buttontapGoldDetail(e:any){
    console.log(e);
    this.setData({
      showGoldDetail:false,
      showOverlay:false
    })
  },
  //
  getHistoryRecord(){
    this.setData({
      showHistoryRecord:true
    })
  }
})