import StatisticLine from "./StatisticLine"

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad

    if(all === 0) return (
        <p>No feedback given</p>
    )

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
            <table>
                <tbody align="left">   
                    <StatisticLine text={"Good"} value={good} />
                    <StatisticLine text={"Neutral"} value={neutral} />
                    <StatisticLine text={"Bad"} value={bad} />
                    <StatisticLine text={"All"} value={all} />
                    <StatisticLine text={"Average"} value={calcAverage()} />
                    <StatisticLine text={"Positive"} value={calcPositive() + "%"} />
                </tbody>
            </table>
        </>
    )
}

export default Statistics;
