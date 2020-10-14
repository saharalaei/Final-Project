import json
from flask import Flask, request, redirect, g, render_template, jsonify, session, url_for
import requests
from urllib.parse import quote
from config import client_id, client_secret, mongo_uri
import base64
from datetime import date
import pymongo
import dns


# Authentication Steps, paramaters, and responses are defined at https://developer.spotify.com/web-api/authorization-guide/
# Visit this url to see all the steps, parameters, and expected response.


app = Flask(__name__)

app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['JSON_SORT_KEYS'] = False
app.config['SECRET_KEY'] = "s"
app.config['SESSION_TYPE'] = 'filesystem'

#  Client Keys
CLIENT_ID = client_id
CLIENT_SECRET = client_secret
MONGO_CONN = mongo_uri

# Spotify URLS
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)

# Server-side Parameters
CLIENT_SIDE_URL = "http://127.0.0.1"
PORT = 8080
REDIRECT_URI = "{}:{}/callback".format(CLIENT_SIDE_URL, PORT)
SCOPE = 'user-read-email user-top-read'



auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "client_id": CLIENT_ID,
    "scope" : SCOPE

}


@app.route("/")
def index():
    # Auth Step 1: Authorization
    url_args = "&".join(["{}={}".format(key, quote(val)) for key, val in auth_query_parameters.items()])
    auth_url = "{}/?{}".format(SPOTIFY_AUTH_URL, url_args)
    return redirect(auth_url)
    #return redirect('/user_data')


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

    
     

   
    #redirect(url_for('http://127.0.0.1:8080', json=json.dumps(my_form_dict)), code=307)
    
    #return redirect(f"{CLIENT_SIDE_URL}:{PORT}/user_data", user_data = user_data)
    #session['user_data'] = user_data
    #return jsonify(user_data)

def redirect_page():
    return redirect(url_for('user_json_data'))
    #return(request.url)
    
    #return render_template("index.html", user_data = user_data)

@app.route("/user_dash")
def user_dashboard():
    #return jsonify(session['user_data'])
    return render_template("compare.html")

@app.route("/get_user_data")
def user_json_data():


    user_data = {}
    # Auth Step 6: Use the access token to access Spotify API
    authorization_header = {"Authorization": "Bearer {}".format(session['access_token'])}

    # Get profile data
    user_url = "{}/me".format(SPOTIFY_API_URL)
    user = requests.get(user_url, headers=authorization_header).json()
    name = user['display_name']
    id = user['id']
    user_image_url = user['images'][0]['url']
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
        track_info['track_url'] = top_50_artists['items'][i]['external_urls']['spotify']

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
    for i in range(50):
        artists.append(top_50['items'][i]['name'])
        genres.append(top_50['items'][i]['genres'])
        popularity.append(top_50['items'][i]['popularity'])
        artist_id.append(top_50['items'][i]['id'])

    top_artists=[]
    artist_info = {}
    for i in range(50):
        artist_info['artist'] = artists[i]
        artist_info['id'] = artist_id[i]
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

    session['data'] = user_data

    mongo_data = user_data.copy()
    

    client = pymongo.MongoClient(MONGO_CONN)
    db = client.test

    client.spotify['user-data'].replace_one(
                {"id":mongo_data['id']},mongo_data, upsert=True)
    
    client.close()


    #return jsonify(user_data)
    return render_template("index.html", user_data = user_data)
    #return render_template("index.html")
    
    


if __name__ == "__main__":
    app.run(debug=True, port=PORT)
