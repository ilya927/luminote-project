import hashlib
import sqlite3

class User:
    def __init__(self, id, email, password_hash):
        self.id = id
        self.email = email
        self.password_hash = password_hash

    def __str__(self):
        return f'{self.id} - {self.email}'

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password, password_hash):
    return hash_password(password) == password_hash

def check_user(email, password):
    connection = sqlite3.connect('SpotifyDB')
    cursor = connection.cursor()
    cursor.execute("SELECT id, password FROM users WHERE email = ?", (email,))
    row = cursor.fetchone()
    connection.close()

    if row is None:
        return None

    user_id, password_hash = row
    if verify_password(password, password_hash):
        return User(user_id, email, password_hash)
    else:
        return None

def reg_user(email, password):
    password_hash = hash_password(password)

    con = sqlite3.connect('SpotifyDB')
    cursor = con.cursor()

    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    row = cursor.fetchone()

    if row:
        con.close()
        return False

    cursor.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, password_hash))
    con.commit()
    con.close()
    return True
