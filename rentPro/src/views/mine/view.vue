<template>
  <div class="main">
    <div class="userInfo clearfix">
      <div class="info">
        <img :src="avatar" />
        <div>
          <p>{{ nickname }}</p>
        </div>
      </div>
      <div class="tenantBtn changeBtn" v-show="!isTenant" @click="changeBtn">
        切换为租客
      </div>
      <div class="ownerBtn changeBtn" v-show="isTenant" @click="changeBtn">
        切换为号主
      </div>
    </div>
    <div class="owner" v-show="!isTenant">
      <div class="manageList" style="margin-bottom:32px;">
        <div class="title clearfix">
          <h3>出租账号管理</h3>
          <span @click="toOrder(all)">全部 <i class="iconfont icon-icon1"></i></span>
        </div>
        <ul class="clearfix">
          <li  @click="toOrder('renting')">
            <img src="../../assets/img/zuling.png"/>
            <span>租赁中</span>
          </li>
          <li @click="toOrder('finish')">
            <img src="../../assets/img/yiwancheng.png"/>
            <span>已完成</span>
          </li>
          <li  @click="toOrder('cancel')">
            <img src="../../assets/img/chedan.png"/>
            <span class="two">撤单</span>
          </li>
          <li  @click="toOrder('lock')">
            <img src="../../assets/img/weiquan.png"/>
            <span class="four">维权锁单</span>
          </li>
        </ul>
      </div>
      <div class="manageList lastManage">
        <div class="title clearfix">
          <h3>发布账号管理</h3>
          <span>全部 <i class="iconfont icon-icon1"></i></span>
        </div>
        <ul class="clearfix">
          <li  @click="toOrder('published')">
            <img src="../../assets/img/yifabu.png"/>
            <span>已发布</span>
          </li>
          <li @click="toOrder('audit')">
            <img src="../../assets/img/daishenhe.png"/>
            <span>待审核</span>
          </li>
          <li class="other"  @click="toOrder('notPass')">
            <img src="../../assets/img/shenhe.png"/>
            <span class="five">审核未通过</span>
          </li>
          <li  @click="toOrder('offShelf')">
            <img src="../../assets/img/yixiajia.png"/>
            <span>已下架</span>
          </li>
        </ul>
      </div>
      <div class="otherList">
        <ul>
          <li>
            <p>我的收入</p>
            <span class="money" @click="myIncome">77.78 <i class="iconfont icon-icon1"></i></span>
          </li>
          <li>
            <p>保证金</p>
            <span class="sign" @click="deposit">未缴纳 <i class="iconfont icon-icon1"></i></span>
          </li>
          <li>
            <p>安全设置</p>
            <span @click="security"><i class="iconfont icon-icon1"></i></span>
          </li>
          <li>
            <p>反馈建议</p>
            <span @click="suggest"><i class="iconfont icon-icon1"></i></span>
          </li>
          <li>
            <p>客服</p>
            <span @click="service"><i class="iconfont icon-icon1"></i></span>
          </li>
          <li>
            <p>合作商家</p>
            <span @click="partner"><i class="iconfont icon-icon1"></i></span>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="tenant" v-show="isTenant">
      <div class="manageList lastManage">
        <div class="title clearfix">
          <h3>全部订单</h3>
          <span @click="toOrder()">全部 <i class="iconfont icon-icon1"></i></span>
        </div>
        <ul class="clearfix">
          <li @click="toOrder()">
            <img src="../../assets/img/daifukuan.png"/>
            <span>待付款</span>
          </li>
          <li @click="toOrder()">
            <img src="../../assets/img/zuling.png"/>
            <span>租赁中</span>
          </li>
          <li @click="toOrder()">
            <img src="../../assets/img/yiwancheng.png"/>
            <span>已完成</span>
          </li>
          <li @click="toOrder()">
            <img src="../../assets/img/weiquan.png"/>
            <span class="four">维权锁单</span>
          </li>
        </ul>
      </div>
      <div class="otherList">
        <ul>
          <router-link to="/myaccount">
            <li>
              <p>我的余额</p>
              <span><i class="iconfont icon-icon1"></i></span>
            </li>
          </router-link>

          <li>
            <p>保证金</p>
            <span @click="deposit"><i class="iconfont icon-icon1"></i></span>
          </li>

          <router-link to="/changenum">
            <li>
              <p>安全设置</p>
              <span><i class="iconfont icon-icon1"></i></span>
            </li>
          </router-link>

          <router-link to="/suggest">
            <li>
              <p>反馈建议</p>
              <span><i class="iconfont icon-icon1"></i></span>
            </li>
          </router-link>

          <li>
            <p>客服</p>
            <span><i class="iconfont icon-icon1"></i></span>
          </li>

          <router-link to="/partner">
            <li>
              <p>合作商家</p>
              <span><i class="iconfont icon-icon1"></i></span>
            </li>
          </router-link>

        </ul>
      </div>
    </div>

    <div class="publishBtn" v-show="!isTenant" @click="publish()">
      <i class="iconfont icon-jiahao"></i>发布
    </div>
    <!-- <router-link to="/publish">
      <h2>
        发布
      </h2>
    </router-link> -->
   <router-link to="/logon">
      <h2>
        登录
      </h2>
    </router-link>
  </div>
  
