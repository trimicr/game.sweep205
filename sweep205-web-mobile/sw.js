//название кэша
const CACHE = "com.trimicr.sweeper205.20261109213754";
//префикс названия кэша
const CACHE_PREFIX = "com.trimicr.sweeper205.";
//список файлов pwa для кэширования
const FILES = [
	"./",
	"./index.html",
	"./manifest.json",
	"./game.js",
	"./game.wasm",
	"./game.data",
	"./icon/icon-180.png",
	"./icon/icon-192.png",
	"./icon/icon-512.png",
	"./icon/icon-512-maskable.png",
	"./icon/favicon.png",
	"./icon/favicon-32.png"
	, "./game_celestials.js", "./game_celestials.data", "./game_images.js", "./game_images.data", "./game_music.js", "./game_music.data", "./game_ships.js", "./game_ships.data", "./game_snd.js", "./game_snd.data", "./game_models.js", "./game_models.data"
];


//ответчик установки
self.addEventListener("install", event => {
	event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});


//ответчик активации
self.addEventListener('activate', (event) => {
	event.waitUntil((async () => {
		const cacheNames = await caches.keys();

		await Promise.all(
			cacheNames
			.filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE)
			.map((name) => caches.delete(name))
		);
	})());
});


//ответчик запросов
self.addEventListener("fetch", event => {
	if (event.request.method !== "GET") return;

	event.respondWith(
		caches.match(event.request).then(cached => cached || fetch(event.request))
	);
});
