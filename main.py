from flask import Flask, render_template, request, redirect, session,send_from_directory,abort
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



@app.route('/librarypage')
def library_page():
    return render_template('library.html')

@app.route('/artistspage')
def artists_page():
    return render_template('artists.html')
@app.route('/infopage')
def info_page():
    return render_template('info.html')
if __name__ == "__main__":
    app.run()
