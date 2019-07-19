<template>

  <div style="background-color:#F5F5F5">
    <div class="top">
        <swiper :list="img_list" v-model="img_index" loop auto></swiper>
        <div class="topTxt">
          <h1>{{detailsData.title}}</h1>
          <P>
              <span>租</span><strong>{{price}}</strong><span class="span1">¥/小时起</span>
              <span class="span2">已租{{detailsData.had_sale_count}}次</span>
          </P>
          <p class="tips">如果遇到无法登录的情况，多为腾讯异地锁定，请尝试多次登录，如果无效，请联系客服小姐姐</p>
          <div class="warn">
              <p><img src="../../assets/img/shang.png"/>严禁租用账号去打广告，一经发现立刻永久禁止租号</p>
              <p><img src="../../assets/img/pei.png"/>严禁租用账号去打广告，一经发现立刻永久禁止租号</p>
              <p><img src="../../assets/img/bao.png"/>严禁租用账号去打广告，一经发现立刻永久禁止租号</p>
          </div>
        </div>
    </div>
    <div class="details">
      <h2>账号详情</h2>
      <div>
        <ul>
          <li>
            <span class="spanl">游戏区服</span>
            <span class="spanr">{{detailsData.game_name}}  {{detailsData.system_name}}  {{detailsData.client_name}}</span>
          </li>
          <li v-for="(aValue,akey,index) in detailsData.attributes" :key ="index">
            <span class="spanl">{{akey}}</span>
            <span class="spanr">{{aValue}}</span>
          </li>
        </ul>
        <p v-for="(aValue,akey,index) in detailsData.extends_radio" :key ="index">
          <span class="spanl">{{akey}}</span>
          <span class="spanr">{{aValue}}</span>
        </p>
      </div>    
    </div>
    <div class="describe">
      <h2>账号描述</h2>
      <p>{{detailsData.content}}</p>
      <p  v-for="(value,key,index) in detailsData.extends_check" :key ="index">
        <span>{{key}}</span>:
        <span v-for="(avalue,akey,aindex) in value" :key ="aindex" style="margin-right:6px;">{{avalue}}</span></p>
    </div>
    <!-- <div class="comments">
      <h2>评价（23）</h2>
      <ul class="commentList">
        <li>
          <div class="clearfix">
            <p class="userName">
              <img /><span>阿斯顿马丁</span>
            </p>
            <p class="time">
              <span>2018-11-02</span><span>12:25:42</span>
            </p>
          </div>
          <p class="comContent">可排位原计划全套、还可私、奥斯曼、dj琴女、武则天/蓝屏警告/天狼狩猎禁言 </p>
        </li>
        <li>
          <div class="clearfix">
            <p class="userName">
              <img /><span>阿斯顿马丁</span>
            </p>
            <p class="time">
              <span>2018-11-02</span><span>12:25:42</span>
            </p>
          </div>
          <p class="comContent">可排位原计划全套、还可私、奥斯曼、dj琴女、武则天/蓝屏警告/天狼狩猎禁言 </p>
        </li>
        <li>
          <div class="clearfix">
            <p class="userName">
              <img /><span>阿斯顿马丁</span>
            </p>
            <p class="time">
              <span>2018-11-02</span><span>12:25:42</span>
            </p>
          </div>
          <p class="comContent">可排位原计划全套、还可私、奥斯曼、dj琴女、武则天/蓝屏警告/天狼狩猎禁言 </p>
        </li>
      </ul>
    </div> -->
    <div  class="bottom">
      <div class="shoucang" @click="collect">
        <img src="../../assets/img/shoucang.png" class="shoucangImg" v-if="!ifCollect"/><img src="../../assets/img/shoucangA.png" class="shoucangImg" v-if="ifCollect"/>收藏
      </div>
      <!-- <div class="buy">购买永久</div> -->
      <div class="rent" @click="openOrder">立即租用</div>
    </div>

    <div>
      <popup v-model="orderShow" position="bottom" style="z-index: 1000;background-color:#F0F4F7;">
        <div>
          <p class="close" @click="closeOrder"><span>X</span></p>
          <div class="messsage">
            <div class="baseMes clearfix">
              <img :onerror = "errorUserPhoto"/>
              <div class="goodsMes">
                <p class="goodsTitle">{{detailsData.title}}</p>
                <p class="goodsTag" >
                  <span class="spanr">{{detailsData.game_name}}  {{detailsData.system_name}}  {{detailsData.client_name}}</span>
                </p>
                <p class="goodsPrice" >
                  <strong>{{price}}</strong><span class="span1">¥/小时起</span>
                </p>
              </div>
            </div>

            <div class="timeMes">
              <h3>选择租用时长</h3>
              <ul>
                <li v-for="(item,index) in priceList" :key="index" @click="selectPrice(index)">
                  <p>时租</p>
                  <p><strong>{{item}}</strong>¥<span v-if="index==0">起</span></p>
                </li>
                <!-- <li>
                  <p>时租</p>
                  <p><strong>12</strong>¥</p>
                </li>
                <li>
                  <p>时租</p>
                  <p><strong>12</strong>¥</p>
                </li> -->
              </ul>
              <div class="timeSelect">
                <span>选择时长</span>
                <p class="numberCol">
                  <span class="minus" @click="minusButton">-</span>
                  <span class="num">{{timeNumber}}</span>
                  <span class="add" @click="addButton">+</span>
                </p>
              </div>
            </div>
          </div>
          <div class="priceMes">
            <p class="clearfix">
              <span class="spanl">租金</span>
              <span class="spanr">¥<strong>{{rentPrice}}</strong></span>
            </p>
          </div>
          <div class="totalPrice clearfix">
            <div>
              <span>总价¥<strong>{{totalPrice}}</strong></span>
              <span>
                提交订单
              </span>
            </div>
          </div>
        </div>
      </popup>
    </div>
  </div>  
