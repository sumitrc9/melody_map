import csv
import pandas as pd
import numpy as np
import operator
import warnings
import pickle
warnings.filterwarnings('ignore')


df = pd.read_csv('datasets/playlist_dataset/spotify_dataset.csv', nrows=100000, sep=',', names=['user_id','artist_name','song_name','playlist_name'])
df = df.iloc[1:] #drop the first row
df['playlist_id'] = df["user_id"] + df["playlist_name"]
del df["user_id"]
del df["playlist_name"]
df["playlist_id"] = pd.Categorical(df["playlist_id"]).codes

def create_artist_dictionary():
    a_dict = {}

    for index, row in df.iterrows():
        playlist_id = row["playlist_id"]
        artist = row["artist_name"]
        if not artist in a_dict.keys():
            a_dict[artist] = set([playlist_id])
        else:
            a_dict[artist].add(playlist_id)

    return a_dict

artist_dictionary = create_artist_dictionary()
#print(artist_dictionary)

def create_overlap_map():
    overlap_map = {}

    for artist in artist_dictionary.keys():
        a_list = artist_dictionary[artist]

        for other_artist in artist_dictionary.keys():
            if artist == other_artist:
                continue

            b_list = artist_dictionary[other_artist]
            overlap = a_list.intersection(b_list)
            intersection_length = len(overlap)
            if intersection_length > 1:
                overlap_map[(artist, other_artist)] = intersection_length

    return overlap_map

overlap_map = create_overlap_map()

#sort the overlap map
#sorted_overlap_map = sorted(overlap_map.items(), key=operator.itemgetter(1))
#print(sorted_overlap_map)

#creates top 5 reccomendations for each artist
def top_5():
    top_5_map = {}

    for pair in overlap_map.keys():
        a, b = pair
        value = overlap_map[pair]
        if a in top_5_map.keys():
            top_5_map[a].append((value, b))
        else:
            top_5_map[a] = [(value, b)]

    for artist in artist_dictionary.keys():
        if artist in top_5_map.keys():
            print(top_5_map[artist])
            top_5_map[artist] = sorted(top_5_map[artist], key=lambda tup: tup[0])
            top_5_map[artist].reverse()
            top_5_map[artist] = top_5_map[artist][0:5]

    return top_5_map

top_5_map = top_5()
unique_file_name = 'save.p'

pickle.dump(top_5_map, open( "models/"+unique_file_name, "wb" ))


#do the collaborative filtering


#generate a list of indices to the playlists that an artist is in
#do some overlap 