using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web.Http;
using keroBilgisayar.Models;
using keroBilgisayar.ViewModel;

namespace keroBilgisayar.Controllers
{
    public class ServisController : ApiController
    {
        keroBilgisayarEntities db = new keroBilgisayarEntities();
        SonucModel sonuc = new SonucModel();

        #region Kategori

        [HttpGet]
        [Route("api/kategoriliste")]
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.kategori.Select(x => new KategoriModel()
            {

                katId = x.katId,
                katAdi = x.katAdi,
                katProjeSay = x.projeler.Count()

            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/kategoribyid/{katId}")]
        public KategoriModel KategoriById(int katId)
        {
            KategoriModel kayit = db.kategori.Where(s => s.katId == katId).Select(x => new KategoriModel()
            {
                katId = x.katId,
                katAdi = x.katAdi,
                katProjeSay = x.projeler.Count()
            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.kategori.Count(s => s.katAdi == model.katAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Kayıtlıdır.";
                return sonuc;
            }

            kategori yeni = new kategori();
            yeni.katAdi = model.katAdi;
            db.kategori.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Başarıyla Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            kategori kayit = db.kategori.Where(s => s.katId == model.katId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Kategori Yok";
                return sonuc;
            }

            kayit.katAdi = model.katAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Başarıyla Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kategorisil/{katId}")]
        public SonucModel KategoriSil(int katId)
        {
            kategori kayit = db.kategori.Where(s => s.katId == katId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Kategori Yok";
                return sonuc;
            }

            if (db.projeler.Count(s => s.projeKatId == katId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bu Kategorinin İçerisinde Ürünler Var Kategori Silinemedi";
                return sonuc;
            }

            db.kategori.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }

        #endregion
        #region Projeler

        [HttpGet]
        [Route("api/projelerliste")]
        public List<ProjelerModel> ProjelerListe()
        {
            List<ProjelerModel> liste = db.projeler.Select(x => new ProjelerModel()
            {

                projeId = x.projeId,
                projeAdi = x.projeAdi,
                projeKatId = x.projeKatId,
                projeFiyat = x.projeFiyat,
                projeGorsel = x.projeGorsel,
                projeAciklama = x.projeAciklama,

            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/projelerbyid/{projeId}")]
        public ProjelerModel ProjelerById(int projeId)
        {
            ProjelerModel kayit = db.projeler.Where(s => s.projeId == projeId).Select(x => new ProjelerModel()
            {
                projeId = x.projeId,
                projeAdi = x.projeAdi,
                projeKatId = x.projeKatId,
                projeFiyat = x.projeFiyat,
                projeGorsel = x.projeGorsel,
                projeAciklama = x.projeAciklama,
            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/projelerekle")]
        public SonucModel ProjeEkle(ProjelerModel model)
        {
            if (db.projeler.Count(s => s.projeAdi == model.projeAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Proje Kayıtlıdır.";
                return sonuc;
            }

            projeler yeni = new projeler();
            yeni.projeAdi = model.projeAdi;
            yeni.projeKatId = model.projeKatId;
            yeni.projeFiyat = model.projeFiyat;
            yeni.projeAciklama = model.projeAciklama;
            yeni.projeGorsel = "stokfoto.jpg";

            db.projeler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Proje Başarıyla Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/projelerduzenle")]
        public SonucModel ProjelerDuzenle(ProjelerModel model)
        {
            projeler kayit = db.projeler.Where(s => s.projeId == model.projeId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Proje Yok";
                return sonuc;
            }


            kayit.projeAdi = model.projeAdi;
            kayit.projeKatId = model.projeKatId;
            kayit.projeFiyat = model.projeFiyat;
            kayit.projeAciklama = model.projeAciklama;
            kayit.projeGorsel = model.projeGorsel;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Proje Başarıyla Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/projelersil/{projeId}")]
        public SonucModel ProjelerSil(int projeId)
        {
            projeler kayit = db.projeler.Where(s => s.projeId == projeId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Proje Yok";
                return sonuc;
            }

         

            db.projeler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Proje Silindi";
            return sonuc;
        }

        #endregion

        [HttpPost]
        [Route("api/projelergorselguncelle")]
        public SonucModel GorselGuncelle(projelerGorselModel model)
        {
            projeler prj = db.projeler.Where(s => s.projeId == model.projeId).SingleOrDefault();
            if (prj == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Ürün Yok";
                return sonuc;
            }

            if (prj.projeGorsel != "proje1.png")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + prj.projeGorsel);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }

            string data = model.gorselData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string dosyaAdi = prj.projeId + model.gorselUzanti.Replace("image/", ".");

            using (var ms = new MemoryStream(imgbytes, 0, imgbytes.Length))
            {

                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosyaAdi));

            }

            prj.projeGorsel = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Görsel Güncellendi";


            return sonuc;
        }

        #region Uyeler

        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyelerModel> UyeListe()
        {
            List<UyelerModel> liste = db.uyeler.Select(x => new UyelerModel()
            {

                uyelerId = x.uyelerId,
                uyeAdi = x.uyeAdi,
                uyeSoyadi = x.uyeSoyadi,
                uyeKullaniciAdi = x.uyeKullaniciAdi,
                uyeSifre = x.uyeSifre,
                uyeTelefon = x.uyeTelefon,
                uyeEposta = x.uyeEposta,
                uyeYetki = x.uyeYetki,


            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyelerModel UyeById(int uyelerId)
        {
            UyelerModel kayit = db.uyeler.Where(s => s.uyelerId == uyelerId).Select(x => new UyelerModel()
            {
                uyelerId = x.uyelerId,
                uyeAdi = x.uyeAdi,
                uyeSoyadi = x.uyeSoyadi,
                uyeKullaniciAdi = x.uyeKullaniciAdi,
                uyeSifre = x.uyeSifre,
                uyeTelefon = x.uyeTelefon,
                uyeEposta = x.uyeEposta,
                uyeYetki = x.uyeYetki,
            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyelerModel model)
        {
            if (db.uyeler.Count(s => s.uyeKullaniciAdi == model.uyeKullaniciAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Üye Kayıtlıdır.";
                return sonuc;
            }

            uyeler yeni = new uyeler();

            yeni.uyeAdi = model.uyeAdi;
            yeni.uyeSoyadi = model.uyeSoyadi;
            yeni.uyeSifre = model.uyeSifre;
            yeni.uyeTelefon = model.uyeTelefon;
            yeni.uyeEposta = model.uyeEposta;
            yeni.uyeKullaniciAdi = model.uyeKullaniciAdi;
            yeni.uyeYetki = model.uyeYetki;

            db.uyeler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Başarıyla Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyelerModel model)
        {
            uyeler kayit = db.uyeler.Where(s => s.uyelerId == model.uyelerId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Üye Yok";
                return sonuc;
            }


            kayit.uyeAdi = model.uyeAdi;
            kayit.uyeSoyadi = model.uyeSoyadi;
            kayit.uyeSifre = model.uyeSifre;
            kayit.uyeTelefon = model.uyeTelefon;
            kayit.uyeEposta = model.uyeEposta;
            kayit.uyeKullaniciAdi = model.uyeKullaniciAdi;
            kayit.uyeYetki = model.uyeYetki;


            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Üye Başarıyla Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        public SonucModel UyeSil(int uyelerId)
        {
            uyeler kayit = db.uyeler.Where(s => s.uyelerId == uyelerId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Üye Yok";
                return sonuc;
            }




            db.uyeler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";
            return sonuc;
        }

        #endregion
        #region Siparis

        [HttpGet]
        [Route("api/siparisliste")]
        public List<SiparisModel> SiparisListe()
        {
            List<SiparisModel> liste = db.projeSiparis.Select(x => new SiparisModel()
            {

                projeSiparisId = x.projeSiparisId,
                siparisUyeId = x.siparisUyeId,
                siparisTarihi = x.siparisTarihi,
                siparisKodu = x.siparisKodu,
                siparisProjeId = x.siparisProjeId,

                siparisUyeAdi = x.uyeler.uyeAdi,
                siparisUyeSoyadi = x.uyeler.uyeSoyadi,
                siparisUyeTelefon = x.uyeler.uyeTelefon,
                siparisUyeEposta = x.uyeler.uyeEposta,

                projelerProjeAdi = x.projeler.projeAdi,
                projelerProjeFiyat = x.projeler.projeFiyat,
                projelerProjeAciklama = x.projeler.projeAciklama,

                projelerSiparisKategori = x.projeler.kategori.katAdi,



            }
            ).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/siparisbyid/{siparisId}")]
        public SiparisModel SiparisById(int siparisId)
        {
            SiparisModel kayit = db.projeSiparis.Where(s => s.projeSiparisId == siparisId).Select(x => new SiparisModel()
            {
                projeSiparisId = x.projeSiparisId,
                siparisUyeId = x.siparisUyeId,
                siparisTarihi = x.siparisTarihi,
                siparisKodu = x.siparisKodu,
                siparisProjeId = x.siparisProjeId,

                siparisUyeAdi = x.uyeler.uyeAdi,
                siparisUyeSoyadi = x.uyeler.uyeSoyadi,
                siparisUyeTelefon = x.uyeler.uyeTelefon,
                siparisUyeEposta = x.uyeler.uyeEposta,

                projelerProjeAdi = x.projeler.projeAdi,
                projelerProjeFiyat = x.projeler.projeFiyat,
                projelerProjeAciklama = x.projeler.projeAciklama,

                projelerSiparisKategori = x.projeler.kategori.katAdi,





            }).FirstOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/siparisekle")]
        public SonucModel SiparisEkle(SiparisModel model)
        {
            if (db.projeSiparis.Count(s => s.siparisKodu == model.siparisKodu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Sipariş Kayıtlıdır.";
                return sonuc;
            }

            projeSiparis yeni = new projeSiparis();

            yeni.siparisUyeId = model.siparisUyeId;
            yeni.siparisTarihi = model.siparisTarihi;
            yeni.siparisKodu = model.siparisKodu;
            yeni.siparisProjeId = model.siparisProjeId;


            db.projeSiparis.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Sipariş Başarıyla Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/siparisduzenle")]
        public SonucModel SiparisDuzenle(SiparisModel model)
        {
            projeSiparis kayit = db.projeSiparis.Where(s => s.projeSiparisId == model.projeSiparisId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Sipariş Yok";
                return sonuc;
            }


            kayit.projeSiparisId = model.projeSiparisId;
            kayit.siparisUyeId = model.siparisUyeId;
            kayit.siparisTarihi = model.siparisTarihi;
            kayit.siparisKodu = model.siparisKodu;
            kayit.siparisProjeId = model.siparisProjeId;



            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Sipariş Başarıyla Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/siparissil/{siparisId}")]
        public SonucModel SiparisSil(int siparisId)
        {
            projeSiparis kayit = db.projeSiparis.Where(s => s.projeSiparisId == siparisId).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Böyle Bir Sipariş Yok";
                return sonuc;
            }




            db.projeSiparis.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Sipariş Silindi";
            return sonuc;
        }

        #endregion



    }
}
