{/* <script type="text/javascript">
	var data = {{ user_data | tojson }};
</script> */}


function radialBar(data){

    var total_user_genres = data["genres"]
    var user_name = data["name"]
    var user_uodate_date = data["date_updated"]
    var top50_user_artists_info = data["top_50_artists"]
    var top50_user_tracks_info = data["top_50_tracks"]

    var top50_artist = []
    var top50_genre = []
    var top50_popularity = []

    for (i=0 ;  i< top50_user_artists_info.length; i++){ 
        top50_artist.push(top50_user_artists_info[i]['artist'])
        top50_genre.push(top50_user_artists_info[i]['genres'])
        top50_popularity.push(top50_user_artists_info[i]['popularity'])
    }
    
    var top50_track = []
    var top50_album = []
    var top50_audio_features = []

    for (i=0; i<top50_user_tracks_info.length; i++){
        top50_track.push(top50_user_tracks_info[i]['track'])
        top50_album.push(top50_user_tracks_info[i]['album'])
        top50_audio_features.push(top50_user_tracks_info[i]['audio_features'])
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
        danceability.push(top50_audio_features[i][0]['danceability'])
        energy.push(top50_audio_features[i][0]['energy'])
        loudness.push(top50_audio_features[i][0]['loudness'])
        mode.push(top50_audio_features[i][0]['mode'])
        speechiness.push(top50_audio_features[i][0]['speechiness'])
        acousticness.push(top50_audio_features[i][0]['acousticness'])
        instrumentalness.push(top50_audio_features[i][0]['instrumentalness'])
        liveness.push(top50_audio_features[i][0]['liveness'])
        Happiness.push(top50_audio_features[i][0]['valence'])
        tempo.push(top50_audio_features[i][0]['tempo'])
        duration_ms.push(top50_audio_features[i][0]['duration_ms'])
    }

    var total_duration = 0;
    var total_popularity = 0;
    var total_happiness = 0;
    var total_danceability = 0;
    var total_acousticness = 0;
    var total_energy = 0;
	var total_speechiness = 0;

    for(var i = 0;i<energy.length; i++) {
        total_duration += duration_ms[i];
        total_popularity += top50_popularity[i];
        total_happiness += Happiness[i];
        total_danceability += danceability[i];
        total_acousticness += acousticness[i];
        total_energy += energy[i];
		total_speechiness += speechiness[i]
    }

    var avg_duration = total_duration/ duration_ms.length;
    var avg_popularity = total_popularity / top50_popularity.length;

    var avg_happiness = ((total_happiness / Happiness.length));
    var avg_danceability = ((total_danceability / danceability.length));
    var avg_acousticness = ((total_acousticness/acousticness.length));
    var avg_energy = ((total_energy/energy.length)); 
	var avg_speechiness = ((total_speechiness/speechiness.length)); 

    Highcharts.chart('radial-bar-plot', {
		tooltip: {
        formatter: function () {
            return 'Average '+this.x +' of Your Top 50 Songs: ' + (this.y).toFixed(2);
        }
    },
		
		
    legend: {
        enabled: false
    },
		
		
        colors: ["#1e90ff", "#1e90ff", "#1e90ff", "#1e90ff", "#1e90ff"],
        chart: {
            backgroundColor: '',
            type: 'column',
            inverted: true,
            polar: true,
            marginTop: 25
        },
        title: {
            style: {
                color: "white"
            },
            text: 'Audio Analysis of Your Top 50 Songs'
        },
		
		
        // subtitle: {
            // style: {
                // color: "white"
            // },
            // text: 'How energetic, danceable, acoustic, and happy is your top 50 play list?'
        // },
        pane: {
            startAngle: 45,
            endAngle: 270
        },
        xAxis: {
            tickInterval: 1,
            labels: {
                allowOverlap: true,
                y: -5,
                style: {
                    fontSize: '12px',
                    color: "white"
                }
            },
            categories: [
                    'Danceability' +
                '</span></span>',
                'Energy' +
                '</span></span>',
                'Valence' +
                '</span></span>',
				 'Speechiness' +
                '</span></span>',
				 'Acousticness' +
                '</span></span>',
            ]
        },
        yAxis: {
			tickInterval: .1,
            labels: {
                style:{
                    color: "white"
                }
            },
            max: 1,
            showLastLabel: false,
            
        },
        plotOptions: {
            series: {
                pointPadding: 0,
                groupPadding: 0,
                dataLabels: {
                    enabled: false,
                    inside: true,
                    allowOverlap: true
                }
            }
        },
        series: [{
            // colorByPoint: true,
            data: [avg_danceability,  avg_energy,  avg_happiness, avg_speechiness, avg_acousticness]
        }]
    });

};   

