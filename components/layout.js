import Header from './header/header'

const Layout = ({ children }) => {

    return (
        <div className="container">
            <Header />
            {children}
        </div>
    )
}
  
export default Layout