<!--  -->
<template>
  <div class="index.vue">
    <swiper
      class="cont"
      indicator-dots='true'
      autoplay='true'
      @change="switchItem('switchItem',$event)"
      :current="currentTab"
      circular="true"
      skip-hidden-item-layout="true"
    >
      <swiper-item style="background-color:red">
        <div class="item">A</div>
      </swiper-item>
      <swiper-item style="background-color: darkcyan;">
        <div class="item">B</div>
      </swiper-item>
      <swiper-item style="background-color:blue">
        <div class="item">C</div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "index.vue",
  components: {},
  data() {
    //这里存放数据
    return {
      currentTab:'0',
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    switchItem(e,r){
      console.log(e,r);
      
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style>
.cont{
  
}
</style>