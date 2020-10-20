import json
from flask import Flask, request, redirect, g, render_template, jsonify, session
import requests
from urllib.parse import quote
import os
import base64
from datetime import date
import pymongo
import dns
import numpy as np
from collections import Counter


# Authentication Steps, paramaters, and responses are defined at https://developer.spotify.com/web-api/authorization-guide/
# Visit this url to see all the steps, parameters, and expected response.


app = Flask(__name__)


app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['JSON_SORT_KEYS'] = False
app.config['SECRET_KEY'] = os.environ.get('SESSION_KEY')
app.config['SESSION_TYPE'] = 'filesystem'

#  Client Keys
# CLIENT_ID = client_id
# CLIENT_SECRET = client_secret
CLIENT_ID = os.environ.get('CLIENT_ID')
CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
mongo_uri = os.environ.get('MONGO_PASSWORD')


# Spotify URLS
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)

# Server-side Parameters
CLIENT_SIDE_URL = "https://spotify-user-music-taste.herokuapp.com"
REDIRECT_URI = "{}/callback".format(CLIENT_SIDE_URL)
SCOPE = 'user-read-email user-top-read'

auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "client_id": CLIENT_ID,
    "scope" : SCOPE

}



@app.route("/global_user_data")
def tableau():
    

    return render_template("global_user_data.html")




@app.route("/developers")
def developers():

    return render_template("developers.html")



@app.route("/")
def login():
    # Auth Step 1: Authorization

    return render_template('login.html')








@app.route("/login")
def index():
    # Auth Step 1: Authorization
    url_args = "&".join(["{}={}".format(key, quote(val)) for key, val in auth_query_parameters.items()])
    auth_url = "{}/?{}".format(SPOTIFY_AUTH_URL, url_args)
    return redirect(auth_url)


@app.route("/json")
def json_data():
    try:
        authorization_header = {"Authorization": "Bearer {}".format(session['access_token'])}

        # Get profile data
        user_url = "{}/me".format(SPOTIFY_API_URL)
        user = requests.get(user_url, headers=authorization_header).json()
        name = user['display_name']

        MONGO_CONN = "{}".format(mongo_uri)

    
        client = pymongo.MongoClient(MONGO_CONN)

        user_json = client.spotify['user-data'].find({'name':name})[0]
        user_json.pop('_id', None)

        
        client.close()
        return render_template("json.html", user_json = user_json)
    
    except:    
        return redirect('/')



@app.route("/compare")
def comparison():
    try:
        authorization_header = {"Authorization": "Bearer {}".format(session['access_token'])}

        # Get profile data
        user_url = "{}/me".format(SPOTIFY_API_URL)
        user = requests.get(user_url, headers=authorization_header).json()
        name = user['display_name']

        MONGO_CONN = "{}".format(mongo_uri)

    
        client = pymongo.MongoClient(MONGO_CONN)

        mygenres = client.spotify['user-data'].find({'name':name})[0]['genres']
        unique_genres = len(np.unique(mygenres))

        # all_users = client.spotify['user-data'].find()
        # db_len = int(client.spotify['user-data'].count_documents({}))

        # unique_genres_all = []
        # for i in range(db_len):
        #     unique_genres_all.append(len(np.unique(all_users[i]['genres'])))

        # average_genres = int(round(np.mean(unique_genres_all)))
        

        avg_pop = client.spotify['user-data'].find({'name':name})[0]['average_artist_popularity']
       

        # all_users = client.spotify['user-data'].find({})
        # pop =[]
        # for i in range(db_len):
        #     try:
        #         pop.append(all_users[i]['average_artist_popularity'])
        #     except:
        #         pass
  
        # all_avg = int(round(np.mean(pop)))


        # all_artists = []
        # artist_counts = []
        # for i in range(db_len):
        #     for k in range(len(all_users[i]['top_50_artists'])):
        #         all_artists.append(all_users[i]['top_50_artists'][k]['artist'])

        # b = Counter(all_artists)
        # #print(b.most_common(10))
        # most_common = []
        # most_common_value = []
        # for i in range(10):
        #     most_common.append(b.most_common(10)[i][0])
        #     most_common_value.append(b.most_common(10)[i][1])

        user_stats = {}
        user_stats['user_unique_genres'] = unique_genres
        # user_stats['average_unique_genres'] = average_genres
        user_stats['average_user_artist_popularity'] = avg_pop
        # user_stats['average_alluser_artist_popularity'] = all_avg
        # user_stats['most_common_artists'] = most_common
        # user_stats['most_common_artists_counts'] = most_common_value


        
        client.close()
        return render_template("comparison.html", user_stats = user_stats)
    
    except:    
        return redirect('/')


