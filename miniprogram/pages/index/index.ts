// index.ts


// 获取应用实例
const app = getApp<IAppOption>()

import { post, upload } from "../../utils/http"
Page({
  data: {
    //半屏的
    show: false,
    index:0,
    step:['第一步:创建房间','第二步:邀请好友','第三步:转账','第四步:结算'],
    //鼓励一下的
    showPopup:false,
    title:'鼓励一下',
    //用户数据
    userInfo:{
      nickname: '',
      avatar: '',
      species: ''
    },
    menuTop:0
  },
  open: function () {
    this.setData({
        show: true
    })
},
buttontap(e:any) {
  
},
//改变swiper滑块中的current的回调函数
changeIndex(e:any){
    this.setData({
     index:e.detail.current
    })
},
  //
  show(){
    
    this.setData({
      showPopup:true
    })
    
  },
  hide(e:any){
   if(e.target.dataset.out ==='out'){
    this.setData({
      showPopup:false
    })
   }
  
  },
  //close
  close(){
    this.setData({
      showPopup:false
    })
  },
  //第一个生命周期
  onLoad() {
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    console.log(menuButtonObject);
    this.setData({
      menuTop:menuButtonObject.top
    })
  },
 
  
  onLaunch: function() {

  },
 //onshow
onShow(){
  post('/mini/users/getUserInfo').then((res)=>{
    console.log(wx.getStorageSync('openid'));
    console.log(res,'i fuck res');
    this.setData({
      ['userInfo.nickname']:res.nickname,
      ['userInfo.avatar']:res.avatar,
      ['userInfo.species']:res.species,
    })
  })

},

 //修改头像
 onChooseAvatar(e:Object){
    console.log(e.detail.avatarUrl);
    upload('/mini/users/setUserAvatar',e.detail.avatarUrl,'file',{openid:wx.getStorageSync('openid'),avatar:e.detail.avatarUrl}).then((res)=>{
      console.log(res);
      console.log(this,'?????');
      this.setData({
        ['userInfo.avatar']:e.detail.avatarUrl,
      })
    })
 },
//修改昵称
cahngenickname(e:Object){
    console.log(e.detail.value);
    if(e.detail.value.trim() === ''){
      console.log(1);
      wx.showToast({
        title:'输入不能为空',
        icon:'none',
        duration:2000
      })
      this.setData({
        ['userInfo.nickname']:wx.getStorageSync("nickname") || 'lyys'
      })
    }else{
      post('/mini/users/setUserName',{userName:e.detail.value},true).then((res)=>{
        console.log(res);
        wx.setStorageSync("nickname",e.detail.value)
        this.setData({
          ['userInfo.nickname']:e.detail.value,
          
        })
      })
    }
},
//去历史页面
toHistory(){
  wx.navigateTo({
    url: '/pages/history/history'
  })
},
//创建房间
putRoom(){
  wx.navigateTo({
    url: '/pages/yus/yus'
  })
  // post('/mini/room/buildRoom',true).then((res)=>{
  //   console.log(res);
    
  // })
}
})
