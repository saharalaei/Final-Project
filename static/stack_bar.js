function stackBar(data){
	
    var total_user_genres = data["genres"]
    var user_name = data["name"]
    var user_uodate_date = data["date_updated"]
    var top50_user_artists_info = data["top_50_artists"]
    var top50_user_tracks_info = data["top_50_tracks"]
    var top50_artist = []
    var top50_genre = []
    var top50_popularity = []
    for (i=0 ;  i< top50_user_artists_info.length; i++){ 
        top50_artist.push(top50_user_artists_info[i]['artist']);
        top50_genre.push(top50_user_artists_info[i]['genres']);
        top50_popularity.push(top50_user_artists_info[i]['popularity']);
    }
    
    var top50_track = []
    var top50_album = []
    var top50_audio_features = []
    for (i=0; i<top50_user_tracks_info.length; i++){
        top50_track.push(top50_user_tracks_info[i]['track']);
        top50_album.push(top50_user_tracks_info[i]['album']);
        top50_audio_features.push(top50_user_tracks_info[i]['audio_features']);
    }
        
    var danceability = []
    var energy  = []
    var loudness = []
    var mode = []
    var speechiness = []
    var acousticness = []
    var instrumentalness = []
    var liveness = []
    var Happiness = []
    var tempo = []
    var duration_ms = []
    for (i=0;  i<top50_audio_features.length ; i++){
        danceability.push(top50_audio_features[i][0]['danceability']);
        energy.push(top50_audio_features[i][0]['energy']);
        loudness.push(top50_audio_features[i][0]['loudness']);
        mode.push(top50_audio_features[i][0]['mode']);
        speechiness.push(top50_audio_features[i][0]['speechiness']);
        acousticness.push(top50_audio_features[i][0]['acousticness']);
        instrumentalness.push(top50_audio_features[i][0]['instrumentalness']);
        liveness.push(top50_audio_features[i][0]['liveness']);
        Happiness.push(top50_audio_features[i][0]['valence']);
        tempo.push(top50_audio_features[i][0]['tempo']);
        duration_ms.push(top50_audio_features[i][0]['duration_ms']);
    }
    var total_duration = 0;
    var total_popularity = 0;
    var total_happiness = 0;
    var total_danceability = 0;
    var total_acousticness = 0;
    var total_energy = 0;
    for(var i = 0;i<energy.length; i++) {
        total_duration += duration_ms[i];
        total_popularity += top50_popularity[i];
        total_happiness += Happiness[i];
        total_danceability += danceability[i];
        total_acousticness += acousticness[i]
        total_energy += energy[i]
    }
    var avg_duration = total_duration/ duration_ms.length;
    var avg_popularity = total_popularity / top50_popularity.length;
    var avg_happiness = Math.round((total_happiness / Happiness.length)*100);
    var avg_danceability = Math.round((total_danceability / danceability.length)*100);
    var avg_acousticness = Math.round((total_acousticness/acousticness.length)*100);
    var avg_energy = Math.round((total_energy/energy.length)*100); 


	var top50_tracks = top50_track.map(function(string) {
		
		if(string.length > 30) {
	var cutstring = string.slice(0,30) + "..." 
	return cutstring
	}
	else {
		return string
	}
		
		
		
	});
	
	
	
	
	
  	
    var trace1 = {
        x: top50_tracks,
        y: acousticness,
        name: 'Acousticness',
        type: 'bar',
        orientation: 'v',
        marker: {
            color: "#104E8B"
          }
      };
    var trace2 = {
        x: top50_tracks,
        y: Happiness,
        name: 'Valence',
        type: 'bar',
        orientation: 'v',
        marker: {
            color: "#1E90FF"
          }
    };
    var trace3 = {
        x: top50_tracks,
        y: energy,
        name: 'Energy',
        type: 'bar',
        orientation: 'v',
        marker: {
            color: "#B0E2FF"
          }
      };
    var trace4 = {
        x: top50_tracks,
        y: danceability,
        orientation: 'v',
        name: 'Danceability',
        type: 'bar',
        marker: {
            color: "white"
          },
          
    };

    var data = [trace1, trace2, trace3, trace4];
    var layout = {
        barmode: 'stack',
        orientation: '',
        title: {text: "Top 50 Songs Audio Analysis" ,
        font: {
        color: "white"
        }},
		legend:{
			font: {
        color: "white"
        }
			
		},
        xaxis: { title: {text: "",  font: {
        color: "white"
        },
				}, 
				tickangle: 45,
        tickfont: {
        color: "#FFFFFF",
    },

    },
        yaxis:{
		
		tickfont: {
        color: "#FFFFFF"},
		dtick: 0.1
	},
        margin: {
        t: 100,
        l:100,
        b:200,
        pad: 4
        },
        // hovermode:'closest',
        plot_bgcolor :'#212529',
        paper_bgcolor: "#212529"
};

var config = {responsive: true}

    Plotly.newPlot("stack-bar", data, layout, config);

};

(async function(){

    stackBar(userData);
 })();
