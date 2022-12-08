async function fetchAPI(query, { variables, preview } = {}) {
    const res = await fetch('https://gapi.storyblok.com/v1/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Token: 'zmiLu9vkZ3eKXkj6y68FYAtt',
            Version: preview ? 'draft' : 'published',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    console.log(json.data)
    return json.data
}

export async function getPages() {
    const data = await fetchAPI(`
    {
        PageItems {
            items {
                id
                slug
                name
            }
        }
    }     
    `,
    {
        preview: true
    }
    )
    return data.PageItems.items
}

export async function getPage({id, resolve_relations}) {
    const data = await fetchAPI(`
    {
        PageItem(id: "${id}", resolve_relations:"${resolve_relations}") {
            slug
            name
            content {
                title
                description
                content
            }
        }
    }     
    `,
    {
        preview: true
    }
    )
    return data?.PageItem;
}

export async function getContact() {
    const data = await fetchAPI(`
    {
        ContactItem(id: "/pages/contact") {
            id
            slug
            name
            content {
                paragraph_content
                email {
                    url
                }
                instagram_link {
                    url
                }
                vimeo_link {
                    url
                }
            }
        }
    }     
    `,
    {
        preview: true
    }
    )
    return data.ContactItem
}

export async function getTextPage(id) {
    const data = await fetchAPI(`
    {
        TextPageItem(id: "${id}") {
            id
            slug
            name
            content {
                title
                content
            }
        }
    }     
    `,
    {
        preview: true
    }
    )
    return data.TextPageItem
}

export async function getAbout() {
    const data = await fetchAPI(`
    {
        AboutItem(id: "/pages/about") {
            id
            slug
            name
            content {
                header
                paragraph_header
                paragraph_content
            }
        }
    }     
    `,
    {
        preview: true
    }
    )
    return data.AboutItem
}

export async function getProject(id) {
    const data = await fetchAPI(`
    {
        ProjectItem(id: "${id}") {
            id
            slug
            name
            content {
               title
               hero_media {
                filename
                alt
               }
               hero_video_poster {
                filename
                alt
               }
               client
               category {
                url
                id
               }
               fullscreen_video {
                filename
                alt
               }
               description
                credits
                supporting_videos
            }
        }
    }     
    `,
    {
        preview: true
    }
    )
    return data.ProjectItem
}


export async function getProjects() {
    const data = await fetchAPI(`
    {
        ProjectItems {
            items {
                id
                slug
                name
                content {
                    hero_media {
                        filename
                        alt
                    }
                    hero_video_poster {
                        filename
                        alt
                    }
                    title
                    client
                    category {
                        name
                        slug
                    }
                }
            }
        }
    }     
    `,
    {
        preview: true
    }
    )
    return data.ProjectItems.items
}

export async function getTracks() {
    const data = await fetchAPI(`
    {
        TrackItems(resolve_relations: "track.linked_project") {
            items {
                id
                slug
                name
                content {
                    title
                    file {
                        filename
                        alt
                    }
                    linked_project {
                        id
                        slug
                    }
                }
            }
        }
    }     
    `,
    {
        preview: true
    }
    )
    return data?.TrackItems.items;
}

export async function getNav() {
    const data = await fetchAPI(`
    {
        NavItem(id: "/header-footer", resolve_relations: "page") {
            id
            slug
            name
            content {
               description
               nav_links_left {
                    name
                    slug
               }
               nav_links_right {
                    name
                    slug
               }
            }
        }
    }     
    `,
    {
        preview: true
    }
    )
    return data.NavItem
}

