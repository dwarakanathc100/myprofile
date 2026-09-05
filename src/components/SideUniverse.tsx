const leftStars = [
  [12, 8],
  [38, 14],
  [22, 22],
  [58, 18],
  [16, 34],
  [48, 40],
  [28, 52],
  [62, 48],
  [18, 66],
  [44, 72],
  [32, 84],
  [56, 90],
];

const rightStars = [
  [64, 10],
  [28, 16],
  [48, 24],
  [18, 30],
  [70, 36],
  [34, 46],
  [54, 58],
  [22, 64],
  [66, 70],
  [40, 78],
  [16, 86],
  [58, 92],
];

const leftPlanets = [
  { name: "Google", skin: "teal", size: 150, duration: "28s" },
  { name: "Hugging Face", skin: "gold", size: 108, duration: "19s" },
  { name: "Groq", skin: "blue", size: 72, duration: "13s" },
];

const rightPlanets = [
  { name: "ChatGPT", skin: "gold", size: 150, duration: "26s" },
  { name: "Anthropic", skin: "ice", size: 108, duration: "18s" },
  { name: "Mistral", skin: "teal", size: 72, duration: "12s" },
];

function Rail({
  side,
  stars,
  planets,
}: {
  side: "left" | "right";
  stars: number[][];
  planets: typeof leftPlanets;
}) {
  return (
    <div
      className={`pointer-events-none fixed top-0 z-[1] hidden h-screen w-[min(15vw,220px)] overflow-hidden xl:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      {stars.map(([x, y], i) => (
        <span
          key={`${side}-s-${i}`}
          className="star"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDelay: `${i * 0.35}s`,
            width: i % 4 === 0 ? 3 : 2,
            height: i % 4 === 0 ? 3 : 2,
          }}
        />
      ))}

      <div className="orbit-stage">
        {planets.map((planet) => (
          <div
            key={planet.name}
            className="orbit"
            style={{
              width: planet.size,
              height: planet.size,
              animationDuration: planet.duration,
            }}
          >
            <div className="orbit-item" style={{ animationDuration: planet.duration }}>
              <div className={`world world-${planet.skin}`}>
                <span>{planet.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SideUniverse() {
  return (
    <>
      <Rail side="left" stars={leftStars} planets={leftPlanets} />
      <Rail side="right" stars={rightStars} planets={rightPlanets} />
    </>
  );
}
