import React, { Component } from 'react';
import axios from 'axios';
import { Grid, GridCell, GridInner } from '@rmwc/grid';

class AllPokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      pokemonLoaded: false,
    };
  }

  componentDidMount()  {
    if (localStorage.hasOwnProperty('pokemon')) {
      this.setState({ pokemon: JSON.parse(localStorage.getItem('pokemon')),
                      pokemonLoaded: true});
      
    } else {
      axios.get('https://pokeapi.co/api/v2/pokemon')
        .then((response) => {
          this.setState({
            pokemon: response.data.results,
            pokemonLoaded: true
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  componentWillUnmount() {
    localStorage.setItem("pokemon", JSON.stringify(this.state.pokemon));
  }

  render() {

    const content = this.state.pokemonLoaded ? 
      <ul>
      {this.state.pokemon.map((item) => {
        return <li> 
          {item.name}
          </li>
        })}
      </ul> : 
      <h1>Loading...</h1>
    return (
      <Grid className="base-outer-grid base-outer-grid--first">
        <GridInner>
          <GridCell> 
            {content}
          </GridCell>
        </GridInner>
      </Grid>
          
    );
    
  };
};

export default AllPokemon;