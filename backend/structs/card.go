package structs

type Card struct {
	Id    *int    `json:"id"`
	Name  *string `json:"name"`
	Type  *string `json:"type"`
	Cost  *int    `json:"cost"`
	Text  *string `json:"text"`
	Image *string `json:"image"`
	Stat1 *string `json:"stat1"`
	Stat2 *string `json:"stat2"`
}
