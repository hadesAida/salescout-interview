import { createClient } from 'redis';

async function manageRedis(): Promise<void> {
    const client = createClient();

    try {
        await client.connect();
        await client.set('key1', 'value1');
        await client.set('key2', 'value2');
        await client.set('key3', 'value3');
        const keyToRetrieve = 'key2';
        const value = await client.get(keyToRetrieve);
        console.log(value);
    } finally {
        await client.disconnect();
    }
}

module.exports = { manageRedis };
