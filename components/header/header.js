const Header = ({lang, setLang}) => {

    const information = {
        en: 'Information',
        ja: '情報'
    }

    return (
        <header>
            <a className="header__information">
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