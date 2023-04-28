<template>
 <div>
   <account-info :username="user.username" @changeUsername="changeUsername($event)"/>
 </div>
</template>
 
<script>
import AccountInfo from "./AccountInfo.vue";
 
export default {
 components: {
   AccountInfo
 },
 data() {
   return {
     user: {
       username: 'matt'
     }
   }
 },
methods: {
   changeUsername (username) {
   console.log(username)
     this.user.username = username;
   }
} 
}
</script>