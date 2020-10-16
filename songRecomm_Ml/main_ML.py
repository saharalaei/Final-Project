import os
import numpy as np                                          # arrays and matrix math
import pandas as pd                                         # DataFrames

from sklearn import metrics                                 # measures to check our models
from sklearn.model_selection import train_test_split        # train and test split
from sklearn.ensemble import RandomForestRegressor          # random forest method
from sklearn.cluster import KMeans

'''

data = ['danceability','energy','speechiness','instrumentalness',
               'liveness','valence','tempo','chorus_hit']

'''

data = [0.539695,	0.579545,	0.072960,	0.154416,	0.201535,	0.542440,	119.338249,	40.106041]

import joblib
filename = 'finalized_model.sav'
loaded_model = joblib.load(filename)
predicted_cluster = loaded_model.predict(data)


df = pd.read_csv('clustered_data.csv')
df_pred = df[df['cluster_num' == predicted_cluster]]
output = df_pred.sample() 
songName = output['track']
song_url = output['uri']







