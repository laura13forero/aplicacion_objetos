const express = require('express')
const app = express()
const PORT = 3003;

app.use(express.json())

const bicicletas = [
    { 
        "id": 1, 
        "nombre":  "Bicicleta de Montaña XTR", 
        "precio": 750000, 
        "descripcion": "Bicicleta robusta para montaña con suspensión completa.", 
        "stock": 10 
    },
    { 
        "id": 2,
         "nombre": "Bicicleta de Ruta ZR", 
         "precio": 650000, 
         "descripcion": "Ligera y aerodinámica, perfecta para largas distancias.", 
         "stock": 5 
        },
    { 
        "id": 3,
         "nombre": "Bicicleta Híbrida Sport",
          "precio": 500000, 
          "descripcion": "Ideal para la ciudad y caminos ligeros.", 
          "stock": 15
     },
    { 
        "id": 4, 
        "nombre": "Bicicleta de Montaña All-Mountain", 
        "precio": 900000, 
        "descripcion": "Diseñada para terrenos difíciles y aventureros.", 
        "stock": 8 
    },
    { 
        "id": 5,
         "nombre": "Bicicleta de Ruta Pro",
          "precio": 1200000, 
          "descripcion": "Máxima velocidad y rendimiento en carretera.", 
          "stock": 3 
    },
    {
         "id": 6,
          "nombre": "Bicicleta de Paseo Classic", 
          "precio": 400000,
           "descripcion": "Estilo clásico para paseos tranquilos.", 
           "stock": 12 
    },
    { 
        "id": 7,
         "nombre": "Bicicleta Eléctrica City", 
         "precio": 1600000,
          "descripcion": "Bicicleta eléctrica para una movilidad urbana eficiente.", 
          "stock": 5 
    },
    { 
        "id": 8, 
        "nombre": "Bicicleta de Montaña Enduro", 
        "precio": 1100000, 
        "descripcion": "Perfecta para descensos y subidas desafiantes.",
         "stock": 7 
    },
    { 
        "id": 9,
         "nombre": "Bicicleta BMX Stunt", 
         "precio": 350000,
          "descripcion": "Diseñada para acrobacias y trucos en el parque.", 
          "stock": 20 
    }
];


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
app.get('/', (require, response) => {
    response.send('¡Servidor funcionando!');
  });

  app.get('/bicicletas', (request, response) => {
    response.json(bicicletas);
  });

  app.get('/bicicletas/:id', (request, response) => {
    const id = parseInt(request.params.id);
    const bicicleta = bicicletas.find(bicicletas=>bicicletas.id === id) ;
  if (bicicleta){
     response.json(bicicleta).status(200);
  } else{
    response.status(404).json({mensaje:'¡Bicicleta no encontrada!'});
  }
    
  });  

  app.post('/bicicletas', (request, response) => {
    const { nombre, precio, descripcion, stock } = request.body;
    if(!nombre) {
      return response.status(400).json({ mensaje: 'obligatorio'});
    }
    if (!precio) {
      return response.status(400).json({mensaje:'Valor'});
    }
    if(!descripcion){
      return response.status(400).json({mensaje:'mala descripcion'});
    }
    if(!stock){
      return response.status(400).json({mensaje:'mal'});
    }
    const nuevabicicleta = {
      id: bicicletas.length +1,
      nombre,
      precio,
      descripcion,
      stock
    };

    bicicletas.push(nuevabicicleta);
    
    response.status(201).json(nuevabicicleta);
   });

    app.put('/bicicletas/:id', (request, response) => {
        const id = parseInt(request.params.id);
        const nuevabicicleta = request.body;
        const index =bicicletas.findIndex(bicicletas => bicicletas.id === id);
    
    if(index !== -1){
      bicicletas[index] = { id, ...nuevabicicleta};
      response.status(200).json({mensaje: 'Bicicleta no encontrada'})
    }
    });

