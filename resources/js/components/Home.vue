

<template>
      <section class="container mx-auto px-4 py-10 lg:py-16">
    <div v-for="(articles, category) in categories" :key="category" class="mb-12">
      <div class="flex items-center justify-between">
        <h2 class="text-gray-800 font-bold text-3xl">{{ category }}</h2>
        <button class="flex items-center px-4 py-2.5 font-medium tracking-wide text-sky-500 capitalize transition-colors duration-300 transform border border-sky-500 rounded-lg hover:bg-sky-50 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-opacity-80">
          <button  @click="exploreCategory(category)" class="mx-1">Explore All</button >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 mx-1 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 mt-12 xl:grid-cols-3">
        <div v-for="article in articles" :key="article.id">
          <img src="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" class="object-cover object-center w-full h-64 rounded-lg lg:h-80" alt="">
          <div class="mt-8">
            <span class="text-sky-500 uppercase tracking-wider">{{ article.category }}</span>
            <h1 class="mt-4 text-xl font-semibold text-gray-800 truncate">
              {{ article.title }}
            </h1>
            <p class="mt-2 text-gray-500">
              {{ article.excerpt }}
            </p>
            <div class="flex items-center justify-between mt-4">
              <div>
                <a :href="'/author/' + article.author_slug" class="text-lg font-medium text-gray-700 hover:underline hover:text-gray-500">
                  {{ article.author_name }}
                </a>
                <p class="text-sm text-gray-500">{{ article.publish_date }}</p>
              </div>
              <a :href="'/article/' + article.slug" class="inline-block text-sky-500 underline hover:text-sky-400">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      categories: {},
    };
  },
  mounted() {
    fetch('/api/articles-by-category')
      .then(response => response.json())
      .then(data => {
        this.categories = data;
      });
    },
    methods: {
    exploreCategory(category) {
      this.$router.push({ name: 'Category', params: { category: category.toLowerCase() } });
    },
  }
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>

