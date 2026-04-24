# **Mini Full-Stack Exercise (Go + React)**

### ⏱️ Time: 30–45 minutes

### 🎯 Goal: Build a tiny CRUD-like feature using **Go (backend)** and **React (frontend)**.

This exercise is intentionally small.

We only want to see how you write code, structure things, and think.

# ✅ **What You Need to Build**

You will create a tiny admin tool called:

# **“Drug Categories”**

It has just **two features**:

## **1️⃣ Backend (Go)**

Using the following model:

```jsx
CREATE TABLE drug_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);
```

Create a small GraphQL-style API with two operations:

### **Query**

```
query { categories { id name description } }
```

Should return a list of categories.

### **Mutation**

```
createCategory(name: String!, description: String)
```

Should add a new category and return it.

### **Data Model**

A category has:

- `id` (int)
- `name` (string)
- `description` (string)

### **Important:**

- You **do NOT need a real database**.
- Use a simple **in-memory slice** (mock DB).
- Your backend only needs to listen on **/graphql**.
- Parse JSON, detect the query/mutation, and return JSON.

## **2️⃣ Frontend (React)**

Create a **single page** with:

### ✔️ A table listing all categories

(name + description)

### ✔️ A small form to create a new category

Two inputs:

- Name
- Description

When form is submitted:

1. Call your GraphQL mutation
2. Add the new category to the table

That’s it.

No styling required.

No routing.

No component library needed.

# 🗂️ **Starter Files Provided**

You will receive **two skeleton files**:

### Go — `main.go`

Contains:

- Struct definitions
- Mock slice of categories
- A handler with TODOs

```go
package main

import (
	"encoding/json"
	"net/http"
)

type Category struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

// Mock DB (in-memory)
var categories = []Category{
	{ID: 1, Name: "Analgesics", Description: "Pain relief drugs"},
}

type GraphQLRequest struct {
	Query     string                 `json:"query"`
	Variables map[string]interface{} `json:"variables"`
}

func graphqlHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: decode JSON body into GraphQLRequest struct
	// TODO: if Query is categories -> return list
	// TODO: if Mutation is createCategory -> add item + return it
	// TODO: send JSON response in {"data": {...}} format
}

func main() {
	http.HandleFunc("/graphql", graphqlHandler)
	http.ListenAndServe(":8080", nil)
}
```

### React — `App.js`

Contains:

- useState + useEffect setup
- TODOs for fetching, form handling, and rendering

```jsx
import { useState, useEffect } from "react";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  // TODO: fetch categories on mount (POST to /graphql)

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: call mutation to create category
    // TODO: update table with new item
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Drug Categories</h2>

      {/* TODO: build form */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          // TODO bind value + onChange
        />
        <input
          placeholder="Description"
          // TODO bind value + onChange
        />
        <button type="submit">Create</button>
      </form>

      <table border="1" cellPadding="5" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{/* TODO: render categories */}</tbody>
      </table>
    </div>
  );
}
```

Fill in the TODOs by writing your own code.

# 🎯 **What We’re Looking For**

We evaluate based on:

### **Backend**

- Can you parse JSON?
- Can you return correct data?
- Can you implement simple CRUD logic in Go?

### **Frontend**

- Can you manage form state?
- Can you fetch data from API?
- Can you update UI after creating a category?

### **General**

- Clear, readable code
- Ability to work end-to-end
- Don’t overthink — simple solutions win

# 🚀 **You Don’t Need Perfect Code**

This is **not** a trick exercise.

We just want to see you build something functional.

If you get stuck, explain what you’re thinking — that’s totally okay.

Good luck — have fun with it!