(async function(){

    radialBar(userData);
})();





function bubble(data){

    var total_user_genres = data["genres"]
    var user_name = data["name"]
    var user_uodate_date = data["date_updated"]
    var top50_user_artists_info = data["top_50_artists"]
    var top50_user_tracks_info = data["top_50_tracks"]

    var top50_artist = []
    var top50_genre = []
    var top50_popularity = []

    for (i=0 ;  i< top50_user_artists_info.length; i++){ 
        top50_artist.push(top50_user_artists_info[i]['artist'])
        top50_genre.push(top50_user_artists_info[i]['genres'])
        top50_popularity.push(top50_user_artists_info[i]['popularity'])
    }
    
    var top50_track = []
    var top50_album = []
    var top50_audio_features = []

    for (i=0; i<top50_user_tracks_info.length; i++){
        top50_track.push(top50_user_tracks_info[i]['track'])
        top50_album.push(top50_user_tracks_info[i]['album'])
        top50_audio_features.push(top50_user_tracks_info[i]['audio_features'])
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
        danceability.push(top50_audio_features[i][0]['danceability'])
        energy.push(top50_audio_features[i][0]['energy'])
        loudness.push(top50_audio_features[i][0]['loudness'])
        mode.push(top50_audio_features[i][0]['mode'])
        speechiness.push(top50_audio_features[i][0]['speechiness'])
        acousticness.push(top50_audio_features[i][0]['acousticness'])
        instrumentalness.push(top50_audio_features[i][0]['instrumentalness'])
        liveness.push(top50_audio_features[i][0]['liveness'])
        Happiness.push(top50_audio_features[i][0]['valence'])
        tempo.push(top50_audio_features[i][0]['tempo'])
        duration_ms.push(top50_audio_features[i][0]['duration_ms'])
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

    var dataset_bubble =[{
        x: top50_artist.slice(0,10),
        y: (top50_popularity.slice(0,10)),
        text: top50_artist.slice(0,10),
        textposition: 'inside',
        textfont: {
          family:  'Raleway, sans-serif',
          size: 8,
          color: "white"
        },
        mode: 'markers+text',
        marker: {
          size: (top50_popularity.slice(0,10)).map(i=>i*1.1),
          // color: ["#1DB954", " #1DB954", " #1DB954", " #1DB954", " #1DB954", " #1DB954", " #1DB954", " #1DB954", " #1DB954", " #1DB954"]
		  color: "#1DB954",
        }
      }];

      var layout_bubble = { 
        
        title: {text: "Spotify Popularity Rating of Your Top 10 Artists" ,
        font: {
        color: "white"
        }},
        paper_bgcolor: "#212529",
        plot_bgcolor :'#212529',
        xaxis: {showticklabels: false, tickfont: {
            color: "white",
        }}, 
        yaxis:{title: {text: "Popularity", font: {
            color: "white"
          }}, tickfont: {
            color: "white",
        } },
        margin: {
        //   t: ,
          pad: 4
        }
        // plot_bgcolor :'#181818',
        // paper_bgcolor: "#181818",
      }

      Plotly.newPlot("bubble-plot", dataset_bubble, layout_bubble);


};   

(async function(){

    bubble(userData);
})();








