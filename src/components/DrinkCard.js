const DrinkCard = (props) => {
  return (
    <div className="drink-card">
      <h3>{props.drink.title}</h3>
      <p>{props.drink.method}</p>
      <div className="rating">{props.drink.rating}</div>
    </div>
  );
};

export default DrinkCard;
