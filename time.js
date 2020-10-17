function initialPage(data){

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

  var t = avg_duration/60000;

  
    //Guage Chart:
  // Trig to calc meter point
  var degrees = 180 - ((180/9)*t);
  radius = .5;
  var radians = degrees * Math.PI / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

  // Path: may have to change to create a better triangle
  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
       pathX = String(x),
       space = ' ',
       pathY = String(y),
       pathEnd = ' Z';
  var path = mainPath.concat(pathX,space,pathY,pathEnd);

  var data_guag = [{ type: 'scatter',
     x: [0], y:[0],
      marker: {size: 20, color:'orangered'},
      showlegend: false,},
    { values: [50, 50/9, 50/9, 50/9, 50/9, 50/9,50/9,50/9, 50/9,50/9],
    rotation: 90,
    text: ["",'0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
      direction: 'clockwise',
    textinfo: 'text',
    textposition:'inside',	  
       marker: {
        colors: ["#181818","#FAFAD2","#f7f1c0","#f5eeaf","#e1f08c","#b8dc70","#aed75b","#a4d247","#8bb92d","#5d7b1e", "#5d7b1e"],
        labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        hoverinfo: 'none'
      },

    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  var layout_guag = {
    paper_bgcolor: "#181818",
    plot_bgcolor :'#181818',
    margin: {
      t: 60,
      pad: 4
    },
    shapes:[{
        layer: 'above',
        type: 'path',
        path: path,
        fillcolor: 'orangered',
        line: {
          color: 'orangered'
        }
      }],
    title: { text: "The average Length of Top 50 Tracks" ,
    font: {
      color: "white"
      }},
    height: 450,
    width: 450,
    xaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
               showgrid: false, range: [-1, 1]}
  };

   // Plot the chart to a div tag with id "plot"
   Plotly.newPlot('clock', data_guag, layout_guag); 
    

};   

(async function(){

    var data = await d3.json("henry_data.json");
    initialPage(data);
})();