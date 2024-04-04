export const CardApi = ({
    name, status, species, type, gender, image
  }) => {
    return(
        <div>
            <h1>{name}</h1>
            <p>{species}</p>
            <p>{type}</p>
            <p>{gender}</p>
            <img src={image} alt={name} width={150} height={"auto"}/>
            <h2>{status}</h2>
        </div>
    )
  }