// pages/Cai/D1/D1-1L-1D/D1-1L-1D-C1/cai1.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    Type:false,
    guanp:{
      src:'',
      text:'官方认为这个菜勉强可以吃，肥牛的味道是好是坏',
      time:'2020-11-22',
      score:'3.5'

    },
    list:[
      {
        id:"d1",
        src:"",
        text:"草 这也是人吃的东西啊  官方什么吊推荐 误导老子",
        time:'2020-11-21',
        score:'2'
      },{
        id:"d2",
        src:"",
        text:"还好吧没有那么难吃",
        time:'2012-3-4',
        score:'4'
      }
    ]
   

    },
    OpenType: function(){
      console.log(this.data.Type)
      if (this.data.Type==false) {
        console.log('show')

        this.setData({
          Type:true
        })
      }else{
        console.log('hide')

        this.setData({
          Type:false
        })
      }
     
  },
  submitcom:function(){
    var try1={
      id:"d3",
      src:"",
      text:"我i独好iu都会哇哈丢啊核对后",
      time:'2020-9-9',
      score:'9'

    }
    console.log(try1)
    this.data.list.push(try1)
    console.log(this.data.list)
    this.onLoad()

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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