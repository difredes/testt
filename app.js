var express = require('express');
var exphbs  = require('express-handlebars');

//var alert = require('alert');

var port = process.env.PORT || 3000;

var app = express();

const mercadopago=require('mercadopago');


mercadopago.configure({
    //original error 'Algo salió mal...Una de las partes con la que intentás hacer el pago es de prueba.'
    //access_token:'APP_USR-2976847302278535-042518-a5ebe55920cb1eaca5fa74cf8db52d46-749328966'
    access_token:'APP_USR-3167189856875471-042920-b4eea03a7fbccf0727b80454d8beaba0-749374809', //por ahora no dio error SE ACREDITO PAGO
    //access_token:'TEST-2976847302278535-042518-8a1e9cafa1b8a3ee3bb71fc31b489e7c-749328966'
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});



app.get('/pending', function (req, res) {



    res.render('pending');
});

app.get('/error', function (req, res) {



    res.render('error');
});

app.get('/', function (req, res) {



    res.render('home');
});


app.post('/checkout',function (req,res) {
    //res.send('<h1> hola check</h1>');
   
  //preferencia
  let preference ={


    // ... "failure": "http://localhost/mp-node/",
    back_urls: {
        success: 'http://localhost:3000/success/',
        failure: 'http://localhost:3000/error/',
        pending: 'http://localhost:3000/pending/'
    },
    auto_return: 'approved',
    // ...

    payer: {
        phone: {
            area_code:'11',
            number: 22223333
        },
        
        address: {
            street_name: 'false',
            street_number: 123,
            zip_code: '1111',

        },
        
        email: 'test_user_13105638@testuser.com',
        identification: {},
        name: 'Lalo',
        surname: 'Landa',
        date_created: null,
        last_purchase: null
    },
    // ...
    notification_url: 'https://3af6166327d62795a3adfe94bec83f08.m.pipedream.net',

    // ...
    payment_methods: {
        excluded_payment_types:[
            {id:'amex'},
            {id:'atm'},
           
        ],
        default_installments: 6
    },
      
    // ...

    external_reference: 'koziuko@gmail.com',

    items:[
    {
        id:1234,
        
        
        //picture_url: 'https://integracionmercadopago-koziuko.herokuapp.com/assets/'+req.body.img,
        // original picture_url: 'localhost:3000/assets/'+req.body.img, //

        picture_url: 'localhost:3000/assets/samsung-galaxy-s9-xxl.jpg',

        description: 'Dipositivo móvil de Tienda e-commerce',
        //title:req.body.title,
        tile:'Samsung Galaxy S9',
        //unit_price:parseInt(req.body.price),
        unit_price:15000,
        quantity:1,

        // title:'mi producto',
        // unit_price:100,
        // quantity:1,
    }
    ]

};

mercadopago.preferences.create(preference)
    .then(function(response){
        console.log(response);
        ////res.send('checkout 22');
        res.redirect(response.body.init_point);

        ///res.redirect(response.body.sandbox_init_point);

        //global.id=response.body.id;
    }).catch(function(error){
        console.log(error);
    });




});
///////////////////////////////////////////////////////////////
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.get('/success', function (req, res) {
    res.render('success', req.query);
});

app.listen(port);