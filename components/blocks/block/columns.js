const StoryblokClient = require('storyblok-js-client')

let Storyblok = new StoryblokClient({
    accessToken: 'zpjVfToBDoqLTFrpreoYMwtt'
})

const BlockColumns = ({ content }) => {

    return (
        <div className="block--columns">
          {
            content.items.map((column, index) => {
            let text = Storyblok.richTextResolver.render(column.text);
            return (
              <div className="column" style={{
                gridColumnStart: index,
                gridColumnEnd: index+1,
              }}>
                <h4>{`TITLE`}</h4>
                <p className="rte" dangerouslySetInnerHTML={{ __html: text }} /> 
              </div>
            )})
          }
        </div>
    )
}

export default BlockColumns