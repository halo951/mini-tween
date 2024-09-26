/**
 * Utils
 */
export class Sequence {
    private static _nextId: number = 0

    static nextId(): number {
        return Sequence._nextId++
    }
}
