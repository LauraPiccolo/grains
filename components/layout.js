import Header from './header/header'
import Menu from './menu/menu'
import Footer from './footer/footer'

const Layout = ({ children }) => {

    return (
        <div className="container">
            <Header />
            <Menu />
            {children}
            <Footer />
        </div>
    )
}
  
export default Layout