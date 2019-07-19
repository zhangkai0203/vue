<template>
  <div>
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
  </div>
</template>

<script>
//租客：待付款 租赁中 已完成 退款/售后 全部 (价格为总计，待评价——追加评价 待付款——去付款&取消订单  )
//号主：租赁中 已完成 撤单 维权锁单 已发布 待审核 审核未通过 已下架(审核未通过——删除，重新编辑   撤单为合计 )
export default {
  name: 'GoodsList',
  props:['listData'],
}
</script>

<style lang="stylus" scoped>

</style>
