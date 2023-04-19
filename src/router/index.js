import { createWebHistory, createRouter } from "vue-router";
import Templates from "@/views/Templates.vue";
import Editor from "@/views/Editor.vue";

const routes = [
  {
    path: "/templates",
    name: "Templates",
    component: Templates,
  },
  {
    path: "/editor/create",
    name: "Creates",
    component: Editor,
  },  
  {
    path: "/editor/edit/:id",
    name: "Editor",
    component: Editor,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;