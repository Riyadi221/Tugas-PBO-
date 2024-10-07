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

    //penumpang
    class KapalPenumpang extends Kapal {
        constructor(nama, jenis, panjang, lebar, kapasitasPenumpang) {
            super(nama, jenis, panjang, lebar);
            this.kapasitasPenumpang = kapasitasPenumpang;
        }
        infoKapal() {
            return `${super.infoKapal()} Kapal ini memiliki kapasitas ${this.kapasitasPenumpang} orang`
        }
    }

    //kargo
    class KapalKargo extends Kapal {
        constructor(nama, jenis, panjang, lebar, beratMaksimal) {
            super(nama, jenis, panjang, lebar);
            this.beratMaksimal = beratMaksimal;
        }
        infoKapal() {
            return `${super.infoKapal()} Kapal ini memiliki kapasitas berat angkut barang ${this.beratMaksimal} kg`
        }
        tambahBeratMaksimal(berat) {
            this.beratMaksimal += berat;
        }
        kurangBeratMaksimal(berat) {
            this.beratMaksimal -= berat;
        }
        kirim(){
            console.log('Pengiriman kapal '+this.nama+' :\n+Pengiriman Berhasil');
        }
    }

    class KapalEkspedisi extends KapalKargo {
        constructor(nama, jenis, panjang, lebar, beratMaksimal) {
            super(nama, jenis, panjang, lebar, beratMaksimal);
        }
        randomHari(max) {
            return Math.floor(Math.random() * max + 1);
        }
        kirim(){
            let temp='Pengiriman kapal '+this.nama+' :\n';
            let totalTelatHari = 0;
            if (Math.random() >= 0.5) {
                let telat = this.randomHari(5); 
                totalTelatHari+=telat;
                temp+='Terjadi cuaca buruk, telat '+telat+' hari\n';
            }
            if (Math.random() >= 0.7) {
                let telat = this.randomHari(10); 
                totalTelatHari+=telat;
                temp+='Terjadi kerusakan kapal, telat '+telat+' hari\n';
            }
            temp+='Pengiriman Berhasil\n';
            if(totalTelatHari>0){
                temp+='Dikarenakan telat '+totalTelatHari+' hari, dikenakan denda sebesar Rp.'+(totalTelatHari*1000000)+'\n';
            }else{
                temp+='Tidak ada masalah saat pengiriman\n';
            }
            console.log(temp);
        }
    }

    class KapalTongkang extends KapalKargo {
        constructor(nama, jenis, panjang, lebar, beratMaksimal, jumlahBerat) {
            super(nama, jenis, panjang, lebar, beratMaksimal);
            this.jumlahBerat = jumlahBerat;
        }
        randomBerat(max) {
            return Math.floor(Math.random() * max + 1);
        }
        kirim(){
            let temp='Pengiriman kapal '+this.nama+' dengan total berat bawaan '+this.jumlahBerat+' kg :\n';
            let totalKehilangan = 0;
            if (Math.random() >= 0.6) {
                let kehilangan = this.randomBerat(this.jumlahBerat/3); 
                totalKehilangan+=kehilangan;
                temp+='Terjadi kebakaran bahan angkutan, kehilangan '+kehilangan+' kg\n';
            }
            if (Math.random() >= 0.75) {
                let kehilangan = this.randomBerat((this.jumlahBerat-totalKehilangan)/2); 
                totalKehilangan+=kehilangan;
                temp+='Terjadi pencurian, kehilangan '+kehilangan+' kg\n';
            }
            temp+='Pengiriman Berhasil\n';
            if(totalKehilangan>0){
                temp+='Dikarenakan kehilangan barang angkutan '+totalKehilangan+' kg, dikenakan denda sebesar Rp.'+(totalKehilangan*1000)+'\n';
            }else{
                temp+='Tidak ada masalah saat pengiriman\n';
            }
            temp+='Total berat yang terkirim : '+(this.jumlahBerat-totalKehilangan)+' kg'
            console.log(temp);
        }
    }

    //nelayan
    class KapalNelayan extends Kapal {
        constructor(nama, jenis, panjang, lebar, jenisIkan) {
            super(nama, jenis, panjang, lebar);
            this.jenisIkan = jenisIkan;
            this.maxTangkapan = 100;
        }
        infoKapal() {
            return `${super.infoKapal()} Kapal ini memiliki tangkapan yaitu : ${this.jenisIkan.join(', ')}`
        }
        tambahJenisIkan(ikan) {
            this.jenisIkan.push(ikan);
        }
        hapusJenisIkan(ikan) {
            const index = this.jenisIkan.indexOf(ikan);
            if (index !== -1) {
                this.jenisIkan.splice(index, 1);
            }
        }
        randomBuruan() {
            return Math.floor(Math.random() * this.maxTangkapan + 1);
        }
        berburu() {
            let temp = 'Hasil buruan kapal ' + this.nama + ' :\n';
            this.jenisIkan.forEach((jk) => {
                temp += jk + ' : ' + this.randomBuruan() + '\n';
            });
            console.log(temp);
        }
    }

    class KapalJaring extends KapalNelayan {
        constructor(nama, jenis, panjang, lebar, jenisIkan, besarJaring) {
            super(nama, jenis, panjang, lebar, jenisIkan);
            this.maxTangkapan = besarJaring * 10;
            this.besarJaring = besarJaring;
        }
        berburu() {
            let temp = 'Hasil buruan kapal jaring ' + this.nama + ' dengan besar jaring ' + this.besarJaring + ' m2 :\n';
            this.jenisIkan.forEach((jk) => {
                let tertangkap = this.randomBuruan();
                temp += jk + ' : ' + tertangkap + '\n';
                if (Math.random() >= 0.7) {
                    let ikanKabur = Math.floor(Math.random() * tertangkap + 1);
                    temp += 'Jaring jebol. Ikan ' + jk + ' berhasil kabur sebanyak ' + ikanKabur + '\n';
                    temp += 'Sisa ikan ' + jk + ' sebanyak ' + (tertangkap - ikanKabur) + '\n';
                }
            });
            console.log(temp);
        }
    }

    class KapalPancing extends KapalNelayan {
        constructor(nama, jenis, panjang, lebar, jenisIkan, banyakPemancing) {
            super(nama, jenis, panjang, lebar, jenisIkan);
            this.maxTangkapan = banyakPemancing * 20;
            this.banyakPemancing = banyakPemancing;
        }
        berburu() {
            let temp = 'Hasil buruan kapal pancing ' + this.nama + ' dengan ' + this.banyakPemancing + ' pemancing :\n';
            this.jenisIkan.forEach((jk) => {
                let tertangkap = this.randomBuruan();
                temp += jk + ' : ' + tertangkap + '\n';
                let ikanRaksasa = 0;
                for (let i = 0; i < tertangkap; i++) {
                    if (Math.random() >= 0.85) {
                        ikanRaksasa += 1;
                    }
                }
                temp += 'Terdapat ' + ikanRaksasa + ' ikan ' + jk + ' berukuran raksasa\n';
            });
            console.log(temp);
        }
    }

    class KapalPemburuMonster extends KapalNelayan {
        constructor(nama, jenis, panjang, lebar, jenisIkan, banyakPemburu) {
            super(nama, jenis, panjang, lebar, jenisIkan);
            this.maxTangkapan = banyakPemburu;
            this.banyakPemburu = banyakPemburu;
        }

        probabilitasBertemuMonster() {
            const min = 0;
            const max = 500;
            let probability = (this.banyakPemburu - min) / (max - min);
            probability = Math.max(0, Math.min(1, probability));
            let randomNumber = Math.random();
            return randomNumber <= probability;
        }

        berburu() {
            let temp = 'Hasil buruan kapal pemburu monster ' + this.nama + ' dengan ' + this.banyakPemburu + ' pemburu :\n';
            this.jenisIkan.forEach((jk) => {
                temp += (this.probabilitasBertemuMonster() ? 'Berhasil' : 'Gagal') + ' menangkap ikan ' + jk + ' monster\n';
            });
            console.log(temp);
        }
    }

    console.log('Kapal Penumpang : ');
    const kapalFerry = new KapalPenumpang('Budiono Siregar', 'Ferry', 200, 100, 600);
    console.log(kapalFerry.infoKapal());

    console.log('\n\n');

    let listKapalKargo = [];

    console.log('Kapal Kargo : ');
    const kapalKargo = new KapalKargo('Kargo Super', 'Kargo Apa Saja', 600, 250, 100000);
    console.log(kapalKargo.infoKapal());

    let beratTambah = 2000;
    console.log('Tambah berat kapal sebesar ' + beratTambah);
    kapalKargo.tambahBeratMaksimal(beratTambah);
    console.log(kapalKargo.infoKapal());

    let beratKurang = 2000;
    console.log('Kurang berat kapal sebesar ' + beratKurang);
    kapalKargo.kurangBeratMaksimal(beratKurang);
    console.log(kapalKargo.infoKapal());

    listKapalKargo.push(kapalKargo);

    console.log('\n\n');

    console.log('Kapal Ekspedisi : ');
    const kapalEkspedisi = new KapalEkspedisi('JNE', 'Kargo Barang', 700, 350, 125000);
    console.log(kapalEkspedisi.infoKapal());
    listKapalKargo.push(kapalEkspedisi);

    console.log('\n\n');

    console.log('Kapal Tongkang : ');
    const kapalTongkang = new KapalTongkang('Bukit Asam', 'Tongkang Batu Bara', 800, 400, 140000, 130000);
    console.log(kapalTongkang.infoKapal());
    listKapalKargo.push(kapalTongkang);

    console.log('\n\n');

    console.log('Pengiriman kapal kargo :\n');
    listKapalKargo.forEach((kn) => {
        kn.kirim();
    })

    console.log('\n\n');

    let listKapalNelayan = [];

    console.log('Kapal Nelayan : ');
    const kapalNelayan = new KapalNelayan('Kumpulan Nelayan', 'Kapal Nelayan Biasa', 100, 50, ['Tuna', 'Kakap', 'Hiu', 'Makarel']);
    console.log(kapalNelayan.infoKapal());

    let ikanTambah = 'Dori';
    console.log('Menambah ikan ' + ikanTambah);
    kapalNelayan.tambahJenisIkan(ikanTambah);
    console.log(kapalNelayan.infoKapal());

    let ikanHapus = 'Hiu';
    console.log('Menghapus ikan ' + ikanHapus);
    kapalNelayan.hapusJenisIkan(ikanHapus);
    console.log(kapalNelayan.infoKapal());

    listKapalNelayan.push(kapalNelayan);

    console.log('\n\n');

    console.log('Kapal Nelayan Jaring : ');
    const kapalJaring = new KapalJaring('SiPenjaring', 'Kapal Pukat Cincin', 150, 75, ['Tuna', 'Tongkol', 'Sarden'], 50);
    console.log(kapalJaring.infoKapal());
    listKapalNelayan.push(kapalJaring);

    console.log('\n\n');

    console.log('Kapal Nelayan Pemancing : ');
    const kapalPancing = new KapalPancing('Mancing Mania', 'Kapal Layar', 200, 100, ['Marlin', 'Cakalang', 'Layar'], 20);
    console.log(kapalPancing.infoKapal());
    listKapalNelayan.push(kapalPancing);

    console.log('\n\n');

    console.log('Kapal Nelayan Pemburu Monster : ');
    const kapalPemburuMonster = new KapalPemburuMonster('Monster Hunter', 'Kapal Perang', 550, 375, ['Hiu', 'Paus', 'Pari', 'Lumba-lumba'], 300);
    console.log(kapalPemburuMonster.infoKapal());
    listKapalNelayan.push(kapalPemburuMonster);

    console.log('\n\n');

    console.log('Perburuan nelayan :\n');
    listKapalNelayan.forEach((kn) => {
        kn.berburu();
    })