const StoryblokClient = require('storyblok-js-client')

let Storyblok = new StoryblokClient({
    accessToken: 'zpjVfToBDoqLTFrpreoYMwtt'
})

const BlockColumns = ({ content }) => {

    return (
        <div className="block--columns">
          {
            content.items.map((column) => {
            let rte = Storyblok.richTextResolver.render(content.rte)
            return (
              <div className="column">
                <h4>TITLE</h4>
                <p className="rte" dangerouslySetInnerHTML={{ __html: rte }} /> 
              </div>
            )})
          }
        </div>
    )
}

export default BlockColumns