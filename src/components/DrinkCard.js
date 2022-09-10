import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const DrinkCard = (props) => {
  async function handleDelete(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("drinks")
      .delete()
      .eq("id", props.drink.id);

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      props.onDelete(props.drink.id);
    }
  }
  return (
    <div className="drink-card">
      <h3>{props.drink.title}</h3>
      <p>{props.drink.method}</p>
      <div className="rating">{props.drink.rating}</div>
      <div className="buttons">
        <Link to={"/" + props.drink.id}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default DrinkCard;
