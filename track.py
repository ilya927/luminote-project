import sqlite3
import uuid
import os


class Track:
    def __init__(self, id, title, file):
        self.id = id
        self.title = title
        self.file = file

    def __str__(self):
        return f'{self.id} - {self.title} - {self.file}'


def get_tracks(user_id):
    con = sqlite3.connect('TracksDB')
    cursor = con.cursor()
    cursor.execute("SELECT * FROM tracks WHERE user_id = ?", (user_id,))
    rows = cursor.fetchall()
    con.close()

    tracks = []
    for row in rows:
        track = Track(int(row[0]), row[1], row[2])
        tracks.append(track)
    return tracks


def create_track(title, file, user_id):
    import uuid
    import os

    file_name = uuid.uuid4().hex + file.filename
    file_path = os.path.join('uploads', file_name)
    file.save(file_path)

    sql = "INSERT INTO tracks (title, filename, user_id) VALUES (?, ?, ?)"

    con = sqlite3.connect('TracksDB')
    cursor = con.cursor()
    cursor.execute(sql, (title, file_name, user_id))
    con.commit()
    con.close()



def get_track(id):
    connection = sqlite3.connect('TracksDB')
    sql = f'SELECT * FROM tracks where id = {id}'
    cursor = connection.cursor()
    cursor.execute(sql)
    row = cursor.fetchone()
    connection.close()
    if row is None:
        return None

    track = Track(int(row[0]), row[1], row[2])
    return track


def delete_track(id):
    track = get_track(id)
    if track is None:
        return

    file_path = os.path.join('uploads', track.file)
    if os.path.exists(file_path):
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"error while deleting file: {e}")

    sql = f"DELETE FROM tracks WHERE id = {id}"
    connection = sqlite3.connect('TracksDB')
    cursor = connection.cursor()
    cursor.execute(sql)
    connection.commit()
    connection.close()


def update_track(id, title, file):
    track = get_track(id)
    if track is None:
        return

    new_file = track.file

    if file is not None and file.filename != '':
        old_file_path = os.path.join('uploads', track.file)
        if os.path.exists(old_file_path):
            os.remove(old_file_path)

        file_name = uuid.uuid4().hex + file.filename
        file_path = os.path.join('uploads', file_name)
        file.save(file_path)
        new_file = file_name

    con = sqlite3.connect('TracksDB')
    cursor = con.cursor()
    cursor.execute(
        "UPDATE tracks SET title = ?, filename = ? WHERE id = ?",
        (title, new_file, id)
    )
    con.commit()
    con.close()