</template>

<script>
  import script from "@/views/mine/script";
  export default script;
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
//字体颜色
@colorMain:#333;
@colorSub:#aaa;
@colorSign:#ff6e00;
@colorBorder:#ebebeb;
h2{
  font-size: 46px;
  color: #ff6e00
}
.main{
padding-left: 32px;
}
.userInfo{
  position: relative;
  padding: 52px 0;
  border-bottom: 2px solid #F5F5F5;
  .info{
    float: left;
    img{
      float: left;
      width:84px;
      height:84px;
    }
    div{
      float: left;
      margin-left: 24px;
      p:first-child{
        font-size:36px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
      p:last-child{
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
      }
    }
  }
}
.changeBtn{
  position: absolute;
  right: 0;
  width:222px;
  height:56px;
  line-height: 56px;
  border-radius:116px 0px 0px 116px;
  font-size:28px;
  font-family:PingFangSC-Medium;
  font-weight:500; 
  text-indent: 46px;
}
.tenantBtn{
  color:rgba(251,223,24,1);
  background:rgba(61,67,69,1);
}
.ownerBtn{
  background-color: #FBDF18;
  color: #333333;
}
.owner,.tenant{
  padding-top:32px;
}
.lastManage{
  padding-bottom: 32px;
  border-bottom: 2px solid #F5F5F5;
}
.manageList{
  .title{
    height: 56px;
    line-height: 56px;
    h3{
      font-size:40px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      float: left;
    }
    span{
      font-size:24px;
      color:rgba(153,153,153,1);
      float: right;
      margin-right: 32px;
    }
  }
  ul{
    li{
      position: relative;
      float: left;
      margin: 40px;
      width: 98px;
      img{
        width: 64px;
        height: 64px;
      }
      span{
        position: absolute;
        font-size:24px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        bottom: -36px;
        left: -12px
      }
      .two{
        left: 0;
      }
      .four{
        left: -24px;
      }
    }
    .other{
      width: 130px;
      margin-left: 40px;
      margin-right: 10px;
      span{
        left: -36px;
      }
    }
    li:first-child{
      margin-left: 38px;
    }
    li:last-child{
      margin-right:38px;
    }
  }
}
.otherList{
  li{
    padding: 32px 32px 32px 8px;
    height:44px;
    font-size:32px;
    line-height:44px;
    p{
      float: left
    }
    span{
      float: right;
      i{
        font-size: 18px;
        color: #D4D4D4;
      }
    }
    .money{
      font-size:36px;
      font-weight:bold;
    }
    .sign{
      font-size:24px;
      color:rgba(153,153,153,1);
    }
  }
}
.publishBtn{
  position: fixed;
  width:166px;
  height:88px;
  line-height: 88px;
  text-align: center;
  background:rgba(251,223,24,1);
  box-shadow:0px -4px 24px 0px rgba(251,223,24,0.54);
  border-radius:44px;
  font-size:28px;
  font-weight:500;
  bottom: 130px;
  color: #000;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>



