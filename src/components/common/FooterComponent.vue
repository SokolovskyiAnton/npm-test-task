<template>
  <q-footer class="footer">
    <div class="container flex justify-center items-center full-height">
        <span class="q-mr-md">Author: Anton Sokolovskyi</span>
        <a target="_blank" href="https://github.com/SokolovskyiAnton">Github</a>
    </div>
  </q-footer>
</template>

<script setup lang="ts"></script>

<style lang="stylus" scoped>
.footer
  height 120px
  background var(--footer-bg)
  border-top 1px solid rgba(0, 0, 0, .1)
  > div
    color var(--text-color-main)
    > a
      color inherit
</style>
