import { useState } from "react";
import logoPytune from "../../assets/logo.png";
import { ExampleCard } from "../../components/ExampleCard/ExampleCard";
import { ExampleCardHistory } from "../../components/ExampleCardHistory/ExampleCardHistory";
import { examplesPrompts } from "../../constants/examplesPrompts";
import { selectOptions } from "../../constants/selectOptions";

export const Home = () => {
  const [prompt, setPrompt] = useState("");

  const history = JSON.parse(localStorage.getItem("historyPrompt") || "[]");

  const handleSubmit = () => {
    //
    //pegada a API
    if (prompt) {
      const historyList = localStorage.getItem("historyPrompt")
        ? JSON.parse(localStorage.getItem("historyPrompt") || "[]")
        : [];

      historyList.push(prompt);
      localStorage.setItem("historyPrompt", JSON.stringify(historyList));
      console.log(JSON.parse(localStorage.getItem("historyPrompt") || "[]"));
      setPrompt("");
    }
  };

  const removeHistory = () => {
    localStorage.setItem("historyPrompt", JSON.stringify([]));
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-purple-300 to-indigo-400 flex flex-col items-center p-8">
      <header className="flex flex-col items-center">
        <img src={logoPytune} alt="Logo" width={150} />
        <h1 className="text-4xl font-bold mb-4 mt-[-30px]">Pytune</h1>
        <p className="text-lg mb-8 font-semibold">
          ¿Qué tipo de melodia te gustaría crear hoy?
        </p>
      </header>

      <div className="flex flex-col w-full sm:flex-row gap-4 mb-4 max-w-[800px] justify-start items-start">
        <select className="px-4 py-2 rounded-xl bg-white hover:shadow-xl transition cursor-pointer font-semibold">
          {selectOptions.gender.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select className="px-4 py-2 rounded-xl bg-white hover:shadow-xl transition cursor-pointer font-semibold">
          {selectOptions.instrument.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select className="px-4 py-2 rounded-xl bg-white hover:shadow-xl transition cursor-pointer font-semibold">
          {selectOptions.mood.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full flex justify-center items-center gap-5 mb-7">
        <input
          type="text"
          placeholder="Describe el estilo de melodía que quieres generar..."
          className="w-full max-w-2xl p-3 rounded bg-white"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition cursor-pointer shadow-xl font-semibold"
        >
          Generar
        </button>
      </div>

      <div className="flex items-center gap-5 mb-6">
        <div className="border w-[200px]" />
        <h3 className="font-semibold">Ejemplos de instrucciónes</h3>
        <div className="border w-[200px]" />
      </div>

      <section className="w-[800px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {examplesPrompts.map((ejemplo, idx) => (
          <ExampleCard
            key={idx}
            title={ejemplo}
            onPress={() => setPrompt(ejemplo)}
          />
        ))}
      </section>

      <div className="flex items-center gap-5 m-7">
        <div className="border w-[200px]" />
        <h3 className="font-semibold">Historial de Busquedas</h3>
        <div className="border w-[200px]" />
      </div>

      <section className="flex flex-col w-[800px] gap-4">
        {history.length > 0 ? (
          <>
            <button
              onClick={removeHistory}
              className="w-[150px] px-2 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition cursor-pointer shadow-xl font-semibold"
            >
              Borrar Historial
            </button>
            {history.map((item: string, idx: number) => (
              <ExampleCardHistory
                key={idx}
                title={item}
                onPress={() => setPrompt(item)}
              />
            ))}
          </>
        ) : (
          <div className="flex justify-center items-center h-20 bg-white rounded-lg shadow-md">
            <p>No hay historial de busquedas</p>
          </div>
        )}
      </section>
      <footer>
        <p className="text-center text-sm text-gray-600 mt-10">
          2025 Pytune. UADE - Simón Aguirre - Ezequiel Mónaco - Jeronimo Podesta
          - Valentin Romero
        </p>
      </footer>
    </main>
  );
};
