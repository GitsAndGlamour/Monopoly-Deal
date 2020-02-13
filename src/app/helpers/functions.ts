/**
 * Returns list of keys from Enum
 * @param E
 */
export function getEnumKeys(E) {
    return Object.keys(E);
}

/**
 * Returns list of values from Enum
 * @param E
 */
export function getEnumValues(E) {
    return getEnumKeys(E).map(k => E[k as any]);

}
