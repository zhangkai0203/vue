import service from "./service";
import { Popup,Checker,CheckerItem,Search} from 'vux';
import error from '@/assets/img/error.png'
import BScroll from 'better-scroll'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
      Popup,
      Checker,
      CheckerItem,
      Search,
      swiper, swiperSlide
    },
    data () {
      return {
        swiperOption:{},
        searchValue:'',
        sortValue:'综合排序',
        chooseValue:'综合排序',
        sortWrapShow:false,
        statesWrapShow:false,
        firstloading:true,
        selectedStates:1,
        listData:[],
        params:{
          page:1,
          name:'',
          // order:'',
          // orderBy:''
        },
        box:'',
        nowPage: 1,//本页
        loading: false,//一步加载时的限制,
        bottomHight: 20,//滚动条到某个位置才触发时间
        loadDown:false,
        firstPageNum:'',
        errorImg:error,
        errorUserPhoto:'this.src="' + error + '"',
        //游戏选择组件
        gameSelectShow:false,
        selected_game:{
          name:'',
          list:[],
          selected_css:'selected_li',
          disabled_css:'',
          pid:''
        },
        selected_domain:{
          name:'',
          list:[],
          selected_css:'',
          disabled_css:'fontGray',
          pid:''
        },
        selected_server:{
          name:'',
          list:[],
          selected_css:'',
          disabled_css:'fontGray',
          pid:''
        },
        selected_area:'selected_game',//game domain server
        areaArr : ['selected_game','selected_domain','selected_server'],
        aaa : ['haode','lalalalla','shide','goodsssssss','goooooooodssss','haode','lalalalla','lalalalla','shide','goodsssssss','goodsssssss','goooooooodssss','haode','lalalalla','lalalalla']
      } 
    },
    created:function(){
      let _this = this;
      var pms = JSON.parse(JSON.stringify(_this.params))
      service.list(function(data){
        _this.listData = data;
        console.log(_this.listData)
        for(var i=0;i<_this.listData.length; i++){
          var newAttr = JSON.parse(_this.listData[i].attributes);
          _this.listData[i].attributes = newAttr;
          if(_this.listData[i].extends_radio){
            _this.listData[i].extends_radio = JSON.parse(_this.listData[i].extends_radio);
          }
        };
        if(data != null){
          _this.firstPageNum = data.length;
        }
        _this.firstloading = false
      },pms); 
      // let _this = this;
      //window.addEventListener('scroll', _this.$options.methods.handleScroll(_this));  
    },
    mounted () {
      let _this = this;
      window.addEventListener('scroll',_this.debounce(_this.handleScroll(_this),1000))
      // window.addEventListener('scroll',_this.handleScroll(_this))
      
    },
    // destroyed: function () {
    //   let _this = this;
    //   window.removeEventListener('scroll', _thisthis.handleScroll());   //  离开页面清除（移除）滚轮滚动事件
    // },
    beforeDestroy() {    
      window.removeEventListener("scroll", this.debounce);
      // window.removeEventListener('scroll', this.handleScroll());
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
      backTop () {
        let that = this
        // let timer = setInterval(() => {
        //   let ispeed = Math.floor(document.body.scrollTop / 5)
          // document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed;
          // that.loading = true;
          document.documentElement.scrollTop = document.body.scrollTop = 0;
          // that.loading = true;
        //   if (document.body.scrollTop === 0) {
        //     clearInterval(timer);
        //   }
        // }, 16)
        // let setTimer = setTimeout(()=> {
        //   that.loading = false;
        // },1100)
      },
      loadList(pms){
        service.list(function(data){
          _this.listData = data;
          for(var i=0;i<_this.listData.length; i++){
            var newAttr = JSON.parse(_this.listData[i].attributes);
            _this.listData[i].attributes = newAttr;
            if(_this.listData[i].extends_radio){
              _this.listData[i].extends_radio = JSON.parse(_this.listData[i].extends_radio);
            }
          };
        },pms)
      },
      statesOpen(){
        let _this = this;
        _this.sortWrapShow = false;
        _this.statesWrapShow = !_this.statesWrapShow;
      },
      sortWrapOpen(){
        let _this = this;
        _this.sortWrapShow = !_this.sortWrapShow;
      },
      toDetails(val){
        this.$router.push({
          name: 'shopdetails',
          params: {
            id: val
          }
        })
      },
      //***************************/操作游戏选择**********************************
      gameSelectOpen(){
        let _this = this;
        _this.sortWrapShow = false;
        _this.gameSelectShow = !_this.gameSelectShow;
        if(_this.selected_game.list.length == 0){
          service.gameSelList(function(data){
            data.map(item => {item.selected_css = ''})
            _this.selected_game.list = data
            _this.aaa=data
          })
        }
        
      },
      selectedArea(val){
        let _this = this;
        if(_this[val].disabled_css == 'fontGray')return
        _this[_this.selected_area].selected_css = '';
        _this.selected_area = val;
        _this[_this.selected_area].selected_css = 'selected_li';
        _this.aaa = _this[_this.selected_area].list;


      },
      selectedList(val){
        let _this = this;
        var index = _this.areaArr.indexOf(_this.selected_area);
        _this[_this.selected_area].name = val.name;
        _this[_this.selected_area].pid = val.id;
        _this[_this.selected_area].list.map(item => {item.selected_css = ''})

        val.selected_css = 'yellow_p';

        console.log(_this.aaa)
        if (index != _this.areaArr.length-1){
          _this[_this.selected_area].selected_css = '';
          _this[_this.areaArr[index+1]].selected_css = 'selected_li';
          _this[_this.areaArr[index+1]].disabled_css = '';
          _this[_this.areaArr[index+1]].name = '';
          _this[_this.areaArr[index+1]].pid = '';
          _this.selected_area = _this.areaArr[index+1];
          var pms = {
            pid : val.id
          }
          service.gameSelList(function(data){
            data.map(item => {item.selected_css = ''})
            _this[_this.areaArr[index+1]].list = data
            _this.aaa=data
           },pms)
        }        
        //置灰后面的teb
        if(_this.areaArr.length - index > 2){
          for (var i = index+2; i < _this.areaArr.length; i++) { 
                _this[_this.areaArr[i]].disabled_css='fontGray';
                _this[_this.areaArr[i]].name='';
                _this[_this.areaArr[i]].pid='';
          }
        }

      },
      resetArea(){
        let _this = this
        _this.selected_game = {
          name:'',
          list:[],
          selected_css:'selected_li',
          disabled_css:'',
          pid:''
        };

        _this.selected_domain={
          name:'',
          list:[],
          selected_css:'',
          disabled_css:'fontGray',
          pid:''
        };
        _this.selected_server={
          name:'',
          list:[],
          selected_css:'',
          disabled_css:'fontGray',
          pid:''
        };
        _this.selected_area = 'selected_game'

        service.gameSelList(function(data){
            data.map(item => {item.selected_css = ''})
            _this.selected_game.list = data
            _this.aaa=data
        })
      },
      confirm(){
        let _this = this;
        _this.gameSelectShow = !_this.gameSelectShow;
        _this.params.gameid = _this.selected_game.pid
        _this.params.system_id = _this.selected_domain.pid 
        _this.params.client_id = _this.selected_server.pid 
        _this.params.name = null;
        _this.params.page = 1;
        _this.params.order = null;
        _this.params.orderby = null;
        _this.params.price = null;
        _this.loadDown = false;
        _this.listData = [];
        _this.backTop ();  
        var pms = JSON.parse(JSON.stringify(_this.params))
        service.list(function(data){
          _this.listData = data;
          console.log(_this.listData)
          for(var i=0;i<_this.listData.length; i++){
            var newAttr = JSON.parse(_this.listData[i].attributes);
            _this.listData[i].attributes = newAttr;
            if(_this.listData[i].extends_radio){
              _this.listData[i].extends_radio = JSON.parse(_this.listData[i].extends_radio);
            }
          };
          if(data != null){
            _this.firstPageNum = data.length;
          }
          _this.firstloading = false
        },pms); 
      },

      //***********************/操作游戏选择 结束**********************************
      onSubmit(){
        let _this = this;
        _this.params.name = this.searchValue;
        _this.params.page = 1;
        _this.params.order = null;
        _this.params.orderby = null;
        _this.params.price = null;
        _this.loadDown = false;
        _this.listData = [];
        _this.backTop ();
        var pms = JSON.parse(JSON.stringify(_this.params));
        service.list(function(data){
          _this.listData = data;
          for(var i=0;i<_this.listData.length; i++){
            var newAttr = JSON.parse(_this.listData[i].attributes);
            _this.listData[i].attributes = newAttr;
            if(_this.listData[i].extends_radio){
              _this.listData[i].extends_radio = JSON.parse(_this.listData[i].extends_radio);
            }
          };
        },pms)
      },
      onItemClick (value, disabled) {
        console.log(value, disabled)
        let _this = this;
        _this.loadDown = false;
        _this.backTop ();
        _this.params.page = 1;
        _this.listData = [];
        _this.params.price = value;
        if (!this.disabled) {
          _this.statesWrapShow = false
        };
        var pms = JSON.parse(JSON.stringify(_this.params));
        service.list(function(data){
          _this.listData = data;
          for(var i=0;i<_this.listData.length; i++){
            var newAttr = JSON.parse(_this.listData[i].attributes);
            _this.listData[i].attributes = newAttr;
            if(_this.listData[i].extends_radio){
              _this.listData[i].extends_radio = JSON.parse(_this.listData[i].extends_radio);
            }
          };
        },pms)
      },
      //选择综合排序下的项，改变对应的样式,请求链接
      priceSort(val){
        let _this = this;
        _this.sortValue = val;
        _this.chooseValue = val;
        _this.sortWrapShow = !_this.sortWrapShow;
        _this.loadDown = false;
        _this.backTop ();
        _this.params.page = 1;
        _this.params.price = null;
        _this.listData = [];
        if(_this.chooseValue == '综合排序'){
          // _this.params.page = 1;
          _this.params.order = null;
          _this.params.orderby = null;
          var pms = JSON.parse(JSON.stringify(_this.params));
          service.list(function(data){
            _this.listData = data;
            for(var i=0;i<_this.listData.length; i++){
              var newAttr = JSON.parse(_this.listData[i].attributes);
              _this.listData[i].attributes = newAttr;
              if(_this.listData[i].extends_radio){
                _this.listData[i].extends_radio = JSON.parse(_this.listData[i].extends_radio);
              }
            };
          },pms)
        }else{
          if(_this.chooseValue == '价格由低到高'){
            // _this.params.page = 1;
            _this.params.order = 'price_hours';
            _this.params.orderby = 1;
            var pms = JSON.parse(JSON.stringify(_this.params));
            service.list(function(data){
              _this.listData = data;
              for(var i=0;i<_this.listData.length; i++){
                var newAttr = JSON.parse(_this.listData[i].attributes);
                _this.listData[i].attributes = newAttr;
                if(_this.listData[i].extends_radio){
                  _this.listData[i].extends_radio = JSON.parse(_this.listData[i].extends_radio);
                }
              };
            },pms)
          }else{
            // _this.params.page = 1;
            _this.params.order = 'price_hours';
            _this.params.orderby = 2;
            var pms = JSON.parse(JSON.stringify(_this.params));
            service.list(function(data){
              _this.listData = data;
              for(var i=0;i<_this.listData.length; i++){
                var newAttr = JSON.parse(_this.listData[i].attributes);
                _this.listData[i].attributes = newAttr;
                if(_this.listData[i].extends_radio){
                  _this.listData[i].extends_radio = JSON.parse(_this.listData[i].extends_radio);
                }
              };
            },pms)
          }
        }
         console.log(_this.listData)
      },
      //选择销量优先，改变对应的样式,请求链接
      screen(){
        let _this = this;
        this.chooseValue = "销量优先";
        this.sortValue = '综合排序';
        _this.sortWrapShow = false;
        _this.loadDown = false;
        _this.params.price = null;
        _this.params.page = 1;
        _this.params.order = 'had_sale_count';
        _this.params.orderby = 2;
        _this.listData = [];
        // document.body.scrollTop = 0;
        _this.backTop ()
        var pms = JSON.parse(JSON.stringify(_this.params));
        service.list(function(data){
          _this.listData = data;
          for(var i=0;i<_this.listData.length; i++){
            var newAttr = JSON.parse(_this.listData[i].attributes);
            _this.listData[i].attributes = newAttr;
            if(_this.listData[i].extends_radio){
              _this.listData[i].extends_radio = JSON.parse(_this.listData[i].extends_radio);
            }
          };
        },pms)
        console.log(_this.listData)
      },
      // handleScroll(_this) {
      //   console.log(window.scrollY);
      //   let v = _this;
      //   // if (getScrollBottomHeight() <= v.bottomHight && v.nowPage < v.page && v.loading == false) {
      //   if (getScrollBottomHeight() <= v.bottomHight && v.loading == false) {
      //       v.loading = true;
      //       var pms = v.params;
      //       service.list(function(data){
      //         _this.listData = data;
      //         v.nowPage++
      //         v.params.page = v.nowPage;
      //         v.loading = false
      //         // console.log(data)
      //       },pms)
      //   }
      //   //滚动条到底部的距离
      //   function getScrollBottomHeight() {
      //     return getPageHeight() - getScrollTop() - getWindowHeight();
      //   };
      //   //页面高度
      //   function getPageHeight() {
      //     return document.querySelector("html").scrollHeight
      //   };
      //   //滚动条顶 高度
      //   function getScrollTop() {
      //     var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      //     if (document.body) {
      //         bodyScrollTop = document.body.scrollTop;
      //     }
      //     if (document.documentElement) {
      //         documentScrollTop = document.documentElement.scrollTop;
      //     }
      //     scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      //     return scrollTop;
      //   };
      //   function getWindowHeight() {
      //     var windowHeight = 0;
      //     if (document.compatMode == "CSS1Compat") {
      //         windowHeight = document.documentElement.clientHeight;
      //     } else {
      //         windowHeight = document.body.clientHeight;
      //     }
      //     return windowHeight;
      //   };
      // }
    }
  }

  