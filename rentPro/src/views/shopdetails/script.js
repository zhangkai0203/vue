import service from "./service";
import { Popup,Swiper,Group} from 'vux';
import error from '@/assets/img/error.png'
import BScroll from 'better-scroll'
export default {
    components: {
      Popup,
      Swiper,
      Group 
    },
    data () {
      return {
        detailsData:{},
        price:null,
        qufu:'',
        imgList:[],
        priceList:[],
        content:'',
        rentNumber:'',
        swiperOption:{},
        img_index:0,
        img_list:[],
        ifCollect:false,
        orderShow:false,
        errorImg:error,
        errorUserPhoto:'this.src="' + error + '"',
        timeName:'选择时长',
        timeNumber:1,
        rentPrice:null,
        totalPrice:null,
        selectedIndex:0,
      } 
    },
    created:function(){
      let _this = this;
      var gameid = this.$route.params.id;
      var pms = {
        // id : gameid
        id : 26
      }
      service.getDetails(function(data){
        //处理价格
        _this.priceList = [];
        for(var key in data.price_list){
          _this.priceList.push((data.price_list[key]/key).toFixed(2))
        }
        _this.price = _this.priceList[0];
        //处理轮播
        const demoList = data.images.map((one, index) => ({
          url: 'javascript:',
          img: _this.imgSrc+one
        }))
        _this.img_list = demoList;
        _this.detailsData = data;
        console.log(_this.detailsData)
       
      },pms); 
      
    },
    mounted () {
      let _this = this; 
    },
    // destroyed: function () {
    //   let _this = this;
    //   window.removeEventListener('scroll', _this.$options.methods.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
    // },
    methods:{
      collect(){
        this.ifCollect = !this.ifCollect;
      },
      selectPrice(val){
        let _this = this;
        if(_this.selectedIndex == val)return;
        _this.selectedIndex = val;
        _this.rentPrice = _this.priceList[val];
        _this.totalPrice = _this.priceList[val];
        _this.timeNumber = 1;
      },
      minusButton(){
        if(this.timeNumber ==1)return;
        this.timeNumber = this.timeNumber-1;
        this.rentPrice = (this.priceList[this.selectedIndex] * this.timeNumber).toFixed(2);
        this.totalPrice = this.rentPrice;
      },
      addButton(){
        this.timeNumber = this.timeNumber+1;
        this.rentPrice = (this.priceList[this.selectedIndex] * this.timeNumber).toFixed(2);
        this.totalPrice = this.rentPrice;
      },
      openOrder(){
        let _this = this;
        _this.orderShow = !_this.orderShow;
        _this.rentPrice = _this.priceList[0];
        _this.totalPrice = _this.priceList[0];
      },
      closeOrder(){
        let _this = this;
        _this.orderShow = !_this.orderShow;
      }
    }
  }

  