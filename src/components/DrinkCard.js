import { Link } from "react-router-dom";

const DrinkCard = (props) => {
  return (
    <div className="drink-card">
      <h3>{props.drink.title}</h3>
      <p>{props.drink.method}</p>
      <div className="rating">{props.drink.rating}</div>
      <div className="buttons">
        <Link to={"/" + props.drink.id}>
          <i className="material-icons">edit</i>
        </Link>
      </div>
    </div>
  );
};

export default DrinkCard;
