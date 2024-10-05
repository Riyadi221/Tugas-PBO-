 class Kapal {
        constructor(nama, jenis, panjang, lebar) {
            this.nama = nama;
            this.jenis = jenis;
            this.panjang = panjang;
            this.lebar = lebar;
        }
        infoKapal() {
            return `Kapal ${this.nama} merupakan jenis ${this.jenis} yang berukuran ${this.panjang} m x ${this.lebar} m.`;
        }
    }
    class KapalPenumpang extends Kapal {
        constructor(nama, jenis, panjang, lebar, kapasitasPenumpang) {
            super(nama, jenis, panjang, lebar);
            this.kapasitasPenumpang = kapasitasPenumpang;
        }
        infoKapal() {
            return `${super.infoKapal()} Kapal ini memiliki kapasitas ${this.kapasitasPenumpang} orang`
        }
    } 
    class KapalKargo extends Kapal {
        constructor(nama, jenis, panjang, lebar, beratMaksimal) {
            super(nama, jenis, panjang, lebar);
            this.beratMaksimal = beratMaksimal;
        }
        infoKapal() {
            return `${super.infoKapal()} Kapal ini memiliki kapasitas berat angkut barang ${this.beratMaksimal} kg`
        }
    } 
    class KapalNelayan extends Kapal {
        constructor(nama, jenis, panjang, lebar, jenisIkan) {
            super(nama, jenis, panjang, lebar);
            this.jenisIkan = jenisIkan;
        }
        infoKapal() {
            return `${super.infoKapal()} Kapal ini memiliki tangkapan yaitu : ${this.jenisIkan.join(', ')}`
        }
    } 
    console.log("Kapal Penumpang : ");
    const kapalFerry = new KapalPenumpang("Budiono Siregar", "Ferry", 200, 100, 600); 
    console.log(kapalFerry.infoKapal());

    console.log("Kapal Kargo : ");
    const kapalKargo = new KapalKargo("JNE", "Kargo Barang", 600, 250, 100000); 
    console.log(kapalKargo.infoKapal());

    console.log("Kapal Nelayan : ");
    const kapalJaring = new KapalNelayan("Mancing Mania", "Kapal Jaring", 100, 50, ["Tuna","Kakap","Hiu","Makarel"]); 
    console.log(kapalJaring.infoKapal());