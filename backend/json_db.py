import json

locations = [{
    "name": "Rothenburgsort",
    "city": "Hamburg",
    "district": "Rothenburgsort",
    "geolocation": {
        "lat": 53.527997,
        "lng": 10.041561
    },
    "img": "https://lh5.googleusercontent.com/p/AF1QipNEw_rHamcGoTo0WHYxsfbf_8Rx2HVSaKF_UqtF=w408-h272-k-no",
    "id": 1,
    "street":"default",
    "houseNumber":"default",
    "country": "DE"
},
{
    "name": "Lighthouse Zero",
    "city": "Hamburg",
    "district": "Hafencity",
    "geolocation": {
        "lat": 53.538453, 
        "lng": 10.003782
        },
    "img": "https://lh5.googleusercontent.com/p/AF1QipNEw_rHamcGoTo0WHYxsfbf_8Rx2HVSaKF_UqtF=w408-h272-k-no",
    "id": 2,
    "street":"default",
    "houseNumber":"default",
    "country": "DE"
},
{
    "name": "Müllberg Hummelsbüttel",
    "city": "Hamburg",
    "district": "Hummelsbüttel",
    "geolocation": {
        "lat": 53.674082221321115,
        "lng": 10.050298561390438
    },
    "img": "https://lh5.googleusercontent.com/p/AF1QipNEw_rHamcGoTo0WHYxsfbf_8Rx2HVSaKF_UqtF=w408-h272-k-no",
    "id": 3,
    "street":"default",
    "houseNumber":"default",
    "country": "DE"  
},
{
    "name": "Altonaer Balkon Aussichtspunkt",
    "city": "Hamburg",
    "district": "Altona",
    "geolocation": {
        "lat": 53.545243,
        "lng": 9.915153
    },
    "img": "https://lh5.googleusercontent.com/p/AF1QipNEw_rHamcGoTo0WHYxsfbf_8Rx2HVSaKF_UqtF=w408-h272-k-no",
    "id": 4,
    "street":"default",
    "houseNumber":"default",
    "country": "DE"  
},
{
    "name": "Stadtpark Eichhörnchen",
    "city": "Cologne",
    "district": "Winterhude",
    "geolocation": {
        "lat": 53.59843584184574,
        "lng": 10.023464113402172
    },
    "img": "https://lh5.googleusercontent.com/p/AF1QipNEw_rHamcGoTo0WHYxsfbf_8Rx2HVSaKF_UqtF=w408-h272-k-no",
    "id": 5,
    "street":"default",
    "houseNumber":"default",
    "country": "DE"
},
]

def writeDatatoDB(location):

    with open("./locations.json", "a") as file:
        file.write(locations)
        file.close()

   
if __name__ == "__main__":
    writeDatatoDB()
