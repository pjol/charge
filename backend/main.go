package main

import (
	"fmt"
	"net/http"
	"os"

	. "github.com/pjol/charge/backend/internal"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	port := os.Getenv("PORT")

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Route("/cards", func(r chi.Router) {
		r.Get("/", GetCards)
	})

	http.ListenAndServe(fmt.Sprintf(":%s", port), r)
}
