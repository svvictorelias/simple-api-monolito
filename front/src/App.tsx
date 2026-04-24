import React, { useState, useEffect } from "react";

type Category = {
  id: number;
  name: string;
  description: string;
};

type GraphQLResponse<T> = {
  data: T;
};

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    fetch("graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `query { categories { id name description } }`
      })
    })
      .then(resp => resp.json())
      .then((data: GraphQLResponse<{ categories: Category[] }>) => {
        setCategories(data.data.categories);
      });
  }, []);
  // TODO: fetch categories on mount (POST to /graphql)

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.name.trim()) return;

    fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `
          mutation ($name: String!, $description: String){
            createCategory(name: $name, description: $description){
              id
              name
              description
            }
          }
        `,
        variables: form
      })
    })
      .then(res => res.json())
      .then((data: GraphQLResponse<{ createCategory: Category }>) => {
        setCategories(prev => [...prev, data.data.createCategory]);
        setForm({ name: "", description: "" });
      });
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
          value={form.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Description"
          value={form.description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, description: e.target.value })
          }
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
        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
