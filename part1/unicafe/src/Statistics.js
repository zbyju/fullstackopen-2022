const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad

    const calcAverage = () => {
        if(all === 0) return 0
        return (good - bad) / all
    }

    const calcPositive = () => {
        if(all === 0) return 0
        return 100 * good / all
    }

    return (
        <>
            <h1>Statistics</h1>
            <p>Good - {good}</p>
            <p>Neutral - {neutral}</p>
            <p>Bad - {bad}</p>
            <p>All: {good + neutral + bad}</p>
            <p>Average: {calcAverage()}</p>
            <p>Positive: {calcPositive()}%</p>
        </>
    )
}

export default Statistics;
