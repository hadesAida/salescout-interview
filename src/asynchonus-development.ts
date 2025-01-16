// Write a function that accepts an array of URLs,
// makes parallel queries for each of them, and returns an
// an array of results in the order in which the queries are completed.

// Example input data:
// const urls = ['https://jsonplaceholder.typicode.com/posts/1', 
// 'https://jsonplaceholder.typicode.com/posts/2'];

// Expected result:
// [
// { data: { ... }, status: 200 },
// { data: { ... }, status: 200 }
// ] 
type RequestsResult = {
    data: any,
    status: number
}

async function fetchAll(urls: string[]): Promise<RequestsResult[]> {
    const requests = urls.map(async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return { data, status: response.status };
        } catch (error) {
            return { data: null, status: 500 };
        }
    });

    const results = await Promise.all(requests);
    return results;
}

module.exports = { fetchAll };
