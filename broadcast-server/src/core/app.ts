import express from "express";
import type { Application, Router } from "express";

export default class App {
    private app: Application;

    constructor(
        private port: Number,
        private baseURL: string,
        private router: Router
    ) {
        this.app = express();
        this.configure();
    }

    private configure() {
        this.app.use(this.baseURL, this.router);
        this.app.listen(this.port, () => 
            console.log(`App listening in port ${this.port}`)
        );
    }
}