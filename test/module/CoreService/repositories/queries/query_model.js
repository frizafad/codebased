'use strict';

const NB18 = () => {
  const model = {
    idProduct: '',
    name: ''
  };

  return model;
};

const NB32 = () => {
  const model = {
    totalStok: '',
    totalKonsumsi: '',
    tanggal: '',
    namaStok: 'Stock Beras Impor Nasional',
    namaKonsumsi: 'Konsumsi Beras Impor Nasional',
    jenisBeras: ''
  };

  return model;
};
const NB33 = () => {
  const model = {
    name: '',
    stock: '',
    jumlahStock: '',
    jumlahKonsumsi: '',
    stockType: '',
    tanggal: String
  };

  return model;
};

const modelPenjualan = () => {
  const model = {
    name: '',
    paket: '',
    value: ''
  };
  return model;
};

const modelDtl = () => {
  const model = {
    tanggal: '',
    jam: '',
    idRetailer: '',
    idWarehouse: '',
    retailername: '',
    bumnname: '',
    warehousename: '',
    address: '',
    phone: '',
    stock: '',
    consumption: '',
    lat: '',
    lng: '',
    province: '',
    city: '',
    district: '',
    village: '',
    postalCode: ''
  };
  return model;
};

const modelDetail = () => {
  const model = {
    name: '',
    createdDate: '',
    paket: '',
    tanggalBuat: ''
  };
  return model;
};

const modelAddStock = () => {
  const model = {
    idProduct: '',
    value: '',
    name: '',
    stock: ''
  };
  return model;
};
const rankingStore = () => {
  const model = {
    rank: 0,
    idRetailer: '',
    name: '',
    picName: '',
    address: '',
    stock: '',
    value: '',
    total: 0,
    idProduct: '',
    productName: ''
  };
  return model;
};

const rankingArea = () => {
  const model = {
    rank: 0,
    province: '',
    city: '',
    district: '',
    stock: 0,
    idProduct: '',
    productName: ''
  };
  return model;
};

const modelDaerah = () => {
  const model = {
    kecamatan: '',
    tanggal: '',
    jam: '',
    jumlahBUMN: '',
    jumlahGudang: '',
    jumlahRetailer: '',
    kodepos: '',
    totalTransaksi: '',
    totalDistribusi: '',
    diagram: ''
  };
  return model;
};

const modelPenambahanStok = () => {
  const model = {
    name: '',
    paket: '',
    value: ''
  };
  return model;
};

const modelDetailPenambahanStok = () => {
  const model = {
    name: '',
    createdDate: '',
    stock: '',
    date: ''
  };
  return model;
};

const modellaporanStok = () => {
  const model = {
    idRetailer: '',
    idProduct: '',
    namaStok: '',
    Stok: '',
    Konsumsi: '',
    totalstok: ''
  };
  return model;
};

const modelPM = () => {
  const model = {
    idProduct: '',
    name: '',
    jmlStock: '',
    jmlKonsumsi: '',
    totalstock: ''
  };
  return model;
};

const NB51bumn = () => {
  const model = {
    idBumn: '',
    name: ''
  };

  return model;
};

module.exports = {
  modelPenjualan: modelPenjualan,
  modelDetail: modelDetail,
  modelDtl: modelDtl,
  NB18: NB18,
  modelAddStock: modelAddStock,
  NB32: NB32,
  NB33: NB33,
  rankingStore: rankingStore,
  rankingArea: rankingArea,
  modelPenambahanStok: modelPenambahanStok,
  modelDetailPenambahanStok: modelDetailPenambahanStok,
  modelDaerah: modelDaerah,
  modellaporanStok: modellaporanStok,
  modelPM: modelPM,
  NB51bumn: NB51bumn
};
