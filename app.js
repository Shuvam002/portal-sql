const express = require('express');
const cors = require('cors');
const bodyp = require('body-parser');



const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());
app.use(express.static('public'))
app.use(cors());
app.use(bodyp.urlencoded({extended:true}));
app.use(bodyp.json());
const mrd_routes = require('./routes/mrd');
const rd_routes = require('./routes/rd');
const crd_routes = require('./routes/crd');
// const crd_routes = require('./routes/crd');
// const fetch_routes = require('./routes/fetch');




app.use('/mrd.html',mrd_routes);
app.use('/rd.html', rd_routes);
app.get('/crd',(req,res)=>{
    res.render('crd');
});
app.get('/crd/:name',(req,res)=>{

});
app.get('/crd/:name/update',()=>{

})
// app.use('/crd.html',crd_routes);
// app.use('/fetch',fetch_routes);
// app.use('/crd',crd_routes);
app.listen(3000);