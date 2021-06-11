import { writable } from 'svelte/store';

export const projects = writable([]);

const fetchProjects = async () => {
    //get latest master ref
    const refUrl = 'https://yashpunia.cdn.prismic.io/api/v2';
    const refResponse = await fetch(refUrl);
    const refResponseJson = await refResponse.json();
    const masterRef = refResponseJson.refs[0].ref;


    //get the blogs
    const docUrl = 'https://yashpunia.cdn.prismic.io/api/v2/documents/search?ref='+masterRef;
    const docResponse = await fetch(docUrl);
    const docResponseJson = await docResponse.json();

    let projectsFetched=[];

    docResponseJson.results.map((element, index)=> {
        if(element.type === 'projects')
            projectsFetched.push(element)
    })

    projects.set(projectsFetched);
}

fetchProjects();