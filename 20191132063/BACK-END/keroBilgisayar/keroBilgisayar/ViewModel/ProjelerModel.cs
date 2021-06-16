using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace keroBilgisayar.ViewModel
{
    public class ProjelerModel
    {
        public int projeId { get; set; }
        public string projeAdi { get; set; }
        public int projeKatId { get; set; }
        public decimal projeFiyat { get; set; }
        public string projeAciklama { get; set; }
        public string projeGorsel { get; set; }
    }
}