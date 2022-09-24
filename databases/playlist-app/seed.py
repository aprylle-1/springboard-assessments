from models import Playlist, PlaylistSong, Song, connect_db, db
from app import app
connect_db(app)

db.drop_all()
db.create_all()

#creating a bunch of songs

song1 = Song(title="Talk the Talk",artist="TWICE")
song2 = Song(title="The Feels",artist="TWICE")
song3 = Song(title="I CAN'T STOP ME",artist="TWICE")
song4 = Song(title="Left and Right", artist="Charlie Puth Feat. Jung Kook of BTS")
song5 = Song(title="Dynamite", artist="BTS")
song6 = Song(title="Universe",artist="BTS")

songs = [song1, song2, song3, song4, song5, song6]

db.session.add_all(songs)
db.session.commit()


#creating 2 different playlist for testing
playlist1 = Playlist(name="Playlist1",description="This is the first playlist made")
playlist2 = Playlist(name="Playlist2",description="This is the second playlist made")

db.session.add(playlist1)
db.session.add(playlist2)

db.session.commit()

#adding songs to playlists

p1s1 = PlaylistSong(playlist_id=1,song_id=1)
p1s2 = PlaylistSong(playlist_id=1,song_id=2)
p1s3 = PlaylistSong(playlist_id=1,song_id=4)

p2s1 = PlaylistSong(playlist_id=2,song_id=3)
p2s2 = PlaylistSong(playlist_id=2,song_id=1)
p2s3 = PlaylistSong(playlist_id=2,song_id=5)

added_songs = [p1s1, p1s2, p1s3, p2s1, p2s2, p2s3]

db.session.add_all(added_songs)
db.session.commit()


