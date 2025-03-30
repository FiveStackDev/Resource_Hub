import React, { useState, useEffect } from "react";
import MealTimeCard from "./MealTimeCard";
import '../css/Calender/MealTimeSelect.css';

export default function MealTimeSelect({ selectedDate, onAddEvent, isMealSelected }) {
  const [mealTimes, setMealTimes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMealTimes();
  }, []);

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

  return (
    <div>
      <h3>Select a meal time</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="meal">
        {mealTimes.map((meal) => (
          <MealTimeCard
            key={meal.id}
            name={meal.mealName}
            image={meal.mealImageUrl || '/default-meal.png'}
            onSelect={(mealType) => onAddEvent(meal.mealName, mealType)}
            isDisabled={isMealSelected(meal.mealName)}
          />
        ))}
      </div>
    </div>
  );
}
