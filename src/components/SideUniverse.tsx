const leftModels = ["Gemini", "Gemma", "Vertex AI", "Document AI", "vLLM", "Agent Engine"];
const rightModels = ["Claude", "GPT-4o", "Llama 3", "Mistral", "Groq", "RAG"];

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

function Rail({
  side,
  models,
  stars,
}: {
  side: "left" | "right";
  models: string[];
  stars: number[][];
}) {
  return (
    <div
      className={`pointer-events-none fixed top-0 z-[1] hidden h-screen w-[min(13vw,200px)] overflow-hidden xl:block ${
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

      <div className={`planet ${side === "left" ? "planet-teal" : "planet-gold"}`} />
      <div className={`planet planet-sm ${side === "left" ? "planet-blue" : "planet-ice"}`} />

      <div className="model-column">
        {models.map((name, i) => (
          <span
            key={name}
            className="model-chip"
            style={{ animationDelay: `${i * 4.2}s` }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SideUniverse() {
  return (
    <>
      <Rail side="left" models={leftModels} stars={leftStars} />
      <Rail side="right" models={rightModels} stars={rightStars} />
    </>
  );
}
