<template>
  <div id="nav">
      <router-link to="/templates" @on-click="template()">Templates</router-link> |
      <router-link to="/editor/create" @on-click="create()">New Template</router-link> |
  </div>
  <router-view />
</template>

