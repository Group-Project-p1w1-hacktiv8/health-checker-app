API DOCUMENTATION HERE
**Sign Up**
----

* **URL**

  /users/sign-up

* **Method:**

  `POST`

* **Data Params**

  `{
    email: "test@mail.com",
    password: "12345"
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      id: 1,
      email: "test@mail.com
    }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

================================================================================================

**Sign In**
----

* **URL**

  /users/sign-in

* **Method:**

  `POST`

* **Data Params**

  `{
    email: "test@mail.com",
    password: "12345"
  }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtZW1iZXJAbWFpbC5jb20iLCJpYXQiOjE2MDM5NTcwODZ9.hVDGHv4Vbf7F08WVbRcTsyoB_v9sWOu7frwWS9QMIbI"
    }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`

================================================================================================

**Get News**
----
  Returns json data about a single todo.

* **URL**

  /news

* **Method:**

  `GET`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `"news": [
        {
            "id": "3a086b46-00f1-44dd-977e-3eadfa1946ab",
            "title": "Protokol 3M Terbukti Bisa Turunkan Kasus Aktif Covid-19",
            "description": "JawaPos.com – Kasus aktif Covid-19 di tanah air diklaim berangsur turun. Selain penerapan  3T oleh pemerintah yakni testing, tracing, dan treatment untuk melacak kasus baru, hal itu juga terjadi berkat kedisiplinan masyarakat melakukan protokol kesehatan 3M. Yaitu wajib memakai masker, menjaga jarak...",
            "url": "https://www.jawapos.com/kesehatan/23/10/2020/protokol-3m-terbukti-bisa-turunkan-kasus-aktif-covid-19/",
            "author": "Dinarsa Kurniawan",
            "image": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/10/WhatsApp-Image-2020-10-14-at-08.20.19-640x480.jpeg",
            "language": "msa",
            "category": [
                "health"
            ],
            "published": "2020-10-23 13:00:53 +0000"
        },
        {
            "id": "db6a922b-429d-4629-8ce8-aff8ace09021",
            "title": "Terlalu Lama BAB di Kloset Duduk, Hati-hati Kena Wasir",
            "description": "JawaPos.com – Penggunaan kloset duduk dianggap lebih modern karena hadir lebih canggih. Dengan hanya menekan tombol tertentu, kloset bisa menyiram atau menyemprotkan air. Tapi, tahukah Anda kalau kloset duduk ternyata bisa menyebabkan wasir atau hemoroid?\nDikatakan dokter spesialis bedah di Eka Hosp...",
            "url": "https://www.jawapos.com/kesehatan/23/10/2020/terlalu-lama-bab-di-kloset-duduk-hati-hati-kena-wasir/",
            "author": "Nurul Adriyana Salbiah",
            "image": "https://cdn-asset.jawapos.com/wp-content/uploads/2019/01/mengenal-teknologi-penghangat-ruangan-dari-kotoran-manusia-kok-bisa_m_1523943563_205059-640x446.jpeg",
            "language": "msa",
            "category": [
                "health"
            ],
            "published": "2020-10-23 07:42:34 +0000"
        },
        {
            "id": "1c44c50e-69d9-4f84-8a79-37d11c115f9a",
            "title": "Pakar IPB Minta Warga Waspadai Nyamuk Pembunuh Nomor Satu Dunia",
            "description": "JawaPos.com–Guru Besar pada Fakultas Kedokteran Hewan IPB University Upik Kesumawati Hadi mengatakan, masyarakat harus mewaspadai nyamuk. Sebab, merupakan pembunuh nomor satu di dunia.\n\"Nyamuk menyebabkan lebih banyak penderitaan kepada manusia jika dibandingkan organisme lain. Tidak hanya menyerang...",
            "url": "https://www.jawapos.com/kesehatan/23/10/2020/pakar-ipb-minta-warga-waspadai-nyamuk-pembunuh-nomor-satu-dunia/",
            "author": "Latu Ratri Mubyarsah",
            "image": "https://cdn-asset.jawapos.com/wp-content/uploads/2020/10/antarafoto-pembagian-kelambu-gratis-anti-malaria-201020-ith-3-1-640x457.jpg",
            "language": "msa",
            "category": [
                "health"
            ],
            "published": "2020-10-23 00:05:31 +0000"
        },`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "INTERNAL SERVER ERROR" }`