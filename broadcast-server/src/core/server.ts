import http from "http";

import App from "./app.js";
import Router from "./router.js"

export default class Server {
    router: Router;
    app: App;
    server: http.Server;

    constructor(port: Number, baseURL: string) {
        this.router = new Router();
        this.app = new App(port, baseURL, this.router.unwrap());
        this.server = http.createServer(this.app.unwrap());
        this.configure();
    }

    private configure() {
        this.server.listen(this.app.port, () => {
            console.log(`HTTP Server listening in port ${this.app.port}`);
        });
    }
}