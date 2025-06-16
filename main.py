from flask import Flask, render_template, request, redirect, session,send_from_directory,abort,jsonify
from user import User, check_user, reg_user
from track import create_track, get_tracks, delete_track, get_track, update_track
import sqlite3
app = Flask(__name__)
app.secret_key = 'some secret key'
app.config['UPLOAD_FOLDER'] = 'uploads'


@app.route('/')
def index_page():
    return render_template('index.html')


@app.route('/login')
def login_page():
    return render_template('login.html')


@app.route('/auth', methods=['POST'])
def auth_page():
    email = request.form['email']
    password = request.form['password']

    user = check_user(email, password)

    if user:
        session['user_id'] = user.id
        return redirect('/main')
    else:
        return render_template('login.html',
                               message='Wrong email or password',
                               email=email,
                               password=password)


@app.route('/reg', methods=['GET', 'POST'])
def reg_page():
    message = ''
    email = ''

    if request.method == 'POST':
        email = request.form['email']
        password1 = request.form['password1']
        password2 = request.form['password2']

        if password1 != password2:
            message = 'not same passwords'
        else:
            registred = reg_user(email, password1)
            if registred:
                message = "you registered"
            else:
                message = "user already created!!!"
    return render_template('registration.html', message=message, email=email)


@app.route('/user')
def user_page():
    if 'user_id' in session:
        return render_template('user.html', email=session['user_id'])
#    else:
#        return redirect('/login')


@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect('/')


@app.before_request
def require_login():
    allowed_routes = ['index_page', 'login_page', 'auth_page', 'reg_page', 'static']
    if request.endpoint not in allowed_routes and 'user_id' not in session:
        return redirect('/')



@app.route('/userpage')
def profile_page():
    return render_template('user.html')
@app.route('/main')
def main():
    return render_template('main.html')


@app.route('/astroworldpage')
def astroworld():
    return render_template('albumpage_astroworld.html')


@app.route('/currentspage')
def currents():
    return render_template('albumpage_currents.html')


@app.route('/starboypage')
def starboy():
    return render_template('albumpage_starboy.html')


@app.route('/evolvepage')
def evolve():
    return render_template('albumpage_evolve.html')


@app.route('/heavenorhellpage')
def heavenorhell():
    return render_template('albumpage_heavenorhell.html')


@app.route('/thrillerpage')
def thriller():
    return render_template('albumpage_thriller.html')


@app.route('/shortandsweetpage')
def shortandsweet():
    return render_template('albumpage_shortandsweet.html')


@app.route('/graduationpage')
def graduation():
    return render_template('albumpage_graduation.html')


@app.route('/dontoliverpage')
def dontoliver():
    return render_template('artistpage_dontoliver.html')


@app.route('/imaginedragonspage')
def imaginedragons():
    return render_template('artistpage_imaginedragons.html')


@app.route('/sabrinacarpenterpage')
def sabrinacarpenter():
    return render_template('artistpage_sabrinacarpenter.html')


@app.route('/kanyewestpage')
def kanyewest():
    return render_template('artistpage_kanyewest.html')


@app.route('/michaeljacksonpage')
def michaeljackson():
    return render_template('artistpage_michaeljackson.html')


@app.route('/tameimpalapage')
def tameimpala():
    return render_template('artistpage_tameimpala.html')


@app.route('/theweekndpage')
def theweeknd():
    return render_template('artistpage_weeknd.html')


@app.route('/travisscottpage')
def travisscott():
    return render_template('artistpage_travisscott.html')





#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

@app.route("/downloaded")
def downloaded():
    if "user_id" not in session:
        return redirect("/login")

    user_id = session["user_id"]
    tracks = get_tracks(user_id)
    return render_template("downloaded.html", tracks=tracks)


@app.route('/create')
def create_page():
    return render_template('create.html')


@app.route("/save", methods=["POST"])
def save():
    if "user_id" not in session:
        return redirect("/login")

    title = request.form["title"]
    file = request.files["file"]
    user_id = session["user_id"]

    create_track(title, file, user_id)
    return redirect("/downloaded")


@app.route('/uploads/<filename>', methods=['GET'])
def get_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/delete/<id>', methods=['GET'])
def delete_page(id):
    delete_track(id)
    return redirect('/downloaded')


@app.route('/error')
def error_page():
    return 'error page'


