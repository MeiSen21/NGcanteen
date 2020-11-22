const DB = wx.cloud.database().collection("list")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:[]

  },

  getData(){
    let that=this
    wx.cloud.database().collection("list").get({
      success(res){
        console.log("请求成功",res)
        that.setData({
          datalist:res.data

        })
      },
      fail(res){
        console.log("请求失败",res)
      }
    })

  },
 
  
})