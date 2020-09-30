const StoryblokClient = require('storyblok-js-client')

let Storyblok = new StoryblokClient({
    accessToken: 'zpjVfToBDoqLTFrpreoYMwtt'
})

const BlockTextarea = ({ content }) => {

    console.log(content)

    let rte = Storyblok.richTextResolver.render(content.rte)

    return (
        <div className="block--textarea">
            <div className="rte" dangerouslySetInnerHTML={{ __html: rte }} /> 
        </div>
    )
}

export default BlockTextarea
