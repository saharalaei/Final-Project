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
          color: ["#1DB954", " #1DB954", " #1DB954", " #1DB954", " #1DB954", " #1DB954", " #1DB954", " #1DB954", " #1DB954", " #1DB954"]
        }
      }];

      var layout_bubble = { 
        
        title: {text: user_name + "'s Top 10 Artists vs. Popularity in Spotify" ,
        font: {
        color: "white"
        }},
        paper_bgcolor: "#191414",
        plot_bgcolor :'#191414',
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
      // Highcharts.chart('bubble-plot', {
      //   chart: {
      //       type: 'packedbubble',
      //          height: '100%'
      //   },
      //   title: {
      //       text: 'Carbon emissions around the world (2014)'
      //   },
      //   tooltip: {
      //       useHTML: true,
      //       pointFormat: '<b>{point.name}:</b> {point.value}m CO<sub>2</sub>'
      //   },
      //   plotOptions: {
      //       packedbubble: {
      //           minSize: '30%',
      //           maxSize: '120%',
      //           zMin: 0,
      //           zMax: 1000,
      //           layoutAlgorithm: {
      //               splitSeries: false,
      //               gravitationalConstant: 0.02
      //           },
      //           dataLabels: {
      //               enabled: true,
      //               format: '{point.name}',
      //               filter: {
      //                   property: 'y',
      //                   operator: '>',
      //                   value: 250
      //               },
      //               style: {
      //                   color: 'black',
      //                   textOutline: 'none',
      //                   fontWeight: 'normal'
      //               }
      //           }
      //       }
      //   },
      //   series: [{
      //       name: 'Top-10-Artists',
      //       data: [{
      //           name: top50_artist [0],
      //           value: top50_popularity[0]
      //       }, {
      //           name: top50_artist [1],
      //           value: top50_popularity[1]
      //       },
      //       {
      //           name: top50_artist [2],
      //           value: top50_popularity[2]
      //       },
      //       {
      //           name: top50_artist [3],
      //           value: top50_popularity[3]
      //       },
      //       {
      //           name: top50_artist [4],
      //           value: top50_popularity[4]
      //       },
      //       {
      //           name: top50_artist [5],
      //           value: top50_popularity[5]/10
      //       },
      //       {
      //           name: top50_artist [6],
      //           value: top50_popularity[6]/10
      //       },
      //       {
      //           name: top50_artist [7],
      //           value: top50_popularity[7]/10
      //       },
      //       {
      //           name: top50_artist [8],
      //           value: top50_popularity[8]/10
      //       },
      //       {
      //           name: top50_artist [9],
      //           value: top50_popularity[9]/10
      //       },
      //       ]
      //    } ]
        
      // });
                  

};   

(async function(){

    var data = await d3.json("henry_data.json");
    initialPage(data);
})();


