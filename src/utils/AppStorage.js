class AppStorage {
    static instance = null;

    constructor() {
        this.storage = {};
    }

    static getInstance() {
        if (!AppStorage.instance) {
            AppStorage.instance = new AppStorage();
        }

        return AppStorage.instance;
    }

    insert(key, data) {
        this.storage[key] = data;
    }

    remove(key) {
        delete this.storage.key;
    }

    get(key) {
        return this.storage[key];
    }
}

export default AppStorage.getInstance();
