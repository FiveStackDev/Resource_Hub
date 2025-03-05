import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MealCard from "../../components/Meal/MealTimeCard";
import { MealCardPopup } from '../../components/Meal/AddMealTimePopup';
import '../css/AddMealTime.css';

function AddMealTime() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mealTimes, setMealTimes] = useState([]);
  const [error, setError] = useState(null);

  const title = "Add New Meal Time";
  const getSubtitle = () => "Manage meal times for the day";

  const handlePopupOpen = () => setIsPopupOpen(true);
  const handlePopupClose = () => setIsPopupOpen(false);

  const handleDelete = async (mealId) => {
    try {
      const response = await fetch(`http://localhost:9090/mealtime/${mealId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchMealTimes();
      } else {
        setError("Failed to delete meal time");
      }
    } catch (error) {
      setError(`Error deleting meal time: ${error.message}`);
    }
  };

  const fetchMealTimes = async () => {
    try {
      const response = await fetch('http://localhost:9090/mealtime/details');
      if (!response.ok) {
        throw new Error('Failed to fetch meal times');
      }
      const data = await response.json();
      setMealTimes(data);
    } catch (error) {
      setError(`Error fetching meal times: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchMealTimes();
  }, []);

  return (
    <div className="mealpage">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Meal times</h1>
      </div>
      <Button
        variant="contained"
        className="addbtn"
        onClick={handlePopupOpen}
      >
        New Meal Time
        <span className="addicon"><AddIcon /></span>
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="mealtimes">
        {mealTimes.length > 0 ? (
          mealTimes.map((meal) => (
            <MealCard 
              key={meal.id} 
              mealId={meal.id}
              name={meal.mealName}
              image={meal.mealImageUrl || '/default-meal.png'} 
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No meal times available</p>
        )}
      </div>

      <MealCardPopup
        open={isPopupOpen}
        onClose={handlePopupClose}
        title={title}
        subtitle={getSubtitle()}
        onSubmit={fetchMealTimes}
      />
    </div>
  );
}

export default AddMealTime;
