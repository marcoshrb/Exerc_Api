import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import { CardApi } from './components/CardApi'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'
import { Alert } from './components/Alert'
import { MapCard } from './components/Map'
import { Tilt } from 'react-tilt'

function App() {
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
  const [caracterName, setCaracterName] = useState("")
  const [alert, setAlert] = useState(false)


  useEffect(() => {
    api.get(`/character/?page=${page}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        setAlert(true)
      }
      console.error(error)
    })
  }, [page])

  useEffect(() => {
    api.get(`/character/?page=2&name=${caracterName}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        setAlert(true)
      }
      console.error(error)
    })
  }, [caracterName])

  // Tilt
  const defaultOptions = {
    reverse: true,  // reverse the tilt direction
    max: 20,     // max tilt rotation (degrees)
    perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.0,    // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000,   // Speed of the enter/exit transition
    transition: true,   // Set a transition on enter/exit.
    axis: null,   // What axis should be disabled. Can be X or Y.
    reset: true,    // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
  }

  return (
    <>
      <div className={style.wrapBtns}>
        <button onClick={() => setShow("prod")}>Produtos</button>
        <button onClick={() => setShow("api")}>API</button>
        <button onClick={() => setShow("map")}>Mapa</button>
      </div>

      {alert &&
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Alert setAlert={setAlert} className={style.Alert}></Alert>
        </div>
      }

      <div style={{
        height: "50px"
      }}></div>

      <div className={style.wrapPage}>
        <h1>Exercícios de manutenção</h1>
        {show === "prod" &&
          <>
            <h2>Showroom de produtos</h2>
            <div className={style.DivCardsProdutos}>
              {produtos.map((item) => {
                return (
                  <>
                    <div className={style.DivCard}>
                      {item.status &&
                        <div className={style.statusTrue}></div>
                      }
                      {!item.status &&
                        <div className={style.statusFalse}></div>
                      }
                      <Card name={item.name} desc={item.desc} value={item.value} image={item.image} key={item.id} />
                    </div>
                  </>
                )
              })}
            </div>
          </>
        }
        {show === "api" &&
          <>
            <h2>Rick and Morty API</h2>
            <div>
              <input type="number" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)} />
              <input type="text" placeholder="nome" value={caracterName} onChange={(event) => setCaracterName(event.target.value)} />
            </div>

            <div className={style.DivCardsProdutos}>
              {data.map((item) => {
                return (
                  <Tilt options={defaultOptions} >
                    <div className={style.DivCard}>
                      <div key={item.id}>
                        <CardApi name={item.name} status={item.status} species={item.species} type={item.type} gender={item.gender} image={item.image} />
                      </div>
                    </div>
                  </Tilt>
                )
              })}
            </div>
          </>
        }
        {show === "map" &&
          <>
            <h2>Mapa</h2>
            <div>
              <MapCard position={[-25.424818338892948, -49.27240541041007]}></MapCard>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default App
