export default function Shape({ title, scale }) {

    return (
        <div className={`shape shape--${title}`}
        style={{ transform: `scale(${scale})` }}
        >
            {title}
        </div>
    )
}