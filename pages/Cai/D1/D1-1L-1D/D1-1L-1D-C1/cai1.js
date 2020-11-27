// pages/Cai/D1/D1-1L-1D/D1-1L-1D-C1/cai1.js
const DB = wx.cloud.database().collection("RealList")
var util = require('../../../../../utils/util.js');
let try1={
  Fid:11,
  Jid:11101001,
  Rid:111,
  Tid:11101,
  src:"",
  Jtext:"添加评价1",
  Time: util.formatTime(new Date()),
  Jcomment:'不会再吃了',
  Jweight:3

}
let List=[]
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Jlist:[],
    Tid:11101,
    imageUrl: "",
    Type:false,
    // Weight是评价对应的权重 Comment是对应评价位置先放在这里 但后续肯定要换地方
    // 放到云端里和每个数据对象绑在一起 
    Weight:4,
    Comment:'',


    guanp:{
      src:'',
      text:'官方认为这个菜勉强可以吃，肥牛的味道是好是坏',
      time:'2020-11-22',
      score:'3.5'

    },
    ChoiceArray:[
      {name:'一直吃',value:'还会一直吃',checked:'true',weight:1},
      {name:'偶尔吃',value:'还会偶尔吃',weight:2},
      {name:'不吃',value:'再也不会吃',weight:3},
    ]
    },
    // 获取单选框按钮状态 并且设置对应权重
    // 权重越低 排序越优先
    radiochange:function(e){
    var usevalue=e.detail.value;
    // var Weight,Comment;
    if (usevalue.indexOf("一直")==0) {
      try1.Jweight=1;
      try1.Jcomment='还会一直吃';

    }else if(usevalue.indexOf("偶尔")==0){
      try1.Jweight=2;
      try1.Jcomment='还会偶尔吃';

    }else if(usevalue.indexOf("不")==0){
      try1.Jweight=3;
      try1.Jcomment='再也不会吃';

    }
    console.log(usevalue);
    // this.setData({
    //   Weight:Weight,
    //   Comment:Comment
    // })

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
  
    try1.Jtext = event.detail.value
    console.log(try1.Jtext )
    
  },

  submitcom:function(){
    console.log('添加数据之前的List数组',List);
    console.log('添加数据时的try1对象',try1);
    List.push(try1);
    console.log('添加数据过后的List数组',List);
    var x='Jlist'+this.data.Tid;
    console.log('组合更新的数组id=',x);
    this.setData({
      Jlist:List
    })
    DB.doc('jude111h2h3').update({
      data: {
        // _id:"judge1",
        Jlist11101:List
      },
      success(res) {
        console.log("添加成功", res)

      },
      fail(res) {
        console.log("添加失败", res)
      }
    })
    let that=this
    wx.cloud.database().collection("RealList").where({
      _id:'jude111h2h3'
    }).get({
      success(res){
        console.log("请求成功",res)
        var Jlist=res.data[0];
          console.log("请求Jlist",Jlist);
          for(let i in Jlist){
            if (i.indexOf(that.data.Tid)!=-1) {
              console.log(Jlist[i]);
              List=Jlist[i];
              that.setData({
                Jlist:Jlist[i]
              })
              console.log('二次检验:',that.data.Jlist);
            }
          }
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
    //拿去上级页面传递的Tid
    let that=this;
    console.log("让我们看看Tid="+options.Tid);
    that.setData({
      Tid:options.Tid
    })
    // this.getTlist(that.data.Rid);

    //拿去用户id为特异性排序做准备
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
    //加载请求数据库并拉到本地
    wx.cloud.database().collection("RealList").where({
      _id:'jude111h2h3'
    }).get({
      success(res){
        console.log("Jlist请求成功",res)
        var Jlist=res.data[0];
          console.log("请求Jlist",Jlist);
          for(let i in Jlist){
            if (i.indexOf(that.data.Tid)!=-1) {
              console.log(Jlist[i]);
              List=Jlist[i];
              that.setData({
                Jlist:Jlist[i]
              })
              console.log('二次检验:',that.data.Jlist);
            }
          }
      },
      fail(res){
        console.log("请求失败",res)
      }
    })

  },



})