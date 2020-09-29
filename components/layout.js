import Header from './header/header'
import Footer from './footer/footer'

const Layout = ({ children }) => {

    return (
        <div className="container">
            <Header />
            {children}
            <Footer />
        </div>
    )
}
  
export default Layout