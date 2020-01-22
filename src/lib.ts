export type Key = number;

/**
 *
 * @param length The length of the key
 */
export function generateKeys(length): Key[] {
    const arraySize = Math.pow(2,length);
    return Array.from(Array(arraySize).keys());
}


export function getSimulation(key: Key, message): number[] {
}
