import { parseArticle } from "../schemas/articleSchema.js";
import { ArticleModel } from "../models/articleModel.js";

export class ArticleController {
    static async getArticleById(req, res) {
        const { id } = req.params;
        const article = await ArticleModel.getArticleById(id);
        if (article) {
            res.render("article", { article });
        } else {
            res.status(404).send("<h1>404: Could not find the article<h1>");
        }
    }

    static async addArticle(req, res) {
        const { title, content } = req.body;

        const { success, data: article } = parseArticle({ title, content });

        if (!success) {
            res.status(400).send("Invalid article format");
        }

        const status = await ArticleModel.addArticle({ title, content });
        res.status(status);

        res.send(status === 201 ? "Sucessfully added a new article" : "Error when adding a new article");
    }

    static async updateArticle(req, res) {
        const { id } = req.params;
        const { title, content } = req.body;
        const status = await ArticleModel.updateArticle(id, { title, content });
        res.status(status).send()
    }

    static async removeArticle(req, res) {
        const { id } = req.params;
        const status = await ArticleModel.removeArticle(id);
        res.status(status).send()
    }

    static async getEditPage(req, res) {
        const { id } = req.params;
        const article = id ? await ArticleModel.getArticleById(id) : undefined;
        const title = id ? "Edit" : "Create";
        res.render("edit", { title, article });
    }
}