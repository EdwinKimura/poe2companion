
let operationId = 0;

interface ActiveOperation {
    id: number;
    label: string;
    startedAt: number;
}

const activeOperations = new Map<number, ActiveOperation>();

export async function traceSqlite<T>(
    label: string,
    operation: () => Promise<T>,
    origin = 'origem não informada',
): Promise<T> {
    const id = ++operationId;
    const startedAt = Date.now();

    console.debug('[TRACE ARGUMENTS]', {
        label,
        origin,
        originIsUndefined: origin === undefined,
        originIsEmpty: origin === '',
    });

    console.debug(
        `[SQLite TRACE] START #${id}: ${label} | origin=${origin}`,
    );

    activeOperations.set(id, {
        id,
        label,
        startedAt,
    });

    try {
        const result = await operation();

        console.debug(
            `[SQLite TRACE] END #${id}: ${label} (${Date.now() - startedAt} ms)`,
        );

        return result;
    } catch (error) {
        console.error(`[SQLite TRACE] ERROR #${id}: ${label}`, error);

        console.error(
            '[SQLite TRACE] Operações ainda ativas:',
            [...activeOperations.values()].map((item) => ({
                ...item,
                elapsedMs: Date.now() - item.startedAt,
            })),
        );

        throw error;
    } finally {
        activeOperations.delete(id);
    }
}
