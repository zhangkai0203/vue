import service from "./service";
export default {
    data(){
      return{
        isTenant : true,
        nickname:'',      //用户名
        avatar:'',        //头像
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      //用户信息
      init(){
         let user = JSON.parse(window.localStorage.getItem('user'));
         this.nickname = user.nickname;
         this.avatar = this.imgSrc + user.avatar;
      },
      //租客：待付款 租赁中 已完成 维权锁单
      //号主：租赁中 已完成 撤单 维权锁单 已发布 待审核 审核未通过 已下架
      changeBtn(){
        this.isTenant = !this.isTenant;
      },
      publish(){
        this.$router.push(
          {name: 'publish', 
          //params: {paicheNo: obj.paicheNo}
        })
      },
      toOrder(){
         console.log();
      },
      toAllOrder(){

      },
      myIncome(){  //我的收入
        this.$router.push(
          {name: 'myincome', 
          //params: {paicheNo: obj.paicheNo}
        })
      },
      deposit(){ //缴纳保证金
         this.$router.push(
           {name: 'dispatch',
           //params: {paicheNo: obj.paicheNo}
         })
      },
      security(){ //安全设置
        this.$router.push(
          {name: 'changenum', 
          //params: {paicheNo: obj.paicheNo}
        })
      },
      suggest(){
        this.$router.push(
          {name: 'suggest', 
          //params: {paicheNo: obj.paicheNo}
        })
      },
      service(){
        // this.$router.push(
        //   {name: 'dispatch', 
        //   //params: {paicheNo: obj.paicheNo}
        // })
      },
      partner(){
        this.$router.push(
          {name: 'partner', 
          //params: {paicheNo: obj.paicheNo}
        })
      },
   
    }
  }
