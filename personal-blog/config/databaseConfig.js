// This should contain the database configuration,
// but as I'm not using one, I'll just add the
// path to the articles' json and create file

import { openSync, closeSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";

export const ARTICLES_DATA = join("data", "articles.json");

export const setUpArticles = () => {
    try {
        mkdirSync(dirname(ARTICLES_DATA), { recursive: true });
        const file = openSync(ARTICLES_DATA, "r");
        closeSync(file);
    } catch (_error) {
        writeFileSync(ARTICLES_DATA, JSON.stringify([], null, 2), "utf8");
    }
}