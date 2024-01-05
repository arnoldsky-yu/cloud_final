# cloud_final
This is my Practical cloud computing platform final,
docker build -t final-flask-app .
docker run -d -p 5000:5000 final-flask-app
docker build -t final-website .
docker run -d -p 80:80 final-website