import Context from './Context';

class AppStorage {
    static instance: AppStorage = null;
    storage: Context = {};

    static getInstance(): AppStorage {
        if (!AppStorage.instance) {
            AppStorage.instance = new AppStorage();
        }

        return AppStorage.instance;
    }

    insert(key: string, data: Context): void {
        this.storage[key] = data;
    }

    remove(key: string): void {
        delete this.storage[key];
    }

    get(key: string): Context {
        return this.storage[key];
    }
}

export default AppStorage.getInstance();