@app.route("/callback")
def callback():
    # Auth Step 4: Requests refresh and access tokens
    auth_token =  session['auth_token'] = request.args['code']
    code_payload = session['code_payload'] = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }

    auth = "{}:{}".format(CLIENT_ID, CLIENT_SECRET)
    base64encoded = base64.urlsafe_b64encode(auth.encode('UTF-8')).decode('ascii')
    headers = session['headers'] = {"Authorization": "Basic {}".format(base64encoded)}
    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload, headers = headers)

    # Auth Step 5: Tokens are Returned to Application
    response_data = json.loads(post_request.text)

    access_token = session["access_token"] =  response_data["access_token"]
    refresh_token = response_data["refresh_token"]
    token_type = response_data["token_type"]
    expires_in = response_data["expires_in"]

    return redirect('/get_user_data')

    

@app.route("/get_user_data")
def user_json_data():
    try:
        user_data = {}
        # Auth Step 6: Use the access token to access Spotify API
        authorization_header = {"Authorization": "Bearer {}".format(session['access_token'])}

        # Get profile data
        user_url = "{}/me".format(SPOTIFY_API_URL)
        user = requests.get(user_url, headers=authorization_header).json()
        name = user['display_name']
        id = user['id']
        try:
            user_image_url = user['images'][0]['url']
        except:
            user_image_url = 'N/A'

        limit=50


        top_50_url = "{}/me/top/artists?time_range=long_term&limit=50".format(SPOTIFY_API_URL)
        top_50 = requests.get(top_50_url, headers=authorization_header).json()

        top_50_url_tracks = "{}/me/top/tracks?time_range=long_term&limit=50".format(SPOTIFY_API_URL)
        top_50_artists = requests.get(top_50_url_tracks, headers=authorization_header).json()

        
        tracks = []
        track_info = {}
        for i in range(50):
            track_info['track'] = top_50_artists['items'][i]['name']
            track_info['artist'] = top_50_artists['items'][i]['album']['artists'][0]['name']
            track_info['album'] = top_50_artists['items'][i]['album']['name']
            track_info['id'] = top_50_artists['items'][i]['id']
            track_info['track_url'] = f"https://open.spotify.com/embed/track/{top_50_artists['items'][i]['id']}"
            

            #get track analysis
            track_url = "{}/audio-features?ids={}".format(SPOTIFY_API_URL,track_info['id'])
            track_analysis_data = requests.get(track_url, headers=authorization_header).json()
            track_info['audio_features'] = track_analysis_data['audio_features']

            tracks.append(track_info)
            track_info = {}


        artists=[]
        genres=[]
        artist_id = []
        popularity=[]
        artist_imgs = []
        for i in range(50):
            artists.append(top_50['items'][i]['name'])
            genres.append(top_50['items'][i]['genres'])
            popularity.append(top_50['items'][i]['popularity'])
            artist_id.append(top_50['items'][i]['id'])
            try:
                artist_imgs.append(top_50['items'][i]['images'][0]['url'])
            except:
                artist_imgs.append('N/A')

        top_artists=[]
        artist_info = {}
        for i in range(50):
            artist_info['artist'] = artists[i]
            artist_info['id'] = artist_id[i]
            artist_info['image'] = artist_imgs[i]
            artist_info['popularity'] = popularity[i]
            artist_info['genres'] = genres[i]
            
            
            top_artists.append(artist_info)
            artist_info={}
        
        #mean_pop=popularity.mean()
        genres_complete = []
        for i in genres:
            for a in i:
                genres_complete.append(a)

        user_data['date_updated'] = date.today().strftime("%m/%d/%Y")
        user_data['name'] = name
        user_data['id'] = id
        user_data['user_image_url'] = user_image_url
        user_data['top_50_artists'] = top_artists
        user_data['top_50_tracks']= tracks
        user_data['genres'] = genres_complete
        user_data['average_artist_popularity'] = int(round(np.mean(popularity)))


        
        mongo_data = user_data.copy()

        MONGO_CONN = "{}".format(mongo_uri)

    
        client = pymongo.MongoClient(MONGO_CONN)

        client.spotify['user-data'].replace_one(
                    {"id":mongo_data['id']},mongo_data, upsert = True)
        
        client.close()


        #return jsonify(user_data)
        return render_template("index.html", user_data = user_data)
        # return render_template("index2.html", user_data = user_data)
    except:
        return redirect('/')

    
if __name__ == "__main__":
    app.run(debug=True, port=PORT)