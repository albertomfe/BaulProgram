;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_BaulProgram',
  urlsToCache = [
    './',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    './css/style.css',
    './css/animate.css',
    './css/animate.min.css',
    './css/font-awesome.min.css',
    './css/materialize.min.css',
    './css/materialize.css',
    './css/style.css',
    './js/fontawesome.min.min.js',
    './js/jquery.js',
    './js/jquery.min.js',
    './js/main.js',
    './js/materialize.js',
    './js/materialize.min.js',
    './js/wow.js',
    './js/wow.min.js',
    './img/favicon.png',
    './img/fondo.jpg',
    './img/fondo2.jpg',
    './img/logo.png',
    './img/logo2.png',
    './img/androidapp.jpg',
    './img/androidapp.png',
    './img/paquete1.jpg',
    './img/paquete2.jpg',
    './img/paquete3.jpg',
    './img/paquete4.jpg',
    './img/paquete5.jpg',
    './portafolio/blog.jpg',
    './portafolio/boutique.jpg',
    './portafolio/feedback.jpg',
    './portafolio/gih.jpg',
    './portafolio/globalizador.jpg',
    './portafolio/unigornio.jpg',
    './portafolio/uvaboutique.jpg',
    './portafolio/viajes_del_sol.jpg',
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})


//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
});


self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
});
