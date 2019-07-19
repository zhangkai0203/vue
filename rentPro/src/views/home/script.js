import service from "./service";
import Vue from 'vue';
import {Search,Swiper,Grid, GridItem,Sticky } from 'vux';
import error from '@/assets/img/error.png';
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);
export default {
    components: {
      Search,
      Swiper,
      Grid, 
      GridItem,
      Sticky 
    },
    data () {
      return {
        searchValue:'',
        params:{
          page:1,
          gameid:''
        },
        errorImg:error,
        errorUserPhoto:'this.src="' + error + '"',
        img_index:0,
        img_list:[],
        bannerList1:[],
        bannerList2:[],
        bannerListAll:[],
        listData:[],
        accountName:'',
        nowPage: 1,//本页
        loading: false,//一步加载时的限制
        bottomHight: 10,//滚动条到某个位置才触发时间
        firstloading:true,
        firstPageNum:null,
        active:0,
        top:36,
        noData:true
      } 
    },
    created:function(){
      let _this = this;
      service.getBanner(function(data){
        data.map(item => {item.img = _this.imgSrc+item.image});
        _this.img_list = data;
      });
      service.getGameBanner(function(data){
        _this. bannerList1 = data.slice(0,5);
        _this. bannerList2 = data.slice(5,10);
        _this.params.gameid =  _this.bannerList1[0].id;
        _this.bannerListAll = data;
        _this.accountName = data[0].name;
        console.log(_this.bannerListAll)
        var pms = JSON.parse(JSON.stringify(_this.params));
        pms.gameid = _this.bannerListAll[0].id
        service.list(function(data){
          console.log(data)
          if(data.code == 1){
            _this.noData = true;
            _this.listData = data.data;
            for(var i=0;i<_this.listData.length; i++){
              var newAttr = JSON.parse(_this.listData[i].attributes);
              _this.listData[i].attributes = newAttr;
              if(_this.listData[i].extends_radio){
                _this.listData[i].extends_radio = JSON.parse(_this.listData[i].extends_radio);
              }
            };
            _this.firstPageNum = data.length;
            _this.firstloading = false;
          }else{
            console.log('数据返回为空');
            _this.noData = false;
          } 
        },pms); 
      });
     
    //   var pms = JSON.parse(JSON.stringify(_this.params))
    //   service.list(function(data){
    //     _this.listData = data;
    //   },pms);
      //添加滚动事件
      
    },
    mounted(){
        let _this = this;
        window.addEventListener('scroll',_this.debounce(_this.handleScroll(_this),1000))
    },
    destroyed: function () {
      let _this = this;
      window.removeEventListener('scroll', _this.$options.methods.handleScroll);   //  离开页面清除（移除）滚轮滚动事件
    },
    methods:{
        debounce(fn,wait){
            let timer, startTimeStamp=0;
            let context, args;
          
            let run = (timerInterval)=>{
              timer= setTimeout(()=>{
                let now = (new Date()).getTime();
                let interval=now-startTimeStamp
                if(interval<timerInterval){ // the timer start time has been reset, so the interval is less than timerInterval
                  console.log('debounce reset',timerInterval-interval);
                  startTimeStamp=now;
                  run(timerInterval-interval);  // reset timer for left time 
                }else{
                  fn.apply(context,args);
                  clearTimeout(timer);
                  timer=null;
                }
                
              },timerInterval);
            }
            return function(){
              context=this;
              args=arguments;
              let now = (new Date()).getTime();
              startTimeStamp=now;
          
              if(!timer){
                console.log('debounce set',wait);
                run(wait);    // last timer alreay executed, set a new timer
              }
              
            }  
        },
        handleScroll(_this){

            //滚动条到底部的距离
            function getScrollBottomHeight() {
            return getPageHeight() - getScrollTop() - getWindowHeight();
        };
        //页面高度
        function getPageHeight() {
            return document.querySelector("html").scrollHeight
        };
        //滚动条顶 高度
        function getScrollTop() {
            var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
            if (document.body) {
                bodyScrollTop = document.body.scrollTop;
            }
            if (document.documentElement) {
                documentScrollTop = document.documentElement.scrollTop;
            }
            scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            return scrollTop;
        };
        function getWindowHeight() {
            var windowHeight = 0;
            if (document.compatMode == "CSS1Compat") {
                windowHeight = document.documentElement.clientHeight;
            } else {
                windowHeight = document.body.clientHeight;
            }
            return windowHeight;
        };
        return function(){
            let v = _this;
            console.log(getScrollBottomHeight(),v.loading, v.loadDown,v.firstPageNum)
            // if (getScrollBottomHeight() <= v.bottomHight && v.nowPage < v.page && v.loading == false) {  
            if (getScrollBottomHeight() <= v.bottomHight && v.loading == false && v.loadDown==false && v.firstPageNum>5) {
                console.log('done')
                v.loading = true;
                var pms = v.params;
                // v.nowPage++;
                v.params.page++
                // v.params.page = v.nowPage;
                service.list(function(data){
                    if(data==null){
                    v.loading = false;
                    v.loadDown = true;
                    return;
                    };
                    for(var j=0;j<data.length; j++){
                    var newAttr = JSON.parse(data[j].attributes);
                    data[j].attributes = newAttr;
                    if(data[j].extends_radio){
                        data[j].extends_radio = JSON.parse(data[j].extends_radio);
                    }
                    };
                    for(var i=0;i<data.length;i++){
                    _this.listData.push(data[i]);
                    }
                    console.log(_this.listData);
                    v.loading = false
                },pms)
            }
        }
        },
        error (item, e) { 
          console.log(1) // 图片加载出错
          if (item.status == 0) {
            e.target.src = errorImg;
            item.status = 1;
          }
        },
        getHotList(index,title){
          let _this = this;
          let gameid;
          _this.bannerListAll.map(function(item){
            if(item.name == title){
              gameid = item.id;
            }
          })
          var pms = JSON.parse(JSON.stringify(_this.params));
          pms.gameid = gameid;
          // console.log(pms)
          service.list(function(data){
            console.log(data)
            if(data.code == 1){
              _this.noData = true;
              _this.listData = data.data;
              for(var i=0;i<_this.listData.length; i++){
                var newAttr = JSON.parse(_this.listData[i].attributes);
                _this.listData[i].attributes = newAttr;
                if(_this.listData[i].extends_radio){
                  _this.listData[i].extends_radio = JSON.parse(_this.listData[i].extends_radio);
                }
              };
              _this.firstPageNum = data.length;
              _this.firstloading = false;
            }else{
              _this.noData = false;
              console.log('数据返回为空');
            }
            
          },pms); 
        },
        onSubmit(){
          console.log(this.searchValue);
          let _this = this;
            
            //跳转到列表页************************************************************************
            // _this.params.name = this.searchValue;
            // var pms = JSON.parse(JSON.stringify(_this.params));
            // service.list(function(data){
            // _this.listData = data;
            // },pms)
        },
    }
  }

