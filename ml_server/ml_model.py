import pickle
import random
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from keys import *


"""
	artist is a string
	this returns a random song from the top songs of this artist
"""
def get_random_song_for_artist(artist):
	client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
	sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
	results = sp.search(q='artist:' + artist, type='artist')

	artist_uri = results["artists"]["items"][0]["uri"]
	artist_uri = artist_uri[len("spotify:artist:"):]

	top_tracks = sp.artist_top_tracks(artist_uri)
	track = top_tracks["tracks"][0]
	track_uri = track["uri"]
	track_uri = track_uri[len("spotify:track:"):]
	artist_name = track["artists"][0]["name"]
	image_url = track["album"]["images"][0]["url"]

	track_object = {
		"uri": track["uri"],
		"name": track["name"],
		"artist": artist_name,
		"image": image_url,
	}

	print(track_object)

	return track_object

#returns the newest pickled model
def get_pickled_model():
	top_data = pickle.load( open( "models/save.p", "rb" ) )
	return top_data

def get_random_artist(top_artists):
	#random choice weighted

	def generate_indices_list():
		indices_list = []	

		for i, tup in enumerate(top_artists):
			print(tup)
			num, artist = tup
			for j in range(num):
				indices_list.append(i)
		return indices_list

	indices_list = generate_indices_list()
	random_index = random.choice(indices_list)
	random_artist = top_artists[random_index][1]

	return random_artist

"""
	This function is given a lift of lists of json/dictionary objects
	list of users -> list of song objects
	returns five songs back to the user/ they are song uri's
"""
def generate_recomendations(song_lists):
	#get the frequency of each of the artists
	artist_list = []
	artists = {}

	for user_list in song_lists:
		for artist_data in user_list:
			artist = artist_data["artist"]
			name = artist_data["name"]

			artist_list.append(artist)

			if artist in artists.keys():
				artists[artist] += 1
			else:	
				artists[artist] = 1

	#expand the list of artists using collaborative filtering
	top_data = get_pickled_model()
	final_artist_list = []
	for artist in artist_list:
		final_artist_list.append(artist)
		if artist in top_data.keys():
			random_artist = get_random_artist(top_data[artist])
			final_artist_list.append(random_artist)

	#get 5 random artists from the list to send back
	sample_size = 5 if 5 < len(final_artist_list) else len(final_artist_list)
	sample_5 = random.sample(final_artist_list, sample_size)

	songs = []
	for artist in sample_5:
		print(artist)
		songs.append(get_random_song_for_artist(artist))

	return songs
