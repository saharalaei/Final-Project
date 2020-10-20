var genres = userData["genres"];



function foo(arr) {
  var a = [],
    b = [],
    prev;

  arr.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [a, b];
}

var result = foo(genres);
// console.log('[' + result[0] + ']','[' + result[1] + ']')




function dict([arr1, arr2]) {
	var genre_dict = {}
	
	 for(var i = 0; i < arr1.length; i++) {
		 
		 genre_dict[arr1[i]] = arr2[i]
		  
	 }

return genre_dict	
}



var sorted = dict(foo(genres));
// console.log(sorted);




// Create items array
var items = Object.keys(sorted).map(function(key) {
  return [key, sorted[key]];
});

// Sort the array based on the second element
items.sort(function(first, second) {
  return second[1] - first[1];
});

// Create a new array with only the first 5 items
var topgenres = items.slice(0, 10);
// console.log(topgenres);

var others = items.slice(10)
// console.log(others)

var others_value =[]


for (var i = 0; i < others.length; i++) {

     others_value.push(others[i][1]);
  }

// console.log(others_value)


var sum = others_value.reduce(function(a, b){
        return a + b;
    }, 0);


var piedata = []
var pielabels = []






for (var i = 0; i < topgenres.length; i++) {

      pielabels.push(topgenres[i][0]);
      piedata.push(topgenres[i][1]);
	

  }
  // pielabels.push('others')
  // piedata.push(sum)
// console.log(piedata);

// console.log(pielabels);




var data = [{
  type: "pie",
  values: piedata,
  labels: pielabels,
    textfont: {
          family:  'Raleway, sans-serif',
          size: 12,
          color: "white"
        },
  pull: [0.15, 0, 0,0,0,0,0,0,0,0],
  textinfo: "label+percent",
  textposition: "outside",
  // automargin: true
  hoverinfo: 'label+percent',
  
   marker: {
	   
	colors: ['#1e90ff', '#abcdef', '#1f75fe' , '#0fc0fc' , '#0000cd' ,'#CAE1FF'  ,'#26619c' , '#80daeb' ,'#273be2'  ,'#00bfff'],   
    line: {
        color: 'white',
        width: 2
    },
  
  
}}]


var layout = {
	
	title: {text: "Top 10 Genres Based on Top 50 Artists" ,
        font: {
        color: "white"
        }},

  // margin: {"t": 0, "b": 0, "l": 0, "r": 0},
  showlegend: false,
  paper_bgcolor: '#212529'
  
  }
  
  var config = {responsive: true}

Plotly.newPlot('genre-pie', data, layout, config)
