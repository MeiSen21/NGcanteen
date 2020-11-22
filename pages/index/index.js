const DB = wx.cloud.database().collection("list")
let name =""
let age = ""
let image = ""


Page({
  data:{
    imageUrl:"",
    imageUrl1:"cloud://test-s5jxa.7465-test-s5jxa-1304293671/function getTime() { [native code] }anbo.png"
  },

addName(event){
  
  name = event.detail.value
},
addAge(event) {

    age = event.detail.value
},

addImage(event){
console.log(event)

},



  load(){
    console.log("点击了上传")
    let that=this;  
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
       console.log("选择成功",res )

       that.loadShow(res.tempFilePaths[0])
      }
    }) 
  },

  loadShow(fileUrl){
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime+'anbo.png',
      filePath: fileUrl, // 文件路径
      success: res => {
        // get resource ID
        console.log("上传成功",res)

        this.setData({
          imageUrl:res.fileID,
          image: res.fileID
        })
      },
      fail: err => {
        // handle error
      }
    })
  },


    judge() {
      
    DB.add({
      data: {
        name: name,
        age: age,
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
})
