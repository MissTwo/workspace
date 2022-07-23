const express=require('express');
const app = express();
const port=3000;
app.get('/home', (req, res) =>{
    res.send("hello world");

})
app.post('/', (req, res) =>{
    res.json({success: true,'message': 'hello world'});
    res.send(200);
})
app.listen(port, ()=> {
    console.log(`example app listening on port ${port}`);
});