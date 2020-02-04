export function getEnumKeys(E) {
    return Object.keys(E);
}

export function getEnumValues(E) {
    return getEnumKeys(E).map(k => E[k as any]);

}
