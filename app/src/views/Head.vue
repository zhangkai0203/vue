<template>
    <div>
        <h1>{{msg}}</h1>
       <ul>
          <li>home</li>
           <slot></slot>
       </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                msg: '嵌套和插槽数据'
            }
        },
    }
</script>