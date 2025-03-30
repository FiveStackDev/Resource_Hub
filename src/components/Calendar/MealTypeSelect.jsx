import React, { useState, useEffect } from "react";
import MealTypeCard from "./MealTypeCard";
import '../css/Calender/MealTypeSelect.css';

export default function MealTypeSelect({ onSelect }) {
  const [mealTypes, setMealTypes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMealTypes();
  }, []);

  const fetchMealTypes = async () => {
    try {
      const response = await fetch('http://localhost:9090/mealtype/details');
      if (!response.ok) {
        throw new Error('Failed to fetch meal types');
      }
      const data = await response.json();
      setMealTypes(data);
    } catch (error) {
      setError(`Error fetching meal types: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Select a meal type</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="meal">
        {mealTypes.map((mealType) => (
          <MealTypeCard
            key={mealType.id}
            name={mealType.mealName}
            image={mealType.mealImageUrl || '/default-meal.png'}
            onSelect={() => onSelect(mealType.mealName)}
          />
        ))}
      </div>
    </div>
  );
}
