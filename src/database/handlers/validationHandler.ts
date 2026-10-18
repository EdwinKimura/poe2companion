import { AppVersion } from "@/database/types/database.type";

/**
 * Verifica se pode resetar a base de dados de acordo com a versão
 * do app
 * 
 * @param currentVersion 
 * @param savedVersion 
 * @returns 
 */
export function shouldResetDatabase(
    currentVersion: AppVersion,
    savedVersion: AppVersion,
): boolean {
    return (
        currentVersion.major > savedVersion.major ||
        (
            currentVersion.major === savedVersion.major &&
            currentVersion.minor > savedVersion.minor
        )
    );
}

/**
 * Verifica se tem uma nova versão do App
 * 
 * @param currentVersion 
 * @param savedVersion 
 * @returns 
 */
export function isNewerVersion(
    currentVersion: AppVersion,
    savedVersion: AppVersion,
): boolean {
    if (currentVersion.major !== savedVersion.major) {
        return currentVersion.major > savedVersion.major;
    }

    if (currentVersion.minor !== savedVersion.minor) {
        return currentVersion.minor > savedVersion.minor;
    }

    return currentVersion.patch > savedVersion.patch;
}

