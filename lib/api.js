async function fetchAPI(query, { variables, preview } = {}) {
    const res = await fetch('https://gapi.storyblok.com/v1/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Token: 'zpjVfToBDoqLTFrpreoYMwtt',
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
export async function getFrontpage() {
    const data = await fetchAPI(`
    {
        FrontpageItem(id: "frontpage") {
            id
            name
            content {
              frontpage_projects
              frontpage_text
            }
          }
    }      
    `,
    {
        preview: true
    }
    )
    return data?.FrontpageItem.content
}

