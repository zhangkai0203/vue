<template>
    <div>
        <h2>{{msg}}</h2>
        <slot name="user"></slot>
        <slot name="age"></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                msg: '多个数据插槽'
            }
        }
    }
</script>