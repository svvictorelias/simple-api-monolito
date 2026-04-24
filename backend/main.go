package main

import (
	"encoding/json"
	"net/http"
	"strings"
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

var nextID = 2

type Request struct {
	Query     string                 `json:"query"`
	Variables map[string]interface{} `json:"variables"`
}

func graphqlHandler(w http.ResponseWriter, r *http.Request) {

	var req Request

	json.NewDecoder(r.Body).Decode(&req)

	res := map[string]interface{}{
		"data": map[string]interface{}{},
	}

	if strings.Contains(req.Query, "categories") {
		res["data"].(map[string]interface{})["categories"] = categories
	}

	if strings.Contains(req.Query, "createCategory") {
		name := req.Variables["name"].(string)
		desc := ""

		if d, ok := req.Variables["description"].(string); ok {
			desc = d
		}

		newCat := Category{
			ID:          nextID,
			Name:        name,
			Description: desc,
		}

		nextID++
		categories = append(categories, newCat)

		res["data"].(map[string]interface{})["createCategory"] = newCat
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}

func main() {
	http.HandleFunc("/graphql", graphqlHandler)
	http.ListenAndServe(":8080", nil)
}

// TODO: decode JSON body into GraphQLRequest struct
// TODO: if Query is categories -> return list
// TODO: if Mutation is createCategory -> add item + return it
// TODO: send JSON response in {"data": {...}} format
