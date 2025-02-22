import { UserModel } from "../models/userModel.js";
import { ArticleModel } from "../models/articleModel.js";

export class UserController {
    static async getHomePage (req, res) {
        const articles = await ArticleModel.getAllArticles();
        const user = await UserModel.getInvalidUser();
        res.render("home", { user, articles });
    }

    static async getAdminHomePage (req, res) {
        const articles = await ArticleModel.getAllArticles();
        const user = await UserModel.getValidUser();
        res.render("home", { user, articles });
    }
}