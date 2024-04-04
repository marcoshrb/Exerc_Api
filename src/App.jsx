import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import { CardApi } from './components/CardApi'
import produtos from './constants/produtos.json'
import { api } from "./api/rmApi"
import style from './App.module.css'
import { Alert } from './components/Alert'



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


  return (
    <>
      <div className={style.wrapBtns}>
        <button onClick={() => setShow("prod")}>Produtos</button>
        <button onClick={() => setShow("api")}>API</button>
        <button onClick={() => setShow("map")}>Mapa</button>
      </div>

      {alert &&
        <div style={{display: "flex", justifyContent:"center"}}>
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
              <input type="text" placeholder="nome" value={caracterName} onChange={(event) => setCaracterName(event.target.value)}  />
            </div>
            <div className={style.DivCardsProdutos}>
              {data.map((item) => {
                return (
                  <div className={style.DivCard}>
                    <div key={item.id}>
                      <CardApi name={item.name} status={item.status} species={item.species} type={item.type} gender={item.gender} image={item.image} />
                    </div>
                    {/* <button onClick={() => {}}>Info</button> */}
                  </div>
                )
              })}
            </div>
          </>
        }
        {show === "map" &&
          <>
            <h2>Mapa</h2>
            <div>
              mapa aqui
            </div>
          </>
        }
      </div>
    </>
  )
}

export default App
