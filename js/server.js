var express = require('express');
var app = express();


var express=require('express');
var zomato = require('zomato');
var bodyParser = require('body-parser')
var app=express();

app.use(bodyParser.json());
var urlencodedParser	=	bodyParser.urlencoded({extended: true})
app.use(bodyParser.json({ type: 'application/*+json' }))

var client = zomato.createClient({
  userKey: '0dcbf45e3a7affc8aac3196f922697d6', //as obtained from [Zomato API](https://developers.zomato.com/apis)
});

app.post('/searchResturant',urlencodedParser,function(req,res){

	console.log(req.query.area);
	var area=req.query.area

client.getLocations({
query:area, // suggestion for location name
count:"1" // number of maximum result to fetch
}, function(err, result){
    if(!err){
if(JSON.parse(result).location_suggestions.length>0){
	var city_id=JSON.parse(result).location_suggestions[0].city_id;
	var latitude=JSON.parse(result).location_suggestions[0].latitude
	var longitude=JSON.parse(result).location_suggestions[0].longitude
	client.getGeocode({
		lat:latitude,
		lon:longitude
		}, function(err, result){
		    if(!err){
		      	res.setHeader("Content-Type", "text/json");
        		res.setHeader("Access-Control-Allow-Origin", "*");
        		res.end(result);
		    }else {
		      console.log(err);
		    }
		});
	}
	
    }else {
      console.log(err);
    }
res.end("failed");
})



})


app.post('/getRestaurantDetails',urlencodedParser,function(req,res) {
  var res_id=req.query.res_id;
  client.getRestaurant({

  res_id:res_id // id of restaurant whose details are requested
  }, function(err, result){
      if(!err){
        console.log(result);
	res.setHeader("Content-Type", "text/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(result)
      }else {
        console.log(err);
      }
  });
})



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
