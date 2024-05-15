<template>
  <div  class="article" >
    <div v-if="Object.keys(article).length !== 0" class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-12 mx-5">
      <div>
        <img :src="'/storage/' + article.image" alt="Article Image" class="object-cover w-full h-auto rounded-lg">
      </div>
      <div class="article-details">
        <span class="text-sky-500 uppercase tracking-wider">{{ article.category }}</span>
        <h1 class="mt-4 text-xl font-semibold text-gray-800">{{ article.title }}</h1>
        <p class="mt-2 text-gray-500">{{ article.author }}</p>
        <div class="flex items-center justify-between mt-4">
          <div>
            <a :href="'/author/' + article.author_slug" class="text-lg font-medium text-gray-700 hover:underline hover:text-gray-500">{{ article.author_name }}</a>
            <p class="text-sm text-gray-500">{{ formatDate(article.created_at) }}</p>
          </div>
        </div>
        <div class="text mt-4">
          {{ article.text }}
        </div>
        <br>
        <hr>
        <br>
        <!-- Edit and Delete Buttons -->
        <button @click="editArticle" class="px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Edit</button>
        <button @click="deleteArticle" class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Delete</button>
      </div>
    </div>
    <div v-else class=" w-full mt-20 mx-5  flex  justify-center">
      <br> 
    <h3 class="mt-2 text-gray-500">Article Not found</h3>
  </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      article:{},
      id: ''
    }
  },
  mounted() {
    this.id = this.$route.params.articleId;
    this.fetchArticle();
  },
  methods: {
    fetchArticle() {
      fetch(`/api/article/${this.id}`)
        .then(response => response.json())
        .then(data => {
          this.article = data;
          console.log(data);
        })
        .catch(error => {
          console.error('Error fetching articles:', error);
        });
    },
     async deleteArticle  () {
         try {
             const response = await fetch(`/api/articles/${this.id}`, {
                 method: "DELETE",
             });

             if (!response.ok) {
                 throw new Error("Failed to delete article");
             }
           this.article = {};
             console.log("Article deleted successfully");
             // Optionally, you can navigate to a different route after deletion
         } catch (error) {
             console.error("Error deleting article:", error);
             // Handle error if necessary
         }
     },
    formatDate(date) {
      // Implement your date formatting logic here
      return new Date(date).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.article {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
  min-height: 500px;
}

.article-details {
  margin-top: 10px;
}
</style>
