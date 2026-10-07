Basic Calculator

Task 7 · Level 1 · Day 7 — Web Development Track

A simple calculator built with HTML5, CSS3 and vanilla JavaScript. It supports addition, subtraction, multiplication, division, decimal values, clear and equals, and handles divide-by-zero without crashing.

Objective

Practice JavaScript event handling, arithmetic operations, and DOM manipulation.

Features
Number buttons (0–9) and a decimal point
Operators: addition (+), subtraction (−), multiplication (×), division (÷)
Equals (=) to calculate the result
Clear (C) to reset the calculator
Backspace (⌫) to delete the last digit
Chained calculations (e.g. 5 + 3 × 2 evaluates step by step)
Divide-by-zero handling: shows "Cannot divide by zero" instead of Infinity or NaN
Floating-point rounding, so 0.1 + 0.2 displays 0.3
Keyboard support
Responsive layout for small screens
Tools Used
HTML5
CSS3 (CSS Grid for the button layout)
JavaScript
Project Structure
basic-calculator/
├── index.html   # Calculator structure and buttons
├── style.css    # Styling and CSS Grid layout
├── script.js    # Calculator logic and event handling
└── README.md    # Project documentation
How to Run
Download or clone the project folder.
Make sure index.html, style.css and script.js are in the same folder.
Open index.html in any web browser (or use the Live Server extension in VS Code).
Keyboard Shortcuts
Key	Action
0–9	Enter a digit
.	Decimal point
+ - * /	Operators
Enter or =	Calculate result
Backspace	Delete last digit
Esc or C	Clear
How It Works

The calculator keeps track of its state with a few variables:

currentValue: the number currently shown on the display
previousValue: the first number in the calculation
operator: the selected operation (+, -, *, /)
waitingForNext: whether the next digit should start a new number

Calculations are done with a switch statement inside a calculate() function. eval() is not used, because it executes any string as code, which is a security risk and bad practice.

Button clicks are handled with a single event listener on the button grid (event delegation), using data-action and data-value attributes to decide what each button does.

Divide-by-Zero Handling

Before dividing, the code checks whether the divisor is 0. If it is, calculate() returns null, the display shows "Cannot divide by zero", and the calculator state resets. Pressing any key starts a fresh calculation.

Interview Questions

Why should eval be avoided? eval runs any string as JavaScript code, which opens the door to code injection. It is also slower and harder to debug, and basic arithmetic does not need it.

How would you store calculator state? Keep the first number, the chosen operator and the current input in variables. When = or a second operator is pressed, compute the result and update those variables.

How should divide-by-zero be handled? Check whether the divisor is 0 before dividing. If it is, show a clear error message and reset the state instead of showing Infinity or NaN.

Author

Anna Makgabo Thantsha# basic-calculator
