<template>
  <div class="publish">
    <div class="basicMes">
      <div class="gameSelect">
        <h2>游戏名称</h2>
        <p @click="gameSelectOpen" v-show = '!ifGameName'>去选择游戏<i class="iconfont icon-icon1"></i></p>
        <p @click="gameSelectOpen" v-show = 'ifGameName'>{{selectedGame}}</p>
      </div>
      <div class="gameName">
        <van-cell-group class="textInp">
          <van-field label="角色名" 
          placeholder="请输入角色名" v-model="gameName"
          label-width="26%"
          input-align="right"/>
        <van-field label="等级" 
          placeholder="请输入等级" v-model="gameRank"
          label-width="26%" type="number"
          input-align="right"/>
        </van-cell-group>
        <!-- <ul class="textInp">
          <li>
            <span>角色名</span>
            <input v-model="gameName" placeholder="请输入角色名"/>
          </li>
          <li>
            <span>等级</span>
            <input v-model="gameRank" placeholder="请输入等级"/>
          </li>
        </ul> -->
      </div>
      <div class="gameAccount">
        <ul class="textInp">
          <li>
            <span>游戏账号</span>
            <input v-model="gameAccount" placeholder="请输入游戏账号" onkeyup="value=value.replace(/[\W]/g,'') "/>
          </li>
          <li>
            <span>游戏密码</span>
            <input v-model="gameCode" placeholder="请输入游戏密码" onkeyup="value=value.replace(/[\W]/g,'') "/>
          </li>
        </ul>
        <div class="gameSelect" style="padding:24px 0;">
        <h2>租售选择</h2>
        <p @click="rentSellOpen" v-show = '!ifRentSell'>去选择租售<i class="iconfont icon-icon1"></i></p>
        <p @click="rentSellOpen" v-show = 'ifRentSell'>{{selectedRS}}</p>
      </div>
      </div>
    </div>
    <div class="sell" v-show="sell">
      <h2>出售价格</h2>
      <ul class="time">
        <li>
          <span>出售</span>
          <input v-model="price_buy" type="number" placeholder="请输入金额" @keyup="checkMoney(this.value)">
        </li>
      </ul>
    </div>
    <div class="priceMes" v-show="rent">
      <div class="hours">
        <h2>时租价格</h2>
         <ul class="time">
          <li>
            <span>1小时</span>
            <input v-model="oneHour" type="number" placeholder="请输入租金"/>
          </li>
          <li>
            <span>3小时</span>
            <input v-model="threeHour" type="number" placeholder="请输入租金"/>
          </li>
          <li>
            <span>6小时</span>
            <input v-model="sixHour" type="number" placeholder="请输入租金"/>
          </li>
          <li>
            <span>12小时</span>
            <input v-model="twelveHour" type="number" placeholder="请输入租金"/>
          </li>
        </ul>
      </div>
      <div class="night">
        <h2>包夜价格</h2>
        <ul class="time">
          <li>
            <span>21:00~8:00</span>
            <input v-model="night" type="number" placeholder="请输入租金"/>
          </li>
        </ul>
      </div>
      <div class="week">
        <h2>包周价格</h2>
        <ul class="time">
          <li>
            <span>一周</span>
            <input v-model="week" type="number" placeholder="请输入租金"/>
          </li>
        </ul>
      </div>
    </div>  
    <div class="publishBtn" @click="nextStep">
     <p>下一步</p>
    </div>


    <van-popup
      v-model="showRentSell"
      position="bottom">
      <van-picker
      :columns="rentSelColumn"
      show-toolbar
      @confirm="onConfirm"
      title="租售选择"
      cancel-button-text=" "
      />
      </van-popup>

   <div class="gameSelectWrap">
      <popup v-model="gameSelectShow" position="top" style="z-index:1000">
        <div class="gameSelectD">
            <div class="gameSelect_area"> 
              <ul>
                <li @click="selectedArea('selected_game')" :class="[selected_game.selected_css]" >
                  <h3>游戏</h3>
                  <p>{{selected_game.name}}</p>
                </li>
                <li @click="selectedArea('selected_domain')" :class="[selected_domain.selected_css,selected_domain.disabled_css]">
                  <h3>区</h3>
                  <p>{{selected_domain.name}}</p>
                </li>
                <li @click="selectedArea('selected_server')" :class="[selected_server.selected_css,selected_server.disabled_css]">
                  <h3>服</h3>
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
  </div>
  
</template>

<script>
  import script from "@/views/publish/script";
  export default script;
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
//字体颜色
@colorMain:#333;
@colorSub:#aaa;
@colorSign:#ff6e00;
@colorBorder:#ebebeb;
@colorBtn : rgba(251,223,24,1);
.publish{
  background:#F5F5F5;
}
.gameSelect{
  padding:32px; 
  margin-bottom:16px; 
  background: #fff;
  p{
    width:686px;
    height:84px;
    background:#f5f5f5;
    border-radius:8px;
    text-align: center;
    line-height: 84px;
    font-size: 28px;
  }
}
h2{
  font-size:32px;
  font-weight:500;
  line-height:44px;
  margin-bottom: 32px;
}
.gameName,.gameAccount{
  background-color: #fff;
  margin-bottom:16px; 
  padding: 8px 32px;
}
.textInp{
  li{
    height: 80px;
    line-height: 80px;
    font-size: 32px;
    input{
      float: right;
      border: none;
      line-height: 80px;
      font-size: 32px;
      text-align: right;
      color: #999999;
      width: 80%
    }
  }
}
.priceMes{
  background-color: #fff;
  padding: 32px;
}
.time{
  li{
    width:622px;
    height:44px;
    line-height: 44px;
    padding: 22px 32px;
    background:#f5f5f5;
    border-radius:8px;
    border:1px solid #ECECEC;
    font-size: 28px;
    margin-bottom: 8px;
    input{
      float: right;
      border: none;
      line-height: 44px;
      font-size: 28px;
      text-align: right;
      color: #999999;
      width: 76%;
      background-color:transparent; 
    }
  } 
}
.sell{
  background-color: #fff;
  padding: 32px;
}
.hours,.night{
  margin-bottom: 24px;
}
.publishBtn{
  padding: 32px;
  background-color: #fff;
  p{
    width:686px;
    height:84px;
    background:rgba(251,223,24,1);
    border-radius:8px;
    line-height: 84px;
    text-align: center;
    font-size:32px;
    font-weight:500;
  }
}
.gameSelectD{
  height: 880px;
  position: relative;
  width: 100%;
  overflow: scroll;
}
.gameSelect_area{
  float: left;
  width: 30%;
  height: 100%;
  .selected_li{
    background-color:#fff;
  }
  .fontGray h3{
      color : #aaa
  }
  li{
    height: 80px;
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
  height: 97%;
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
    width: 30%;
    background-color: #fff
  }
  span:last-child{
    width: 70%;
    background-color: @colorBtn;
    color: #fff;
  }
}


</style>



