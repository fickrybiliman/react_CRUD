# restful-api

## Melakukan proses CRUD tanpa UI (views), form dilakukan melalui JSON dengan metode HTTP REQUEST menggunakan aplikasi INSOMNIA ATAU POSTMAN.

* Hapus Folder views.
* Tak perlu pake middleware dulu di routes, di comment dulu pada penggunaan middlewares.
* res.render & res.redirect diganti, hanya menggunakan JSON saja (res.json).
* Penggunaan res.render akan error, karena folder views sudah dihapus.
* router untuk menampilkan render form dihapus saja, karena tidak diperlukan