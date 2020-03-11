<template>
  <div>
    <p @click="kk">返回</p>
    <p>这里是跳转页面测试</p>
    <van-button>测试</van-button>
    <button open-type="contact" bindcontact="handleContact">客服</button>
    <button @click="ff" v-if="ffs">111</button>
    <button @click="login" v-if="ffs">Login</button>
    <img
      :src="imgs"
      v-if="imgs"
      alt
      style="width:60px;height:60px;border-radius:50%;margin:0 auto;display: block;"
    />
    <p v-if="name" alt style="text-align:center">{{name}}</p>
    <button
      open-type="getUserInfo"
      v-else
      @getuserinfo="bindGetUserInfo"
      @click="getUserInfoClick"
    >获取权限</button>
  </div>
</template>

<script>
// Use Vuex
// import store from './store'
import qcloud from "wafer2-client-sdk";
export default {
  name: "name",
  data() {
    return {
      aa: "",
      ffs: true,
      name: null,
      imgs: null
    };
  },
  computed: {},
  methods: {
    // 调用客服
    handleContact(e) {
      console.log(e.detail.path);
      console.log(e.detail.query);
    },
    kk() {
      wx.checkIsSupportSoterAuthentication({
        success(res) {
          console.log(res, "4");

          // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
          // res.supportMode = ['fingerPrint'] 只支持指纹识别
          // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
        }
      });
      wx.checkIsSoterEnrolledInDevice({
        checkAuthMode: "fingerPrint",
        success(res) {
          console.log(res.isEnrolled, "3"); // isEnrolled的值是0或者1，不知道是不是指纹个数或是Boolean
        }
      });
      wx.startSoterAuthentication({
        requestAuthModes: ["fingerPrint"],
        challenge: "123456",
        authContent: "请用指纹解锁",
        success(res) {
          console.log(res, "1");
        },
        fail(res) {
          console.log(res, "2");
        }
      });

      // wx.navigateBack({
      //   //返回
      //   delta: 1
      // });
    },
    getUserInfoClick() {
      // console.log('click事件首先触发')
    },
    bindGetUserInfo(e) {
      // console.log('回调事件后触发')
      // console.log(e);

      const that = this;
      if (e.mp.detail.userInfo) {
        console.log("用户按了允许授权按钮", e);
        let { encryptedData, userInfo, iv } = e.mp.detail;
        that.name = e.mp.detail.userInfo.nickName;
        that.imgs = e.mp.detail.userInfo.avatarUrl;
        // that.$http
        //   .post(api, {
        //     // 这里的code就是通过wx.login()获取的
        //     code: that.code,
        //     encryptedData,
        //     iv
        //   })
        //   .then(res => {
        //     console.log(`后台交互拿回数据:`, res);
        //     // 获取到后台重写的session数据，可以通过vuex做本地保存
        //   })
        //   .catch(err => {
        //     console.log(`api请求出错:`, err);
        //   });
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
    },

    ff() {
      let that = this;
      wx.getSetting({
        success(res) {
          console.log(!res.authSetting["scope.userLocation"]);
          if (!res.authSetting["scope.userLocation"]) {
            wx.authorize({
              scope: "scope.userLocation",
              success() {
                // 用户已经同意
                //其他操作...
                console.log("用户已经同意位置授权");
                that.ffs = false;
              },
              fail() {
                that.ffs = true;
                console.log("用户已经拒绝位置授权");
                that.openConfirm(); //如果拒绝，在这里进行再次获取授权的操作
              }
            });
          }
          //其他操作..
        }
      });
    },
    openConfirm() {
      let that = this;
      wx.showModal({
        content: "检测到您没打开此小程序的定位权限，是否去设置打开？",
        confirmText: "确认",
        cancelText: "取消",
        success: function(res) {
          console.log(res);
          //点击“确认”时打开设置页面
          if (res.confirm) {
            console.log("用户点击确认");
            wx.openSetting({
              success: res => {
                that.ffs = false;
              }
            });
          } else {
            console.log("用户点击取消");
          }
        }
      });
    },
    login() {
      // qcloud.setLoginUrl("");
      // qcloud.login({
      //   success: function(userInfo) {
      //     console.log("登录成功", userInfo);
      //   },
      //   fail: function(err) {
      //     console.log("登录失败", err);
      //   }
      // });
      wx.requestSubscribeMessage({
        tmplIds: [
          "itBDuo_HoeWEhKYAM0OUsmHAGKbidVpSdpAO56V59h8",
          "QF1bQ19XyEbgGwWEkryeuXdkkyfqr2rhOBGgHskGcHE"
        ],
        success(res) {
          console.log(res);
        }
      });
    }
  },
  created() {},
  mounted() {
    let that = this;
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo;
        that.name = userInfo.nickName;
        that.imgs = userInfo.avatarUrl;
        var gender = userInfo.gender; //性别 0：未知、1：男、2：女
        var province = userInfo.province;
        var city = userInfo.city;
        var country = userInfo.country;
        // console.log(res);
      },
      fail: function(res) {
        // 失败
      }
    });
    wx.login({
      success(res) {
        if (res.code) {
          // 这里可以把code传给后台，后台用此获取openid及session_key
        }
      }
    });
  }
};
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
