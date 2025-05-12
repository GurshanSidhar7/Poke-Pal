"use client"
import { useState } from "react"

// Input For Pokemon Form
export default function PokemonForm() {
  const [formData, setFormData] = useState({
    dominant_trait: "",
    challenge_approach: "",
    music_genre: "",
    free_time_activity: "",
    ideal_environment: "",
    valued_trait_in_others: "",
    favorite_color: "",
    elemental_energy: "",
    friend_description: "",
  })

  // Stores updated pokemon result
  const [pokemonData, setPokemonData] = useState(null)

  // Sets loading to false while finding the pokemon information
  const [loading, setLoading] = useState(false)

  // Sets error
  const [error, setError] = useState(null)

  // Handles Input Change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("https://poke-pal-backend.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }
      const result = await response.json()
      setPokemonData(result)
    } catch (error) {
      console.error("Error:", error)
      setError("Failed to fetch your Pokémon match. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Function to get type color
  const getTypeColor = (type) => {
    const typeColors = {
      normal: "bg-gray-400 text-white",
      fire: "bg-red-500 text-white",
      water: "bg-blue-500 text-white",
      electric: "bg-yellow-400 text-gray-800",
      grass: "bg-green-500 text-white",
      ice: "bg-blue-200 text-gray-800",
      fighting: "bg-red-700 text-white",
      poison: "bg-purple-500 text-white",
      ground: "bg-yellow-700 text-white",
      flying: "bg-indigo-300 text-gray-800",
      psychic: "bg-pink-500 text-white",
      bug: "bg-lime-500 text-white",
      rock: "bg-yellow-800 text-white",
      ghost: "bg-purple-700 text-white",
      dragon: "bg-indigo-700 text-white",
      dark: "bg-gray-800 text-white",
      steel: "bg-gray-500 text-white",
      fairy: "bg-pink-300 text-gray-800",
    }
    return typeColors[type] || "bg-amber-300 text-gray-800"
  }

  // Function to get stat color
  const getStatColor = (statName) => {
    const statColors = {
      hp: "bg-red-500",
      attack: "bg-orange-500",
      defense: "bg-yellow-500",
      "special-attack": "bg-blue-500",
      "special-defense": "bg-green-500",
      speed: "bg-pink-500",
    }
    return statColors[statName] || "bg-amber-300"
  }

  return (
    <div className="min-h-screen bg-red-500 py-8 px-4 sm:px-6 lg:px-8 font-mono">
      {/* Pokédex outer design */}
      <div className="max-w-5xl mx-auto bg-red-600 rounded-lg shadow-2xl p-6 border-8 border-red-700 relative">
        {/* Pokédex top lights */}
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-inner flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-blue-500 border-2 border-blue-600 animate-pulse"></div>
          </div>
          <div className="flex ml-6 gap-3">
            <div className="w-5 h-5 rounded-full bg-red-400"></div>
            <div className="w-5 h-5 rounded-full bg-yellow-400"></div>
            <div className="w-5 h-5 rounded-full bg-green-400"></div>
          </div>
          <div className="ml-auto text-white text-2xl font-bold tracking-widest">POKÉDEX</div>
        </div>

        {/* Pokédex screen */}
        <div className="bg-gray-800 rounded-lg p-6 border-8 border-gray-900 mb-6">
          <div className="bg-green-100 rounded-lg p-6 min-h-[500px] relative">
            {/* Loading animation */}
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-100 z-10 rounded-lg">
                <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-xl font-bold text-green-800 animate-pulse">Searching for your Pokémon...</p>
              </div>
            )}

            {!pokemonData ? (
              <div>
                <h1 className="text-3xl font-bold mb-8 text-green-800 text-center tracking-wider">
                  Find Your Pokémon Match
                </h1>
                <form onSubmit={handleSubmit} className="mb-6 space-y-6">
                  {[
                    {
                      label: "What's the one word that best describes you?",
                      name: "dominant_trait",
                      placeholder: "e.g., Courageous, Curious, Passionate, Calm",
                    },
                    {
                      label: "How do you tackle challenges?",
                      name: "challenge_approach",
                      placeholder: "e.g., Face it head-on, Strategize carefully, Go with the flow, Seek help",
                    },
                    {
                      label: "What is your favourite music genre?",
                      name: "music_genre",
                      placeholder: "e.g., Rock, Hip-Hop, Blues, Indie, Pop, Jazz",
                    },
                    {
                      label: "What do you love doing when you're free?",
                      name: "free_time_activity",
                      placeholder: "e.g., Reading, Hiking, Gaming, Painting",
                    },
                    {
                      label: "Where do you feel most at peace?",
                      name: "ideal_environment",
                      placeholder: "e.g., Quiet forest, Bustling city, Cozy home, Open beach",
                    },
                    {
                      label: "What trait do you admire most in others?",
                      name: "valued_trait_in_others",
                      placeholder: "e.g., Honesty, Loyalty, Kindness, Humor",
                    },
                    {
                      label: "Pick your favorite color!",
                      name: "favorite_color",
                      placeholder: "e.g., Blue, Red, Green, Purple",
                    },
                    {
                      label: "Which element feels most like you?",
                      name: "elemental_energy",
                      placeholder: "e.g., Fire, Water, Earth, Air, Ice, Lightning",
                    },
                    {
                      label: "How would your best friend describe you?",
                      name: "friend_description",
                      placeholder: "e.g., Loyal and funny, Calm and wise, Energetic and adventurous",
                    },
                  ].map((field, index) => (
                    <div className="mb-4 bg-green-50 p-5 rounded-lg border-2 border-green-300" key={index}>
                      <label className="block mb-2 text-green-800 font-bold text-lg">
                        {field.label}
                        <input
                          type="text"
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full p-4 mt-2 border-4 border-green-600 rounded-lg bg-green-50 text-green-900 focus:ring-4 focus:ring-yellow-400 focus:border-yellow-500 placeholder-green-700 placeholder-opacity-70"
                          required
                        />
                      </label>
                    </div>
                  ))}

                  <div className="flex justify-center mt-8">
                    <button
                      type="submit"
                      className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full border-4 border-yellow-500 shadow-lg transform transition hover:scale-105 disabled:opacity-50 text-lg"
                      disabled={loading}
                    >
                      {loading ? "Finding..." : "Find My Pokémon"}
                    </button>
                  </div>
                </form>

                {error && (
                  <div className="p-4 mb-4 bg-red-100 border-4 border-red-300 rounded-lg text-red-700 font-bold">
                    {error}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-2 p-6 rounded-lg bg-green-50 border-4 border-green-600">
                <h2 className="text-3xl font-bold mb-6 text-green-800 text-center tracking-wider">
                  Your Pokémon Match: {pokemonData.pokemon}
                </h2>

                {pokemonData.attributes && (
                  <div className="flex flex-col items-center text-center">
                    {/* Pokédex entry header */}
                    <div className="w-full bg-red-500 text-white py-3 px-4 rounded-t-lg mb-6 border-2 border-red-700">
                      <p className="text-lg">Pokédex Entry #{pokemonData.attributes.id}</p>
                    </div>

                    {/* Large Centered Sprite */}
                    <div className="w-56 h-56 bg-white rounded-lg border-4 border-gray-300 flex items-center justify-center mb-6 shadow-inner">
                      <img
                        src={pokemonData.attributes.sprites.front_default || "/placeholder.svg"}
                        alt={pokemonData.pokemon}
                        className="w-48 h-48 object-contain"
                        style={{ imageRendering: "pixelated" }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                      {/* Basic Stats */}
                      <div className="text-left bg-green-100 p-4 rounded-lg border-2 border-green-600">
                        <h3 className="font-bold mb-3 text-green-800 border-b-2 border-green-600 pb-1 text-lg">
                          Basic Stats
                        </h3>
                        <p className="text-green-900 mb-2">
                          <span className="font-medium">Pokédex ID:</span> #{pokemonData.attributes.id}
                        </p>
                        <p className="text-green-900 mb-2">
                          <span className="font-medium">Height:</span> {pokemonData.attributes.height / 10} m
                        </p>
                        <p className="text-green-900 mb-2">
                          <span className="font-medium">Weight:</span> {pokemonData.attributes.weight / 10} kg
                        </p>
                      </div>

                      {/* Abilities */}
                      <div className="text-left bg-green-100 p-4 rounded-lg border-2 border-green-600">
                        <h3 className="font-bold mb-3 text-green-800 border-b-2 border-green-600 pb-1 text-lg">
                          Abilities
                        </h3>
                        <ul className="list-disc pl-5">
                          {pokemonData.attributes.abilities.map((abilityInfo) => (
                            <li key={abilityInfo.ability.name} className="text-green-900 capitalize mb-1">
                              {abilityInfo.ability.name.replace("-", " ")}
                              {abilityInfo.is_hidden && <span className="text-sm text-gray-500"> (Hidden)</span>}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Types */}
                      <div className="text-left bg-green-100 p-4 rounded-lg border-2 border-green-600">
                        <h3 className="font-bold mb-3 text-green-800 border-b-2 border-green-600 pb-1 text-lg">
                          Types
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {pokemonData.attributes.types.map((typeInfo) => (
                            <span
                              key={typeInfo.type.name}
                              className={`px-4 py-2 ${getTypeColor(typeInfo.type.name)} rounded-full text-sm capitalize font-bold`}
                            >
                              {typeInfo.type.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-left bg-green-100 p-4 rounded-lg border-2 border-green-600">
                        <h3 className="font-bold mb-3 text-green-800 border-b-2 border-green-600 pb-1 text-lg">
                          Stats
                        </h3>
                        {pokemonData.attributes.stats.map((statInfo) => (
                          <div key={statInfo.stat.name} className="mb-3">
                            <div className="flex justify-between text-sm mb-1 capitalize text-green-900">
                              <span className="font-bold">{statInfo.stat.name.replace("-", " ")}</span>
                              <span>{statInfo.base_stat}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300">
                              <div
                                className={`${getStatColor(statInfo.stat.name)} h-full rounded-full`}
                                style={{ width: `${(statInfo.base_stat / 255) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Back button */}
                    <button
                      onClick={() => setPokemonData(null)}
                      className="mt-8 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full border-4 border-blue-600 shadow-lg transform transition hover:scale-105 text-lg"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Pokédex bottom controls */}
        <div className="flex justify-between items-center">
          <div className="w-20 h-20 rounded-full bg-gray-800 border-4 border-gray-900"></div>
          <div className="flex gap-4">
            <div className="w-16 h-6 bg-gray-800 rounded-sm border-2 border-gray-900"></div>
            <div className="w-16 h-6 bg-gray-800 rounded-sm border-2 border-gray-900"></div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-500 rounded-full border-2 border-blue-600"></div>
            <div className="w-10 h-10 bg-red-500 rounded-full border-2 border-red-600"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
