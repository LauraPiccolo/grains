const StoryblokClient = require('storyblok-js-client')
import $ from 'jquery';
import { useEffect } from 'react';

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

  const scrollClose = () => {
    const closeTop = document.querySelector('.impressum').getBoundingClientRect().top;
    document.querySelector('.impressum__close').className = closeTop <= 22 ? 'impressum__close--fixed impressum__close' : 'impressum__close';
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollClose)
  });

  let impressumText = Storyblok.richTextResolver.render(content.impressum)

  return (
      <section className="impressum">
            <button className="impressum__close" onClick={closeImpressum}>Close</button>
            <div dangerouslySetInnerHTML={{ __html: impressumText }}></div>
      </section>
  )
}

export default Impressum
