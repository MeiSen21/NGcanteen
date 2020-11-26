//index.js
//获取应用实例
const DB = wx.cloud.database()
const app = getApp()
let local =""
let openid=""

Page({
  data: {
    currentIndex:0,
    Firstfloor:'东一一楼',
    Secondfloor:'东二二楼',
    hotList: [
      {
        coverImg: 'http://i2.hdslb.com/bfs/archive/1239539a2f262d933bca7c2c1e290139420ba76a.jpg_320x200.jpg',
        title: '【乐正绫】《华夏之章》【小旭PRO】【绛舞乱丸】',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av1'
      },
      {
        coverImg: 'http://i1.hdslb.com/bfs/archive/ecce95b426faf188e6c28f9d3a0bdc63c5a72bb3.jpg_320x200.jpg',
        title: '【斗图歌】装逼不如斗图',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av2'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/archive/11bf8d41fffcad31976317760e301e2db64be8c8.png_320x200.png',
        title: '【胖胖球】【双子星】【獒龙】荒岛 - El transcurrir de las horas',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av3'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/archive/e73a92b0ed615b4d6568888906d09f84d0835674.jpg_320x200.jpg',
        title: '撩人净土系列【红菱歌舞伎初音】极乐净土【大神犬PV付】MME配布',
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
  //导航切换函数
  switchNav:function(e){
    var id=e.target.id;
    if (this.data.currentIndex==id) {
      return false;
    }else{
      if (id==0) {
        // 目前这个id只传递了一层关系 >食堂楼层 没法继续按这个id索引店铺和食物和评价关系
        // 参考这个思路 写出一个完整的传递关系 和依赖变量 
        // 赋值数据从数据库中调用
        this.setData({
          currentIndex:id,
          Firstfloor:'东一一楼',
          Secondfloor:'东一二楼'
        });
      }else if (id==1) {
        this.setData({
          currentIndex:id,
          Firstfloor:'东二一楼',
          Secondfloor:'东二二楼'
        });
      }else if (id==2) {
        this.setData({
          currentIndex:id,
          Firstfloor:'北一一楼',
          Secondfloor:'北一二楼'
        });
      }else if (id==3) {
        this.setData({
          currentIndex:id,
          Firstfloor:'北二一楼',
          Secondfloor:'北二二楼'
        });
      }
      
      console.log(this.data.currentIndex);
    }

  },

  onLoad: function () {
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
