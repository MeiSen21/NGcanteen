// pages/Cai/D1/D1-1L-1D/D1-1L-1D-C1/cai1.js
const DB = wx.cloud.database().collection("judgelist")
var util = require('../../../../../utils/util.js');


let try1={
  id:"",
  src:"",
  text:"添加评价1",
  time: util.formatTime(new Date()),
  score:'9'

}

let List=[
  // {
  //   id:"d1",
  //   src:"",
  //   text:"全局评价1",
  //   time:'2020-11-21',
  //   score:'2'
  // },{
  //   id:"d2",
  //   src:"",
  //   text:"全局评价2",
  //   time:'2012-3-4',
  //   score:'4'
  // }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: "",
    Type:false,
    guanp:{
      src:'',
      text:'官方认为这个菜勉强可以吃，肥牛的味道是好是坏',
      time:'2020-11-22',
      score:'3.5'

    },
    list:[]
   

    },
//评论按钮的显示/隐藏
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

  //图片的选择/上传
  load(){
    let that = this;  
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.loadShow(res.tempFilePaths[0])
      }
    })
  },
  loadShow(fileUrl) {
    wx.cloud.uploadFile({
      cloudPath: Math.random()*50+'anbo.png',
      filePath: fileUrl, // 文件路径
      success: res => {
        // get resource ID
        console.log("上传成功", res)
        try1.src = res.fileID
        this.setData({
          imageUrl: res.fileID,
          
        })
        
      },
      fail: err => {
        // handle error
      }
    })
  },
  tucao(event) { 
  
    try1.text = event.detail.value
    console.log(try1.text )
    
  },

  submitcom:function(){

    
    wx.cloud.callFunction({
      name:"getopenid",
      success(res){
      console.log("获取openid成功",res.result.openid)
         try1.id=res.result.openid;
      console.log("获取openid成功",try1.id)
      }, 
      fail(res){
        console.log("获取openid失败",res)
           
        },


    })
    List.push(try1)

    this.setData({
      list:List

    })

    DB.doc("judge1").update({
      data: {
        // _id:"judge1",
        list:List
      },
      success(res) {
        console.log("添加成功", res)

      },
      fail(res) {
        console.log("添加失败", res)
      }


    })

    let that=this
    wx.cloud.database().collection("judgelist").get({
      success(res){
        console.log("请求成功",res)
        that.setData({
          list:res.data[0].list

          
        })
        List=res.data[0].list
      },
      fail(res){
        console.log("请求失败",res)
      }
    })


    // DB.add({
    //   data: {
    //     _id:"judge1",
    //     list:List
    //   },
    //   success(res) {
    //     console.log("添加成功", res)

    //   },
    //   fail(res) {
    //     console.log("添加失败", res)
    //   }

    // })

    //定义局部变量push进全局变量,进行渲染
   
   
   
  },
  onLoad: function (options) {
    let that=this
    wx.cloud.database().collection("judgelist").get({
      success(res){
        console.log("请求成功",res)
        that.setData({
          list:res.data[0].list

          
        })
        List=res.data[0].list
      },
      fail(res){
        console.log("请求失败",res)
      }
    })

  },


})