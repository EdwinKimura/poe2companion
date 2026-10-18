import { AppVersion } from "@/database/types/database.type";
import * as he from 'he';

export type DatabaseRow = Record<string, unknown>;

/**
 * Identifica padrão no nome da coluna
 * 
 * @param identifier 
 * @param label 
 */
export function assertIdentifier(identifier: string, label: string): void {
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(identifier)) {
        throw new Error(`${label} inválido: ${identifier}`);
    }
};

/**
 * Coloca o underline nas colunas que vem do banco
 * 
 * @param key 
 * @returns 
 */
export function toDatabaseColumn(key: string): string {
    return key.trim().replace(/[\s-]+/g, '_');
}


/**
 * Normaliza os dados para o banco Sqlite
 * 
 * @param value 
 * @returns 
 */
export function normalizeValue(value: unknown): string | number | null {
    if (value == null) return null;
    if (typeof value === 'string') return he.decode(value);
    if (typeof value === 'boolean') return value ? 1 : 0;
    if (typeof value === 'number') return value;
    return JSON.stringify(value);
}


/**
 * Normaliza a coluna que vem da consulta Cargo
 * 
 * @param row 
 * @returns 
 */
export function normalizeRow(row: DatabaseRow): Record<string, unknown> {
    const normalized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(row)) {
        normalized[toDatabaseColumn(key)] = value;
    }

    if (normalized.id == null) {
        throw new Error('Registro Cargo sem identificador "id". Verifique o alias no campo Cargo.');
    }

    return normalized;
}

/**
 * Normalizar em um objeto a versão do app
 * 
 * @param version 
 * @returns 
 */
export function parseAppVersion(version: string): AppVersion {
    const match = version.match(/^(\d+)\.(\d+)\.(\d+)$/);

    if (!match) {
        throw new Error(
            `Versão inválida em expo.version: "${version}". ` +
            'Use o formato MAJOR.MINOR.PATCH, por exemplo 0.0.1.',
        );
    }

    return {
        major: Number(match[1]),
        minor: Number(match[2]),
        patch: Number(match[3]),
    };
}
