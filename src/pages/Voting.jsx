import React, { useState, useEffect } from 'react';
import './Voting.css';

const VOTING_KEY = 'dymek_votes';
const LAST_VOTE_KEY = 'dymek_last_vote_date';

// Initial Mock Data for the current versus battle
const INITIAL_BATTLE = {
    id: 'battle-01-2026',
    title: 'Olejek Miesiąca: Styczeń 2026',
    endDate: '2026-01-31',
    competitors: [
        {
            id: 'comp-1',
            name: 'OXVA OX Passion',
            flavor: 'Strawberry Kiwi',
            image: 'https://shishasklep.pl/hpeciai/118eeccc19ee73899b92ca9b082fff88/pol_pl_Longfill-OX-Passion-10-60-Lychee-Raspberry-49029_3.webp', // Using existing image for demo
            color: '#ef4444',
            votes: 124
        },
        {
            id: 'comp-2',
            name: 'SIC Salt',
            flavor: 'Grape Ice',
            image: 'https://shishasklep.pl/hpeciai/0ef60165bca1c51489203bc772c70af5/pol_pl_Liquid-SIC-Salt-10ml-Grape-Ice-20mg-33195_1.webp',
            color: '#8b5cf6',
            votes: 98
        }
    ]
};

export default function Voting() {
    const [battle, setBattle] = useState(INITIAL_BATTLE);
    const [hasVoted, setHasVoted] = useState(false);
    const [votedId, setVotedId] = useState(null);

    useEffect(() => {
        // Load state from local storage
        const savedVotes = localStorage.getItem(VOTING_KEY);
        const lastVoteDate = localStorage.getItem(LAST_VOTE_KEY);

        if (savedVotes) {
            setBattle(JSON.parse(savedVotes));
        }

        if (lastVoteDate) {
            // Simple check: if voted this month, disable voting
            const votedDate = new Date(lastVoteDate);
            const now = new Date();
            if (votedDate.getMonth() === now.getMonth() && votedDate.getFullYear() === now.getFullYear()) {
                setHasVoted(true);
                // We ideally should store WHICH one they voted for, but for this simple demo vs, we just block.
                // Or store mapped ID. Let's improve check.
                const userAction = localStorage.getItem('dymek_user_vote_id');
                if (userAction) setVotedId(userAction);
            }
        }
    }, []);

    const handleVote = (competitorId) => {
        if (hasVoted) return;

        const newBattle = {
            ...battle,
            competitors: battle.competitors.map(c =>
                c.id === competitorId ? { ...c, votes: c.votes + 1 } : c
            )
        };

        setBattle(newBattle);
        setHasVoted(true);
        setVotedId(competitorId);

        // Save to local storage
        localStorage.setItem(VOTING_KEY, JSON.stringify(newBattle));
        localStorage.setItem(LAST_VOTE_KEY, new Date().toISOString());
        localStorage.setItem('dymek_user_vote_id', competitorId);
    };

    const totalVotes = battle.competitors.reduce((acc, curr) => acc + curr.votes, 0);

    return (
        <div className="container voting-page">
            <div className="voting-header">
                <h1>Głosowanie</h1>
                <p className="subtitle">Wybierz swój ulubiony smak miesiąca!</p>
            </div>

            <div className="versus-container">
                <h2 className="battle-title">{battle.title}</h2>

                <div className="competitors-wrapper">
                    <div className={`competitor left ${votedId === battle.competitors[0].id ? 'selected' : ''}`}>
                        <div className="competitor-image">
                            <img src={battle.competitors[0].image} alt={battle.competitors[0].name} />
                            {votedId === battle.competitors[0].id && <div className="vote-badge">Twój Głos</div>}
                        </div>
                        <h3>{battle.competitors[0].name}</h3>
                        <p>{battle.competitors[0].flavor}</p>
                        <button
                            className="vote-btn"
                            onClick={() => handleVote(battle.competitors[0].id)}
                            disabled={hasVoted}
                        >
                            {hasVoted ? `${Math.round((battle.competitors[0].votes / totalVotes) * 100)}%` : 'Głosuję'}
                        </button>
                    </div>

                    <div className="versus-badge">VS</div>

                    <div className={`competitor right ${votedId === battle.competitors[1].id ? 'selected' : ''}`}>
                        <div className="competitor-image">
                            <img src={battle.competitors[1].image} alt={battle.competitors[1].name} />
                            {votedId === battle.competitors[1].id && <div className="vote-badge">Twój Głos</div>}
                        </div>
                        <h3>{battle.competitors[1].name}</h3>
                        <p>{battle.competitors[1].flavor}</p>
                        <button
                            className="vote-btn"
                            onClick={() => handleVote(battle.competitors[1].id)}
                            disabled={hasVoted}
                        >
                            {hasVoted ? `${Math.round((battle.competitors[1].votes / totalVotes) * 100)}%` : 'Głosuję'}
                        </button>
                    </div>
                </div>

                {hasVoted && (
                    <div className="results-bar-container">
                        <div
                            className="result-segment left"
                            style={{
                                width: `${(battle.competitors[0].votes / totalVotes) * 100}%`,
                                backgroundColor: battle.competitors[0].color
                            }}
                        >
                            <span className="count">{battle.competitors[0].votes} Głosów</span>
                        </div>
                        <div
                            className="result-segment right"
                            style={{
                                width: `${(battle.competitors[1].votes / totalVotes) * 100}%`,
                                backgroundColor: battle.competitors[1].color
                            }}
                        >
                            <span className="count">{battle.competitors[1].votes} Głosów</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
