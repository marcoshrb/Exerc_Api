/* eslint-disable react/prop-types */
export const Card = ({
  name,
  desc,
  value,
  image
}) => {
  return(
      <div>
          <h1>{name}</h1>
          <h2>{desc}</h2>
          <p>{value}</p>
          <img src={image} alt={name} width={150} height={"auto"}/>
      </div>
  )
}