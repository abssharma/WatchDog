from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy

import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import RMSprop

import numpy as np
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
import matplotlib.pyplot as plt
import cv2
from PIL import Image

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///reports.db'
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['TEST_FOLDER'] = 'data/test'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app) 

train = ImageDataGenerator(rescale = 1/255)
validate = ImageDataGenerator(rescale = 1/255)

train_dataset = train.flow_from_directory('data/train', target_size = (200, 200), batch_size = 3, class_mode = 'binary')
validate_dataset = validate.flow_from_directory('data/train', target_size = (200, 200), batch_size = 3, class_mode = 'binary')

model = tf.keras.models.Sequential([tf.keras.layers.Conv2D(16, (3, 3), activation = 'relu', input_shape = (200, 200, 3)), tf.keras.layers.MaxPool2D(2, 2),
                                    tf.keras.layers.Conv2D(32, (3, 3), activation = 'relu'), tf.keras.layers.MaxPool2D(2, 2),
                                    tf.keras.layers.Conv2D(64, (3, 3), activation = 'relu'), tf.keras.layers.MaxPool2D(2, 2),
                                    tf.keras.layers.Flatten(),
                                    tf.keras.layers.Dense(512, activation = 'relu'),
                                    tf.keras.layers.Dense(1, activation = 'sigmoid')
                                    ])

model.compile(loss = 'binary_crossentropy', optimizer = RMSprop(learning_rate = 0.001), metrics = ['accuracy'])

model_fit = model.fit(train_dataset, steps_per_epoch = 3, epochs = 30, validation_data = validate_dataset)

def resize_image(img_path, target_size=(200, 200)):
    with Image.open(img_path) as img:
        img = img.resize(target_size, Image.Resampling.LANCZOS)
        img.save(img_path)

def classify_image(img_path):
    img = image.load_img(img_path, target_size=(200, 200))
    X = image.img_to_array(img)
    X = np.expand_dims(X, axis=0)
    images = np.vstack([X])
    prediction = model.predict(images)
    class_index = np.argmax(prediction, axis=1)
    
    
    val = model.predict(images)
    return 'Yes! This picture contain animal abuse' if val < 0.5 else 'No! This is a happy picture'

def label(lab):
    if lab:
        print("Yes! This picture contains cruelty towards dogs") 
    else:
        print("No! This is a normal picture")            
         

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    evidence = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f'<Report {self.id}>'   

@app.route('/report', methods=['POST'])
def submit_report():
    if 'evidence' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    evidence = request.files['evidence']
    if evidence.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(evidence.filename)
    evidence.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    report = Report(
        name=request.form['name'],
        email=request.form['email'],
        location=request.form['location'],
        description=request.form['description'],
        evidence=filename
    )
    db.session.add(report)
    db.session.commit()

    return jsonify({'message': 'Report submitted successfully'})



@app.route('/test-img', methods=['GET'])
def get_test_images():
    files = os.listdir(app.config['TEST_FOLDER'])
    results = []

    for file in files:
        img_path = os.path.join(app.config['TEST_FOLDER'], file)
        print(f"Processing file: {img_path}")

        try:
            resize_image(img_path) 
            label = classify_image(img_path)
            print(f"Classified as: {label}")  

            

            results.append({'filename': file, 'label': label})
        except Exception as e:
            print(f"Error processing {file}: {e}")


    return jsonify(results)

@app.route('/test-img/<filename>')
def get_test_image(filename):
    return send_from_directory(app.config['TEST_FOLDER'], filename)



if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    
    with app.app_context():
        db.create_all()
        print("Database and tables created")
    
    app.run(debug=True, port=4000)
