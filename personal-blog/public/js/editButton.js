const applyButton = document.getElementById("apply-button");
const titleTextarea = document.getElementById("title-area");
const contentTextarea = document.getElementById("content-area");

applyButton.addEventListener("click", async e => {
    e.preventDefault();
    const button = e.target;
    const id = button.dataset.articleId;
    if (id) {
        await fetch(`/article/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleTextarea.value,
                content: contentTextarea.value
            })
        });
    } else {
        await fetch("/article", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titleTextarea.value,
                content: contentTextarea.value
            })
        });
    }
    window.location.href = document.referrer;
});