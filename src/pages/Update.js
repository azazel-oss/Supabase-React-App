import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const Update = () => {
  const { drinksId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState(0);

  const [formError, setFormError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !method || !rating) {
      setFormError("Please fill all the fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("drinks")
      .update({ title, method, rating })
      .eq("id", drinksId);

    console.log(data);

    if (error) {
      setFormError("Please fill the fields correctly");
    }

    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  }

  useEffect(() => {
    const fetchDrink = async () => {
      const { data, error } = await supabase
        .from("drinks")
        .select()
        .eq("id", drinksId)
        .single();

      if (error) {
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
      }
    };
    fetchDrink();
  }, [drinksId, navigate]);
  return (
    <div className="page update">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="method">Method:</label>
        <textarea
          name="method"
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          name="rating"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button>Update drink</button>
      </form>
      {formError && <p className="error">{formError}</p>}
    </div>
  );
};

export default Update;
