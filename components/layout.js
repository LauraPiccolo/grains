import Header from './header/header'
import Menu from './menu/menu'
import Footer from './footer/footer'
import Impressum from './impressum/impressum'

import StoryblokService from '../lib/storyblok-service'

const Layout = ({ content, children }) => {

    return (
        <div className="container">
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