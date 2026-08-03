import {test, expect} from "@playwright/test";

test ('First GET test', async ({request})=>{
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1')
    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body).toHaveProperty('id',1);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('userId');
});

test ('First POST test ' ,async({request})=>{
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {data : {
        title: 'foo',
        body: 'bar',
        userId: 1,
    },
    });
    const body = await response.json();
    expect(body).toHaveProperty('title','foo');
    expect(body).toHaveProperty('id');
});
