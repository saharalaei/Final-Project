// d3.json("/get_user_data").then(function (data) {
	// console.log(data);
// });


(async function(){
  var userData = await d3.json("/user_data").catch(function(error) {
    console.log(userData);
  })
});