import json
from flask import Flask, request, redirect, g, render_template, jsonify
import requests
from urllib.parse import quote
from config import client_id, client_secret
import base64
from datetime import date



# Authentication Steps, paramaters, and responses are defined at https://developer.spotify.com/web-api/authorization-guide/
# Visit this url to see all the steps, parameters, and expected response.


app = Flask(__name__)

#  Client Keys
CLIENT_ID = client_id
CLIENT_SECRET = client_secret

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


@app.route("/callback")
def callback():
    # Auth Step 4: Requests refresh and access tokens
    auth_token = request.args['code']
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }

    auth = "{}:{}".format(CLIENT_ID, CLIENT_SECRET)
    base64encoded = base64.urlsafe_b64encode(auth.encode('UTF-8')).decode('ascii')
    headers = {"Authorization": "Basic {}".format(base64encoded)}
    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload, headers = headers)

    # Auth Step 5: Tokens are Returned to Application
    response_data = json.loads(post_request.text)
    access_token = response_data["access_token"]
    refresh_token = response_data["refresh_token"]
    token_type = response_data["token_type"]
    expires_in = response_data["expires_in"]


    user_data = {}
    # Auth Step 6: Use the access token to access Spotify API
    authorization_header = {"Authorization": "Bearer {}".format(access_token)}

    # Get profile data
    user_url = "{}/me".format(SPOTIFY_API_URL)
    user = requests.get(user_url, headers=authorization_header).json()
    name = user['display_name']
    id = user['id']
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

    user_data['name'] = name
    user_data['id'] = id
    user_data['top_50_artists'] = top_artists
    user_data['genres'] = genres_complete
    user_data['date_updated'] = today = date.today()
    user_data['top_50_tracks']= tracks
    


    return jsonify(user_data)


if __name__ == "__main__":
    app.run(debug=True, port=PORT)
