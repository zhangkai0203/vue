<template>
   <div class="steptwo">
       <div>
            <div class="gameSelect">
              <ul>
                <li v-for="item in attrData" v-if = "item.attr_type==2 || item.attr_type==3" :key="item.attr_id">
                  <h2>{{item.attr_name}}</h2>
                  <p @click="selectedAttr(item)" v-show="!item.attr_selected">去选择{{item.attr_name}}<i class="iconfont icon-icon1"></i></p>
                  <p @click="selectedAttr(item)" v-show="item.attr_type==2 && item.attr_selected">{{item.attr_selected}}</p>
                  <p @click="selectedAttr(item)" v-show="item.attr_type==3 && item.attr_selected">
                    <span v-for="(arrtItem,attrValue) in item.attr_selected" :key='attrValue' style="margin-right:6px;">{{arrtItem}}</span>
                  </p>
                </li>
              </ul>  
            </div>
            <div class="gameName">
                <ul class="textInp">
                  <li  v-for="item in attrData" v-if = "item.attr_type==1" :key="item.attr_id">
                      <span>{{item.attr_name}}</span>
                      <input v-model="item.attr_values" placeholder="请输入相关信息"/>
                  </li>
                </ul>
            </div>
        </div>
        <div class="goodsMes">
            <ul class="textInp">
                <li>
                    <span>商品标题</span>
                    <input v-model="goodsName" placeholder="请输入商品名称"/>
                </li>
            </ul> 
            <div class="goodsDes">
                <h2>商品描述</h2>
            </div> 
             <group>
                <x-textarea v-model="goodsDes" :max="500" :height="150"
                style="font-size:14px;background:#F5F5F5;"></x-textarea>
            </group>
        </div>     
        <div class="upload">
            <h2>上传装备图片<span>(最多6张)</span></h2>
            <van-uploader
            v-model="fileList"
            multiple
            :max-count="6"
            :after-read="uploadImg"
            preview-size = "100px"
            @delete="delImg"
            >
            <van-image
            width="100"
            height="100"
            :src="upLoadImg"
            />
            <!-- <van-icon width="100" height="100" name="photograph"/> -->
            </van-uploader> 
        </div>
        <div class="publishBtn">
            <p @click="publish">发布</p>
        </div>
        <van-popup
            v-model="showPicker"
            position="bottom">
            <van-picker
            :columns="pikerColumn"
            show-toolbar
            @confirm="onConfirm"
            :title="pikerTitle"
            cancel-button-text=" "
            />
      </van-popup>

      <van-popup
            v-model="showAttrsSel"
            position="top">
        <div class="gameSelectD">
            <div class="gameSelect_area"> 
              <ul>
                <li style="background:#fff;">
                  <h3>{{selectedTitle}}</h3>
                </li>
              </ul>
            </div>
          <div class="gameSelect_list">
            <ul>
              <li v-for="(item,index) in showAttrsList" @click="selectedList(item)" :key="index" :class="item.ifSelLi?'yellow_p':''">{{item.name}}</li>
            </ul>
          </div>
          <div class="gameSelect_btn">
            <span>重置</span><span @click = "confirm()">确认</span>
          </div>
        </div>   
      </van-popup>
    </div>
</template>

<script>
  import script from "@/views/steptwo/script";
  export default script;
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
//字体颜色
@colorMain:#333;
@colorSub:#aaa;
@colorSign:#ff6e00;
@colorBorder:#ebebeb;
@colorBtn:rgba(251,223,24,1);
.steptwo{
  background:#F5F5F5;
}
.gameSelect{
  padding:32px; 
  margin-bottom:16px; 
  background: #fff;
  li{
    margin-bottom: 32px;
  }
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
  span{
      color: #999999;
  }
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
      width: 75%
    }
  }
}
.goodsMes,.upload{
    background-color: #fff;
    padding: 8px 32px; 
}
.upload{
    padding-top: 32px;
}
.goodsDes{
    margin-top: 32px;
}
.weui-textarea{
    font-size: 20px;
}
// .van-uploader__preview-image{
//   width: 180px;
//   height: 180px;
//   text-align: center;
//   vertical-align: middle;
// }
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
  }
}
.gameSelectD{
  height: 880px;
  position: relative;
  width: 100%;
  overflow: scroll;
  background-color: #ebebeb;
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
    color:#ebebeb;
  }
  span:last-child{
    width: 70%;
    background-color: @colorBtn;
    color: #fff;
  }
}


</style>



