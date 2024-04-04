export const Alert = ({ setAlert}) => {
    return (
        <div style={{
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            position: "fixed",
            justifyContent: "center",
            backgroundColor: "red",
            minHeight: "100px",
            width: "50vw",
            borderWidth: "5px",
            borderColor: "white",
            borderRadius: "10px",
            flexDirection: "column",
            marginTop:"10px"
        }}>
            <div style={{
                top: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.9
            }}>
                <h1>Personagem não encontrado</h1>
            </div>
            <button style={{
                color: "white",
                backgroundColor: "red",
                borderRadius: "10px"
            }}
            onClick={() => setAlert(false)}>X</button>
        </div>
    )
}