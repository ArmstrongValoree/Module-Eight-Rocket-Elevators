# Module X8 – Full Stack Development 3 - React

> 🚨 **Replace `X` with your module number and `Module's Name` with the actual module name.**

## 🎯 Purpose

> Track your AI interactions (GitHub Copilot, ChatGPT, Claude, etc.) to reflect on learning, practice markdown, and build a reference for future projects.

### 💡 What to Document

> Document all your AI Assist interactions, including questions you ask, code explanations, implementation help, debugging assistance, learning conversations, code reviews, planning discussions, refactoring help, tool usage, career advice, and more.
>
> **Remember:** There's no such thing as a "dumb question" when learning to code. Document everything!

### 📝 How to Use This Log

> 1. Provide **📎 Context** on what you were working on so the coach can understand the purpose of your question.
> 2. Paste your exact question under **📎 Context** in the relevant **Prompt – XX** section.
> 3. Paste the AI’s full answer under **Response – XX** in the relevant section.

---

## ✏️ Prompt - 01

**📎 Context:** File Architecture

What are wildcards in coding?

## 🤖 Response - 01

Wildcards are symbols that stand in for **one or more unknown characters**. They are used to match patterns instead of exact values. For example, `*` can mean “anything,” so `*.js` matches all JavaScript files.


---

## ✏️ Prompt - 02

**📎 Context:** File Architecture

should I have two .env files? I have one in server and one in client.

## 🤖 Response - 02

Yes — **having two `.env` files is normal and correct** 👍

You should **keep both**, but they serve **different jobs**:

* **Server `.env`**: Stores secrets like database URLs, API keys, and JWT secrets. These must stay private and never go to the browser.
* **Client `.env`**: Stores public values like API base URLs. In React, these must start with `REACT_APP_` to work.

❗ **Do not put secrets in the client `.env`**. If you delete it, your frontend may break if it depends on environment variables.

**Rule to remember:**
👉 Server `.env` = private
👉 Client `.env` = public


---

## ✏️ Prompt - 03

**📎 Context:** File Architecture

what is eslint.config.js?

## 🤖 Response - 03

`eslint.config.js` is a file that tells **ESLint** how to check your code for mistakes and style problems. It sets the rules for things like unused variables, bad syntax, and formatting. ESLint uses this file to help keep your code clean and consistent.


---

## ✏️ Prompt - 04

**📎 Context:** Pre-Skill Practice for Skills/Languages Needed for Module 8

Your Role: Senior Development Coach and Coding Assistant, all directions are given on a 5th grade level-using simple analogy. Explain industry vocabulary making sure to include the correct pronunciation for the words and/or symbols. Do not oversimplify, make it accurate but digestible. Ensure that directions for placement of code, calculations, and data (essentially the file architecture) comply with industry best practice. After each completed task, provide a commit message that meets the industry best practice.

My Role: Junior Developer w/o Prior Coding Experience 

Technologies: HTML, CSS, JS, VS Code, IDE, React Bootstrap, Express-Node.js, Mongoose, React.js, Vite, MongoDB, JWT, Postman extension in VS Code, internet

Requirements:  I need to understand all core concepts and demonstrate skill proficiency. Using the information from the grading rubric and business document, find lessons from W3Schools that correspond to the languages, skills, and programs needed to successfully complete this module. I have completed some W3Schools lessons in React, Git, HTML, and CSS (see the attached progression photo).  Create a list of the lessons in the order that will build the skills necessary to understand the module and make completion of the module in the allotted time frame achievable with skill and knowledge retention. I will complete the lessons simultaneously while working on Module 8. I do not have any coding experience. I would like to work on at least three coding challenges each day to practice the skills covered in this module. The challenges should be interactive and provide feedback and/or a tutorial  for the correct answer.

Goal: To understand coding, build coding skills, and demonstrate understanding through completion of the module.

Rules: 
* You must ALWAYS follow all of the rules
* Do not assume any instructions
* Do not assume any code
* Do not use jQuery
* Do not proceed before asking if I understand the provided instructions
* Provide all instructions in chronological order
* Go through the requirements one by one

## 🤖 Response - 04

Module 8 Learning Plan - Initial Review
Good morning! I've reviewed your Module 8 Business Document, the grading rubric (Image 1), and your W3Schools progress (Image 2). 

W3Schools Learning Path (In Order)
Based on your current progress (27% React, 18% Git), here are the lessons you need:
React Lessons (Priority Order)

