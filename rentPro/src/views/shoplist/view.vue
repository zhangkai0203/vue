<template>

  <div>
    <div class="fixedTop gameSelect" :style="statesWrapShow ?'z-index: 499':' z-index: 1001' ">
      <p :class="gameSelectShow ? 'selectedCol' : 'Noselected'"
        @click="gameSelectOpen"><span>游戏选择</span><i class="iconfont icon-arrLeft-fill1 tr" :class="gameSelectShow ? 'turn' : 'turn0'"></i></p>          
    </div>
    <div class="search fixedTop" :style="statesWrapShow ?'z-index: 499':' z-index: 999' ">
      <search
        v-model="searchValue"
        @on-submit="onSubmit"
        ref="search"
        placeholder = "输入关键词"></search>  
    </div>
    <div class="selectWrap fixedTop " :style="statesWrapShow ?'z-index: 499':' z-index: 999' ">
      <div class="types selectChild">
        <p class="selectedCol" 
          :class="chooseValue==sortValue ? 'selectedCol' : 'Noselected'"
          @click="sortWrapOpen"><span>{{sortValue}}</span><i class="iconfont icon-arrLeft-fill1 tr" :class="sortWrapShow ? 'turn' : 'turn0'"></i></p>          
      </div>
      <div class="games selectChild">
        <p :class="chooseValue=='销量优先' ? 'selectedCol' : 'Noselected'" 
          @click = "screen">销量优先</p>
      </div>
      <div class="states selectChild">
        <p @click="statesOpen"><span>筛选</span><i class="iconfont icon-Untitled-"></i></p>        
      </div>
    </div>
    <section class="content">
        <div class="goodsLists">
          <ul>
            <li class="loading" v-if="firstloading">加载中...</li>
            <li v-for = "(item) in listData" :key="item.id" @click="toDetails(item.id)">
              <!-- <router-link :to="{path:'/shopdetails',query:{gameid: "item.id"}}"> -->
                <img :src = "imgSrc+item.image" :onerror = "errorUserPhoto">
                <div class="goodsMes">
                <p class="goodsTitle">{{item.game_name +"id:"+ item.id}}</p>
                <p class="goodsTag" >
                  <span v-for="(aValue,akey) in item.attributes" :key ="akey">{{akey}} {{aValue}}</span>
                  <!-- <span>英雄 165</span>
                  <span>英雄 165</span> -->
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
              <!-- </router-link> -->
              
            </li>
            <!-- <li>
              <img :src="errorImg">
              <div class="goodsMes">
              <p class="goodsTitle">【贵族8】68个英雄/70个皮肤/百穿/武则天海洋之心/仲夏天海洋之心/仲夏天海洋之心/仲夏</p>
              <p class="goodsTag">
                <span>英雄 165</span>
                <span>英雄 165</span>
                <span>英雄 165</span>
              </p>
              <p class="goodsArea">
                <span>安卓</span>
                <span>安卓</span>
                <span>安卓</span>
              </p>
              <p class="goodsPrice" >
                <strong>¥3</strong>/小时
                <span>230人已付款</span>
              </p>
              </div>
            </li> -->
            <li class="loading" v-if="loading">加载中...</li>
            <li class="loading" v-if="loadDown">------我是有底线的-----</li>
          </ul>
        </div>  
    </section>
    <!-- <div class="bottombar">
      <ul>
        <li>
        <router-link to="/">
        <img >
        <i class="iconfont icon-shouye"></i>
        首页

        </router-link>
        </li>
      <li>
        <router-link to="/">
        <i class="iconfont icon-zuhao"></i>
        租号
        </router-link>
        </li>
      <li>
        <router-link to="/">
        <i class="iconfont icon-shou"></i>
        售号
        </router-link>
        </li>
        <li>
        <router-link to="/">
        <i class="iconfont icon-my"></i>
        我的
        </router-link>
        </li>
      </ul>
    </div> -->
    <div class="priceSortWrap">
      <popup v-model="sortWrapShow" position="top">
        <div class="priceSort">
          <ul>
            <li @click = "priceSort('综合排序')" :class="chooseValue=='综合排序' ? 'selectedCol' : 'Noselected'">综合排序</li>
            <li @click = "priceSort('价格由低到高')" :class="chooseValue=='价格由低到高' ? 'selectedCol' : 'Noselected'">价格由低到高</li>
            <li @click = "priceSort('价格由高到低')" :class="chooseValue=='价格由高到低' ? 'selectedCol' : 'Noselected'">价格由高到低</li>
          </ul>
        </div>
      </popup>
    </div>
    <div>
      <popup v-model="statesWrapShow" position="right" style="width:80%; z-index: 1000;background-color:#fff;">
        <div class="statesSort">
          <h2>价格</h2>
            <checker
              v-model="selectedStates"
              default-item-class="statesSort-item"
              >
                <checker-item :class = "params.price == 1?'statesSort-item-selected':''" value="1" @on-item-click="onItemClick">1元内</checker-item>
                <checker-item :class = "params.price == 2?'statesSort-item-selected':''" value="2" @on-item-click="onItemClick">2元内</checker-item>
                <checker-item :class = "params.price == 3?'statesSort-item-selected':''" value="3" @on-item-click="onItemClick">3元内</checker-item>
                <checker-item :class = "params.price == 5?'statesSort-item-selected':''" value="5" @on-item-click="onItemClick">5元内</checker-item>
                <checker-item :class = "params.price == 10?'statesSort-item-selected':''" value="10" @on-item-click="onItemClick">10元内</checker-item>
            </checker>
        </div>
      </popup>
    </div>
    <div class="gameSelectWrap">
      <popup v-model="gameSelectShow" position="top" style="z-index:1000">
        <div class="gameSelectD">
            <div class="gameSelect_area"> 
              <ul>
                <li @click="selectedArea('selected_game')" :class="[selected_game.selected_css]" >
                  <h2>游戏</h2>
                  <p>{{selected_game.name}}</p>
                </li>
                <li @click="selectedArea('selected_domain')" :class="[selected_domain.selected_css,selected_domain.disabled_css]">
                  <h2>区</h2>
                  <p>{{selected_domain.name}}</p>
                </li>
                <li @click="selectedArea('selected_server')" :class="[selected_server.selected_css,selected_server.disabled_css]">
                  <h2>服</h2>
                  <p>{{selected_server.name}}</p>
                </li>
              </ul>
            </div>
          <div class="gameSelect_list">
            <ul>
              <li v-for="item in aaa" @click="selectedList(item)" :class="item.selected_css" :key="item.id">{{item.name}}</li>
            </ul>
          </div>
          <div class="gameSelect_btn">
            <span @click="resetArea()">重置</span><span @click = "confirm()">确认</span>
          </div>
        </div>
      </popup>
    </div>


    <router-view></router-view>
  </div>
  
