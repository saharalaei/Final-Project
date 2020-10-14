{/* <script type="text/javascript">
	var data = {{ user_data | tojson }};
</script> */}


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
        x: top50_artist,
        y: acousticness,
        name: 'Acousticness',
        type: 'bar',
        marker: {
            color: "#008080"
          }
      };

    var trace2 = {
        x: top50_artist,
        y: Happiness,
        name: 'Happiness',
        type: 'bar',
        marker: {
            color: "#20B2AA"
          }
    };

    var trace3 = {
        x: top50_artist,
        y: energy,
        name: 'Energy',
        type: 'bar',
        marker: {
            color: "#48D1CC"
          }
      };

    var trace4 = {
        x: top50_artist,
        y: danceability,
        name: 'Danseability',
        type: 'bar',
        marker: {
            color: "#AFEEEE"
          }
    };

    var data = [trace1, trace2, trace3, trace4];
    var layout = {barmode: 'stack',
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
};


(async function(){

    var data = await d3.json("henry_data.json");
    initialPage(data);

    // // Select the button
    // var button = d3.select("#button");

    // // Select the form
    // var form_input = d3.select("#form-input");

    // // Create event handlers 
    // button.on("click", updatePage);
    // form_input.on("submit",updatePage);


    // function updatePage(){

    //     d3.event.preventDefault();

    //     //Selecting the user input:
    //     subject = d3.select("#subject_ID").node().value;

    //     if (subject == "Darrik"){
    //         data = data1
    //     }else if (sibject == Henry){
    //         data = data2
    //     }else {
    //         data = data1
    //     }



    //     //updating the display of demographic info based on user request:
    //     demographic_info = d3.select("#demographic_info");
    //     demographic_info.html(`<strong>id: </strong> ${id}`);
    //     demographic_info.append("li").html(`<strong>ethnicity: </strong> ${ethnicity}`);
    //     demographic_info.append("li").html(`<strong>gender: </strong> ${gender}`);
    //     demographic_info.append("li").html(`<strong>age: </strong> ${age}`);
    //     demographic_info.append("li").html(`<strong>location: </strong> ${loc}`);
    //     demographic_info.append("li").html(`<strong>bbtype: </strong> ${bbtype}`);
    //     demographic_info.append("li").html(`<strong>wfreq: </strong> ${wfreq}`);


    //   //updating the bar chart and bubble chart regarding user request:
    //     otu_IDs = data.samples[subject].otu_ids;
    //     otu_samples = data.samples[subject].sample_values; 
    //     otu_labels = data.samples[subject].otu_labels; 
        
    //     otu_IDs_10 = otu_IDs.slice(0,10).map(row => "OTU "+ row).reverse();
    //     otu_samples_10 = otu_samples.slice(0,10).sort((a,b)=>a-b);
    //     otu_labels_10 = otu_labels.slice(0,10);
    
    //     Plotly.restyle("bar-plot", "x", [otu_samples_10]);
    //     Plotly.restyle("bar-plot", "y", [otu_IDs_10]);

    //     Plotly.restyle("bubble-plot", "x", [otu_IDs]);
    //     Plotly.restyle("bubble-plot", "y", [otu_samples]);


    //      //Updating Guage Chart:
    //     // Trig to calc meter point
    //     var degrees = 180 - ((180/9)*wfreq);
    //     radius = .5;
    //     var radians = degrees * Math.PI / 180;
    //     var x = radius * Math.cos(radians);
    //     var y = radius * Math.sin(radians);

    //     // Path: may have to change to create a better triangle
    //     var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    //         pathX = String(x),
    //         space = ' ',
    //         pathY = String(y),
    //         pathEnd = ' Z';
    //     var path = mainPath.concat(pathX,space,pathY,pathEnd);

    //     var data_guag = [{ type: 'scatter',
    //       x: [0], y:[0],
    //         marker: {size: 20, color:'850000'},
    //         showlegend: false,},
    //       { values: [50, 50/9, 50/9, 50/9, 50/9, 50/9,50/9,50/9, 50/9,50/9],
    //       rotation: 90,
    //       text: ["",'0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    //         direction: 'clockwise',
    //       textinfo: 'text',
    //       textposition:'inside',	  
    //         marker: {
    //           colors: ["white","#FAFAD2","#f7f1c0","#f5eeaf","#e1f08c","#b8dc70","#aed75b","#a4d247","#8bb92d","#5d7b1e",'white'],
    //           labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    //           hoverinfo: 'none'
    //         },

    //       hole: .5,
    //       type: 'pie',
    //       showlegend: false
    //     }];

    //     var layout_guag = {
    //       margin: {
    //         t: 60,
    //         pad: 4
    //       },
    //       shapes:[{
    //           layer: 'above',
    //           type: 'path',
    //           path: path,
    //           fillcolor: '850000',
    //           line: {
    //             color: '850000'
    //           }
    //         }],
    //       title: { text: "Belly Button Washing Frequency <br>Scrubs per Week" },
    //       height: 450,
    //       width: 450,
    //       xaxis: {zeroline:false, showticklabels:false,
    //                 showgrid: false, range: [-1, 1]},
    //       yaxis: {zeroline:false, showticklabels:false,
    //                 showgrid: false, range: [-1, 1]}
    //     };


    //     Plotly.newPlot('gauge-plot', data_guag, layout_guag);   
    
    //   }
    
  })();

  
  
