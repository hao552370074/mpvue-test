<template>
  <div>
        <p>6666666</p>
    {{ok}}
    <van-nav-bar
      title='标题'
      left-text='返回'
      right-text='按钮'
      left-arrow
      @clickLeft='onClickLeft'
      @clickRight='onClickRight'
    />
    <p @click='kk'>返回</p>
    <p>这里是跳转页面测试</p>
    <van-button type='warning'>测试</van-button>
    <van-button type='primary'>测试</van-button>
    <button open-type='contact' bindcontact='handleContact'>客服</button>
    <button @click='ff' v-if='ffs'>111</button>
    <button @click='login' v-if='ffs'>Login</button>
    <img
      :src='imgs'
      v-if='imgs'
      alt
      style='width:60px;height:60px;border-radius:50%;margin:0 auto;display: block;'
    />
    <p v-if='name' alt style='text-align:center'>{{name}}</p>
    <button
      open-type='getUserInfo'
      v-else
      @getuserinfo='bindGetUserInfo'
      @click='getUserInfoClick'
    >获取权限</button>
    <div v-for='(item,index) in data' :key='index'>
      <p>{{item.author}}</p>
      <p>{{item.dynasty}}</p>
      <p>{{item.title}}</p>
      <p>{{item.article}}</p>
      <p>{{item.useless_data}}</p>
    </div>
    <div style='margin:0 0 0 37%;overflow:hidden'>
      <van-loading v-show='loading' size='24px' color='#1989fa'>
        <p style='color:#1989fa'>加载中...</p>
      </van-loading>
    </div>

  </div>
</template>