</template>
<script>
  import script from "@/views/shopdetails/script";
  export default script;
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
//字体颜色
@colorMain:#333;
@colorSub:#999;
@colorSign:#ff4d4f;
@colorBorder:#F5F5F5;
@color999:#999;
.topTxt{
  padding: 32px;
  color: @colorMain;
  background-color: #fff;
  margin-bottom: 16px;
  h1{
    font-size: 32px;
    height: 88px;
    line-height: 44px;
    font-family: '黑体';
  }
  p{
    font-size: 24px;
    strong{
      color: @colorSign;
      font-size: 48px;
      font-weight: bold;
    }
    .span1{
      font-size:20px;
      font-weight:500;
      color:@colorSign;
    }
    .span2{
      font-size:20px;
      font-weight:400;
      color:@colorSub;
      float: right;
      margin-top: 32px
    }
  }
  .tips{
    padding: 16px 24px;
    margin: 32px 0;
    height:68px;
    font-size:24px;
    font-weight:400;
    color:@colorSign;
    line-height:34px;
    background:rgba(255,242,238,1);
  }
  .warn{
    padding: 32px 0;
    font-size:24px;
    font-weight:400;
    border-top: 2px solid @colorBorder;
    img{
      width:28px;
      height:28px;
      margin-right: 10px;
    }
    p{
      line-height:34px;
      height:34px;
      margin-bottom: 16px;
    }
    
  }
}
.details{
  padding: 32px;
  background-color: #fff;
  h2{
    font-size:28px;
    font-weight:500;
    margin-bottom: 32px;
  }
  div{
    padding: 32px 0;
    border-bottom: 2px solid @colorBorder;
    border-top: 2px solid @colorBorder;
    li,p{
      margin-bottom: 48px;
      height: 40px;
      font-size:28px;
      .spanl{
        font-weight:400;
        color:@colorSub;
        // line-height:40px;
      }
      .spanr{
        float: right;
        text-align: right;
      }
    }
    p:last-child{
      margin-bottom: 0px;
    }
  }
}
.describe{
  padding: 32px;
  background-color: #fff;
  // margin-bottom: 16px;
  margin-bottom: 88px;
  h2{
    font-size:28px;
    font-weight:500;
    margin-bottom: 32px;
  }
  p{
    font-size:28px;
    font-weight:400;
    color:#666;
    line-height:48px;
  }
}
.comments{
  padding: 32px;
  background-color: #fff;
  h2{
    font-size:28px;
    font-weight:500;
  }
  .commentList{
    margin-bottom: 88px;
    li{
      border-bottom: 2px solid @colorBorder;
      padding: 48px 0;
      .userName{
        font-size: 28px;
        float: left;
      }
      .time{
        float: right;
        font-size: 24px;
        color: @colorSub;
        span:last-child{
          margin-left: 16px;
        }
      }
      .comContent{
        height:96px;
        font-size:28px;
        font-weight:400;
        color:#666;
        line-height:48px;
      }
    }
  }
}
.bottom{
  padding: 16px 0;
  height:88px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  div{
    float: right;
    margin-right:16px;
  }
  div:first-child{
    float: left;
    margin-left: 74px;
    width: 50px;
  }
  .buy{
    width:260px;
    height:88px;
    background:rgba(51,51,51,1);
    border-radius:4px;
    line-height: 88px;
    font-size:32px;
    font-weight:500;
    color:#fff;
    text-align: center;
  }
  .rent{
    width:260px;
    height:88px;
    background:rgba(251,223,24,1);
    border-radius:4px;
    line-height: 88px;
    font-size:32px;
    font-weight:500;
    text-align: center;
  }
  .shoucang{
    margin-top: 16px;
    .shoucangImg{
      width: 40px;
      height: 40px;
    }
    
  }
}

