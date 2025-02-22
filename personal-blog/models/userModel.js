export class UserModel {
    static async getInvalidUser() {
        return { name: "user" };
    }

    static async getValidUser() {
        return { status: "admin" };
    }
}