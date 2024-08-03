from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/spin')
def spin():
    numbers = list(range(1, 31))
    selected_number = random.choice(numbers)
    return jsonify({'number': selected_number})

if __name__ == '__main__':
    app.run(debug=True)
