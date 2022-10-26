import { render } from "storyblok-rich-text-react-renderer";


const Popup = ({text, title}) => {

    const closePopup = () => {
        // document.querySelector('#scroll-wrapper').scrollTo({
        //     left: 0, 
        //     top: 100000,
        //     // behavior: 'smooth'
        // })
        // setTimeout(() => { 
        //     document.querySelector('.information--modal').scrollTo({
        //         left: 0, 
        //         top: window.innerHeight,
        //         behavior: 'smooth'
        //     })
        // }, 10);
        document.querySelector('.popup').style.opacity = '0';
    }

    return (
        <div className="popup">
            <button className="popup__close" onClick={closePopup}>Close</button>
            <h2>{title}</h2>
            <div className="text">{render(text)}</div>
        </div>
    )

}

export default Popup