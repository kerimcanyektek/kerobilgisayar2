using keroBilgisayar.Models;
using keroBilgisayar.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace keroBilgisayar.Auth
{
    public class UyeService
    {
        keroBilgisayarEntities db = new keroBilgisayarEntities();
        public UyelerModel UyeOturumAc(string kadi, string parola)
        {
            UyelerModel uye = db.uyeler.Where(s => s.uyeKullaniciAdi == kadi && s.uyeSifre == parola).Select(x => new UyelerModel()
            {
                uyelerId = x.uyelerId,
                uyeAdi = x.uyeAdi,
                uyeSoyadi = x.uyeSoyadi,
                uyeKullaniciAdi = x.uyeKullaniciAdi,
                uyeSifre = x.uyeSifre,
                uyeTelefon = x.uyeTelefon,
                uyeEposta = x.uyeEposta,
                uyeYetki = x.uyeYetki,

            }).SingleOrDefault();

            return uye;
        }

    }
}