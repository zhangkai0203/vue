import service from "./service";
import Vue from 'vue';
import axios from 'axios';
import { Group,XTextarea  } from 'vux';
import { Uploader,Image,Picker,Popup,Icon,Field,CellGroup} from 'vant';
import img from '@/assets/img/upload.png';
import $ from 'jquery'
Vue.use(Uploader);
Vue.use(Image);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Icon);
Vue.use(Field);
Vue.use(CellGroup);
export default {
    components: {
      Popup,
      XTextarea ,
      Group,
      Icon
    },
    data () {
      return {
        firstData : null,
        attrData : [],
        goodsDes:'',
        goodsName:'',
        pikerColumn: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        pikerTitle:'',
        pikerId:null,
        attrSelId:null,
        showPicker:false,
        showAttrsSel : false,
        showAttrsList:null,
        fileList: [],
        fileLocationList: [],
        filestring: '',
        upLoadImg : img,
        selectedTitle:'',
      } 
    },
    created:function(){
      let _this = this;
      _this.firstData = JSON.parse(sessionStorage.getItem('pms'))
      var pms = {
        cat_id : _this.firstData.gameid,
        // cat_id : 6
      }
      service.getAttributes(function(data){
        if(data.code ==1){
          let dataList = data.data;
          dataList.map(dataList => {dataList.attr_sel=false})
        _this.attrData = dataList;
        }else{
          alert('请求失败')
          return
        }
      },pms)
    },
  
    methods:{  
      selectedAttr(item){
        let type = item.attr_type;
        let id = item.attr_id;
        let values = item.attr_values;
        let sel = item.attr_sel;
        let name = item.attr_name;
        console.log(item)
        let _this = this;
        if(type == 2){  //打开单选框
          _this.showPicker = !_this.showPicker;
          _this.pikerColumn = values; 
          _this.pikerTitle = name;
          _this.pikerId = id;
        }else{
          _this.showAttrsSel = !_this.showAttrsSel;
          _this.attrSelId = id;
          _this.selectedTitle = name;
          if( sel == false){
            for(var i =0;i<_this.attrData.length;i++){
              if(_this.attrData[i].attr_id ==id){
                let newValues = [];
                let attrList = _this.attrData[i].attr_values;
                attrList.map(item => {
                  var Nitem = {
                    name : item,
                    ifSelLi: false
                  }
                  newValues.push(Nitem);
                })
                _this.attrData[i].attr_values = newValues;
                _this.attrData[i].attr_sel = true;
                _this.showAttrsList = newValues;
              }
            }
          }else{
            _this.showAttrsList = values;
          }
        } 
      },
      selectedList(item){
        let _this = this;
        item.ifSelLi = !item.ifSelLi
      },
      confirm(){
        let _this = this;
        this.showAttrsSel = false;
        for(var i =0;i<_this.attrData.length;i++){
          if(_this.attrSelId == _this.attrData[i].attr_id){
            var arr = [];
            for(var key in _this.attrData[i].attr_values){
              if(_this.attrData[i].attr_values[key].ifSelLi == true){
                arr.push(_this.attrData[i].attr_values[key].name)
              }
            }
            console.log(arr)
            _this.attrData[i].attr_selected = arr;
          }
        }
      console.log(_this.attrData)  
      },
      onConfirm(value){
        let _this = this;
        _this.showPicker = false;
        for(var i =0;i<_this.attrData.length;i++){
          if(_this.pikerId == _this.attrData[i].attr_id){
            _this.attrData[i].attr_selected = value;
          }
        }
        console.log(value)
      },
      uploadImg(file){
        if(Array.isArray(file)){  //多选上传图片
          for(var k=0;k<file.length;k++){
            this.pressImg(file[k])
          }
        }else{
          this.pressImg(file)
        }
        console.log(Array.isArray(file))
     
       
      },
      pressImg(file){
        let _this = this;
        lrz( file.file, {
          width : 600,
          quality: 0.8 //自定义使用压缩方式
        })
        .then(function(rst){
          let config = {
            headers: { "Content-Type": "multipart/form-data" }
          };
          // 发送请求;
          axios.get('api/game/uploadfile',rst.formData,config).then(res => {
            // console.log(res)
            if (res.data.code == 1) {
              var src = Vue.prototype.imgSrc+res.data.data
              var obj = {
                content : src
              }
              _this.fileLocationList.push(obj);
              _this.fileList = _this.fileLocationList;
            }else{
              console.log('fail')
              return
            }
            console.log(_this.fileList)
          })
        })
      },
      delImg(file){
        let _this = this;
        _this.fileLocationList = _this.fileList;       
      }, 
      publish(){  
        let _this = this;
        var attributes = {};
        var extends_radio = {};
        var extends_check = {};
        for(var i=0;i<_this.attrData.length;i++){
          if(_this.attrData[i].attr_type == 1){
            if(!_this.attrData[i].attr_values){
              // debugger
              alert('请填写完整信息');
              return
            }else{
              attributes[_this.attrData[i].attr_name] = _this.attrData[i].attr_values;
            }
          }else if(_this.attrData[i].attr_type == 2){
            if(!_this.attrData[i].attr_selected){
              // debugger
              alert('请填写完整信息');
              return
            }else{
              extends_radio[_this.attrData[i].attr_name] = _this.attrData[i].attr_selected;
            }
          }else{
            if(!_this.attrData[i].attr_selected){
              // debugger
              alert('请填写完整信息');
              return
            }else{
              extends_check[_this.attrData[i].attr_name] = _this.attrData[i].attr_selected;
            }
          }
        };
        if(!_this.goodsName || !_this.goodsDes){
          alert('请填写完整信息');
          return
        }
        let fileString = '';
        for(var j=0;j<_this.fileList.length;j++){  
          let str = _this.fileList[j].content;
          let strSub = str.split('.cn')[1];
          fileString += strSub+','
        }  
        var pms = JSON.parse(JSON.stringify(_this.firstData))
        pms.title = _this.goodsName;
        pms.content = _this.goodsDes;
        pms.attributes = attributes;
        pms.extends_check = extends_check;
        pms.extends_radio = extends_radio;
        pms. images = fileString;
        // console.log(this.attrData,attributes,extends_check,extends_radio)
        service.release(function(data){
          console.log(data)
        },pms)
      },
    }
  }

  