import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange';

const resize = (image, option) => {
    var imageService = 'https://img2.storyblok.com/'
    var path = image.replace('https://a.storyblok.com', '')
    return imageService + option + path
}

const Image = (props) => {
    const data = props.data 
    var url = data.filename  
    // const alt = data.alt
    let dimensions = {
        width: url.split('/')[5].split('x')[0],
        height: url.split('/')[5].split('x')[1]
    }
    let padding = ((dimensions.height/dimensions.width)*100)+"%"
    let w640 = `${(resize(url, '640x'))} 640w`
    let w768 = (resize(url, '768x'))+" 768w"
    let w1024 = (resize(url, '1024x'))+" 1024w"
    let w1366 = (resize(url, '1366x'))+" 1366w"
    let w1600 = (resize(url, '1600x'))+" 1600w"
    let w1920 = (resize(url, '1920x'))+" 1920w"

    switch(props.mode) {
        case "cover":
            padding = ""
          break
        default:

    }

    return (
        <div className={["image__container","mode--"+props.mode].join(' ')} style={{paddingBottom: padding}}>
            <div className="image__wrapper">
                <img 
                    data-sizes="auto"
                    data-expand="1000"
                    data-srcset={[w640,w768,w1024,w1366,w1600,w1920].join(', ')}
                    className={["lazyload"].join(' ')}
                />
            </div>
        </div>
    )
}

export default Image