<script>
// Use Vuex
// import store from './store'
// import qcloud from 'wafer2-client-sdk'
export default {
  name: 'name',
  data () {
    return {
      aa: '',
      ffs: true,
      loading: false,
      name: null,
      imgs: null,
      ok: this.$store.state.houseContent,
      data: [
        {
          author: '作者',
          dynasty: '作者朝代',
          title: '文章题目',
          article: '文章的具体内容',
          useless_data:
            '没什么用的数据，纯粹为了增加数据长度，能更快查看到异常的抛出。',
          share_times: 0,
          like_times: 0,
          id: '0'
        },
        {
          author: '作者',
          dynasty: '作者朝代',
          title: '文章题目',
          article: '文章的具体内容',
          useless_data:
            '没什么用的数据，纯粹为了增加数据长度，能更快查看到异常的抛出。',
          share_times: 0,
          like_times: 0,
          id: '0'
        },
        {
          author: '作者',
          dynasty: '作者朝代',
          title: '文章题目',
          article: '文章的具体内容',
          useless_data:
            '没什么用的数据，纯粹为了增加数据长度，能更快查看到异常的抛出。',
          share_times: 0,
          like_times: 0,
          id: '0'
        },
        {
          author: '作者',
          dynasty: '作者朝代',
          title: '文章题目',
          article: '文章的具体内容',
          useless_data:
            '没什么用的数据，纯粹为了增加数据长度，能更快查看到异常的抛出。',
          share_times: 0,
          like_times: 0,
          id: '0'
        }
      ]
    }
  },
  computed: {},
  // 这里是下拉刷新
  onPullDownRefresh () {
    console.log('下拉刷新')
    setTimeout(() => {
      // 0.6秒后停止刷新
      this.onClickLeft()
      wx.stopPullDownRefresh()
    }, 600)
  },
  // 这里是到底事件
  onReachBottom () {
    console.log('到底了')
    this.loading = true
    setTimeout(() => {
      this.data.push({
        author: '作者',
        dynasty: '作者朝代',
        title: '文章题目',
        article: '文章的具体内容',
        useless_data:
          '没什么用的数据，纯粹为了增加数据长度，能更快查看到异常的抛出。',
        share_times: 0,
        like_times: 0,
        id: '0'
      })
      this.loading = false
      console.log(this.data)
    }, 1200)
  },
  methods: {
    onClickLeft () {
      var QQMapWX = require('../../../static/qqmap/qqmap-wx-jssdk')
      var qqmapsdk
      // var that = this
      // 实例化腾讯地图API核心类
      qqmapsdk = new QQMapWX({
        key: 'HZ2BZ-J5RW6-MPZSX-M4LNI-SVKZT-DZFX3' // 必填
      })
      // 1、获取当前位置坐标
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          // 2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: function (res) {
              console.log(res)
            },
            fail: function (res) {
              console.log(res, '错误')
            }
          })
        }
      })
    },
    onClickRight () {

    },
    // 调用客服
    handleContact (e) {
      console.log(e.detail.path)
      console.log(e.detail.query)
    },
    kk () {
      wx.checkIsSupportSoterAuthentication({
        success (res) {
          console.log(res, '4')

          // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
          // res.supportMode = ['fingerPrint'] 只支持指纹识别
          // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
        }
      })
      wx.checkIsSoterEnrolledInDevice({
        checkAuthMode: 'fingerPrint',
        success (res) {
          console.log(res.isEnrolled, '3') // isEnrolled的值是0或者1，不知道是不是指纹个数或是Boolean
        }
      })
      wx.startSoterAuthentication({
        requestAuthModes: ['fingerPrint'],
        challenge: '123456',
        authContent: '请用指纹解锁',
        success (res) {
          console.log(res, '1')
        },
        fail (res) {
          console.log(res, '2')
        }
      })

      // wx.navigateBack({
      //   //返回
      //   delta: 1
      // });
    },
    getUserInfoClick () {
      // console.log('click事件首先触发')
    },
    bindGetUserInfo (e) {
      // console.log('回调事件后触发')
      // console.log(e)
      console.log(e)

      const that = this
      if (e.mp.detail.userInfo) {
        console.log('用户按了允许授权按钮', e)
        // let { encryptedData, userInfo, iv } = e.mp.detail
        that.name = e.mp.detail.userInfo.nickName
        that.imgs = e.mp.detail.userInfo.avatarUrl
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
        // 用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    },

    ff () {
      let that = this
      wx.getSetting({
        success (res) {
          console.log(!res.authSetting['scope.userLocation'])
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success () {
                // 用户已经同意
                // 其他操作...
                wx.getLocation({
                  type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
                  success (res) {
                    console.log(res, 'res')

                    const latitude = res.latitude
                    const longitude = res.longitude
                    wx.openLocation({
                      latitude,
                      longitude,
                      scale: 18,
                      success: function (res) {
                        console.log(res)
                      }
                    })
                  }
                })
                console.log('用户已经同意位置授权')
                // that.ffs = false;
              },
              fail () {
                that.ffs = true
                console.log('用户已经拒绝位置授权')
                that.openConfirm() // 如果拒绝，在这里进行再次获取授权的操作
              }
            })
          }
          // 其他操作..
        }
      })
    },
    openConfirm () {
      let that = this
      wx.showModal({
        content: '检测到您没打开此小程序的定位权限，是否去设置打开？',
        confirmText: '确认',
        cancelText: '取消',
        success: function (res) {
          console.log(res)
          // 点击“确认”时打开设置页面
          if (res.confirm) {
            console.log('用户点击确认')
            wx.openSetting({
              success: res => {
                that.ffs = false
              }
            })
          } else {
            console.log('用户点击取消')
          }
        }
      })
    },
    login () {
      // qcloud.setLoginUrl('');
      // qcloud.login({
      //   success: function(userInfo) {
      //     console.log('登录成功', userInfo);
      //   },
      //   fail: function(err) {
      //     console.log('登录失败', err);
      //   }
      // });
      wx.requestSubscribeMessage({
        tmplIds: [
          'itBDuo_HoeWEhKYAM0OUsmHAGKbidVpSdpAO56V59h8',
          'QF1bQ19XyEbgGwWEkryeuXdkkyfqr2rhOBGgHskGcHE'
        ],
        success (res) {
          console.log(res)
        }
      })
    }
  },
  onLoad (i) {
    console.log(this.userInfos, 'sss')
  },
  created () {
    // console.log(this)
  },
  mounted () {
    this.onClickLeft()
    let that = this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.name = userInfo.nickName
        that.imgs = userInfo.avatarUrl
        // var gender = userInfo.gender //性别 0：未知、1：男、2：女
        // var province = userInfo.province
        // var city = userInfo.city
        // var country = userInfo.country
        // console.log(res);
      },
      fail: function (res) {
        // 失败
      }
    })
    wx.login({
      success (res) {
        if (res.code) {
          // 这里可以把code传给后台，后台用此获取openid及session_key
        }
      }
    })
  }
}
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
