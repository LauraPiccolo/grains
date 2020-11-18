import Header from './header/header'
import Menu from './menu/menu'
import Footer from './footer/footer'
import Impressum from './impressum/impressum'

import StoryblokService from '../lib/storyblok-service'
import Head from './head'

const Layout = ({ content, children }) => {

    return (
        <div className="container">
            <Head />
            <Header />
            <Menu content={content} />
            {children}
            <Footer />
            <Impressum content={content}/>
            {StoryblokService.bridge()}
        </div>
    )
}
  
export default Layout