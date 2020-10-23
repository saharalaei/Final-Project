// var tbody = d3.select("#ml_table");
var songs = recs
console.log(recs)



var tbody = d3.select("#track_table");

// var results = copyObjectProps(songs, ['track', 'artist','album','track_url'])

// <iframe src="https://open.spotify.com/embed/track/3P3UA61WRQqwCXaoFOTENd" 
// width="300" height="80" frameborder="1" allowtransparency="true" 
// allow="encrypted-media" style="border-radius: 10px;">


// console.log(results);



// results.forEach((results) => {
  // var row = tbody.append("tr");
  // Object.entries(results).forEach(([key, value]) => {
	// if (key === 'track_url') {
	// var cell = row.append("td");
	// cell.append("iframe")
	// .attr('src', value)
	// .attr('allow', 'encrypted-media')
	// .attr('allowtransparency', 'true')
	// .attr('height', '80')
	// } else {
    // var cell = row.append("td").attr('style','text-align:center; vertical-align: middle')
    // cell.text(value);
	// }
  // });
// });






			 for(var j = 0; j < 5; j++) {
				 var row = tbody.append("tr");
				 row.append('td').attr('style','text-align:center; vertical-align: middle').text(recs['tracks'][j])
				 row.append('td').attr('style','text-align:center; vertical-align: middle').text(recs['artist'][j])
				 row.append('td').append('p').attr('style','align: center')
						.append("iframe")
						.attr('src', recs['song_recs'][j])
						.attr('allow', 'encrypted-media')
						.attr('allowtransparency', 'true')
						.attr('height', '80')
						.attr('style','align: center')
		 
			 }
       
	   
	   
	   
	