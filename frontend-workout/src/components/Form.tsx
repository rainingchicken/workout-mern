import { FormEvent, useState } from "react";
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Form = () => {
  const [workout, setWorkout] = useState({
    title: "",
    reps: 0,
    load: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: FormEvent) => {
    setWorkout((state) => ({
      ...state,
      title: (e.target as HTMLInputElement).value,
    }));
  };
  const handleRepsChange = (e: FormEvent) => {
    setWorkout((state) => ({
      ...state,
      reps: +(e.target as HTMLInputElement).value,
    }));
  };
  const handleLoadChange = (e: FormEvent) => {
    setWorkout((state) => ({
      ...state,
      load: +(e.target as HTMLInputElement).value,
    }));
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    const newWorkout = {
      title: workout.title,
      reps: workout.reps,
      load: workout.load,
    };
    const response = await fetch(`${VITE_API_BASE_URL}/api/workouts`, {
      method: "POST",
      body: JSON.stringify(newWorkout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
    } else {
      setWorkout(newWorkout);
      setError(null);

      console.log("added!");
    }
  };

  return (
    <div>
      <h1>Add New Workout Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="workoutTitle">Workout Title</label>
        <input id="workoutTitle" type="text" onChange={handleTitleChange} />
        <label htmlFor="workoutReps">Reps</label>
        <input id="workoutReps" type="number" onChange={handleRepsChange} />
        <label htmlFor="workoutLoad">Load</label>
        <input id="workoutLoad" type="number" onChange={handleLoadChange} />
        <button type="submit">SUBMIT</button>
        {error}
      </form>
    </div>
  );
};

export default Form;
