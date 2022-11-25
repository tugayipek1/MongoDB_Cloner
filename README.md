[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
<br>

<p align="center">
  <h2 align="center">MongoDB Cloner App</h2>
  <p align="center">
    Frontend : <a href="https://github.com/tugayipek1/MongoDB_Cloner/tree/main/frontend">VUE</a>
    Backend : <a href="https://github.com/tugayipek1/MongoDB_Cloner/tree/main/app">NodeJS</a>
    <br />
    <br />
    <a href="https://github.com/tugayipek1/MongoDB_Cloner/issues">Report Bug</a>
    ·
    <a href="https://github.com/tugayipek1/MongoDB_Cloner/issues">Request Feature</a>
  </p>
</p>

<img width="1440" alt="Screenshot 2022-11-25 at 10 46 15" src="https://user-images.githubusercontent.com/87069084/203929089-01a71bd9-0274-4139-817b-7a42b60f4650.png">

<img width="1440" alt="Screenshot 2022-11-25 at 10 46 43" src="https://user-images.githubusercontent.com/87069084/203929202-cbdc72a7-fedf-4bac-aa39-e9b3aec46e2c.png">


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

# DockerHub Link
```
https://hub.docker.com/r/phexum/mongodb_cloner
```

## Acknowledgements

- Kenan Yasin Sarigül <a href="https://github.com/kenanyasinsarigul">Github</a>


## Author
Tugay İPEK- <a href="https://github.com/tugayipek1">Github</a>



[contributors-shield]: https://img.shields.io/github/contributors/tugayipek1/MongoDB_Cloner.svg?style=for-the-badge
[contributors-url]: https://github.com/tugayipek1/MongoDB_Cloner/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tugayipek1/MongoDB_Cloner.svg?style=for-the-badge
[forks-url]: https://github.com/tugayipek1/MongoDB_Cloner/network/members
[stars-shield]: https://img.shields.io/github/stars/tugayipek1/MongoDB_Cloner.svg?style=for-the-badge
[stars-url]: https://github.com/tugayipek1/MongoDB_Cloner/stargazers
[issues-shield]: https://img.shields.io/github/issues/tugayipek1/MongoDB_Cloner.svg?style=for-the-badge
[issues-url]: https://github.com/tugayipek1/MongoDB_Cloner/issues
[license-shield]: https://img.shields.io/github/license/tugayipek1/MongoDB_Cloner.svg?style=for-the-badge
[license-url]: https://github.com/tugayipek1/MongoDB_Cloner/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/tugayipek1
