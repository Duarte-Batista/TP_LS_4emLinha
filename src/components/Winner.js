const Winner = ({ winner, reset, playerNames }) => {
    const getPlayerName = (playerNumber) => {
        return playerNames ? (playerNames[`player${playerNumber}`] || `Jogador ${playerNumber}`) : `Jogador ${playerNumber}`;
    };

    return <p>
        {winner === -1 ? <span> Ninguém ganhou, houve empate</span> : <span>O {getPlayerName(winner)} ganhou este jogo!</span>}
    </p>
}

export default Winner