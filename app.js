const express=require('express');
const app=express();

app.use(express.json());
//const signup=require('./Router/index')



//app.use(signup)
app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}));



app.use('/',require('./Router/index'))
app.use('/flying',require('./Router/index'))
app.use('/login',require('./Router/index'))
app.use('/api',require('./Router/index'))

const PORT=process.env.PORT||1200;
app.listen(PORT,()=>{
    console.log(`Server Started at Port ${PORT}`);
});
