import Button from "./Button";

const FeedbackButtons = ({onGood, onNeutral, onBad}) => {
    return (
        <>
            <Button onClick={onGood} text="Good" />
            <Button onClick={onNeutral} text="Neutral" />
            <Button onClick={onBad} text="Bad" />
        </>
    )
}

export default FeedbackButtons;
