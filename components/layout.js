import Header from './header/header'
import Menu from './menu/menu'
import Footer from './footer/footer'

const Layout = ({ content, children }) => {

    return (
        <div className="container">
            <Header />
            <Menu content={content} />
            {children}
            <Footer />
        </div>
    )
}
  
export default Layout