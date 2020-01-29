let storage: Map<string, string> = new Map<string, string>();
export class MockLocalStorage {
    length: number = storage.size;

    static setItem(key: string, value: string): void {
        storage.set(key, value || '');
    }

    static getItem(key: string): string {
        return storage.has(key) ? storage.get(key) : null;
    }

    static removeItem(key): void {
        storage.delete(key);
    }

    static clear(key): void {
        storage = new Map<string, string>();
    }

    static key(i): string {
        return storage.keys()[i];
    }
}
