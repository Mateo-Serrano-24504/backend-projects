import { writeFile } from "node:fs";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";

import { ARTICLES_DATA } from "../config/databaseConfig.js";
import { getDate } from "../utils/dates.js";

export class ArticleModel {
    // This class should operate on a database
    // Most of its methods will read, update and save
    // changes, but when refactored to operate on a
    // database, this will be avoided

    // All methods are async - await

    // Auxiliar methods 
    static async parseArticle({ title, content }) {
        return {
            id: randomUUID(),
            updateDate: getDate(),
            creationDate: getDate(),
            title,
            content
        }
    }

    // Operations that retreive data from the 'database'
    // will not throw any error, and return only the
    // information that was asked. The status of the
    // operation is deduced from the result
    static async getAllArticles() {
        const articles = await readFile(ARTICLES_DATA, "utf8");
        return JSON.parse(articles);
    }

    static async getArticleById(id) {
        const articles = await ArticleModel.getAllArticles();
        return articles.find(article => article.id === id);
    }

    // Operations that modify the 'database' will
    // return the status of the operation
    static async addArticle(article) {
        const articles = await ArticleModel.getAllArticles();
        const parsedArticle = await ArticleModel.parseArticle(article);

        if (articles.find(art => art.id === parsedArticle.id)) {
            return 401;
        }

        articles.push(parsedArticle);
        await writeFile(ARTICLES_DATA, JSON.stringify(articles, null, 2), "utf-8", () => {});
        return 201
    }

    static async updateArticle(id, article) {
        const articles = await ArticleModel.getAllArticles();
        const articleIndex = articles.findIndex(art => art.id === id);

        if (articleIndex >= 0) {
            articles[articleIndex].title = article.title;
            articles[articleIndex].content = article.content;
            articles[articleIndex].updateDate = getDate();
            await writeFile(ARTICLES_DATA, JSON.stringify(articles, null, 2), "utf8", () => {});
        }

        return 200;
    }

    static async removeArticle(id) {
        const articles = await ArticleModel.getAllArticles();
        const updatedArticles = articles.filter(art => art.id !== id);
        await writeFile(ARTICLES_DATA, JSON.stringify(updatedArticles, null, 2), "utf8", () => {});
        return 200;
    }
}