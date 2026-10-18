// src/services/imageCacheService.ts
import * as FileSystem from 'expo-file-system';

const WIKI_FILE_URL = 'https://www.poe2wiki.net/wiki/Special:FilePath/';

// Controle de concorrência global para evitar 429
const MAX_CONCURRENT_DOWNLOADS = 3;
let activeDownloads = 0;
const downloadQueue: (() => void)[] = [];

function processQueue() {
  if (activeDownloads >= MAX_CONCURRENT_DOWNLOADS || downloadQueue.length === 0) {
    return;
  }
  const nextDownload = downloadQueue.shift();
  if (nextDownload) {
    nextDownload();
  }
}

export async function getCachedImageUri(fileName: string): Promise<string> {
  if (!fileName || typeof fileName !== 'string') {
    return '';
  }

  const normalizedName = fileName.trim().replace(/^File:/i, '');
  const filenameHash = normalizedName.replace(/[^a-zA-Z0-9]/g, '_');
  
  // Garantimos o acesso seguro ao diretório de cache
  const baseCacheDir = FileSystem.cacheDirectory;
  if (!baseCacheDir) {
    // Fallback caso o cache directory não esteja disponível no momento
    return WIKI_FILE_URL + encodeURIComponent(normalizedName);
  }

  const localFileUri = `${baseCacheDir}poe2_${filenameHash}.png`;

  try {
    // 1. Verifica se já existe localmente
    const fileInfo = await FileSystem.getInfoAsync(localFileUri);
    if (fileInfo.exists) {
      return fileInfo.uri; // Retorna direto do disco (Sem HTTP!)
    }

    // 2. Se não existe, entra na fila de download controlado
    return await new Promise((resolve) => {
      const executeDownload = async () => {
        activeDownloads++;
        try {
          const remoteUrl = WIKI_FILE_URL + encodeURIComponent(normalizedName);
          const downloadResult = await FileSystem.downloadAsync(remoteUrl, localFileUri);
          
          if (downloadResult.status === 200) {
            resolve(downloadResult.uri);
          } else {
            // Fallback para a URL remota se houver erro (incluindo 429)
            resolve(remoteUrl);
          }
        } catch (error) {
          console.warn(`[ImageCache] Erro ao baixar imagem ${normalizedName}:`, error);
          resolve(WIKI_FILE_URL + encodeURIComponent(normalizedName));
        } finally {
          activeDownloads--;
          processQueue();
        }
      };

      downloadQueue.push(executeDownload);
      processQueue();
    });
  } catch (error) {
    return WIKI_FILE_URL + encodeURIComponent(normalizedName);
  }
}