</template>

<script>
  import script from "@/views/shoplist/script";
  export default script;
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
//字体颜色
@colorMain:#333;
@colorSub:#aaa;
@colorSign:#ff6e00;
@colorBorder:#ebebeb;
.gameSelectD{
  height: 820px;
  position: relative;
  width: 100%;
  overflow: scroll
}
.gameSelect_area{
  float: left;
  width: 28%;
  height: 100%;
  .selected_li{
    background-color:#fff;
  }
  .fontGray h2{
      color : #aaa
  }
  li{
    height: 60px;
    font-size: 30px;
    padding: 20px 0px;
    text-indent: 30px;
    p{
      font-size: 20px;
      color: @colorSign;
    }
    
  }

}
.gameSelect_list{
  display: inline-block;
  width: 70%;
  height: 100%;
  background-color: #fff;
  padding-top: 20px;
  font-size: 24px;
  li{
    height: 60px;
    line-height: 60px;
    text-indent: 60px;
  }
  .yellow_p{
    color: @colorSign;
  }
}
.gameSelect_btn{
  position:absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  span{
    display: inline-block;
    height: 80px;
    text-align: center;
    line-height: 80px;
    letter-spacing:16px;
    font-size: 26px;
  }
  span:first-child{
    width: 28%;
    background-color: #fff
  }
  span:last-child{
    width: 70%;
    background-color: @colorSign;
    color: #fff;
  }
}


.priceSortWrap .vux-popup-dialog.vux-popup-top{
  top: 230px;
}
.gameSelectWrap .vux-popup-dialog.vux-popup-top{
  top: 80px;
}
.fixedTop{
  position: fixed;
  width: 100%;
}
.gameSelect{
  top: 0;
  height: 80px;
  line-height:80px;
  text-align: center;
  font-size:34px;
  background-color: #fff;
  border-bottom: 2px solid #ccc;
  i{
    display: inline-block;
    font-size: 34px;
    vertical-align: middle;
    margin-left: 6px;
    vertical-align: middle
  }
  .tr{
      transition: transform .3s ease-out;
    }
  .turn{
      transform: rotate(180deg);
      transform-origin: 40% 50%;
    }
    .turn0{
      transform: rotate(0deg);
      transform-origin: 50% 44%;
    }
}
.search{
  line-height: 60px;
  text-align: center;
  border-bottom: 6px solid @colorBorder;
  top: 80px;
}
.vux-search-fixed{
  position: absolute !important;
  top : 0 !important;
}
.weui-search-bar__box .weui-search-bar__input{
  height: 60px!important;
}
.selectWrap{
  height: 40px;
  padding: 14px 22px;
  top: 162px;
  border-bottom:2px solid @colorBorder; 
  background: #fff;
  .selectChild{
    float: left;
    width: 33%;
    // width: 50%;
    text-align: center;
    span{
      font-size: 24px;
    }
    i{
      display: inline-block;
      font-size: 18px;
      vertical-align: middle;
      margin-left: 6px;
      vertical-align: middle
    }
    .tr{
      transition: transform .3s ease-out;
    }
  .turn{
      transform: rotate(180deg);
      transform-origin: 50% 44%;
    }
    .turn0{
      transform: rotate(0deg);
      transform-origin: 50% 44%;
    }
  }
  
  .selectedCol{
    color: @colorSign;
  }
  .Noselected{
    color: @colorMain;
  }
} 
.priceSort{
    width: 100%;
    height: 372px;
    background-color: #fff;
    li{
      padding: 40px 40px;
      border: 1px solid @colorBorder;
      height: 40px;
      line-height: 40px;
      text-align: left;  
    }
  }
.statesSort{
  text-align: left;
  padding: 20px;
  h2{
    padding: 10px 10px;
    text-align: left;
    margin-bottom : 20px;
    font-size: 30px;
  }
}
.statesSort-item {
  width: 160px;
  height: 54px;
  line-height: 54px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
  margin-bottom: 16px
}
.statesSort-item-selected {
  border-color: #ff4a00;
}
.content{
  height:800px;
  width: 100%
}
.goodsLists{
  margin-top: 230px;
  padding: 0 20px;
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
.goodsLists .loading{
  height: 20px;
  margin-bottom: 80px;
  text-align: center;
}
.bottombar{
  height: 80px;
  width: 100%;
  text-align: center;
  line-height: 80px;
  background-color: #333;
  color: #999;
  font-size: 20px;
  position: fixed;
  bottom: 0;
  a{
    color: #999
  }
  li{
    float: left;
    width: 25%;
    text-align: center;
  }
}
</style>



