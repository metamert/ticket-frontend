

export const tableDatas = {

"user":  [
    { id: "id", label: "id", minWidth: 30 },
    { id: "email", label: "email", minWidth: 60 },
    { id: "name", label: "isim", minWidth: 40 },
    { id: "lastName", label: "soyisim", minWidth: 40 },
   
    {
      id: "phoneNumber",
      label: "telefon no",
      minWidth: 50,
    },
    {
      id: "tin",
      label: "tc no",
      minWidth: 20,
    },
    
    {
      id: "createdAt",
      label: "tarih",
      minWidth: 60,
    },
    
    {
      id: "del",
      label: "sil",
      minWidth: 30,
      align: "right",
    },
  ],
 

"trips": [
  { id: "id", label: "id", minWidth: 30 },
  { id: "departureFrom", label: "nereden", minWidth: 60 },
  { id: "arrivalIn", label: "nereye", minWidth: 40 },
  { id: "departure", label: "tarih", minWidth: 40 },
 
  {
    id: "busId",
    label: "otobüs",
    minWidth: 50,
  },
  {
    id: "price",
    label: "fiyat",
    minWidth: 20,
  },
  
  {
    id: "edit",
    label: "düzenle",
    minWidth: 30,
    align: "right",
  },
  {
    id: "del",
    label: "sil",
    minWidth: 30,
    align: "right",
  },
],

"bus": [
  { id: "id", label: "id", minWidth: 30 },
  { id: "name", label: "otobüs ", minWidth: 60 },
  { id: "wifi", label: "wifi", minWidth: 40 },
  { id: "foodService", label: "Yemek servisi", minWidth: 40 },
 
  {
    id: "tv",
    label: "televizyon",
    minWidth: 50,
  },
  
  {
    id: "edit",
    label: "düzenle",
    minWidth: 30,
    align: "right",
  },
  {
    id: "del",
    label: "sil",
    minWidth: 30,
    align: "right",
  },
]

}





export const validationIterator = {
    "user":["email", "name", "lastName", "password", "phoneNumber","tin"]
    ,   
    "trips":["price"],
    "bus":["name"]
    
    }