import KeyWord from "./KeyWord"

const Intro = ({}) => {

    const checkScroll = (event) => {
        if(event.target.scrollTop >= event.target.scrollHeight - window.innerHeight) {
            event.target.style.display = "none";
            document.querySelector('.popup').style.right = '0px';
        }
    }

    return (
        <div className="intro-wrapper vph" onScroll={(event) => checkScroll(event)}>
            <div className="intro vph">
                <h1>
                    <KeyWord word="VISUAL ASSOCIATES" />
                </h1>
            </div>
            <div className="blur--1" />
        </div>
    )

}

export default Intro