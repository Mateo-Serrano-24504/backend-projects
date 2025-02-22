import express, { Router } from "express"

import { ArticleController } from "../controllers/articleController.js";
import { basicAuthMiddleware } from "../middlewares/authMiddleware.js";

export const articleRouter = Router();

// Access special pages

articleRouter.get("/edit/:id", basicAuthMiddleware, ArticleController.getEditPage);

// This must come before other endpoints because
// it could be confused with 'article/:id' with 'new'
// as an id
articleRouter.get("/new", basicAuthMiddleware, ArticleController.getEditPage);


// CRUD

articleRouter.post("/", basicAuthMiddleware, express.json(), ArticleController.addArticle);

articleRouter.get("/:id", ArticleController.getArticleById);

articleRouter.put("/:id", basicAuthMiddleware, express.json(), ArticleController.updateArticle);

articleRouter.delete("/:id", basicAuthMiddleware, ArticleController.removeArticle);