package cards

import (
	"fmt"
	"net/http"
	"strconv"
)

func (s *Service) GetCountMiddleware() func(next http.Handler) http.Handler {

	return func(next http.Handler) http.Handler {
		fn := func(w http.ResponseWriter, r *http.Request) {
			var c int
			res := s.db.QueryRow(`
				SELECT MAX(id) FROM cards;
			`)

			res.Scan(&c)

			count := strconv.Itoa(c)
			fmt.Println(count)
			w.Header().Add("Card-Count", count)
			next.ServeHTTP(w, r)
		}
		return http.HandlerFunc(fn)
	}
}
