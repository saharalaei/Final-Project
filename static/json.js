
console.log(userJson)

var str = JSON.stringify(userJson, null, 2); 

d3.select("#json").text(str)

