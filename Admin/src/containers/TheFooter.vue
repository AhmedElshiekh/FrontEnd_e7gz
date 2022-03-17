<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://aisent.net" target="_blank">E7gz</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}}.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://aisent.net" target="_blank">Aisent</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
