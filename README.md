# Create Image

```
docker build -t phexum/mongodb_cloner:latest .
```

# Push Image

```
docker login
docker push phexum/mongodb_cloner:latest
```
 


# Run Container 

```
docker run -p 9090:8080 -e DB_CONNECTION=mongodb://host.docker.internal:27017/cloner -e PAGINATION_LIMIT=1000 -d --name cloner  phexum/mongodb_cloner:latest
```

then go to -> http://localhost:9090