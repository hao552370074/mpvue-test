<template>
  <!-- <div @click="clickHandle"> -->
  <div>
    <div class="userinfo" @click="bindViewTap">
      <img
        class="userinfo-avatar"
        v-if="userInfo.avatarUrl"
        :src="userInfo.avatarUrl"
        background-size="cover"
      />
      <img
        class="userinfo-avatar"
        src="/static/images/user.png"
        background-size="cover"
      />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>
    <button @click="btn">操作指引</button>
    <div>
      <label>1</label>
      <label>2</label>
    </div>
    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input
        type="text"
        class="form-control"
        :value="motto"
        placeholder="v-model"
      />
      <input
        type="text"
        class="form-control"
        v-model="motto"
        placeholder="v-model"
      />
      <input
        type="text"
        class="form-control"
        v-model.lazy="motto"
        placeholder="v-model.lazy"
      />
    </form>

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面11</a>

    <div class="all">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
import {showSuccess,showModal,get,post} from "../../utils/util.js";
export default {
  data() {
    return {
      motto: "Hello miniprograme",
      userInfo: {
        nickName: "mpvue",
        avatarUrl: "http://mpvue.com/assets/logo.png"
      }
    };
  },

  components: {
    card
  },

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      if (mpvuePlatform === "wx") {
        mpvue.switchTab({ url });
      } else {
        mpvue.navigateTo({ url });
      }
    },
    clickHandle(ev) {
      console.log("clickHandle:", ev);
      // throw {message: 'custom test'}
    },
    async btn() {
      try {
        let res = await get("1", 1);
        console.log(res, "成功");
      } catch (error) {
        console.log(error, "失败");
        // showModal('错误','请重新登录',false)
        showSuccess('错误')
      }

      // 跳转方法
      // wx.navigateTo({
      //   url:'/pages/opinion/main'
      // })

      // 成功弹窗
      // wx.showToast({
      //   title: '成功',
      //   icon: 'none',
      //   image:'../../img/ddsd.png',
      //   duration: 2000
      // })

      // 选择弹窗
      // wx.showModal({
      //   title: '提示',
      //   content: '是否获取当前用户权限',
      //   success (res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })

      // 这里是选择器
      // wx.showActionSheet({
      //   itemList: ["A", "B", "C"],
      //   success(res) {
      //     console.log(res.tapIndex);
      //   },
      //   fail(res) {
      //     console.log(res.errMsg);
      //   }
      // });

      // // 标题加载
      // wx.showNavigationBarLoading({
      //   success: res => {
      //     console.log(res);
      //     // 0.6秒结束标题加载
      //     setTimeout(() => {
      //       wx.hideNavigationBarLoading();
      //     }, 600);
      //   },
      //   fail: error => {
      //     console.log(error);
      //   }
      // });
    }
  },
  // 这里是下拉刷新
  onPullDownRefresh() {
    console.log("下拉刷新");
    setTimeout(() => {
      // 0.6秒后停止刷新
      wx.stopPullDownRefresh();
    }, 600);
  },
  // 这里是到底事件
  onReachBottom() {
    console.log("到底了");
  },
  // 分享功能
  onShareAppMessage(){
    return {
      title:'第一个',
      path:'/src/pages/index/main'
    }
  },
  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all {
  width: 7.5rem;
  height: 1rem;
  background-color: blue;
}
.all:after {
  display: block;
  content: "";
  clear: both;
}
.left {
  float: left;
  width: 3rem;
  height: 1rem;
  background-color: red;
}

.right {
  float: left;
  width: 4.5rem;
  height: 1rem;
  background-color: green;
}
</style>
