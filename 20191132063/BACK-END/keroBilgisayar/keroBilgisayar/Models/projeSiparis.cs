//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace keroBilgisayar.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class projeSiparis
    {
        public int projeSiparisId { get; set; }
        public int siparisUyeId { get; set; }
        public string siparisTarihi { get; set; }
        public int siparisKodu { get; set; }
        public int siparisProjeId { get; set; }
    
        public virtual projeler projeler { get; set; }
        public virtual uyeler uyeler { get; set; }
    }
}
