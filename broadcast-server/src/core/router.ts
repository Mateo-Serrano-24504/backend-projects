import express from "express";
import { Router as ExpressRouter } from "express";

export default class Router {
    private router: ExpressRouter;

    constructor() {
        this.router = ExpressRouter();
        this.configure();
    }

    private configure() {
        this.router.use(express.json());
        this.configureEndpoints();
    }

    private configureEndpoints() {

    }

    unwrap(): ExpressRouter {
        return this.router;
    }
}