// pages/one/one.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changer:100,  //小圆直径，scale放大倍数
    changey:0, //小圆圆心y坐标
    redX:0, //红色小圆圆心x坐标
    blackX:0 //黑色小圆圆心x坐标
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
    

    const context = wx.createCanvasContext('firstCanvas');
    var tim = 300; //睡觉时间段分钟数，例如：12小时=720分钟
    // 如果用户时间段按整分钟进行划分，一个圆将被分为24小时，也就是24*60分钟，每一分钟的度数为：360/24*60，弧度为：2*Math.PI/24*60

    var redDeg = tim * ((2 * Math.PI) / (24 * 60));

    // 如果我要先画一个正面朝上的红色半圆，该半圆的起始弧度设为deg
    let deg = (Math.PI - redDeg) / 2; //绘制不规则圆的起始弧度
    let R = 150; //大圆半径
    // //小圆直径如下
    var r = Math.cos(deg) * R;
    // //大圆圆心到底边距离 
    var h = Math.sin(deg) * R;
    this.setData({
      changer: r,
      changey: 150 + h,
      blackX: 150 - r / 2,
      redX: 150 + r / 2
    })

    context.beginPath()
    // console.log(h)
    // context.moveTo(150, 150)
    context.arc(150, 150, 150, deg, Math.PI - deg, true)
    context.setFillStyle('#000');
    context.fill();
    context.closePath()

    context.beginPath()
    // context.moveTo(150, 150)
    context.arc(150, 150, 150, deg, Math.PI - deg, false)
    context.setFillStyle('red');
    context.fill()
    context.closePath()

    // 基于小圆的左右两个点确定贝塞尔曲线的控制点变量
    var cX = 10 * r / 100;  //贝塞尔曲线控制点x坐标偏移量
    var cY;  //贝塞尔曲线控制点y坐标偏移量
    if(tim<=720&&tim>=600){
      cY = 60;
      console.log(111)
    } else if (tim<600&&tim>=400){
      cY = 35;
      console.log(222)
    } else if(tim<400&&tim>=300){
      cY = 16;
      console.log(333)
    }else if(tim<300&&tim>=200){
      cY = 10;
    }
    context.beginPath()
    context.moveTo(150, 150+h);
    context.bezierCurveTo(150 - cX, (150 + h) + cY, (150 - r) + cX, (150 + h) + cY, 150 - r, 150 + h)
      context.setFillStyle('#000')
      context.fill()
    context.closePath()

    // // 贝塞尔曲线红色小半圆
    context.beginPath()
    context.moveTo(150, 150 + h)
    context.bezierCurveTo(150 + cX, (150 + h) - cY, (150 + r) - cX, (150 + h) - cY, 150 + r, 150 + h)
    context.setFillStyle('red')
    context.fill()
    context.closePath()

    // 
    context.draw()
  },

  // caculateTime:function(context,t){ //根据时间段，算出最终需要的红色不规则区域弧度
  //     // const context = wx.createCanvasContext('firstCanvas');
  //     var tim = t || 400;
  //     // 如果用户时间段按整分钟进行划分，一个圆将被分为24小时，也就是24*60分钟，每一分钟的度数为：360/24*60，弧度为：2*Math.PI/24*60

  //     var redDeg = tim * ((2 * Math.PI) / (24 * 60));

  //     // 如果我要先画一个正面朝上的红色半圆，该半圆的起始弧度设为deg
  //     let deg = (Math.PI - redDeg) / 2; //绘制不规则圆的起始弧度
  //     let R = 150; //大圆半径
  //     // //小圆直径如下
  //     var r = Math.sin(deg * Math.PI / 180) * R;
  //     // //大圆圆心到底边距离 
  //     var h = Math.cos(deg * Math.PI / 180) * R;
  //     this.setData({
  //       changer: r,
  //       changey: 150 + h,
  //       blackX: 150 - r / 2,
  //       redX: 150 + r / 2
  //     })

  //     context.beginPath()
  //     console.log(deg,redDeg)
  //     // context.moveTo(150, 150)
  //     context.arc(150, 150, 150, deg, Math.PI-deg, true)
  //     context.setFillStyle('#000');
  //     context.fill();
  //     context.closePath()

  //     context.beginPath()
  //     // context.moveTo(150, 150)
  //     context.arc(150, 150, 150, deg, Math.PI-deg, false)
  //     context.setFillStyle('red');
  //     context.fill()
  //     context.closePath()

  // },

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