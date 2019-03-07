// pages/ceshi/ceshi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wh: 200,
    whs: 0,
    deg: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var v = 750 / res.windowWidth;

        function sz(w) {
          return w / v;
        }
        that.setData({ //兼容不同设备的屏幕
          wh: sz(500),
          whs: sz(676)
        })
        const ntx = wx.createCanvasContext('nCanvas');
        var m = 480; //时间（分）
        var aa = m * 0.25; //时间所对应的度数
        var r = sz(250); //大圆半径
        var x = 2; //控制不规则半圆
        var y = 10; //控制不规则半圆
        var bor = '#fff'; //白色小圆颜色控制
        var hor = '#000'; //黑色小圆颜色控制
        var bcolor = '#000'; //不规则半圆颜色
        if (aa == 180) { //对不规则半圆的处理
          x = 3;
          y = 12 - x;
        } else if (aa < 180) {
          x = 3 + (180 - aa) / 60;
          y = 12 - x;
        } else if (aa > 180) {
          x = 3 + (aa - 180) / 60;
          y = 12 - x;
          bcolor = '#fff';
          bor = '#000';
          hor = '#fff';
          that.setData({
            deg: 180
          })
        }
        var a = 2 * Math.PI / 360 * aa;
        //小圆半径：
        var bb = Math.sqrt(2 * (r * r) - 2 * (r * r) * Math.cos(a)) / 4;
        //大圆圆心到底边距离 
        var dd = Math.sqrt((r * r) - (bb * 2) * (2 * bb));

        ntx.beginPath(); //背景圆
        ntx.setFillStyle(bor);
        // context.setLineWidth(1);
        ntx.arc(sz(250), sz(250), sz(250), 0, 2 * Math.PI, true);
        ntx.fill();
        ntx.closePath();

        var bx = sz(250) - dd; //黑色小圆横坐标
        var by = sz(250) - bb; //黑色小圆纵坐标

        ntx.beginPath(); //黑色小圆
        ntx.setFillStyle(hor);
        ntx.arc(bx, by, bb, 0, 2 * Math.PI, true);
        ntx.fill();
        ntx.closePath();

        var cx = sz(250) + bb; //白色小圆的纵坐标（白色小圆横坐标就是横坐标就是黑色小圆的横坐标）

        ntx.beginPath(); //不规则黑色半圆
        // context.moveTo(150, 150)
        ntx.arc(sz(250), sz(250), sz(250), x * Math.PI / 6, y * Math.PI / 6, false)
        // ntx.arc(100, 100, 100, 4 * Math.PI / 6, 8 * Math.PI / 6, false)
        ntx.setFillStyle(bcolor);
        ntx.fill();
        ntx.closePath();

        ntx.beginPath(); //白色小圆
        ntx.setFillStyle(bor);
        ntx.arc(bx, cx, bb, 0, 2 * Math.PI, true);
        ntx.fill();
        ntx.closePath();

        // var c = bx - (sz(187.5) - dd / 4 * 37.5/100)//通过贝塞尔曲线绘制白色小圆 还在测试中
        // ntx.beginPath()
        // // ntx.setLineWidth=0
        // ntx.moveTo(bx, sz(250))
        // ntx.bezierCurveTo(c, sz(250),c, cx + bb,bx,cx+bb)
        // ntx.setFillStyle(bor)
        // ntx.fill()
        // ntx.closePath();
        // console.log(cx+bb)

        ntx.beginPath(); //白色鱼眼
        ntx.setFillStyle(bor);
        ntx.arc(bx, by, sz(30), 0, 2 * Math.PI, true);
        ntx.fill();
        ntx.closePath();

        ntx.beginPath(); //黑色鱼眼
        ntx.setFillStyle(hor);
        ntx.arc(sz(250), sz(250) + sz(250) / 2, sz(30), 0, 2 * Math.PI, true);
        ntx.fill();
        ntx.closePath();

        ntx.draw();

        //时刻表
        const stx = wx.createCanvasContext('myCanvas');

        stx.beginPath(); //外圈
        stx.setLineWidth(6);
        stx.arc(sz(338), sz(338), sz(270), 0, 2 * Math.PI, true);
        stx.stroke();
        stx.closePath();


        stx.translate(sz(338), sz(338)) //绘制小格
        stx.rotate(-Math.PI / 2);
        for (var i = 0; i < 144; i++) {
          stx.setLineWidth(1);
          stx.beginPath();
          stx.rotate(Math.PI / 72);
          stx.moveTo(sz(260), 0);
          stx.lineTo(sz(270), 0);
          stx.stroke();
        }

        stx.setLineWidth(1.2);
        for (var i = 0; i < 24; i++) { //绘制大格
          stx.beginPath();
          if (i % 2 == 0) {
            //  stx.setFillStyle('red')
          }
          stx.rotate(Math.PI / 12);
          stx.moveTo(sz(254), 0);
          stx.lineTo(sz(270), 0);
          stx.stroke();
          stx.closePath();
        }

        function sizenum() { //绘制外面文字
          stx.beginPath();
          stx.textBaseline = "middle";
          var j = sz(290)
          stx.setFontSize(10);
          stx.rotate(89.52)
          var hours = [18, 19, 20, 21, 22, 23, 24, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
          stx.translate(sz(-8), sz(-1))
          hours.forEach(function(hour, i) {
            var rad = (2 * Math.PI / 24) * i;
            var x = j * Math.cos(rad);
            var y = j * Math.sin(rad);

            if (hour == 10) {
              stx.fillText(hour, x - 1, y - 1);
            } else if (hour == 24) {
              stx.fillText(hour, x - 5, y);
            } else if (hour == 23 || hour == 22) {
              stx.fillText(hour, x - 3, y + 2);
            } else {
              stx.fillText(hour, x, y);
            }
          })
          stx.closePath();
        }

        sizenum();
        stx.draw();

      }

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})