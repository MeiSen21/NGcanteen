//index.js
//获取应用实例
const DB = wx.cloud.database()
const app = getApp()
let local =""
let openid=""

Page({
  data: {
    imgurls:[
      {
        
        imgurl:"../image/cai1.jpg",
        url:"",
        id:1

      },
      {
        imgurl:"../image/cai2.jpg",
        url:"",
        id:2
      },
      {
        imgurl:"../image/cai3.jpg",
        url:"",
        id:3
      }
    ],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  cancel: function(){
    local="bei"
    this.setData({
       hidden: true
    });
    console.log(local)
    DB.collection("user").add({
      data: {
        openid:openid,
        local: local
      },
      success(res) {
        console.log("添加成功", res)

      },
      fail(res) {
        console.log("添加失败", res)
      }

    })
  },

  confirm: function(){
    local="dong"
    this.setData({
      hidden: true
    }); 
    console.log(local)
    DB.collection("user").add({
      data: {
        openid:openid,
        local: local
      },
      success(res) {
        console.log("添加成功", res)

      },
      fail(res) {
        console.log("添加失败", res)
      }

    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:"getopenid",
      success(res){
      console.log("获取openid成功",res.result.openid)
         openid=res.result.openid;
         console.log(openid)
      }, 
      fail(res){
        console.log("获取openid失败",res)
           
        },


    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
