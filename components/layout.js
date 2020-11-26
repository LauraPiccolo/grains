import {useState} from 'react'
import Header from './header/header'
import Menu from './menu/menu'
import Footer from './footer/footer'
import Impressum from './impressum/impressum'

import StoryblokService from '../lib/storyblok-service'
import Head from './head'

const Layout = ({ content, children }) => {

    const [menu, setMenu] = useState(false);

    return (
        <div className="container">
            <Head />
            <Header setMenu={setMenu} menu={menu}/>
            <Menu content={content} setMenu={setMenu} menu={menu} />
            {children}
            <Footer />
            <Impressum content={content}/>
            {StoryblokService.bridge()}
        </div>
    )
}
  
export default Layout