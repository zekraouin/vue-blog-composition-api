import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Articles from "./components/Articles.vue";
import Article from "./components/Article.vue";
import ArticleForm from "./components/ArticleForm.vue";
import CategoryArticles from "./components/CategoryArticles.vue";

const routes = [
    { path: "/", component: Home },
    { path: "/articles", component: Articles },
    {
        path: "/category/:category",
        name: "Category",
        component: CategoryArticles,
    },
    {
        path: "/articles/create",
        name: "ArticleForm",
        component: ArticleForm,
    },
    {
        path: "/article/:articleId",
        name: "SingleArticle",
        component: Article,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
