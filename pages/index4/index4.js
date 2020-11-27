// pages/index4/index4.js
const DB = wx.cloud.database()
let local="东区"
let year="大一"
let nickname=""
let head_icon=""
let openid=""
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '补充信息',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ChoiceArray:[
      { name:'大一',value:'大一',checked:'true',weight:1},
      { name:'大二',value:'大二',weight:2},
      { name:'大三',value:'大三',weight:3},
      { name:'大四',value:'大四',weight:3},
    ],
    ChoiceArray2:[
      { name:'东区',value:'东区',checked:'true',weight:1},
      { name:'北区',value:'北区',weight:2}
     
    ]

  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  radiochange1: function (e) {
    
    local= e.detail.value;
    console.log(local)


  },
  radiochange2: function (e) {
    year = e.detail.value;
    console.log(year)


  },
  
  formSubmit(){
    DB.collection("user").add({
      data: {
        nickname:nickname,
        head_icon: head_icon,
        _id:openid,
        local: local,
        year: year,
        
       
      },
      success(res) {
        console.log("添加成功", res)
        wx.switchTab({
          url: '../index/index'
        })
      },
      fail(res) {
        console.log("添加失败", res)
      }

    })
    wx.switchTab({
      url: '../index/index'
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "getopenid",
      success(res) {
        console.log("获取openid成功", res.result.openid)
        openid = res.result.openid;
        
        wx.cloud.database().collection('user').where({
          _openid: openid // 填入当前用户 openid
        }).count({
    
          success(res) {
           
            if(res.total)
            
            { console.log("存在该用户", res);
               wx.switchTab({
              url: '../index/index'
            })}
            else{console.log("可登记", res)}
          },
          fail(res) {
            console.log("可登记", res)
           
          }
        })

        // console.log(openid)
      },
      fail(res) {
        console.log("获取openid失败", res)

      },


    })

   
    console.log(openid)
   



    if (app.globalData.userInfo) {
      head_icon = app.globalData.userInfo.avatarUrl;
      nickname = app.globalData.userInfo.nickName;
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {

        head_icon = app.globalData.userInfo.avatarUrl;
        nickname = app.globalData.userInfo.nickName;

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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {


  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})