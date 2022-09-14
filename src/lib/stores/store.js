import { writable } from 'svelte/store';

export const projects = writable([]);
export const posts = writable([]);
export const games = writable([]);

const fetchData = async () => {
    //get latest master ref
    const refUrl = 'https://yashpunia.cdn.prismic.io/api/v2';
    const refResponse = await fetch(refUrl);
    const refResponseJson = await refResponse.json();
    const masterRef = refResponseJson.refs[0].ref;


    //get the posts
    const docUrl = 'https://yashpunia.cdn.prismic.io/api/v2/documents/search?ref=' + masterRef;
    const docResponse = await fetch(docUrl);
    const docResponseJson = await docResponse.json();

    let projectsFetched = [];
    let blogPostsFetched = [];
    let gamesFetched = [];

    docResponseJson.results.map((element, index) => {
        if (element.type === 'projects')
            projectsFetched.push(element)
        else if (element.type === 'blog_posts')
            blogPostsFetched.push(element);
        else if (element.type === 'games')
            gamesFetched.push(element)
    })

    projects.set(projectsFetched);
    posts.set(blogPostsFetched);
    games.set(gamesFetched);
}

fetchData();