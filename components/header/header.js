const Header = ({lang, setLang, fixed}) => {

    const information = {
        en: 'Information',
        ja: '情報'
    }

    const toInfo = () => {
        document.querySelector('#scroll-wrapper').scrollTo({
            left: 0, 
            top: 100000,
            // behavior: 'smooth'
        })
        setTimeout(() => { 
            document.querySelector('.information--modal').scrollTo({
                left: 0, 
                top: window.innerHeight,
                behavior: 'smooth'
            })
        }, 10);
    }

    return (
        <header className={`header header--${fixed ? 'fixed':'absolute'}`}>
            <a className="header__information" onClick={() => {fixed && toInfo()}}>
                {information[lang]}
            </a>
            <div className="header__language">
                <ul>
                    <li className={`language__item${lang == "ja" ? ' language__item--selected':''}`} onClick={() => setLang('ja')}><button>电话</button></li>
                    <li className={`language__item${lang == "en" ? ' language__item--selected':''}`} onClick={() => setLang('en')}><button>EN</button></li>
                </ul>
            </div>
        </header>
    )
}


export default Header