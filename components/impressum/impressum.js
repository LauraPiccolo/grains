const StoryblokClient = require('storyblok-js-client')
import $ from 'jquery';

let Storyblok = new StoryblokClient({
    accessToken: 'zpjVfToBDoqLTFrpreoYMwtt'
})

const Impressum = ({ content }) => {

  const closeImpressum = () => {
    const top = document.querySelector('.container > footer').offsetTop - window.innerHeight + document.querySelector('.container > footer').clientHeight;

    $('html, body').animate({
      scrollTop: top
    }, 800)

    setTimeout(() => { document.querySelector('.impressum').style.display = 'none'; }, 500);
  }

  let impressumText = Storyblok.richTextResolver.render(content.impressum)

  return (
      <section className="impressum">
            <button className="impressum__close" onClick={closeImpressum}>Close</button>
            <div dangerouslySetInnerHTML={{ __html: impressumText }}></div>
      </section>
  )
}

export default Impressum
