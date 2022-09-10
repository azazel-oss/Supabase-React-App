import { useEffect, useState } from "react";
import DrinkCard from "../components/DrinkCard";
import supabase from "../config/supabaseClient";
const Home = () => {
  const [drinks, setDrinks] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const handleDelete = (id) => {
    setDrinks((prevState) => {
      return prevState.filter((drink) => drink.id !== id);
    });
  };
  useEffect(() => {
    async function fetchDrinks() {
      let { data: drinks, error } = await supabase
        .from("drinks")
        .select("*")
        .order("rating", { ascending: false });
      if (error) {
        setFetchError(error);
      } else {
        setDrinks(drinks);
        setFetchError(null);
      }
    }
    fetchDrinks();
  }, []);
  return (
    <div className="page home">
      <h2>Home</h2>
      {fetchError && <p>{fetchError}</p>}
      {drinks && (
        <div className="drinks">
          {/* order by button */}
          <div className="drink-grid">
            {drinks.map((drink) => (
              <DrinkCard key={drink.id} drink={drink} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
