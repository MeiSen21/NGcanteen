// pages/Dian/D1-1L-1D/D1-1L-1D.js
const DB = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Rid:111,
    Tlist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log("让我们看看Rid="+options.Rid);
    that.setData({
      Rid:options.Rid
    })
    this.getTlist(that.data.Rid);

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
    // Tlist表单请求模块
    getTlist:function(mark){
      let that=this;
      DB.collection("RealList").where({
        _id:'typed1d2'
      }).get({
        success(res){
          console.log("Tlist库请求成功",res);
          var Tlist=res.data[0];
          console.log("请求Tlist",Tlist);
          for(let i in Tlist){
            if (i.indexOf(mark)!=-1) {
              console.log(Tlist[i]);
              that.setData({
                Tlist:Tlist[i]
              })
              console.log('二次检验:',that.data.Tlist);
            }
          }
        },
        fail(res){
          console.log("Tlist库请求失败",res)
        }
      })
    }
})