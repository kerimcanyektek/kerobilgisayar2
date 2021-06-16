using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace keroBilgisayar.ViewModel
{
    public class SiparisModel
    {
        public int projeSiparisId { get; set; }
        public int siparisUyeId { get; set; }
        public string siparisTarihi { get; set; }
        public string siparisUyeAdi { get; set; }
        public string siparisUyeSoyadi { get; set; }
        public string siparisUyeTelefon { get; set; }
        public string siparisUyeEposta { get; set; }
        public string projelerProjeAdi { get; set; }
        public decimal projelerProjeFiyat { get; set; }
        public string projelerProjeAciklama { get; set; }
        public string projelerSiparisKategori { get; set; }










        public int siparisKodu { get; set; }
        public int siparisProjeId { get; set; }
    }
}