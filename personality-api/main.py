import google.generativeai as genai
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
import os 
import requests
from fastapi.middleware.cors import CORSMiddleware


#Load environment from env file
load_dotenv()

#Accesing API Key
gem_api_key= os.getenv("GEMINI_API_KEY")

#Uses onfigure to set the api key to be used as the global key for all api calls
genai.configure(api_key= gem_api_key)


#Creating FastAPI App
app= FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

#Model that holds personality traits
class PersonalityTest(BaseModel):
    dominant_trait: str
    challenge_approach: str
    music_genre: str
    free_time_activity: str
    ideal_environment: str
    valued_trait_in_others: str
    favorite_color: str
    elemental_energy: str
    friend_description: str

def get_pokemon_from_gem(traits: PersonalityTest):
    model= genai.GenerativeModel("gemini-2.0-flash")

    description= (
        "Match a Pokémon to these personality traits:\n"
        f"- Dominant trait: {traits.dominant_trait}\n"
        f"- Challenge approach: {traits.challenge_approach}\n"
        f"- Emotional range: {traits.music_genre}\n"
        f"- Free time activity: {traits.free_time_activity}\n"
        f"- Ideal environment: {traits.ideal_environment}\n"
        f"- Valued trait in others: {traits.valued_trait_in_others}\n"
        f"- Favorite color: {traits.favorite_color}\n"
        f"- Elemental energy: {traits.elemental_energy}\n"
        f"- How friends describe them: {traits.friend_description}\n\n"
        "Provide ONLY the Pokémon name"
    )

    response= model.generate_content(description)
    return response.text.strip()

def handle_pokemon(user_pokemon):
    # send request to pokedex API with pokemon parameter
    URL = f'https://pokeapi.co/api/v2/pokemon/{user_pokemon}'
    r = requests.get(url=URL)
    # Ensure the request was successful
    if r.status_code == 200:
        data = r.json()
        return data
    else:
        return {"error": "Unable to retrieve data"}
    
@app.post("/get-pokemon")
def get_pokemon(traits: PersonalityTest):
    user_pokemon= get_pokemon_from_gem(traits)
    attributes = handle_pokemon(user_pokemon)
    return {"pokemon": user_pokemon, "attributes": attributes}