const getCrickeScore = () => {
    return (
        fetch("https://dev132-cricket-live-scores-v1.p.rapidapi.com/matches.php?completedlimit=1&inprogresslimit=5&upcomingLimit=1", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "5108afa121msh7459cecd463cf05p1bd0b9jsnba7cc8faccd9",
                "x-rapidapi-host": "dev132-cricket-live-scores-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(response => response.matchList.matches)
            .catch(err => {
                console.error(`This is the error : ${err}`);
            })
    )
}

//getCrickeScore().then(data => console.log(data[0]));

export default getCrickeScore;
