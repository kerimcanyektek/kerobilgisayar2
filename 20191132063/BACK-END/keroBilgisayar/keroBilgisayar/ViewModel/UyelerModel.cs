using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace keroBilgisayar.ViewModel
{
    public class UyelerModel
    {
        public int uyelerId { get; set; }
        public string uyeAdi { get; set; }
        public string uyeSoyadi { get; set; }
        public string uyeSifre { get; set; }
        public string uyeTelefon { get; set; }
        public string uyeEposta { get; set; }
        public string uyeKullaniciAdi { get; set; }
        public int uyeYetki { get; set; }
    }
}