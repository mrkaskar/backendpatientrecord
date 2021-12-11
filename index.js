const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
const patient = [
  {
    reg: "01001",
    name: "Daw Yin Mway",
    phone: "093423121",
    age: "40",
    address: "No.2, Aye Thar Yar Street, Dagon, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
  {
    reg: "01002",
    name: "U San Win",
    phone: "093232311",
    age: "12",
    address: "No.2, Aung Pan Street, Hle Dan, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
  {
    reg: "01003",
    name: "Daw Aye Mya Khin",
    phone: "093256211",
    age: "30",
    address: "No.245, Min Khaung Street, Tamwe, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
  {
    reg: "01003",
    name: "Daw Aye Aye Khin",
    phone: "093256211",
    age: "30",
    address: "No.245, Min Khaung Street, Tamwe, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
  {
    reg: "01003",
    name: "Daw Aye Mya Khin Khin",
    phone: "093256211",
    age: "30",
    address: "No.245, Min Khaung Street, Tamwe, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
  {
    reg: "01003",
    name: "Daw Aye Mya Aye",
    phone: "093256211",
    age: "30",
    address: "No.245, Min Khaung Street, Tamwe, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
  {
    reg: "01003",
    name: "U Aye",
    phone: "093256211",
    age: "30",
    address: "No.245, Min Khaung Street, Tamwe, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
  {
    reg: "01003",
    name: "U K",
    phone: "093256211",
    age: "30",
    address: "No.245, Min Khaung Street, Tamwe, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
  {
    reg: "01003",
    name: "U Kyi",
    phone: "093256211",
    age: "30",
    address: "No.245, Min Khaung Street, Tamwe, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
  {
    reg: "01003",
    name: "U Kyi Aye",
    phone: "093256211",
    age: "30",
    address: "No.245, Min Khaung Street, Tamwe, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
  {
    reg: "01003",
    name: "U Khin",
    phone: "093256211",
    age: "30",
    address: "No.245, Min Khaung Street, Tamwe, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
  {
    reg: "01003",
    name: "U Khin Mya",
    phone: "093256211",
    age: "30",
    address: "No.245, Min Khaung Street, Tamwe, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
  {
    reg: "01003",
    name: "Daw Mi",
    phone: "093256211",
    age: "30",
    address: "No.245, Min Khaung Street, Tamwe, Yangon",
    treatment: ["Metal brace Orthodontic", "Recementation"],
    medicine: ["Amoxicillin:10", "Penciclovir:2"],
    images: [
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg",
      "https://static.turbosquid.com/Preview/2020/10/22__06_36_56/01.jpgB5EC65A5-BF68-4E06-A80D-47934E0A30B4Large.jpg"
    ]
  },
]

const treatments = [
  {
    id: '111',
   trecode: "T025", 
   name: "Metal brace Orthodontic",
   charge: "15000" 
  },
  {
    id: '222',
   trecode: "T026", 
   name: "Recementation",
   charge: "3000" 
  },
  {
    id: '333',
   trecode: "T027", 
   name: "Periapical X Ray",
   charge: "2000" 
  }
]

const medication = [
  {
    id: '111',
    medcode: "M025",
    name: "Amoxicillin",
    price: "4000",
    stock: "3"
  },
  {
    id: '222',
    medcode: "M026",
    name: "Amitriptyline",
    price: "5000",
    stock: "2"
  },
  {
    id: '333',
    medcode: "M027",
    name: "Penciclovir",
    price: "6000",
    stock: "5"
  },
  {
    id: '444',
    medcode: "M028",
    name: "Clindamycin",
    price: "10000",
    stock: "7"
  }
]

const users = [
  {
    email: "alpha@gmail.com",
    name: "alpha",
    type: "admin"
  },
  {
    email: "john@gmail.com",
    name: "john",
    type: "casher"
  },
  {
    email: "mira@gmail.com",
    name: "mira",
    type: "casher"
  }
]

app.get('/api/patients', (req,res)=>{
  res.status(200).json(patient);
})

app.get('/api/treatments', (req,res)=>{
  res.status(200).json(treatments);
})

app.get('/api/medication', (req,res)=>{
  res.status(200).json(medication);
})

app.get('/api/users', (req,res)=>{
  res.status(200).json(users);
})

app.listen(5000);