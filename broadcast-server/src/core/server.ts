import App from "./app.js";
import express from "express";
import { Router } from "express";

export default class Server {
    router: Router;
    app: App;

    constructor(port: Number, baseURL: string) {
        this.router = Router();
        this.app = new App(port, baseURL, this.router);
        this.configure();
    }

    private configure() {
        this.configureRouter();
    }

    private configureRouter() {
        this.router.use(express.json());
    }
}