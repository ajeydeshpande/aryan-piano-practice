// src/App.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import './App.css';

const messages = {
  low: [
    "Grade 4 needs a bit more effort!",
    "Let's aim for 30+ minutes tomorrow!",
    "Try harder, Aryan – I know you can do better!",
    "We're not there yet. Keep going!",
    "Less than 30 mins won’t get us to Grade 4.",
    "Consistency is key. Come on!",
    "Push yourself, even when it's tough.",
    "Practice builds champions. More tomorrow!",
    "You're capable of more. Let's see it.",
    "Come on Aryan, time to step it up!"
  ],
  good: [
    "Good work! Keep it up! 🎹",
    "Nice job, Aryan! Solid practice today.",
    "We're on track for Grade 4!",
    "This is the way to improve. Well done!",
    "You're growing every day – keep going!",
    "Solid session today. 👏",
    "Keep showing up like this!",
    "You're doing just fine. Keep that focus.",
    "Well practiced. We’re moving forward!",
    "Good effort today, Aryan!"
  ],
  high: [
    "Wow! That’s amazing dedication! 💪",
    "Grade 4, here we come! 🔥",
    "Excellent focus today!",
    "That's how pros practice!",
    "Outstanding work today!",
    "You’re setting an example, Aryan!",
    "Bravo! Your commitment shows.",
    "Massive progress today!",
    "Proud of you – this was a power session!",
    "This energy will take you far!"
  ]
};

function App() {
  const [minutes, setMinutes] = useState(30);
  const [submitted, setSubmitted] = useState(false);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [message, setMessage] = useState('');

  const target = 280;

  useEffect(() => {
    fetchTotal();
  }, []);

  const fetchTotal = async () => {
    const colRef = collection(db, "practice");
    const docs = await getDocs(colRef);
    let total = 0;
    const now = new Date();
    docs.forEach(doc => {
      const data = doc.data();
      const date = data.timestamp?.toDate();
      const sameWeek = date && now - date < 7 * 24 * 60 * 60 * 1000;
      if (sameWeek) {
        total += data.minutes;
      }
    });
    setTotalMinutes(total);
  };

  const handleSubmit = async () => {
    await addDoc(collection(db, "practice"), {
      minutes,
      timestamp: Timestamp.now()
    });
    setSubmitted(true);
    fetchTotal();

    if (minutes < 30) {
      setMessage(randomFrom(messages.low));
    } else if (minutes <= 60) {
      setMessage(randomFrom(messages.good));
    } else {
      setMessage(randomFrom(messages.high));
    }
  };

  const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  if (submitted) {
    const percent = Math.min((totalMinutes / target) * 100, 100);
    return (
      <div className="App">
        <h1>{message}</h1>
        <h2>You've practiced {totalMinutes} minutes this week.</h2>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${percent}%` }} />
        </div>
        <p>Target: 280 mins/week</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Hi Aryan! 🎵</h1>
      <p>How much did you practice today?</p>
      <input
        type="range"
        min="0"
        max="120"
        value={minutes}
        onChange={(e) => setMinutes(parseInt(e.target.value))}
      />
      <p>{minutes} minutes</p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
