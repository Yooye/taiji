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
    

    var begin = 0; //睡觉时间，晚上0点
    var end = 6*60; //起床时间，早上6点
    
    const context = wx.createCanvasContext('firstCanvas');
    var tim = 360; //睡觉时间段分钟数，例如：12小时=720分钟
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
    console.log(h)
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

    //贝塞尔曲线黑色小半圆
    // 1，贝塞尔曲线值分析：
    //【记录1】当时间段为12小时(720分钟)的贝塞尔曲线，context.bezierCurveTo(150, (150 + h)+100, 150 - r, (150 + h)+100, 150-r, 150+h)
    //【记录2】当时间段为360分钟的贝塞尔曲线，(150 - 30, (150 + h) + 25, (150 - r) + 30, (150 + h) + 25, 150 - r, 150 + h)

    // 2，结论：
    // （1）起始弧度deg从 0 增大至 Math.PI/4;
          // r从150减少至0
          // h从0增大至150
    // (2)黑色贝塞尔曲线的右侧控制点，逐渐向左下方移动：
            //  x坐标变化  150 ~ 150-30
            // y坐标增大了 100 ~ 25

    // (3)黑色贝塞尔曲线的左侧控制点，逐渐向右下方移动：
            //  x坐标增加了30
            // y坐标增大了25

      //（4）deg每次变化引发的贝塞尔曲线变化为：
      // deg  /  Math.PI/2 = cX? / 60
      

    var cX = deg < Math.PI / 4 ? 100 * (deg / Math.PI) : 50 * (deg / Math.PI);
    var cY = deg < Math.PI / 4 ? 300 * (deg / Math.PI) : 150 * (deg / Math.PI);
    context.beginPath()
    context.moveTo(150, 150+h);
    context.bezierCurveTo(150 - cX, (250 + h) - cY, (150 - r) + cX, (250 + h) - cY, 150 - r, 150 + h)
      context.setFillStyle('blue')
      context.fill()
    context.closePath()

    // // 贝塞尔曲线红色小半圆
    context.beginPath()
    context.moveTo(150, 150 + h)
    context.bezierCurveTo(150, 135 + h, 150 + r, 135 + h, 150 + r, 150 + h)
    context.setFillStyle('red')
    context.fill()
    context.closePath()

    // 
    context.draw()
  },

  caculateTime:function(context,t){ //根据时间段，算出最终需要的红色不规则区域弧度
      // const context = wx.createCanvasContext('firstCanvas');
      var tim = t || 400;
      // 如果用户时间段按整分钟进行划分，一个圆将被分为24小时，也就是24*60分钟，每一分钟的度数为：360/24*60，弧度为：2*Math.PI/24*60

      var redDeg = tim * ((2 * Math.PI) / (24 * 60));

      // 如果我要先画一个正面朝上的红色半圆，该半圆的起始弧度设为deg
      let deg = (Math.PI - redDeg) / 2; //绘制不规则圆的起始弧度
      let R = 150; //大圆半径
      // //小圆直径如下
      var r = Math.sin(deg * Math.PI / 180) * R;
      // //大圆圆心到底边距离 
      var h = Math.cos(deg * Math.PI / 180) * R;
      this.setData({
        changer: r,
        changey: 150 + h,
        blackX: 150 - r / 2,
        redX: 150 + r / 2
      })

      context.beginPath()
      console.log(deg,redDeg)
      // context.moveTo(150, 150)
      context.arc(150, 150, 150, deg, Math.PI-deg, true)
      context.setFillStyle('#000');
      context.fill();
      context.closePath()

      context.beginPath()
      // context.moveTo(150, 150)
      context.arc(150, 150, 150, deg, Math.PI-deg, false)
      context.setFillStyle('red');
      context.fill()
      context.closePath()

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