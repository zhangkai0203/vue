import service from "./service";
import Vue from 'vue';
import { Popup } from 'vux';
export default {
    components: {
      Popup
    },
    data () {
      return {
        gameAccount:'',
        gameCode:'',
        gameName:'',
        gameRank:'',
        oneHour:'',
        threeHour:'',
        sixHour:'',
        twelveHour:'',
        night:'',
        week:'',
        price_buy:'',
        //游戏选择组件
        gameSelectShow:false,
        ifGameName : false,
        ifRentSell:false,
        showRentSell:false,
        rentSelColumn : ['只可租','只可售','可租可售'],
        selectedRS:'',
        rent:false,
        sell:false,
        buy_type:null,
        selectedGame : '',
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
        aaa : [],
      } 
    },
    created:function(){},
    beforeRouteLeave:function(to, from , next){
      let _this = this;
      if(!_this.selected_game.pid || !_this.selected_domain.pid || !_this.selected_server.pid){
        alert('请填写完整信息');
        next(false);
        return
      }
      if(!_this.gameAccount || !_this.gameCode || !_this.gameName || !_this.gameRank ||!_this.buy_type){
        alert('请填写完整信息');
        next(false);
        return;
      }
      if(_this.buy_type == 1){
        if(!_this.oneHour || !_this.threeHour || !_this.sixHour || !_this.twelveHour || !_this.night || !_this.week){
          alert('请填写完整信息');
          next(false);
          return;
        }
      }else if(_this.buy_type == 2){
        if(!_this.price_buy){
          alert('请填写完整信息');
          next(false);
          return;
        }
      }else{
        if(!_this.oneHour || !_this.threeHour || !_this.sixHour || !_this.twelveHour || !_this.night || !_this.week ||!_this.price_buy){
          alert('请填写完整信息');
          next(false);
          return;
        }
      }
      let pms = {
        role_name : _this.gameName,
        grade : _this.gameRank,
        account_name : _this.gameAccount,
        account_pwd : _this.gameCode,
        // price_night : _this.night,
        // price_week : _this.week,
        gameid : _this.selected_game.pid,
        system_id : _this.selected_domain.pid,
        client_id : _this.selected_server.pid,
        // price_list : {
        //   1 : _this.oneHour,
        //   3 : _this.threeHour,
        //   6 : _this.sixHour,
        //   12 : _this.twelveHour
        // },
        price_buy : _this.price_buy,
        buy_type : _this.buy_type
      }
      if(_this.buy_type == 1){
        pms.price_list = {
          1 : _this.oneHour,
          3 : _this.threeHour,
          6 : _this.sixHour,
          12 : _this.twelveHour
        };
        pms.price_night = _this.night;
        pms.price_week =  _this.week;
        
      }else if(_this.buy_type == 2){
        pms.price_buy = _this.price_buy;          
      }else{
        pms.price_list = {
          1 : _this.oneHour,
          3 : _this.threeHour,
          6 : _this.sixHour,
          12 : _this.twelveHour
        };
        pms.price_night = _this.night;
        pms.price_week =  _this.week;
        pms.price_buy = _this.price_buy;  
      }
      sessionStorage.setItem('pms',JSON.stringify(pms));
      next();
    },
    methods:{
      nextStep(){
        let _this = this;
        this.$router.push({
          name: 'steptwo',
        });
        // sessionStorage session   Storage.setItem("heName02", "林俊杰");  sessionStorage.getItem("heName")
      },
      checkMoney(value){
        console.log(value)
        var regex = /^(([+]?\d*$)|(^[+]?\d+(\.\d+)?$))/;
        if(regex.test(value)) {
            return;
        } else {
            value = '';
            return;
        }
      },
      rentSellOpen(){
        let _this = this;
        _this.showRentSell = !_this.showRentSell;
      },
      onConfirm(value,index){
        let _this = this;
        _this.showRentSell = false;
        _this.ifRentSell = true;
        if(value == '只可租'){
          _this.buy_type = 1;
          _this.rent = true;
          _this.sell = false;
          _this.selectedRS = '只可租';
        }
        if(value == '只可售'){
          _this.buy_type = 2
          _this.rent = false;
          _this.sell = true;
          _this.selectedRS = '只可售';
        }
        if(value == '可租可售'){
          _this.buy_type = 3;
          _this.rent = true;
          _this.sell = true;
          _this.selectedRS = '可租可售';
        }
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
        _this.ifGameName = false,
        service.gameSelList(function(data){
            data.map(item => {item.selected_css = ''})
            _this.selected_game.list = data
            _this.aaa=data
        })
      },
      confirm(){
        let _this = this;
        _this.gameSelectShow = !_this.gameSelectShow;
        if( _this.selected_game.pid || _this.selected_domain.pid || _this.selected_server.pid){
          _this.ifGameName  = true
        };
        _this.selectedGame = _this.selected_game.name+'/'+_this.selected_domain.name+'/'+ _this.selected_server.name;
      }
      //***********************/操作游戏选择 结束**********************************
     
    }
  }

  