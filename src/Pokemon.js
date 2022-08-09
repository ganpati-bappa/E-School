import React, { useState, useEffect } from 'react';
import './Pokemon.scss'

import {MdReadMore} from 'react-icons/md'

export const Pokemon = (props) => {
    console.log(props.pokemon)
    const [abilities, setAbilities] = useState([]);

    const [encounter, setEncounter] = useState([]);

    const colors = ["#86C232","#e25822",'#05bff1','#F070a1','#276afb','#FAED26','orange','#8ee4af']

    let key = 0,key2 = 1000,key3 = -50;

    useEffect(() => {
        // Fetching Pokemon Info
        
        const handle_Locations = async () => {
            try {

                const res = await fetch(props.pokemon.location_area_encounters, {
                    method : "GET"
                })

                const data = await res.json();
                setEncounter(data);
                console.log(data)
            } catch (exception) {
                console.log(exception);
            }
        }

        handle_Locations();

    }, [])
    

    return (
        <div className = "Pokemon_card_holder">
            <div className = "Pokemon_img">
                <img src = {props?.pokemon?.sprites?.other["official-artwork"]?.front_default} alt = "dp"></img>
            </div>
        
        <div className = "Pokemon_total_desc">
            <div className = "Pokemon_desc">
                    <div className='one_liner_desc'>
                        <div>
                            <div className = "Pokemon_label"> Name </div>    
                            <div className = "Pokemon_label"> Base Experience </div>
                            <div className = "Pokemon_label"> Weight </div>
                        </div>
                        <div>
                            <div className = "Pokemon_values">{props.pokemon.name} </div>
                            <div className = "Pokemon_values">{props.pokemon.base_experience}</div>
                            <div className = "Pokemon_values">{props.pokemon.weight}</div>
                        </div>
                    </div>
                    
                    <div className = "Pokemon_label"> Pokemon Abilities </div>
                    <div className = "Pokemon_abilites">
                        {props.pokemon.abilities.map((ele) => {
                            return (
                                <span key = {key2++} className = "pokemon_ability">
                                    {ele.ability.name}
                                </span>
                            )
                        })}
                    </div>
                    <div className = "Pokemon_label"> Items Held </div>
                    <div className = "Pokemon_abilites">
                        {props.pokemon.held_items.map((ele) => {
                            return (
                                <span key = {key++} className = "pokemon_ability">
                                    {ele.item.name}
                                </span>
                            )
                        })}
                    </div>

                    <div className = "Pokemon_label"> Encounters </div>
                    <div className = "Pokemon_abilites">
                        {encounter.map((ele) => {
                            return (
                                <span key = {key3--} className = "pokemon_ability">
                                    {ele.location_area.name}
                                </span>
                            )
                        })}
                    </div>

                </div>
                <div className = "Pokemon_stats">
                    <div className = "Pokemon_stats_heading"> Stats </div>
                       {props.pokemon.stats.map((ele,idx) => {
                            return (
                                <div>
                                    <div className = "tooltip_nutrient_holder">
                                        <span className = "tooltip_nutrient_label">
                                            <span>{ele.stat.name}</span>
                                            <span>{ele.base_stat}</span>
                                        </span>
                
                                    <div className = "tooltip_nutrient_levels_full">
                                        <div className = "tooltip_nutrient_user_level" id = {`id-${idx}`}
                                        style = {{backgroundColor: colors[idx], width : ele.base_stat + "%"}}></div>
                                    </div>
                                </div>
                            </div>
                        )})}
                </div>
             </div>
        </div>
    )
}

export default Pokemon;