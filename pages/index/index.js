//index.js
//获取应用实例
const DB = wx.cloud.database()
const _ = DB.command
const app = getApp()
let local =""
let openid=""

Page({
  data: {
    currentIndex:0,
    Clist:[

    ],
    Firstfloor:'东一一楼',
    Secondfloor:'东二二楼',
    hotList: [
      {
        coverImg: '',
        title: '东一',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av1'
      },
      {
        coverImg: '',
        title: '东二',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av2'
      },
      {
        coverImg: '',
        title: '北一',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av3'
      },
      {
        coverImg: '',
        title: '北二',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av4'
      }
    ],
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

  // cancel: function(){
  //   local="bei"
  //   this.setData({
  //      hidden: true
  //   });
  //   console.log(local)
  //   DB.collection("user").add({
  //     data: {
  //       openid:openid,
  //       local: local
  //     },
  //     success(res) {
  //       console.log("添加成功", res)

  //     },
  //     fail(res) {
  //       console.log("添加失败", res)
  //     }

  //   })
  // },

  // confirm: function(){
  //   local="dong"
  //   this.setData({
  //     hidden: true
  //   }); 
  //   console.log(local)
  //   DB.collection("user").add({
  //     data: {
  //       openid:openid,
  //       local: local
  //     },
  //     success(res) {
  //       console.log("添加成功", res)

  //     },
  //     fail(res) {
  //       console.log("添加失败", res)
  //     }

  //   })
  // },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //导航切换函数 数据实时从数据库拉取
  switchNav:function(e){
    var id=e.target.id;
    if (this.data.currentIndex==id) {
      return false;
    }else{
      if (id==0) {
        this.getClist(0);
      }else if (id==1) {
        this.getClist(1);
      }else if (id==2) {
        this.getClist(2);
      }else if (id==3) {
        this.getClist(3);
      }
      
      console.log(this.data.currentIndex);
    }

  },

  onLoad: function () {
    this.getClist();

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
  },
// Clist表单请求模块
  getClist:function(mark){
    mark++;
    let that=this;
    DB.collection("RealList").where({
      _id:'fc5ac5c95fbe59f8003df452635e58dd'
    }).get({
      success(res){
        console.log("Clist库请求成功",res);
        var Clist1=res.data[0];
        console.log("请求Clist1",Clist1);
        for(let i in Clist1){
          if (i.indexOf(mark)!=-1) {
            console.log(Clist1[i]);
            that.setData({
              currentIndex:mark-1,
              Firstfloor:Clist1[i][0].Fname,
              Fid1:Clist1[i][0].Fid,
              Secondfloor:Clist1[i][1].Fname,
              Fid2:Clist1[i][1].Fid
            })
          }
        }
      },
      fail(res){
        console.log("Clist库请求失败",res)
      }
    })
  },
  Jump2:function () {
    wx.navigateTo({
      url: '../Restaurnt/Restaurnt?Fid='+this.data.Fid1,
    })
  }

  


})