.close{
  padding: 22px;
  text-align: right;
  background-color: #fff;
  span{
    font-size: 17px;
    color: @colorSub;
  }
}
.messsage{
  background-color:#fff;
  margin-bottom: 16px;
}
.baseMes{
  padding-left: 32px;
  padding-bottom: 32px;
  height: 192px;
  border-bottom: 2px solid #F0F4F7;
  img{
    width: 192px;
    height: 192px;
    float: left;
  }
  .goodsMes{
    float: left;
    margin-left: 6px;
    .goodsTitle{
      height:80px;
      font-size:28px;
      font-weight:500;
      line-height:40px;
      margin-bottom: 16px;
    }
    .goodsTag{
      font-size:24px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:@colorSub;
      margin-bottom: 16px;
    }
    .goodsPrice{
      font-size:20px;
      font-weight:500;
      color:@colorSign;
      strong{
        font-size:36px;
      }
    }
  }
}
.timeMes{
  padding: 32px 0px;
  padding-left: 32px;
  margin-bottom: 40px;
  h3{
    width:172px;
    font-size:28px;
    font-weight:bold;
    margin-bottom: 16px;
  }
  ul{
    height: 150px;
    margin-bottom: 32px;
    li{
      float: left;
      width:208px;
      height:122px;
      border-radius:4px;
      border:1px solid #D4D4D4;
      margin-right: 16px;
      padding-top: 16px;
      p:first-child{
        height:34px;
        font-size:24px;
        font-weight:400;
        line-height:34px;
        text-align: center;
        margin-bottom: 32px
      }
      p:last-child{
        height:28px;
        font-size:24px;
        font-weight:bold;
        color:@colorSign;
        line-height:28px;
        text-align: center;
        strong{
          font-size: 40px
        }
      }
    }
  }
  .timeSelect{
    margin-bottom: 32px;
    span{
      height:40px;
      font-size:28px;
      color:@colorSub;
      line-height:40px;
    }
    .numberCol{
      float: right;
      margin-right: 32px;
      span{
        display: inline-block;
        width:48px;
        height:48px;
        background:rgba(240,244,247,1);
        line-height: 48px;
        text-align: center;
        color: #333;
      }
    }
  
  }
}
.priceMes{
  background: #fff;
  border-bottom: 2px solid #F0F4F7;
  p{
    padding: 32px;
    .spanl{
      float: left;
      height:40px;
      font-size:28px;
      font-weight:400;
      line-height:40px;
    }
    .spanr{
      float: right;
      font-size:20px;
      font-weight:bold;
      strong{
        font-size: 32px;
      }
    }
  }
}
.totalPrice{
  height: 106px;
  background-color: #fff;
  padding: 32px;
  span:first-child{
    float: left;
    width:412px;
    height:96px;
    background:@colorMain;
    border-radius:48px 0px 0px 48px;
    font-size:24px;
    font-weight:400;
    color:#fff;
    line-height:96px;
    padding-left: 48px;
    strong{
      font-size:52px;
      font-weight:bold;
    }
  }
  span:last-child{
    float: right;
    width:226px;
    height:96px;
    background:#FBDF18;
    border-radius:0px 48px 48px 0px;
    font-size:32px;
    font-weight:500;
    text-align: center;
    line-height: 96px;
  }
}
</style>



