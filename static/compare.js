var all_users = {"average_unique_genres": 82, 
"average_alluser_artist_popularity": 73, 
"most_common_artists": ["Kanye West", "Drake", "Kendrick Lamar", "The Weeknd", "Travis Scott", "J. Cole", "Post Malone", "Khalid", "Migos", "Future"], 
"most_common_artists_counts": [17, 15, 13, 12, 11, 10, 10, 9, 9, 9]}


console.log(userStats)

 // var artists = data['most_common_artists'].reverse()
 // var counts = data['most_common_artists_counts'].reverse()





function bubble(data) {

 var artists = data['most_common_artists'].reverse()
 var counts = data['most_common_artists_counts'].reverse()

 var trace1 = {
  x: [2, 4, 6, 8,10,12,14,16,18,20],
  y: counts,
  text: artists,
   textfont: {
        
 
          color: "white"
        },
  textposition: 'inside',
  mode: 'markers+value',
  marker: {
    size: counts.map(i=>i*3.5),
	color: " #1e90ff",
	line: {color:'white'},
  }
};

var data = [trace1];

var layout = {
  
    title: {text: "Top Artists<br>Appearances in User Top 50s" ,
        font: {
        color: "white"
        }},
  
  
  showlegend: false,
  height: 550,
  // width: 600,
  
   xaxis: {
    tickmode: "array", // If "array", the placement of the ticks is set via `tickvals` and the tick text is `ticktext`.
    tickvals: [2, 4, 6, 8,10,12,14,16,18,20],
    ticktext: artists,
	// gridcolor: 'grey',
	tickfont: {
            color: "white",
        }
  },
  yaxis:{
	  	tickfont: {
            color: "white",
        }
  },
     paper_bgcolor: "#212529",
        plot_bgcolor :'#212529',
  
};
var config = {responsive: true}
Plotly.newPlot('bubble-plot', data, layout, config);



}


(async function(){

    bubble(all_users);
 })();























function artistBar(data, data2){
	
 var artists = data2['most_common_artists'].reverse()
 var counts = data2['most_common_artists_counts'].reverse()
console.log(artists)
console.log(counts)
    
      


    var data = {
        y: artists,
        x: counts,
        type: 'bar',
        orientation: 'h',
        marker: {
            color: "#1e90ff"
          }
		  
		  
		  
		  
	};
		  
    var layout = {
        
		height: '500',
        title: {text: "Top Artists Among Users <br> (Top 50 Artist Appearances) <br>" ,
        font: {
        color: "white"
        }},
		legend:{
			font: {
        color: "white"
        }
			
		},
        xaxis: { 
		title: {text: "",  font: {
        color: "white"
        },
				}, 
				dtick: 2,
        tickfont: {
        color: "#FFFFFF",
    },

    },
        yaxis:{
		
		tickfont: {
        color: "#FFFFFF"},
		dtick: 1
	},
        margin: {
        t: 75,
        l:100,
        b:50,
        pad: 4
        },
        // hovermode:'closest',
        plot_bgcolor :'#212529',
        paper_bgcolor: "#212529"
};

var config = {responsive: true}

    Plotly.newPlot("artist-bar", [data], layout, config);

};

// (async function(){

    // artistBar(userStats, all_users);
 // })();



































function comparePop(data, data2){


var trace1 = {
  y: ['You'],
  x: [data['average_user_artist_popularity']],
  name: 'You',
  type: 'bar',
  orientation: 'h',
    marker: {
    color: '#F0F8FF',

  },
		  
		  
		
};


var trace2 = {
  y: ['All Users'],
  x: [data2['average_alluser_artist_popularity']],
	name: 'All Users',
  type: 'bar',
  orientation: 'h',
  marker: {
    color: ' #1e90ff',

  }
};
  var layout = {
        annotations: [
		{
		  x: data2['average_alluser_artist_popularity']+5,
  y: 1,

   xref: 'x',
      yref: 'y',
      text: data2['average_alluser_artist_popularity'],
	  font: {
        color: "#F0F8FF",
		
        },
	  showarrow: false
		},
		{
		  x: data['average_user_artist_popularity']+5,
  y: 0,

   xref: 'x',
      yref: 'y',
      text: data['average_user_artist_popularity'],
	  font: {
        color: "#1e90ff",
		
        },
	  showarrow: false
		}
		],
		
		
		barmode: 'group',
		// height: '190',
        title: {text: "Average Top Artist Popularity" ,
        font: {
        color: "white",
		size: 14
        }},
		legend:{
			font: {
        color: "white",
		size: 12
        }
			
		},
        xaxis: { 
		title: {text: "",  font: {
        color: "white"
        },
				}, 
				dtick: 10,
        tickfont: {
        color: "#FFFFFF",
    },

    },
        yaxis:{
		visible: false,
		tickfont: {
        color: "#FFFFFF"},
		dtick: 1
	},
        margin: {
        t: 30,
        l:20,
        b:40,
        pad: ''
        },
        // hovermode:'closest',
        plot_bgcolor :'#212529',
        paper_bgcolor: "#212529"
};

var data = [trace1,trace2]

var config = {responsive: true}



Plotly.newPlot('pop-compare', data, layout, config);

}


(async function(){

    comparePop(userStats, all_users);
 })();





function compareGenre(data, data2){


var trace1 = {
  y: ['You'],
  x: [data['user_unique_genres']],
	// "width": [5],
  type: 'bar',
  orientation: 'h',
  name: 'You',
    marker: {
    color: '#F0F8FF',

  } 
};


var trace2 = {
  y: ['All Users'],
  x: [data2['average_unique_genres']],
	// "width": [5],
  type: 'bar',
  orientation: 'h',
  name: 'All Users',
  
    marker: {
    color: ' #1e90ff',

  }

 
  
};
var layout = {
        
		
		 annotations: [
		{
		  x: data2['average_unique_genres']+7,
  y: 1,

   xref: 'x',
      yref: 'y',
      text: data2['average_unique_genres'],
	  font: {
        color: "#F0F8FF",
		
        },
	  showarrow: false
		},
		{
		  x: data['user_unique_genres']+7,
  y: 0,

   xref: 'x',
      yref: 'y',
      text: data['user_unique_genres'],
	  font: {
        color: "#1e90ff",
		
        },
	  showarrow: false
		}
		],
		
		
		
		
		barmode: 'group',
		// height: '190',
        title: {text: "Unique Genres" ,
        font: {
        color: "white",
		size: 14
        }},
		// title: false,
		legend:{
			font: {
        color: "white",
		size: 12
        }
			
		},
        xaxis: { 
		title: {text: "",  font: {
        color: "white"
        },
				}, 
				dtick: 10,
        tickfont: {
        color: "#FFFFFF",
    },

    },
        yaxis:{
		visible: false,
		tickfont: {
        color: "#FFFFFF"},
		dtick: 1
	},
        margin: {
       t: 30,
        l:20,
        b:40,
        pad: ''
        },
        // hovermode:'closest',
        plot_bgcolor :'#212529',
        paper_bgcolor: "#212529"
};

var data = [trace1,trace2]

var config = {responsive: true}



Plotly.newPlot('genre-compare', data, layout, config);

}






(async function(){

    compareGenre(userStats, all_users);
 })();