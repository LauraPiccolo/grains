const StoryblokClient = require('storyblok-js-client')

let Storyblok = new StoryblokClient({
    accessToken: 'zpjVfToBDoqLTFrpreoYMwtt'
})

const SectionTextarea = ({ content }) => {

    console.log(content)

    let rte = Storyblok.richTextResolver.render(content.rte)

    return (
        <section className="section--textarea">
            <div className="rte" dangerouslySetInnerHTML={{ __html: rte }} /> 
        </section>
    )
}

export default SectionTextarea
