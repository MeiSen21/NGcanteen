const DB = wx.cloud.database().collection("list")
let judge = ""
let image = ""
Page({
  data: {
    judge:"",
    imageUrl: ""

  },

  addJudge(event) {
    // let that = this;  
    // that.setData({
    // const judge = event.detail.value
    //   this.setData({
    //       judge:judge

    //   })
    // })
    judge = event.detail.value
    console.log(judge)
    
  },

  addImage(event) {
    // let that = this;  
    // that.setData({
    // const judge = event.detail.value
    //   this.setData({
    //       judge:judge

    //   })
    // })
    // iamge = event.detail.value
    console.log(event)

  },

  judge() {

    DB.add({
      data: {
        judge:judge,
        image: image
      },
      success(res) {
        console.log("添加成功", res)

      },
      fail(res) {
        console.log("添加失败", res)
      }

    })
  },


  load(){
    let that = this;  
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        // console.log("成功",res)
      
        // console.log(imageUrl)
        // image = res.tempFilePaths[0]
        // that.setData({
        //   imageUrl: image 
        // })
        // image = imageUrl
        // image = res.tempFilePaths[0]
        // console.log(image)
        that.loadShow(res.tempFilePaths[0])
      }
    })
  },

  loadShow(fileUrl) {
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime + 'anbo.png',
      filePath: fileUrl, // 文件路径
      success: res => {
        // get resource ID
        console.log("上传成功", res)
        image = res.fileID
        this.setData({
          imageUrl: res.fileID,
          
        })
        
      },
      fail: err => {
        // handle error
      }
    })
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