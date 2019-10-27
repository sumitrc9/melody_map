import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd
import * from keys

"""
	Get a list of categories
"""
def get_categories(sp, limit=50):
	categories = sp.categories(limit=limit)["categories"]["items"]
	category_ids = []
	for category in categories:
		category_ids.append(category["id"])

	return category_ids

"""
	Gets playlists for these categories
"""
def get_category_playlists(sp, categories, limit=50):
	playlists = []
	for category in categories:
		category_playlists = sp.category_playlists(category, limit=limit)
		category_playlists = category_playlists["playlists"]["items"]
		playlists.extend(category_playlists)
	return playlists

"""
	Returns (artist_name, track_name)
"""
def get_names(track_object):
	artist_name = track_object["artists"][0]["name"]
	track_name = track_object["name"]

	return (artist_name, track_name)

"""
	Get playlist tracks
	Returns a 2d array of all of the songs in the playlist
	each row is ['user_id','artist_name','song_name','playlist_name']
"""
def get_playlist_tracks(sp,playlist):
	playlist_songs = []
	playlist_id = playlist["uri"][len("spotify:playlist:"):]
	playlist_name = playlist["name"]

	tracks = sp.user_playlist_tracks("spotify", playlist_id=playlist_id)
	tracks = tracks["items"]
	names = []
	for track in tracks:
		track = track["track"]
		if track == None:
			continue
		artist_name, track_name = get_names(track)
		arr = ["spotify", artist_name, track_name, playlist_name]
		names.append(arr)

	return names

"""
	Gets the songs from the playlists
	Returns a 2d array of all of the songs in the playlist
	each row is ['user_id','artist_name','song_name','playlist_name']
"""
def get_all_playlists_songs(sp, playlists, limit=50):
	songs = []

	for playlist in playlists:
		songs.extend(get_playlist_tracks(sp,playlist))

	return songs

"""
	This function returns the featured playlists in a 2d array format
	This is the interface to the collaborative filtering system
"""
def get_playlists(limit=50):
	client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
	sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

	categories = get_categories(sp, limit=limit)
	playlists = get_category_playlists(sp, categories, limit=limit)
	playlist_songs = get_all_playlists_songs(sp, playlists, limit=limit)
	
	return playlist_songs


"""
	Code to be run in on a timer in app engine
"""
running = True
if running:
	#pull the spotify datset into pandas
	#add the new data inot the spotify dataset
	data_file = "datasets/playlist_dataset/test.csv"
	with open(data_file, 'a') as f:
		df = pd.read_csv(data_file)
		#run get_playlists and add it to the dataframe
		playlist_songs = get_playlists()
		print(playlist_songs)
		df = df.append(playlist_songs)
		df.to_csv(f, header=False)

