import express from "express";
import type { Application } from "express";

export default class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.configure();
    }

    private configure(): void {}
}