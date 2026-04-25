import React, { useMemo, useState } from "react";

// --- Small built-in game database (editable) ---
const GAMES = [
  { name: "Overcooked 2", players: 4, price: 450, platforms: ["PC","Switch","PS","Xbox"], genres: ["Co-op","Party"] },
  { name: "It Takes Two", players: 2, price: 990, platforms: ["PC","PS","Xbox"], genres: ["Co-op","Adventure"] },
  { name: "Deep Rock Galactic", players: 4, price: 369, platforms: ["PC","PS","Xbox"], genres: ["Co-op","Shooter"] },
  { name: "Phasmophobia", players: 4, price: 279, platforms: ["PC"], genres: ["Co-op","Horror"] },
  { name: "Left 4 Dead 2", players: 4, price: 199, platforms: ["PC"], genres: ["Co-op","Shooter"] },
  { name: "Monster Hunter: World", players: 4, price: 990, platforms: ["PC","PS","Xbox"], genres: ["Co-op","RPG"] },
  { name: "Terraria", players: 8, price: 199, platforms: ["PC","Switch","PS","Xbox","Mobile"], genres: ["Co-op","Sandbox"] },
  { name: "Stardew Valley", players: 4, price: 315, platforms: ["PC","Switch","PS","Xbox","Mobile"], genres: ["Co-op","Simulation"] },
  { name: "Don’t Starve Together", players: 6, price: 279, platforms: ["PC","Switch","PS","Xbox"], genres: ["Co-op","Survival"] },
  { name: "Among Us", players: 10, price: 119, platforms: ["PC","Switch","Mobile"], genres: ["Multiplayer","Party"] }
];

const ALL_PLATFORMS = ["PC","PS","Xbox","Switch","Mobile"];
const ALL_GENRES = ["Co-op","Multiplayer","Party","Shooter","RPG","Horror","Sandbox","Simulation","Adventure","Survival"];

export default function App() {
  const [minPlayers, setMinPlayers] = useState(2);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);
  const [platforms, setPlatforms] = useState(["PC"]);
  const [genres, setGenres] = useState(["Co-op"]);
  const [result, setResult] = useState([]);
  const [picked, setPicked] = useState(null);

  const filtered = useMemo(() => {
    return GAMES.filter(g =>
      g.players >= minPlayers &&
      g.price >= priceMin &&
      g.price <= priceMax &&
      platforms.some(p => g.platforms.includes(p)) &&
      genres.some(ge => g.genres.includes(ge))
    );
  }, [minPlayers, priceMin, priceMax, platforms, genres]);

  const toggle = (list, setList, value) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const spinWheel = () => {
    if (filtered.length === 0) return;
    const r = Math.floor(Math.random() * filtered.length);
    setPicked(filtered[r]);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">🎮 Co‑op Game Picker</h1>

        <div className="grid md:grid-cols-2 gap-4 bg-neutral-800 p-4 rounded-2xl">
          <div>
            <label>Minimum Players</label>
            <input type="number" value={minPlayers} min={2}
              onChange={e => setMinPlayers(Number(e.target.value))}
              className="w-full mt-1 p-2 text-black rounded" />
          </div>

          <div>
            <label>Price Range (THB)</label>
            <div className="flex gap-2 mt-1">
              <input type="number" value={priceMin} onChange={e=>setPriceMin(Number(e.target.value))} className="w-full p-2 text-black rounded" />
              <input type="number" value={priceMax} onChange={e=>setPriceMax(Number(e.target.value))} className="w-full p-2 text-black rounded" />
            </div>
          </div>

          <div>
            <label>Platforms</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {ALL_PLATFORMS.map(p => (
                <button key={p} onClick={()=>toggle(platforms,setPlatforms,p)}
                  className={`px-3 py-1 rounded ${platforms.includes(p)?"bg-green-500":"bg-neutral-700"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label>Genres</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {ALL_GENRES.map(g => (
                <button key={g} onClick={()=>toggle(genres,setGenres,g)}
                  className={`px-3 py-1 rounded ${genres.includes(g)?"bg-blue-500":"bg-neutral-700"}`}>
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={()=>setResult(filtered)} className="bg-yellow-500 text-black px-4 py-2 rounded-xl">Search Games</button>
          <button onClick={spinWheel} className="bg-pink-500 px-4 py-2 rounded-xl">🎡 Spin Random</button>
        </div>

        {picked && (
          <div className="bg-neutral-800 p-4 rounded-2xl">
            <h2 className="text-xl font-bold">🎯 Selected Game</h2>
            <p className="mt-2 text-lg">{picked.name}</p>
            <p>Players: {picked.players} | Price: {picked.price}฿</p>
            <p>Platforms: {picked.platforms.join(", ")}</p>
            <p>Genres: {picked.genres.join(", ")}</p>
          </div>
        )}

        {result.length > 0 && (
          <div className="bg-neutral-800 p-4 rounded-2xl">
            <h2 className="text-xl font-bold">Results ({result.length})</h2>
            <ul className="mt-2 space-y-1">
              {result.map(g => (
                <li key={g.name}>{g.name} — {g.price}฿</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
