# solar-systems
[![Netlify Status](https://api.netlify.com/api/v1/badges/d5ace6a1-d943-4c35-b42c-081852188091/deploy-status)](https://app.netlify.com/sites/jolly-dijkstra-81d911/deploys)

Randomly generated solar systems in Three.js

This is my first project with Three.js. I have learned the fundamentals of the library: Scene, Renderer, Camera, Geometry, Material, Mesh, Texture... I have also understood how to use OrbitControls and make a Skybox.

See the [live demo](https://solar.sabu.fr).

## Local development
```
npm install
npm start
```

## Making a Skybox
| C  | U  | B  | E  |
|----|----|----|----|
|    | pY |    |    |
| pX | nZ | nX | pZ |
|    | nY |    |    |

Three.js loads the textures in the following order: pX, nX, pY, nY, pZ, nZ.

pY and nY need to be rotated 180º.

## Credits
Sun texture from [Solar Systems Scope](https://www.solarsystemscope.com/textures/)

Galaxy skybox texture from the amazing [Space 3D](http://wwwtyro.github.io/space-3d) tool by [Rye Terrell](https://github.com/wwwtyro).
