async function fetchAPI(query, { variables, preview } = {}) {
    const res = await fetch('https://gapi.storyblok.com/v1/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Token: 'Q1JN6qrhNO5WVER6Dc84Tgtt',
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

// Frontpage
export async function getHome() {
    const data = await fetchAPI(`
    {
        HomeItems {
            items {
                id
                slug
                name
                content {
                    blocks
                }
            }
        }
    }     
    `,
    {
        preview: true
    }
    )
    return data?.HomeItems.items[0].content
}

