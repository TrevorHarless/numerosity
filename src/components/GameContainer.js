import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import NumberGrid from "./NumberGrid";
import ResultDisplay from "./ResultDisplay";
import "../styles/GameContainer.css";

const GameContainer = () => {
  const [level, setLevel] = useState(1);
  const [timer, setTimer] = useState(60);
  const [operation, setOperation] = useState("+");
  const [targetResult, setTargetResult] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState(""); // 'correct' or 'incorrect'

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  // Initialize game state for a new level
  const initializeLevel = useCallback(() => {
    let newNumbers, newOperation, validTarget;

    do {
      // Pick a random operation
      newOperation = generateRandomOperation();

      // If division is chosen, generate numbers to match a valid target
      if (newOperation === "/") {
        ({ newNumbers, validTarget } = generateValidDivisionLevel());
      } else {
        // Otherwise, generate random numbers and find a valid target
        newNumbers = generateRandomNumbers();
        validTarget = findValidTarget(newNumbers, newOperation);
      }
    } while (validTarget === null); // Ensure that a valid target was found

    newNumbers = shuffleArray(newNumbers);
    // Update state with new level info
    setNumbers(newNumbers);
    setOperation(newOperation);
    setTargetResult(validTarget);
    setSelectedNumbers([]);
    setSelectedIndices([]);
    setFeedback("");
    setTimer(60); // Reset timer
  }, []); // Empty array because `initializeLevel` doesn't depend on any external state

  // Handle number selection
  const handleSelectNumber = (num, index) => {
    if (selectedIndices.includes(index)) return;

    const newSelectedNumbers = [...selectedNumbers, num];
    const newSelectedIndices = [...selectedIndices, index];

    setSelectedNumbers(newSelectedNumbers);
    setSelectedIndices(newSelectedIndices);

    // Calculate result based on current selection
    const calculatedResult = calculateResult(newSelectedNumbers, operation);

    const isDivisionCorrect = operation === "/" && newSelectedNumbers.length >= 2 && calculatedResult === targetResult;

    if ((operation !== "/" && calculatedResult === targetResult) || isDivisionCorrect) {
      setFeedback("Correct! Advancing to the next level...");
      setFeedbackType("correct");
      setTimeout(() => {
        setLevel((prev) => prev + 1);
        initializeLevel();
      }, 1000);
    } else if (newSelectedNumbers.length >= 3 || (operation === "/" && newSelectedNumbers.length >= 2 && calculatedResult !== targetResult)) {
      // If 3 numbers are selected and incorrect
      setFeedback("Incorrect combination. Try again.");
      setFeedbackType("incorrect");
      setSelectedNumbers([]);
      setSelectedIndices([]);
    }
  };

  // Calculate the result of selected numbers based on the operation
  const calculateResult = (nums, operation) => {
    switch (operation) {
      case "+":
        return nums.reduce((acc, num) => acc + num, 0);
      case "-":
        return nums.reduce((acc, num) => acc - num);
      case "*":
        return nums.reduce((acc, num) => acc * num, 1);
      case "/":
        return nums.reduce((acc, num) => (acc % num === 0 ? acc / num : NaN));
      default:
        return NaN;
    }
  };

  // Generate a valid division target and numbers that work
  const generateValidDivisionLevel = () => {
    // Choose a valid target for division
    const validTarget = Math.floor(Math.random() * 10) + 2; // Target between 2 and 10
    const divisor = Math.floor(Math.random() * 10) + 1; // Divisor between 1 and 10
    const dividend = validTarget * divisor; // Calculate the dividend to match the target

    // Generate additional random numbers
    const extraNumbers = generateRandomNumbers(3); // 3 additional numbers
    const newNumbers = [dividend, divisor, ...extraNumbers];

    return { newNumbers, validTarget };
  };

  // Generate a valid target based on operation and numbers
  const findValidTarget = (numbers, operation) => {
    const possibleCombos = getCombinations(numbers);

    // Check each combination to find a valid target for the given operation
    for (let combo of possibleCombos) {
      const result = calculateResult(combo, operation);
      // Ensure the target is a whole number within range
      if (result >= 1 && result <= 99 && Number.isInteger(result)) {
        return result;
      }
    }

    // If no valid target is found for the current numbers and operation
    return null;
  };

  // Get all combinations of numbers of length 2 and 3
  const getCombinations = (numbers) => {
    const combos = [];
    // Generate pairs
    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        combos.push([numbers[i], numbers[j]]);
        // Generate trios
        for (let k = j + 1; k < numbers.length; k++) {
          combos.push([numbers[i], numbers[j], numbers[k]]);
        }
      }
    }
    return combos;
  };

  // Generate random numbers for the game level
  const generateRandomNumbers = (count = Math.floor(Math.random() * 4) + 4) => {
    return Array.from(
      { length: count },
      () => Math.floor(Math.random() * 50) + 1
    );
  };

  // Select a random operation (always equal probability)
  const generateRandomOperation = () => {
    const operations = ["+", "-", "*", "/"];
    return operations[Math.floor(Math.random() * operations.length)];
  };

  // Initialize the first level when the component is first rendered
  useEffect(() => {
    initializeLevel();
  }, [initializeLevel]);

  return (
    <div className="game-container">
      <Header level={level} timer={timer} operation={operation} />
      <ResultDisplay result={targetResult} />
      <div className={`feedback ${feedbackType}`}>{feedback}</div>
      <NumberGrid
        numbers={numbers}
        onSelect={handleSelectNumber}
        selectedIndices={selectedIndices}
      />
    </div>
  );
};

export default GameContainer;
