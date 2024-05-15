import { ref ,getCurrentInstance} from "vue";

export default function useArticleForm() {
    const router = getCurrentInstance().proxy.$router;

    const form = ref({
        title: "",
        category: "",
        author: "",
        text: "",
        image: null,
    });

    const errors = ref({});
    const generalError = ref(null);

    const submitForm = async () => {
        const formData = new FormData();
        formData.append("title", form.value.title);
        formData.append("category", form.value.category);
        formData.append("author", form.value.author);
        formData.append("text", form.value.text);
        formData.append("image", form.value.image);

        try {
            const response = await fetch("/api/articles", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    errors.value = data.errors; // Set validation errors
                } else {
                    generalError.value =
                        "Failed to create article. Please try again."; // Set general error message
                }
            } else {
                console.log("Article created:", data);
                router.push({ name: 'SingleArticle', params: { articleId: data.id } });
            }
        } catch (error) {
            console.error("Error creating article:", error);
            generalError.value = "Failed to create article. Please try again."; // Set general error message
        }
    };

    const handleFileUpload = (event) => {
        form.value.image = event.target.files[0];
    };

    return { form, errors, generalError, submitForm, handleFileUpload };
}
