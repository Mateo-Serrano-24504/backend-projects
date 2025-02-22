// The use of JS is not compulsory, but if I didn't use JS I'd
// have to send a form to the backend with the method POST and
// a query parameter in the action value, as HTML does not
// support DELETE and PUT methods, to delete and update posts,
// and then use a middleware to process the request correctly.
// It'd make things rather complicated, so I'll just use a bit
// of JS to process requests

const deleteButtons = document.querySelectorAll(".delete");
const editButtons = document.querySelectorAll(".edit");
const visitButtons = document.querySelectorAll(".visit");

const addButton = document.getElementById("add-button");

deleteButtons.forEach(button => {
    button.addEventListener("click", async e => {
        const articleId = e.target.dataset.articleId;
        const res = await fetch("/article/" + articleId, { method: "DELETE" });

        if (!res.ok) {
            throw new Error(`Error on delete request. Article id: ${articleId}`);
        }

        document.getElementById(articleId).remove();
    });
});

editButtons.forEach(button => {
    button.addEventListener("click", async e => {
        const articleId = e.target.dataset.articleId;
        window.location.href = `/article/edit/${articleId}`;
    });
});

visitButtons.forEach(button => {
    button.addEventListener("click", e => {
        const articleId = e.target.dataset.articleId;
        window.location.href = `/article/${articleId}`;
    });
});

addButton.addEventListener("click", e => {
    window.location.href = "/article/new";
});