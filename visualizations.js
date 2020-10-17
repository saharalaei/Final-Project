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

    var trace1 = {
        y: top50_track,
        x: acousticness,
        name: 'Acousticness',
        type: 'bar',
        orientation: 'h',
        marker: {
            color: "#1DB954"
          }
      };

    var trace2 = {
        y: top50_track,
        x: Happiness,
        name: 'Happiness',
        type: 'bar',
        orientation: 'h',
        marker: {
            color: "#7F6A93"
          }
    };

    var trace3 = {
        y: top50_track,
        x: energy,
        name: 'Energy',
        type: 'bar',
        orientation: 'h',
        marker: {
            color: "#05B2DC"
          }
      };

    var trace4 = {
        y: top50_track,
        x: danceability,
        orientation: 'h',
        name: 'Danceability',
        type: 'bar',
        marker: {
            color: "#7D7C84"
          },
          
    };

    var data = [trace1, trace2, trace3, trace4];
    var layout = {
        barmode: 'stack',
        orientation: 'h',
        title: {text: user_name + "'s Music Taste" ,
        font: {
        color: "white"
        }},
        xaxis: { title: {text: "",  font: {
        color: "white"
        } }, 
        tickfont: {
        color: "#FFFFFF",
    },

    },
        yaxis:{tickfont: {
        color: "#FFFFFF",
    } },
        margin: {
        t: 40,
        l:200,
        b:200,
        pad: 4
        },
        // hovermode:'closest',
        plot_bgcolor :'#181818',
        paper_bgcolor: "#181818",

};

    Plotly.newPlot('bar-plot', data, layout);

    Highcharts.chart('pie1-plot', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            backgroundColor: '#181818'
        },
        legend: {
            color: 'white',
             
        },
        title: {
            text: "How " +user_name+ "'s play list is danceable?",
            style: {
                color: "white"
            },
           
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f} </b>%'
        },
        plotOptions: {
            pie: {
                colors: ["#1DB954", "gray"],
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        fontSize: '13px',
                        color: "white"
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            data: [
                {
                    name: 'Danceable',
                    y: avg_danceability,
                    sliced: true,
                    selected: true
                },
                {name:'Non-Danceable', 
                y: 100-avg_danceability
                }
                              
            ]
        }]
    });

    Highcharts.chart('pie2-plot', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            backgroundColor: '#181818'
        },
        legend: {
            color: 'white',
             
        },
        title: {
            text: "How " +user_name+ "'s play list is Happy?",
            style: {
                color: "white"
            },
           
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f} </b>%'
        },
        plotOptions: {
            pie: {
                colors: ["#1DB954", "gray"],
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        fontSize: '13px',
                        color: "white"
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            data: [
                {
                    name: 'Happy',
                    y: avg_happiness,
                    sliced: true,
                    selected: true
                },
                {name:'Non-Happy' , 
                y: 100-avg_happiness
                }
                              
            ]
        }]
    });

    
    Highcharts.chart('pie3-plot', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            backgroundColor: '#181818'
        },
        legend: {
            color: 'white',
             
        },
        title: {
            text: "How " +user_name+ "'s play list is Energetic?",
            style: {
                color: "white"
            },
           
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f} </b>%'
        },
        plotOptions: {
            pie: {
                colors: ["#1DB954", "gray"],
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        fontSize: '13px',
                        color: "white"
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            data: [
                {
                    name: 'Energetic',
                    y: avg_energy,
                    sliced: true,
                    selected: true
                },
                {name:'Non-Energetic' , 
                y: 100-avg_happiness
                }
                              
            ]
        }]
    });

    Highcharts.chart('pie4-plot', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            backgroundColor: '#181818'
        },
        legend: {
            color: 'white',
             
        },
        title: {
            text: "How " +user_name+ "'s play list is Acoustic?",
            style: {
                color: "white"
            },
           
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f} </b>%'
        },
        plotOptions: {
            pie: {
                colors: ["#1DB954", "gray"],
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                    style: {
                        fontSize: '13px',
                        color: "white"
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            data: [
                {
                    name: 'Acoustic',
                    y: avg_acousticness,
                    sliced: true,
                    selected: true
                },
                {name:'Non-Acoustic' , 
                y: 100-avg_acousticness
                }
                              
            ]
        }]
    });

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
};


(async function(){

    var data = await d3.json("henry_data.json");
    initialPage(data);

  })();

  
  
