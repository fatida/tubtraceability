import "./primaryImmPill.scss"

interface Props {
   text: string
   backgroundColor: string
}

const PrimaryImmPill = (props: Props) => {
    const { text, backgroundColor } = props 
    const pillStyle = {
        background: backgroundColor
    }

    return (
        <div className="primaryImmPill" style={pillStyle}>
            <span className="buttonText">
                {text}
            </span>
        </div>
    )
}

export default PrimaryImmPill