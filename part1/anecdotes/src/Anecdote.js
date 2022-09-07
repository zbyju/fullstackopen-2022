const Anecdote = ({anecdote}) => {
    return (
        <>
            <p>{anecdote.text}</p>
            <p>Votes: {anecdote.votes}</p>
        </>
    )
}

export default Anecdote;
