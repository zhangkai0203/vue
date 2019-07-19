<template>
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
</template>

<script>
export default {
  name: 'game-selected',
  data : function(){
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
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

</style>
