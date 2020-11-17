const StoryblokClient = require('storyblok-js-client')

let Storyblok = new StoryblokClient({
    accessToken: 'zpjVfToBDoqLTFrpreoYMwtt'
})

const Impressum = ({ content }) => {

  const closeImpressum = () => {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: document.querySelector('.container > footer').offsetTop - window.innerHeight + document.querySelector('.container > footer').clientHeight,
    });
    setTimeout(() => { document.querySelector('.impressum').style.display = 'none'; }, 500);
  }

  let impressumText = Storyblok.richTextResolver.render(content.impressum)

  return (
      <section className="impressum">
            <button className="impressum__close" onClick={closeImpressum}>Close</button>
            <p dangerouslySetInnerHTML={{ __html: impressumText }}></p>
      </section>
  )
}

export default Impressum
