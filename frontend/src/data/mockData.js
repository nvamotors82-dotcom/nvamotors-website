export const mockVehicles = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 28500,
    mileage: 15000,
    transmission: "Automática",
    fuelType: "Gasolina",
    condition: "Usado",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    ],
    features: ["Sistema de navegación", "Cámara trasera", "Bluetooth", "Control de crucero"],
    description: "Toyota Camry 2023 en excelente condición. Mantenimiento al día y sin accidentes."
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2022,
    price: 24900,
    mileage: 22000,
    transmission: "Manual",
    fuelType: "Gasolina",
    condition: "Usado",
    image: "https://images.unsplash.com/photo-1619362280286-f2aadb0634ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1619362280286-f2aadb0634ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    ],
    features: ["Sistema multimedia", "Sensores de estacionamiento", "Llanta de aleación"],
    description: "Honda Civic deportivo y eficiente en combustible."
  },
  {
    id: 3,
    make: "Ford",
    model: "F-150",
    year: 2024,
    price: 45000,
    mileage: 5000,
    transmission: "Automática",
    fuelType: "Gasolina",
    condition: "Seminuevo",
    image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    ],
    features: ["4x4", "Caja de carga", "Sistema de remolque", "Pantalla táctil"],
    description: "Ford F-150 2024 prácticamente nueva, perfecta para trabajo y aventura."
  },
  {
    id: 4,
    make: "BMW",
    model: "Serie 3",
    year: 2021,
    price: 38900,
    mileage: 35000,
    transmission: "Automática",
    fuelType: "Gasolina",
    condition: "Usado",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    ],
    features: ["Cuero", "Techo corredizo", "Sistema premium de audio", "Asientos eléctricos"],
    description: "BMW Serie 3 de lujo con todas las comodidades premium."
  }
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Carlos Rodriguez",
    rating: 5,
    comment: "Excelente atención y los mejores precios. Encontré el auto perfecto para mi familia.",
    vehicle: "Toyota Camry 2023",
    date: "2024-12-15"
  },
  {
    id: 2,
    name: "Maria González",
    rating: 5,
    comment: "Proceso muy transparente y rápido. El financiamiento fue aprobado sin complicaciones.",
    vehicle: "Honda Civic 2022", 
    date: "2024-12-10"
  },
  {
    id: 3,
    name: "Roberto Silva",
    rating: 4,
    comment: "Gran variedad de vehículos y personal muy profesional. Recomendado 100%.",
    vehicle: "Ford F-150 2024",
    date: "2024-12-08"
  }
];

export const mockServices = [
  {
    id: 1,
    title: "Financiamiento",
    description: "Planes de financiamiento flexibles con las mejores tasas del mercado.",
    icon: "CreditCard"
  },
  {
    id: 2,
    title: "Garantía",
    description: "Todos nuestros vehículos incluyen garantía extendida y servicio post-venta.",
    icon: "Shield"
  },
  {
    id: 3,
    title: "Intercambio",
    description: "Acepta tu vehículo actual como parte de pago por uno nuevo.",
    icon: "RefreshCw"
  },
  {
    id: 4,
    title: "Inspección",
    description: "Inspección detallada de 150 puntos en todos nuestros vehículos usados.",
    icon: "Search"
  }
];