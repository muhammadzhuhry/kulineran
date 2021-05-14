<template>
  <router-view/>
  <Footer/>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.0/font/bootstrap-icons.css");
</style>

<script>
import Footer from "@/components/Footer";

export default {
  components: {
    Footer
  }  
}
</script>