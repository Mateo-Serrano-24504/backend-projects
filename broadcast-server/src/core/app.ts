import express from "express";
import type { Application, Router } from "express";

export default class App {
    private app: Application;
    private port: Number;
    private baseURL: string;
    private router: Router;

    constructor(port: Number, baseURL: string, router: Router) {
        this.app = express();
        this.port = port;
        this.baseURL = baseURL;
        this.router = router;
        this.configure();
    }

    private configure() {
        this.app.use(this.baseURL, this.router);
        this.app.listen(this.port, () => 
            console.log(`App listening in port ${this.port}`)
        );
    }
}