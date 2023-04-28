<template>
 <div id='account-info'>
   <button @click='changeState()'>Change Username</button>
   {{username}}
 </div>
</template>
 
<script>
export default {
 props: {
   username: String
 },
 methods: {
   changeState() {
   console.log("asdf")
     this.$emit('changeUsername', 'mattmaribojoc')
   }
 }
}
</script>