@app.route('/edit/<id>', methods=['GET', 'POST'])
def edit_page(id):
    track = get_track(id)
    if track is None:
        return redirect('/error')

    if request.method == 'POST':
        title = request.form['title']
        file = request.files.get('file')

        if file and file.filename != '':
            update_track(id, title, file)
        else:
            update_track(id, title, None)

        return redirect('/downloaded')

    return render_template('edit.html', track=track)


@app.route('/update', methods=['POST'])
def update_page():
    id = request.form['id']
    title = request.form['title']
    file = request.files.get('file')
    if file and file.filename != '':
        update_track(id, title, file)
    else:
        update_track(id, title, None)
    return redirect('/')


@app.route('/search')
def search():
    query = request.args.get('q', '').lower()
    results = []
    if query:
        results = [t for t in all_tracks if query in t['title'].lower() or query in t['artist'].lower()]
    print(f"Search query: {query}, results count: {len(results)}")
    return jsonify({"results": results})
@app.route('/librarypage')
def library_page():
    return render_template('library.html')

@app.route('/artistspage')
def artists_page():
    return render_template('artists.html')
@app.route('/infopage')
def info_page():
    return render_template('info.html')





all_tracks = [
    # Thriller — Michael Jackson
    { "title": "Wanna Be Startin' Somethin'", "url": "/thrillerpage", "artist": "Michael Jackson" },
    { "title": "Baby Be Mine", "url": "/thrillerpage", "artist": "Michael Jackson" },
    { "title": "The Girl Is Mine", "url": "/thrillerpage", "artist": "Michael Jackson" },
    { "title": "Thriller", "url": "/thrillerpage", "artist": "Michael Jackson" },
    { "title": "Beat It", "url": "/thrillerpage", "artist": "Michael Jackson" },
    { "title": "Billie Jean", "url": "/thrillerpage", "artist": "Michael Jackson" },
    { "title": "Human Nature", "url": "/thrillerpage", "artist": "Michael Jackson" },
    { "title": "P.Y.T. (Pretty Young Thing)", "url": "/thrillerpage", "artist": "Michael Jackson" },
    { "title": "The Lady in My Life", "url": "/thrillerpage", "artist": "Michael Jackson" },

    # Astroworld — Travis Scott
    { "title": "STARGAZING", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "CAROUSEL", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "SICKO MODE", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "R.I.P. SCREW", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "STOP TRYING TO BE GOD", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "NO BYSTANDERS", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "SKELETONS", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "WAKE UP", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "5% TINT", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "NC-17", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "ASTROTHUNDER", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "YOSEMITE", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "CAN’T SAY", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "WHO? WHAT!", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "BUTTERFLY EFFECT", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "HOUSTONFORNICATION", "url": "/astroworldpage", "artist": "Travis Scott" },
    { "title": "COFFEE BEAN", "url": "/astroworldpage", "artist": "Travis Scott" },

    # Starboy — The Weeknd
    { "title": "Starboy", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "Party Monster", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "False Alarm", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "Reminder", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "Rockin’", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "Secrets", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "True Colors", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "Stargirl Interlude", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "Sidewalks", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "Six Feet Under", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "Love To Lay", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "A Lonely Night", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "Attention", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "Ordinary Life", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "Nothing Without You", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "All I Know", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "Die For You", "url": "/starboypage", "artist": "The Weeknd" },
    { "title": "I Feel It Coming", "url": "/starboypage", "artist": "The Weeknd" },

    # Evolve — Imagine Dragons
    { "title": "Next To Me", "url": "/evolvepage", "artist": "Imagine Dragons" },
    { "title": "I Don't Know Why", "url": "/evolvepage", "artist": "Imagine Dragons" },
    { "title": "Whatever It Takes", "url": "/evolvepage", "artist": "Imagine Dragons" },
    { "title": "Believer", "url": "/evolvepage", "artist": "Imagine Dragons" },
    { "title": "Walking The Wire", "url": "/evolvepage", "artist": "Imagine Dragons" },
    { "title": "Rise Up", "url": "/evolvepage", "artist": "Imagine Dragons" },
    { "title": "I'll Make It Up To You", "url": "/evolvepage", "artist": "Imagine Dragons" },
    { "title": "Yesterday", "url": "/evolvepage", "artist": "Imagine Dragons" },
    { "title": "Mouth Of The River", "url": "/evolvepage", "artist": "Imagine Dragons" },
    { "title": "Thunder", "url": "/evolvepage", "artist": "Imagine Dragons" },
    { "title": "Start Over", "url": "/evolvepage", "artist": "Imagine Dragons" },
    { "title": "Dancing In The Dark", "url": "/evolvepage", "artist": "Imagine Dragons" },

    # Short n’ Sweet — Sabrina Carpenter
    { "title": "Taste", "url": "/shortnsweetpage", "artist": "Sabrina Carpenter" },
    { "title": "Please Please Please", "url": "/shortnsweetpage", "artist": "Sabrina Carpenter" },
    { "title": "Good graces", "url": "/shortnsweetpage", "artist": "Sabrina Carpenter" },
    { "title": "Sharpest tool", "url": "/shortnsweetpage", "artist": "Sabrina Carpenter" },
    { "title": "Coincidence", "url": "/shortnsweetpage", "artist": "Sabrina Carpenter" },
    { "title": "Bed chem", "url": "/shortnsweetpage", "artist": "Sabrina Carpenter" },
    { "title": "Espresso", "url": "/shortnsweetpage", "artist": "Sabrina Carpenter" },
    { "title": "Dumb & poetic", "url": "/shortnsweetpage", "artist": "Sabrina Carpenter" },
    { "title": "Slim Pickins", "url": "/shortnsweetpage", "artist": "Sabrina Carpenter" },
    { "title": "Juno", "url": "/shortnsweetpage", "artist": "Sabrina Carpenter" },
    { "title": "Lie to girls", "url": "/shortnsweetpage", "artist": "Sabrina Carpenter" },
    { "title": "Don't smile", "url": "/shortnsweetpage", "artist": "Sabrina Carpenter" },

    # Heaven or Hell — Don Toliver
    { "title": "Heaven or Hell", "url": "/heavenorhellpage", "artist": "Don Toliver" },
    { "title": "Euphoria", "url": "/heavenorhellpage", "artist": "Don Toliver" },
    { "title": "Cardigan", "url": "/heavenorhellpage", "artist": "Don Toliver" },
    { "title": "After Party", "url": "/heavenorhellpage", "artist": "Don Toliver" },
    { "title": "Wasted", "url": "/heavenorhellpage", "artist": "Don Toliver" },
    { "title": "Can't Feel My Legs", "url": "/heavenorhellpage", "artist": "Don Toliver" },
    { "title": "Candy", "url": "/heavenorhellpage", "artist": "Don Toliver" },
    { "title": "Company", "url": "/heavenorhellpage", "artist": "Don Toliver" },
    { "title": "Had Enough", "url": "/heavenorhellpage", "artist": "Don Toliver" },
    { "title": "Spaceship", "url": "/heavenorhellpage", "artist": "Don Toliver" },
    { "title": "No Photos", "url": "/heavenorhellpage", "artist": "Don Toliver" },
    { "title": "No Idea", "url": "/heavenorhellpage", "artist": "Don Toliver" },

    # Graduation — Kanye West
    { "title": "Good Morning", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "Champion", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "Stronger", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "I Wonder", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "Good Life", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "Can't Tell Me Nothing", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "Barry Bonds", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "Drunk and Hot Girls", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "Flashing Lights", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "Everything I Am", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "The Glory", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "Homecoming", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "Big Brother", "url": "/graduationpage", "artist": "Kanye West" },
    { "title": "Good Night", "url": "/graduationpage", "artist": "Kanye West" },

    # Currents — Tame Impala
    { "title": "Let It Happen", "url": "/currentspage", "artist": "Tame Impala" },
    { "title": "Nangs", "url": "/currentspage", "artist": "Tame Impala" },
    { "title": "The Moment", "url": "/currentspage", "artist": "Tame Impala" },
    { "title": "Yes I'm Changing", "url": "/currentspage", "artist": "Tame Impala" },
    { "title": "Eventually", "url": "/currentspage", "artist": "Tame Impala" },
    { "title": "Gossip", "url": "/currentspage", "artist": "Tame Impala" },
    { "title": "The Less I Know the Better", "url": "/currentspage", "artist": "Tame Impala" },
    { "title": "Past Life", "url": "/currentspage", "artist": "Tame Impala" },
    { "title": "Disciples", "url": "/currentspage", "artist": "Tame Impala" },
    { "title": "'Cause I'm a Man", "url": "/currentspage", "artist": "Tame Impala" },
    { "title": "Reality in Motion", "url": "/currentspage", "artist": "Tame Impala" },
    { "title": "Love/Paranoia", "url": "/currentspage", "artist": "Tame Impala" },
    { "title": "New Person, Same Old Mistakes", "url": "/currentspage", "artist": "Tame Impala" }
]








if __name__ == "__main__":
    app.run()