✅ React Intro (you've done some of this)
✅ React Get Started (you've done some of this)
React ES6 (covers modern JavaScript you'll need)
React Render HTML
React JSX
React Components
React Props ⭐ (critical for this module)
React Events
React Conditionals
React Lists
React Forms ⭐ (critical for transaction form)
React Router ⭐ (navigation between pages)
React useEffect Hook ⭐ (for loading data when page opens)
React useContext Hook (for sharing user info across pages)

Additional Lessons Needed

JavaScript Cookies (W3Schools JavaScript Tutorial → JS Cookies)
JavaScript Array Methods (specifically .map(), .sort())
Bootstrap 5 Tutorial → Alerts
Bootstrap 5 Tutorial → Cards
Bootstrap 5 Tutorial → Modals (for confirmation popups)

Daily Coding Challenge Sources
I recommend these interactive platforms (they provide immediate feedback):

Codecademy (Free tier) - React challenges
freeCodeCamp - React lessons with built-in tests
Scrimba - Interactive React tutorials
LeetCode (Easy problems) - JavaScript fundamentals
---

## ✏️ Prompt - 05

**📎 Context:** Pre-Skill Practice for Skills/Languages Needed for Module 8

Revise the Learning Plan and provide a daily list of W3Schools Lessons.

## 🤖 Response - 05

Day 2 - Bootstrap Cards (Home Page)
W3Schools Lessons:

Bootstrap 5 Cards
React Lists
React Router

Day 3 - Bootstrap Alerts (Notifications)
W3Schools Lessons:

Bootstrap 5 Alerts
React useEffect Hook
JavaScript Timing Events (setTimeout)

Day 4 - Session Token System (Part 1: Frontend & Cookies)
W3Schools Lessons:

JavaScript Cookies
React useContext Hook
React useEffect Hook (review)

Day 5 - Session Token System (Part 2: Backend API)
W3Schools Lessons:

MongoDB Create Database (review)
MongoDB Create Collection (review)

Day 6 - Transaction System (Part 1: Display & Form) + WALKTHROUGH SCRIPT
W3Schools Lessons:

React Forms
JavaScript Array Sort
JavaScript Array Map

Day 7 - Transaction System (Part 2: Save Functionality) + Testing
W3Schools Lessons:

Bootstrap 5 Modals (review)
Review all React lessons from the week

---

## ✏️ Prompt - 06

**📎 Context:** Dependency Installation

After installing React Bootstrap and Bootstrap CSS, I'm receiving several error message. Explain the errors.

## 🤖 Response - 06

🔧 Fixing Missing Dependencies Error
I see the problem! React Bootstrap and Bootstrap CSS weren't installed properly. The error says:

"Failed to resolve import 'bootstrap/dist/css/bootstrap.min.css'" and "Failed to resolve import 'react-bootstrap'"

Let's fix this by reinstalling the dependencies.

🛠️ Step 8E: Reinstall Bootstrap Dependencies
Stop the server first (Ctrl + C in the terminal)
Now let's reinstall Bootstrap properly:
bashcd ~/CodeBoxx/Module-Eight-Rocket-Elevators/client
npm install react-bootstrap bootstrap
```

**What this does:** Downloads and installs both react-bootstrap and bootstrap packages into your node_modules folder.

**You should see:**
```
added 2 packages, and audited XXX packages in Xs

🔍 Verify Installation
Let's check that the packages were installed:
bashls node_modules | grep bootstrap
```

**You should see:**
```
@popperjs
bootstrap
react-bootstrap
Also check your package.json:
bashcat package.json
Look for these lines in the "dependencies" section:
json"dependencies": {
  "bootstrap": "^5.x.x",
  "react": "^18.x.x",
  "react-bootstrap": "^2.x.x",
  "react-dom": "^18.x.x",
  "react-router-dom": "^6.x.x"
}

🧹 Clear Vite Cache (If Needed)
Sometimes Vite's cache causes issues. Let's clear it:
bashrm -rf node_modules/.vite
What this does: Removes Vite's cache folder so it rebuilds fresh.

🚀 Restart the Development Server
Now try starting the server again:
bashnpm run dev
```

**You should see:**
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
No errors this time! ✅
Open your browser to: http://localhost:5173/

---

## ✏️ Prompt - 07

**📎 Context:** Modal component that acts as a confirmation when clicking the delete or create button for the Create an Agent and Delete Agent

What is toastify and explain how to use it.

## 🤖 Response - 07

**Toastify** (React-Toastify) is a tool that shows small pop-up messages called *toasts*. These messages give quick feedback, like “Saved!” or “Error occurred.”

**How to use it (simple steps):**

1. Install it: `npm install react-toastify`
2. Import it and add `<ToastContainer />` once in your app.
3. Call `toast.success("Message")` or `toast.error("Message")` when something happens.


---

## ✏️ Prompt - 08

**📎 Context:** Modal component that acts as a confirmation when clicking the delete or create button for the Create an Agent and Delete Agent

What is toastify and explain how to use it.

## 🤖 Response - 08

Here’s a clear, beginner‑friendly explanation that fits the way you like to learn—step‑by‑step, no assumptions, and easy to follow.

## ⭐ What Toastify Is  
Toastify (specifically **react-toastify**) is a lightweight React library that lets you show quick popup notifications—called *toasts*—in your app.  

Developers use it for things like:
- Showing success messages (e.g., “Form submitted!”)  
- Showing errors (e.g., “Login failed”)  
- Showing warnings or info messages  
- Giving users feedback without redirecting or reloading the page  

It’s popular because it’s:
- Easy to install  
- Easy to use  
- Customizable (position, colors, auto‑close timing, etc.)  

---

## 🛠️ How to Use Toastify (Step‑by‑Step)

### **1. Install the package**
Run this in your project:

```
npm install react-toastify
```

---

### **2. Import Toastify in your main file**
Usually in `App.jsx` or `main.jsx`:

```jsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
```

Then add the container inside your component:

```jsx
function App() {
  return (
    <>
      <ToastContainer />
      {/* your app code */}
    </>
  );
}
```

The `<ToastContainer />` is what actually displays the toasts.

---

### **3. Trigger a toast anywhere in your app**
Import the toast function:

```jsx
import { toast } from 'react-toastify';
```

Then call it when something happens:

```jsx
toast.success("Saved successfully!");
toast.error("Something went wrong");
toast.info("Heads up!");
```

---

## 🎨 Optional: Customize the toast
You can control:
- Position  
- Auto-close time  
- Theme  
- Behavior  

Example:

```jsx
toast.success("Profile updated!", {
  position: "bottom-right",
  autoClose: 2000,
  theme: "colored"
});
```

---

## 🧠 Quick Summary  
Toastify is a simple tool for showing clean, modern notifications in React.  
You install it, add the container once, and then call `toast()` anywhere you need feedback for the user.

If you want, I can walk you through adding Toastify to your current project or help you write a reusable notification helper function.

---

## ✏️ Prompt - 09

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 09

Paste the AI's answer here

---

## ✏️ Prompt - 10

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 10

Paste the AI's answer here

---

## ✏️ Prompt - 11

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 11

Paste the AI's answer here

---

## ✏️ Prompt - 12

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 12

Paste the AI's answer here

---

## ✏️ Prompt - 13

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 13

Paste the AI's answer here

---

## ✏️ Prompt - 14

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 14

Paste the AI's answer here

---

## ✏️ Prompt - 15

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 15

Paste the AI's answer here

---

## ✏️ Prompt - 16

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 16

Paste the AI's answer here

---

## ✏️ Prompt - 17

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 17

Paste the AI's answer here

---

## ✏️ Prompt - 18

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 18

Paste the AI's answer here

---

## ✏️ Prompt - 19

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 19

Paste the AI's answer here

---

## ✏️ Prompt - 20

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 20

Paste the AI's answer here

---

## ✏️ Prompt - 21

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 21

Paste the AI's answer here

---

## ✏️ Prompt - 22

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 22

Paste the AI's answer here

---

## ✏️ Prompt - 23

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 23

Paste the AI's answer here

---

## ✏️ Prompt - 24

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 24

Paste the AI's answer here

---

## ✏️ Prompt - 25

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 25

Paste the AI's answer here

---

## ✏️ Prompt - 26

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 26

Paste the AI's answer here

---

## ✏️ Prompt - 27

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 27

Paste the AI's answer here

---

## ✏️ Prompt - 28

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 28

Paste the AI's answer here

---

## ✏️ Prompt - 29

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 29

Paste the AI's answer here

---

## ✏️ Prompt - 30

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 30

Paste the AI's answer here

---

## ✏️ Prompt - 31

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 31

Paste the AI's answer here

---

## ✏️ Prompt - 32

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 32

Paste the AI's answer here

---

## ✏️ Prompt - 33

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 33

Paste the AI's answer here

---

## ✏️ Prompt - 34

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 34

Paste the AI's answer here

---

## ✏️ Prompt - 35

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 35

Paste the AI's answer here

---

## ✏️ Prompt - 36

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 36

Paste the AI's answer here

---

## ✏️ Prompt - 37

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 37

Paste the AI's answer here

---

## ✏️ Prompt - 38

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 38

Paste the AI's answer here

---

## ✏️ Prompt - 39

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 39

Paste the AI's answer here

---

## ✏️ Prompt - 40

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 40

Paste the AI's answer here

---

## ✏️ Prompt - 41

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 41

Paste the AI's answer here

---

## ✏️ Prompt - 42

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 42

Paste the AI's answer here

---

## ✏️ Prompt - 43

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 43

Paste the AI's answer here

---

## ✏️ Prompt - 44

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 44

Paste the AI's answer here

---

## ✏️ Prompt - 45

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 45

Paste the AI's answer here

---

## ✏️ Prompt - 46

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 46

Paste the AI's answer here

---

## ✏️ Prompt - 47

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 47

Paste the AI's answer here

---

## ✏️ Prompt - 48

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 48

Paste the AI's answer here

---

## ✏️ Prompt - 49

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 49

Paste the AI's answer here

---

## ✏️ Prompt - 50

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 50

Paste the AI's answer here

---

## ✏️ Prompt - 51

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 51

Paste the AI's answer here

---

## ✏️ Prompt - 52

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 52

Paste the AI's answer here

---

## ✏️ Prompt - 53

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 53

Paste the AI's answer here

---

## ✏️ Prompt - 54

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 54

Paste the AI's answer here

---

## ✏️ Prompt - 55

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 55

Paste the AI's answer here

---

## ✏️ Prompt - 56

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 56

Paste the AI's answer here

---

## ✏️ Prompt - 57

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 57

Paste the AI's answer here

---

## ✏️ Prompt - 58

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 58

Paste the AI's answer here

---

## ✏️ Prompt - 59

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 59

Paste the AI's answer here

---

## ✏️ Prompt - 60

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 60

Paste the AI's answer here

---

## ✏️ Prompt - 61

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 61

Paste the AI's answer here

---

## ✏️ Prompt - 62

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 62

Paste the AI's answer here

---

## ✏️ Prompt - 63

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 63

Paste the AI's answer here

---

## ✏️ Prompt - 64

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 64

Paste the AI's answer here

---

## ✏️ Prompt - 65

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 65

Paste the AI's answer here

---

## ✏️ Prompt - 66

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 66

Paste the AI's answer here

---

## ✏️ Prompt - 67

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 67

Paste the AI's answer here

---

## ✏️ Prompt - 68

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 68

Paste the AI's answer here

---

## ✏️ Prompt - 69

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 69

Paste the AI's answer here

---

## ✏️ Prompt - 70

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 70

Paste the AI's answer here

---

## ✏️ Prompt - 71

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 71

Paste the AI's answer here

---

## ✏️ Prompt - 72

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 72

Paste the AI's answer here

---

## ✏️ Prompt - 73

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 73

Paste the AI's answer here

---

## ✏️ Prompt - 74

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 74

Paste the AI's answer here

---

## ✏️ Prompt - 75

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 75

Paste the AI's answer here

---

## ✏️ Prompt - 76

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 76

Paste the AI's answer here

---

## ✏️ Prompt - 77

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 77

Paste the AI's answer here

---

## ✏️ Prompt - 78

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 78

Paste the AI's answer here

---

## ✏️ Prompt - 79

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 79

Paste the AI's answer here

---

## ✏️ Prompt - 80

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 80

Paste the AI's answer here

---

## ✏️ Prompt - 81

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 81

Paste the AI's answer here

---

## ✏️ Prompt - 82

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 82

Paste the AI's answer here

---

## ✏️ Prompt - 83

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 83

Paste the AI's answer here

---

## ✏️ Prompt - 84

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 84

Paste the AI's answer here

---

## ✏️ Prompt - 85

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 85

Paste the AI's answer here

---

## ✏️ Prompt - 86

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 86

Paste the AI's answer here

---

## ✏️ Prompt - 87

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 87

Paste the AI's answer here

---

## ✏️ Prompt - 88

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 88

Paste the AI's answer here

---

## ✏️ Prompt - 89

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 89

Paste the AI's answer here

---

## ✏️ Prompt - 90

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 90

Paste the AI's answer here

---

## ✏️ Prompt - 91

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 91

Paste the AI's answer here

---

## ✏️ Prompt - 92

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 92

Paste the AI's answer here

---

## ✏️ Prompt - 93

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 93

Paste the AI's answer here

---

## ✏️ Prompt - 94

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 94

Paste the AI's answer here

---

## ✏️ Prompt - 95

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 95

Paste the AI's answer here

---

## ✏️ Prompt - 96

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 96

Paste the AI's answer here

---

## ✏️ Prompt - 97

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 97

Paste the AI's answer here

---

## ✏️ Prompt - 98

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 98

Paste the AI's answer here

---

## ✏️ Prompt - 99

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 99

Paste the AI's answer here

---

## ✏️ Prompt - 100

**📎 Context:** Write what you were working on here

Paste your prompt or question here

## 🤖 Response - 100

Paste the AI's answer here

---
