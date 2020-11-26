// pages/Restaurnt/Restaurnt.js
const DB = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Fid:1,
    Flist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log("让我们看看Fid="+options.Fid);
    that.setData({
      Fid:options.Fid
    })
    this.getFlist(that.data.Fid);


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

  },

  // Flist表单请求模块
  getFlist:function(mark){
    let that=this;
    DB.collection("RealList").where({
      _id:'b3a8af275fbe6116001d2b4a4ed6eb3c'
    }).get({
      success(res){
        console.log("Flist库请求成功",res);
        var Flist11=res.data[0];
        console.log("请求Flist11",Flist11);
        for(let i in Flist11){
          if (i.indexOf(mark)!=-1) {
            console.log(Flist11[i]);
            that.setData({
              Flist:Flist11[i]
            })
            console.log('二次检验:',that.data.Flist);
          }
        }
      },
      fail(res){
        console.log("Flist库请求失败",res)
      }
    })
  },
})