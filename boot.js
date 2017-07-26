/**
 * Created by zhouxiangbo on 2017/5/16 0016.
 */
var debug=require('debug')("nodeTest");
var app=require("./serverApp");

app.set("port",process.env.PORT||6010);
var server=app.listen(app.set("port"),function(){
    console.log("Express server listening on port"+server.address().port);
});