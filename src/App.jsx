import React, { useMemo, useState } from "react";

const GAMES = [
  { name: "Overcooked 2", players: 4, price: 450, platforms: ["PC","Switch","PS","Xbox"], genres: ["Co-op","Party"] },
  { name: "It Takes Two", players: 2, price: 990, platforms: ["PC","PS","Xbox"], genres: ["Co-op","Adventure"] },
  { name: "Deep Rock Galactic", players: 4, price: 369, platforms: ["PC","PS","Xbox"], genres: ["Co-op","Shooter"] },
  { name: "Phasmophobia", players: 4, price: 279, platforms: ["PC"], genres: ["Co-op","Horror"] },
  { name: "Left 4 Dead 2", players: 4, price: 199, platforms: ["PC"], genres: ["Co-op","Shooter"] },
  { name: "Terraria", players: 8, price: 199, platforms: ["PC","Switch","PS","Xbox","Mobile"], genres: ["Co-op","Sandbox"] },
  { name: "Stardew Valley", players: 4, price: 315, platforms: ["PC","Switch","PS","Xbox","Mobile"], genres: ["Co-op","Simulation"] }
];

export default function App() {
  const [minPlayers, setMinPlayers] = useState(2);
  const [picked, setPicked] = useState(null);

  const filtered = useMemo(() => {
    return GAMES.filter(g => g.players >= minPlayers);
  }, [minPlayers]);

  const spinWheel = () => {
    if (filtered.length === 0) return;
    const r = Math.floor(Math.random() * filtered.length);
    setPicked(filtered[r]);
  };

  return (
    <div style={{fontFamily:'sans-serif', padding:20}}>
      <h1>🎮 Co-op Game Picker</h1>
      <label>Minimum Players: </label>
      <input type="number" value={minPlayers} min={2}
        onChange={e => setMinPlayers(Number(e.target.value))} />
      <br/><br/>
      <button onClick={spinWheel}>🎡 Spin Random Game</button>

      {picked && (
        <div style={{marginTop:20}}>
          <h2>Selected Game:</h2>
          <p><b>{picked.name}</b></p>
          <p>Players: {picked.players} | Price: {picked.price}฿</p>
          <p>Platforms: {picked.platforms.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
