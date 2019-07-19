<template>
  <div class="hello">
    <div class="homeSearch fixedTop" style="z-index: 499">
      <search
        v-model="searchValue"
        @on-submit="onSubmit"
        ref="search"></search>  
    </div>
    <div class="contentWrap">
      <div class="banner">
        <swiper :list="img_list" v-model="img_index" loop auto></swiper>
      </div>
      <div class="gameBanner">
        <grid :show-vertical-dividers="false">
          <grid-item v-for="i in bannerList1" :key="i.id">
            <div class="bannerWrap" style="width: 100px;height: 100px;">
              <img :src = "imgSrc+i.image" :onerror = "errorUserPhoto" style="width: 100px;height: 100px;"/>
              <p >{{i.name}}</p>
            </div>
          </grid-item>
        </grid>
        <grid :show-vertical-dividers="false">
          <grid-item v-for="i in bannerList2" :key="i.id">
            <div class="bannerWrap">
              <img :src = "imgSrc+i.image" :onerror = "errorUserPhoto"/>
              <p >{{i.name}}</p>
            </div>
          </grid-item>
        </grid>
      </div>
      <div class="hotAccount">
        <h2>热门账号</h2>
        <van-tabs v-model="active" sticky :offset-top= "top" @click="getHotList">
          <van-tab v-for="item in bannerListAll" :title="item.name" :key="item.id">
            <ul class="goodsLists" v-if="noData">
              <li v-for = "(item) in listData" :key="item.id" @click="toDetails(item.id)">
                <img :src = "imgSrc+item.image" :onerror = "errorUserPhoto">
                <div class="goodsMes">
                <p class="goodsTitle">{{item.game_name +"id:"+ item.id}}</p>
                <p class="goodsTag" >
                  <span v-for="(aValue,akey) in item.attributes" :key ="akey">{{akey}} {{aValue}}</span>
                </p>
                <p class="goodsArea">
                  <span>{{item.system_name}}</span>
                  <span>{{item.client_name}}</span>
                  <span v-for="(aValue,akey,index) in item.extends_radio" :key ="akey" v-if="item.extends_radio && index==0" >{{aValue}}</span>
                </p>
                <p class="goodsPrice" >
                  <strong>¥{{item.price_hours}}</strong>/小时
                  <span>{{item.had_sale_count}}人已付款</span>
                </p>
                </div>   
              </li>
            </ul>
          </van-tab>
        </van-tabs>
        <!-- <sticky :offset="42" > 
          <ul class="hotNameList">
            <li v-for="item in bannerListAll" :class="accountName==item.name ? 'selected':'' " :key="item.id">{{item.name}} <span v-if="accountName==item.name" :key="item.id"></span></li>
          </ul>
        </sticky> -->
      </div>
    </div>  
  </div>
  
</template>
<style scoped lang="less">
@colorMain:#333;
@colorSub:#999;
@colorSign:#ff4d4f;
@colorBorder:#F5F5F5;
@color999:#999;
.fixedTop{
  position: fixed;
}

.homeSearch{
  width: 100%; 
}
.contentWrap{
  padding-top: 86px;
}
.banner{
  padding: 32px;
  margin-bottom: 16px;
}
.gameBanner{
  padding-bottom: 16px;
  border: 2px solid @colorBorder
}
.bannerWrap{
  padding:32px;
  text-align: center;
  img{
    width: 88px;
    height: 88px;
  }
}
.weui-grids:before{
  border: none !important
}
.weui-grids:after{
  border: none !important
}
.weui-grid:after{
  border: none !important
}
.hotAccount{
  padding: 48px 32px;
  h2{
    font-size:40px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    margin-bottom: 20px;
  }
}
.hotNameList{
  background-color: #fff;
  height: 48px;
  padding: 6px 0;
  li{
    display: inline-block;
    position: relative;
    font-size:28px;
    font-weight:400;
    color:#666;
    line-height:40px;
    margin-right: 48px;
  }
  .selected{
    color:@colorMain;
  }
  li span{
    content:'';
    width:48px;
    height:8px;
    background:#FBDF18;
    position: absolute;
    bottom: -10px;
    left: 30%;
  }
  
}
.goodsLists{
  margin-top: 32px;
  // padding-top: 130px;
  li{
    height: 256px;
    border-bottom: 1px solid @colorBorder;
    padding-top: 20px;
    img{
      float: left;
      width: 170px;
      height: 170px;
      border-radius: 12px
    }
    .goodsMes{
      float: left;
      margin-left: 16px;
      width: 70%;
      height: 246px;
      position: relative;
      .goodsTitle{
        margin-bottom: 16px;
        font-size: 30px;
        width: 100%;
        height: 80px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        //white-space: nowrap;
      }
    }
    .goodsTag,.goodsArea{
      font-size: 22px;
      color: @colorSub;
      margin-bottom: 6px;
    }
    .goodsTag{
      span{
        display: inline-block;
        // width: 125px;
        padding: 0 10px;
        line-height: 22px;
        border-right: 1px solid @colorSub;
        margin-right: 20px
      }
      span:last-child{
        border-right:none;
      }
    }
    .goodsArea{
      span{
        display: inline-block;
        line-height: 22px;
        padding: 10px 18px;
        background-color: #ccc;
        border-radius: 6px;
        color: #333;
      }
    }
    .goodsPrice{
      position: absolute;
      bottom: 0;
      font-size: 20px;
      overflow: hidden;
      width: 100%;
      span{
        float: right;
        font-size: 20px;
      }
      strong{
        color: @colorSign;
        font-size: 40px;
      }
    }
  }
}
</style>
<script>
  import script from "@/views/home/script";
  export default script;
</script>




