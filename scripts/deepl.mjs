
import * as deepl from 'deepl-node';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const authKey = process.env.DEEPL_AUTH_KEY;

if (!authKey) {
    console.error('Erro: DEEPL_AUTH_KEY não encontrada em .env.local');
    process.exit(1);
}

const client = new deepl.DeepLClient(authKey);

async function main() {
    try {
        const originalText = 'Increases Armour';

        const result = await client.translateText(
            originalText,
            'EN',
            'PT-BR',
        );

        console.log('Idioma de origem: inglês');
        console.log('Idioma de destino: português brasileiro');
        console.log('Texto original:', originalText);
        console.log('Tradução:', result.text);
        console.log('Caracteres contabilizados:', result.billedCharacters);
    } catch (error) {
        console.error('Falha ao traduzir pelo DeepL.');

        if (error instanceof Error) {
            console.error(error.message);
        }

        process.exitCode = 1;
    }
}

main();
