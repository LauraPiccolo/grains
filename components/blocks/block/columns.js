const StoryblokClient = require('storyblok-js-client')

let Storyblok = new StoryblokClient({
    accessToken: 'zpjVfToBDoqLTFrpreoYMwtt'
})

const BlockColumns = ({ content }) => {

    return (
        <div className="block--columns">
        {
            content.Columns.map((column, index) => {
            let text = Storyblok.richTextResolver.render(column.Rte);
            return (
              <div className="column" style={{
                gridColumnStart: index+1,
                gridColumnEnd: index+2,
              }}>
                <div className="rte" dangerouslySetInnerHTML={{ __html: text }} /> 
              </div>
            )})
        }
        </div>
    )
}

export default BlockColumns