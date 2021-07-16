import { useState, useEffect } from 'react'
interface IPokemon {
  name: string,
  url: string
}

interface IRow {
  name: string,
  url: string,
  i: number
}

const urlBase = "https://pokeapi.co/api/v2/pokemon"

const getPokemon = async () => {

  const response = await fetch(urlBase + '?offset=0&limit=10')
  const data = await response.json()
  console.log(data)
  console.log(data.results)

  return data
}

function App() {
  const [pokemonList, setPokemonList] = useState<[IPokemon] | undefined>(undefined)

  const Row = ({ name, url, i, ...props }: IRow)=> {
    return (
    <tr className="text-left bg-gray-100 border-b border-gray-200" key={i} >
      <th className="capitalize w-1/2 pl-7 font-light">{name}</th>
      <th className="w-1/2 pl-7 font-light"><a href={url}>{url}</a></th>
    </tr>
    )
  }

  useEffect(() => {
    (async () => {
      const data = await getPokemon()
      setPokemonList(data.results)
      console.log({ pokemonList })
    })()
  }, [])



  return <div id="app" className="text-indigo-500 bg-indigo-100" style={{position: "absolute", top:0, right: 0, left: 0, bottom: 0}}>
    <div className="container mx-auto pt-5">
      <div className="text-center">
        <p className="font-bold text-6xl">Learning Table</p>
      </div>
      <table className="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800">
        <thead className="text-left border-b-2 border-gray-300">
          <tr>
            <th className="w-1/2 pl-7">Name</th>
            <th className="w-1/2 pl-7">Url</th>
          </tr>
        </thead>
        <tbody >
          {!pokemonList ? <></> :
            pokemonList.map((pokemon: IPokemon, i: number) => <Row name={pokemon.name} url={pokemon.url} i={i}/>)
          }
          <tr>
            <th className="w-1/2 py-5">
              <select className="btn btn-blue btn-blue:hover">
                <option>5</option>
                <option selected>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              </th>
            <th className="w-1/2 py-5">
              <button className="btn btn-blue btn-blue:hover">More</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

}

export default App;
