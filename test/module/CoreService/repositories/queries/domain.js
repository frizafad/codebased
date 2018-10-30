'use strict';

const wrapper = require('../../../../helpers/utils/wrapper');
const Postgre = require('../../../../helpers/databases/postgresql/db');
const model = require('./query_model');
const queries = require('./query');
const myDate = require('current-date');
const pagination = require('pagination');

class CoreService {
  async getJenisBeras (data) {
    let arrData = [];
    let query = `SELECT "idProduct", "name" FROM "Product_dev" order by "name" ASC;`;
    let result = await queries.Query(query);
    if (result.rowCount === 0) {
      return wrapper.error(false, 'Data not found', 404);
    }
    try {
      result.rows.map(async (item) => {
        let modelDb = await model.NB18();
        modelDb.idProduct = item.idProduct;
        modelDb.name = item.name;
        arrData.push(modelDb);
      });
    } catch (error) {
      return wrapper.error('failed', 'Cannot connect database', 404);
    }
    return wrapper.data(arrData, 'Get Jenis Beras', 200);
  }

  async getStokviaBarcode (data) {
    let arrData = [];
    let query = `select name from "Product_dev" where "idProduct"='${data.idProduct}';`;
    let result = await queries.Query(query);
    if (result.rowCount == 0) {
      return wrapper.error(false, 'Data not found', 404);
    }
    try {
      result.rows.map(async (item) => {
        let modelDb = await model.NB18();
        modelDb.name = item.name;
        arrData.push(modelDb);
      });
    } catch (error) {
      return wrapper.error('failed', 'Cannot connect database', 404);
    }
    return wrapper.data(arrData, 'Get Total Stock', 200);
  }

  async getStok () {
    let arrData = [];
    let query = `SELECT (SUM(ttl.totalStok) - SUM(ttl.totalKonsumsi)) as "totalStok", SUM(ttl.totalKonsumsi) AS "totalKonsumsi" 
                    FROM (
                        SELECT 0 as totalStok , SUM(a."value" * b."stock") as totalKonsumsi FROM "UserStock_dev" b,"Product_dev" a WHERE a."idProduct"=b."idProduct" AND "stockType"='out'
                        UNION ALL
                        SELECT SUM(a."value" * b."stock") as totalStok , 0 as totalKonsumsi FROM "UserStock_dev" b,"Product_dev" a WHERE a."idProduct"=b."idProduct" AND "stockType"='in'
                    ) as ttl;`;

    let hasil = await queries.Query(`SELECT e."idProduct" AS "idProd", e."name" AS "namaJenisBeras", round(SUM ( d.stock ) * e."value" / 1000,3) AS "jumlahKonsumsi"
                                        FROM
                                        "UserStock_dev" d, "Product_dev" e 
                                        WHERE
                                        d."idProduct" = e."idProduct" AND d."stockType" = 'out' 
                                        GROUP BY "idProd",e."name", e."value"
                                        order by e."name" asc;`);
    let result = await queries.Query(query);

    if (result.rowCount == 0) {
      return wrapper.error(false, 'Data not found', 404);
    }

    try {
      result.rows.map(async (item) => {
        let modelDb = await model.NB32();
        modelDb.totalStok = item.totalStok / 1000;
        modelDb.totalKonsumsi = item.totalKonsumsi / 1000;
        modelDb.tanggal = new Date().toISOString().slice(0, 10);
        modelDb.jenisBeras = hasil.rows;
        arrData.push(modelDb);
      });
    } catch (error) {
      return wrapper.error('failed', 'Cannot connect database', 404);
    }

    return wrapper.data(arrData, 'Get Total Stock', 200);
  }

  async getCompare (data) {
    let arrData = [];
    let endDate = data.tanggalAkhir;
    endDate = endDate.substring(8, 10);
    endDate = parseInt(endDate) + 1;
    data.tanggalAkhir = data.tanggalAkhir.substring(0, 8);
    data.tanggalAkhir += endDate;
    let query = '';

    if (data.tanggalAwal != '' && data.tanggalAkhir != '' && data.stokKonsumsi != '' && data.jenisBeras != '') {
      query = `SELECT
                        pr."name",
                        us."stockType",
                        round(SUM(us.stock * pr."value")/1000,3) AS stock,
                        TO_CHAR(us."createdDate", 'YYYY-MM-DD') tanggal
                    FROM
                        "UserStock_dev" us,
                        "Product_dev" pr 
                    WHERE
                        us."idProduct" = pr."idProduct"
                        AND us."idProduct" = '${data.jenisBeras}'
                        AND us."stockType" = '${data.stokKonsumsi}' 
                        AND us."createdDate" BETWEEN to_date('${data.tanggalAwal}' ,'yyyy-mm-dd')
                        AND to_date('${data.tanggalAkhir}' ,'yyyy-mm-dd')
                        GROUP BY
                        tanggal,
                        pr."name",
                        us."stockType"
                        ORDER BY 
                        tanggal ASC;`;
    } else if (data.tanggalAwal != '' && data.tanggalAkhir != '' && data.stokKonsumsi != '') {
      query = `SELECT
                        us."stockType",
                        round(SUM ( us.stock * pr."value" )/1000,3) AS stock,
                        TO_CHAR(us."createdDate", 'YYYY-MM-DD') tanggal
                    FROM
                        "UserStock_dev" us,
                        "Product_dev" pr 
                    WHERE
                        us."idProduct" = pr."idProduct" 
                        AND us."stockType" = '${data.stokKonsumsi}' 
                        AND us."createdDate" BETWEEN to_date('${data.tanggalAwal}' ,'yyyy-mm-dd')
                        AND to_date('${data.tanggalAkhir}' ,'yyyy-mm-dd')
                    GROUP BY
                        tanggal,
                        us."stockType" 
                        ORDER BY 
                        tanggal ASC;`;
    } else if (data.tanggalAwal != '' && data.tanggalAkhir != '' && data.jenisBeras != '') {
      query = `SELECT
                        h."name",
                        round(SUM ( h.stock  )/1000,3) AS jumlahStock,
                        round(SUM(h.konsumsi)/1000,3) AS jumlahKonsumsi, 
                        TO_CHAR(h.tanggal, 'YYYY-MM-DD') tanggal
                    FROM
                        (
                    SELECT pr."name",
                        us."stockType",
                        SUM(us.stock * pr."value") AS stock,
                        0 AS konsumsi,
                        us."createdDate" :: DATE AS tanggal 
                    FROM
                        "UserStock_dev" us,
                        "Product_dev" pr 
                    WHERE
                        us."idProduct" = pr."idProduct" 
                        AND us."idProduct" = '${data.jenisBeras}' AND
                        us."stockType" = 'in'
                        AND us."createdDate" BETWEEN to_date('${data.tanggalAwal}' ,'yyyy-mm-dd')
                        AND to_date('${data.tanggalAkhir}' ,'yyyy-mm-dd') GROUP BY tanggal,us."stockType",pr."name"
                    UNION 
                    SELECT pr."name",
                        us."stockType",
                        0 AS stock,
                        SUM(us.stock * pr."value") AS konsumsi,
                        us."createdDate" :: DATE AS tanggal 
                    FROM
                        "UserStock_dev" us,
                        "Product_dev" pr 
                    WHERE
                        us."idProduct" = pr."idProduct" 
                        AND us."idProduct" = '${data.jenisBeras}' AND
                        us."stockType" = 'out' 
                        AND us."createdDate" BETWEEN to_date('${data.tanggalAwal}' ,'yyyy-mm-dd')
                        AND to_date('${data.tanggalAkhir}' ,'yyyy-mm-dd') GROUP BY tanggal,us."stockType",pr."name"
                        ) AS h 
                    GROUP BY
                        h."name",
                        h.tanggal
                        ORDER BY 
                        tanggal ASC;`;
    } else if (data.tanggalAwal != '' && data.tanggalAkhir != '') {
      query = `SELECT
                        round(SUM ( h.stock )/1000,3) AS jumlahStock,
                        round(SUM(h.konsumsi)/1000,3) AS jumlahKonsumsi, 
                        TO_CHAR(h.tanggal, 'YYYY-MM-DD') tanggal
                    FROM
                        (
                    SELECT
                        pr."name",
                        us."stockType",
                        SUM(us.stock * pr."value") AS stock,
                        0 AS konsumsi,
                        us."createdDate" :: DATE AS tanggal 
                    FROM
                        "UserStock_dev" us,
                        "Product_dev" pr 
                    WHERE
                        us."idProduct" = pr."idProduct" AND
                        us."stockType" = 'in'
                        AND us."createdDate" BETWEEN to_date('${data.tanggalAwal}' ,'yyyy-mm-dd')
                        AND to_date('${data.tanggalAkhir}' ,'yyyy-mm-dd') GROUP BY tanggal,us."stockType",pr."name"
                    UNION 
                    SELECT
                        pr."name",
                        us."stockType",
                        0 AS stock,
                        SUM(us.stock * pr."value") AS konsumsi,
                        us."createdDate" :: DATE AS tanggal 
                    FROM
                        "UserStock_dev" us,
                        "Product_dev" pr 
                    WHERE
                        us."idProduct" = pr."idProduct" AND
                        us."stockType" = 'out' 
                        AND us."createdDate" BETWEEN to_date('${data.tanggalAwal}' ,'yyyy-mm-dd')
                        AND to_date('${data.tanggalAkhir}' ,'yyyy-mm-dd') GROUP BY tanggal,us."stockType",pr."name"
                        ) AS h 
                    GROUP BY
                        h.tanggal
                        ORDER BY 
                        tanggal ASC;`;
    } else if (data.stokKonsumsi != '' && data.jenisBeras != '') {
      query = `SELECT
                        pr."name",
                        us."stockType",
                        round(SUM(us.stock * pr."value")/1000,3) AS stock,
                        TO_CHAR(us."createdDate", 'YYYY-MM-DD') tanggal
                    FROM
                        "UserStock_dev" us,
                        "Product_dev" pr 
                    WHERE
                        us."idProduct" = pr."idProduct"
                        AND us."idProduct" = '${data.jenisBeras}' 
                        AND us."stockType" = '${data.stokKonsumsi}' 
                        AND us."createdDate"  BETWEEN NOW()::DATE - interval '6 day' AND NOW()::DATE  + interval '1 day'
                        GROUP BY
                        pr."name",
                        tanggal,
                        us."stockType"
                        ORDER BY 
                        tanggal ASC;`;
    } else if (data.stokKonsumsi != '') {
      query = `SELECT
                        us."stockType",
                        round(SUM(us.stock * pr."value")/1000,3) AS stock,
                        TO_CHAR(us."createdDate", 'YYYY-MM-DD') tanggal
                    FROM
                        "UserStock_dev" us,
                        "Product_dev" pr 
                    WHERE
                        us."idProduct" = pr."idProduct"
                        AND us."stockType" = '${data.stokKonsumsi}' 
                        AND us."createdDate"  BETWEEN NOW()::DATE - interval '6 day' AND NOW()::DATE  + interval '1 day'
                        GROUP BY
                        tanggal,
                        us."stockType"
                        ORDER BY 
                        tanggal ASC;`;
    } else if (data.jenisBeras != '') {
      query = `SELECT
                        h."name",
                        round(SUM ( h.stock )/1000,3) AS jumlahStock,
                        round(SUM(h.konsumsi)/1000,3) AS jumlahKonsumsi, 
                        TO_CHAR( h.tanggal, 'YYYY-MM-DD' ) tanggal 
                    FROM
                        (
                    SELECT
                        pr."name",
                        us."stockType",
                        SUM(us.stock * pr."value") AS stock,
                        0 AS konsumsi,
                        us."createdDate" :: DATE AS tanggal 
                    FROM
                        "UserStock_dev" us,
                        "Product_dev" pr 
                    WHERE
                        us."idProduct" = pr."idProduct" 
                        AND us."idProduct" = '${data.jenisBeras}' 
                        AND us."stockType" = 'in' 
                        AND us."createdDate"  BETWEEN NOW()::DATE - interval '6 day' AND NOW()::DATE  + interval '1 day'  GROUP BY tanggal,us."stockType",pr."name" 
                        UNION
                    SELECT
                        pr."name",
                        us."stockType",
                        0 AS stock,
                        SUM(us.stock * pr."value") AS konsumsi,
                        us."createdDate" :: DATE AS tanggal 
                    FROM
                        "UserStock_dev" us,
                        "Product_dev" pr 
                    WHERE
                        us."idProduct" = pr."idProduct" 
                        AND us."idProduct" = '${data.jenisBeras}' 
                        AND us."stockType" = 'out' 
                        AND us."createdDate"  BETWEEN NOW()::DATE - interval '6 day' AND NOW()::DATE  + interval '1 day' GROUP BY tanggal,us."stockType",pr."name"
                        ) AS h 
                    GROUP BY
                        h."name",
                        h.tanggal
                        ORDER BY 
                        tanggal ASC;`;
    } else {
      query = `SELECT
                        round(SUM ( h.stock )/1000,3) AS jumlahStock,
                        round(SUM(h.konsumsi)/1000,3) AS jumlahKonsumsi,  
                        TO_CHAR(h.tanggal, 'YYYY-MM-DD') tanggal
                    FROM
                        (
                    SELECT
                        pr."name",
                        us."stockType",
                        SUM(us.stock * pr."value") AS stock,
                        0 AS konsumsi,
                        us."createdDate" :: DATE AS tanggal 
                    FROM
                        "UserStock_dev" us,
                        "Product_dev" pr 
                    WHERE
                        us."idProduct" = pr."idProduct" AND
                        us."stockType" = 'in' AND
                        us."createdDate"  BETWEEN NOW()::DATE - interval '6 day' AND NOW()::DATE  + interval '1 day' GROUP BY tanggal,us."stockType",pr."name"
                    UNION 
                    SELECT
                        pr."name",
                        us."stockType",
                        0 AS stock,
                        SUM(us.stock * pr."value") AS konsumsi,
                        us."createdDate" :: DATE AS tanggal 
                    FROM
                        "UserStock_dev" us,
                        "Product_dev" pr 
                    WHERE
                        us."idProduct" = pr."idProduct" AND
                        us."stockType" = 'out' AND
                        us."createdDate"  BETWEEN NOW()::DATE - interval '6 day' AND NOW()::DATE  + interval '1 day' GROUP BY tanggal,us."stockType",pr."name"
                        ) AS h 
                    GROUP BY
                        h.tanggal
                        ORDER BY 
                        tanggal ASC;`;
    }
    let result = await queries.Query(query);

    if (result.rowCount == 0) {
      return wrapper.error(false, 'Data not found', 404);
    }
    try {
      result.rows.map(async (item) => {
        let modelDb = await model.NB33();
        modelDb.name = item.name;
        modelDb.stock = item.stock;
        modelDb.jumlahStock = item.jumlahstock;
        modelDb.jumlahKonsumsi = item.jumlahkonsumsi;
        modelDb.stockType = item.stockType;
        modelDb.tanggal = item.tanggal;
        arrData.push(modelDb);
      });
    } catch (error) {
      return wrapper.error(false, 'Cannot connect database', 404);
    }
    return wrapper.data(arrData, 'Add users stock', 200);
  }

  async getDataRetailer (data) {
    let arrData = [];
    let query = `select * from users_copy1 where postal_code = '${data.id}';`;
    let result = await queries.Query(query);
    if (result.rowCount == 0) {
      return wrapper.error(false, 'Data not found', 404);
    }
    result.rows.map(async (item) => {
      let modelDb = await model.modelExp();
      modelDb.idRetailer = item.idRetailer;
      modelDb.address = item.address;
      modelDb.city = item.city;
      modelDb.district = item.district;
      modelDb.image = item.image;
      modelDb.isActive = item.isActive;
      modelDb.lat = item.lat;
      modelDb.lng = item.lng;
      modelDb.name = item.name;
      modelDb.password = item.password;
      modelDb.phone = item.phone;
      modelDb.picName = item.picName;
      modelDb.postalCode = item.postalCode;
      modelDb.province = item.province;
      modelDb.username = item.username;
      modelDb.village = item.village;
      modelDb.himbara = item.himbara;
      modelDb.rdm = item.rdm;
      modelDb.status = item.status;
      modelDb.createdDate = item.createdDate;
      modelDb.createdBy = item.createdBy;
      modelDb.modifiedDate = item.modifiedDate;
      modelDb.modifiedBy = item.modifiedBy;
      modelDb.idBulog = item.idBulog;
      arrData.push(modelDb);
    });
    return wrapper.data(arrData, 'Success Get Data', 200);
  }

  async getDataRetailerByStore (data) {
    let arrData = [];
    let query = `SELECT ud."idRetailer" AS idretailer, ud."name", whd."name" AS picname, whd."address", SUM(us."stock" * pd."value") AS "total"
                     FROM "Warehouse_dev" whd, "UserWarehouses_dev" uwhd, "User_dev" ud, "Product_dev" pd, "UserStock_dev" us
                     WHERE whd."idWarehouse" = uwhd."idWarehouse" AND uwhd."idRetailer" = ud."idRetailer" AND ud."idRetailer" = us."idRetailer" AND us."idProduct" = pd."idProduct" `;

    if (data.productId != '') {
      query += ` AND pd."idProduct" ='${data.productId}' `;
    }

    if (data.stockType != '') {
      query += ` AND us."stockType" ='${data.stockType}' `;
      query += ' GROUP BY idretailer, ud."name", picname, whd."address", picname, us."stockType" ';
    } else query += ' GROUP BY idretailer, ud."name", picname, whd."address", picname';

    if (data.sort != '') {
      if (data.sort.toUpperCase() == 'ASC') {
        query += ` ORDER BY total ${data.sort}`;
      } else query += ` ORDER BY total desc `;
    } else query += ` ORDER BY total desc `;

    if (data.page == '') {
      data.page = 1;
    }

    if (data.limit == '') {
      data.limit = 10;
    }

    let resultdata = await Postgre.query(query);
    let length = resultdata.rowCount;

    // #region pagination & data rankingStore
    var paginator = new pagination.SearchPaginator({ prelink: '/', current: parseInt(data.page), rowsPerPage: parseInt(data.limit), totalResult: parseInt(length) });
    let config = paginator.getPaginationData();

    let configData = {
      startLimit: data.limit,
      offset: ((config.fromResult) - 1)
    };

    if (configData.offset <= 0) {
      configData.offset = 0;
    }

    query += ` LIMIT ${configData.startLimit} OFFSET ${configData.offset} `;
    let result = await Postgre.query(query);

    if (result.rowCount == 0) {
      return wrapper.error(false, 'Data not found', 404);
    }

    let rank = (data.limit * (data.page - 1)) + 1;

    result.rows.map(async (item) => {
      let modelDb = await model.rankingStore();
      modelDb.rank = rank;
      modelDb.idRetailer = item.idretailer;
      modelDb.name = item.name;
      modelDb.picName = item.picname;
      modelDb.address = item.address;
      modelDb.stock = item.stock;
      modelDb.value = item.value;
      modelDb.total = parseInt(item.total);
      modelDb.idProduct = item.idproduct;
      modelDb.productName = item.pdname;
      arrData.push(modelDb);
      rank++;
    });

    let paginationConfig = {
      prelink: '/',
      current: config.current,
      previous: config.previous,
      next: config.next,
      first: config.first,
      last: config.last,
      range: config.range,
      fromResult: config.fromResult,
      toResult: config.toResult,
      totalResult: config.totalResult,
      pageCount: config.pageCount
    };

    return wrapper.paginationData(arrData, paginationConfig, 'Get Rank retailer', 200);
  }

  async getDataPenjualan (data) {
    let arrData = [];
    if (data.startDate == undefined) {
      var start = new Date();
      var dd = start.getDate() - 7;
      var mm = start.getMonth() + 1;
      var yyyy = start.getFullYear();
      start = yyyy + '-' + mm + '-' + dd;
      data.startDate = start;
    }
    if (data.endDate == undefined) {
      var today = new Date();
      dd = today.getDate();
      mm = today.getMonth() + 1;
      yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;
      data.endDate = today;
    }

    let query2 = `SELECT SUM( ttl.paket * ttl."value" ) as "totalPenjualan" FROM ( SELECT SUM ( "UserStock_dev".stock ) AS paket, "Product_dev"."value" AS "value", "Product_dev"."name" FROM "UserStock_dev" JOIN "Product_dev" ON "Product_dev"."idProduct" = "UserStock_dev"."idProduct" 
        WHERE "UserStock_dev"."createdDate" BETWEEN '${data.startDate}' AND '${data.endDate}' and "idRetailer"='${data.id}' and "UserStock_dev"."stockType" = '${data.stockType}'
        GROUP BY "Product_dev"."idProduct") ttl;`;
    let result2 = await queries.Query(query2);

    let query = `SELECT tbl3."idRetailer", tbl3."idProduct", tbl3."name", SUM(tbl3."jmlStock") as "jmlStock" ,SUM(tbl3."jmlKonsumsi") as "paket"
        FROM ( 
                        SELECT  '${data.id}' as "idRetailer", tbl1."idProduct", tbl2."name", tbl1.stock  as "jmlStock", 0 as "jmlKonsumsi" 
                        FROM
                            "UserStock_dev" as tbl1 
                        RIGHT JOIN
                            "Product_dev" as tbl2
                        ON
                            (tbl1."idProduct" = tbl2."idProduct")
                        WHERE
                            tbl1."idRetailer"='${data.id}'
                            AND tbl1."stockType"='${data.stockType}'
                            AND tbl1."createdDate" BETWEEN '${data.startDate}' AND '${data.endDate}'
                            UNION ALL
                        SELECT  '${data.id}' as "idRetailer", tbl1."idProduct", tbl2."name", 0  as "jmlStock", tbl1.stock as "jmlKonsumsi" 
                        FROM
                            "UserStock_dev" as tbl1 
                        RIGHT JOIN
                            "Product_dev" as tbl2
                        ON
                            (tbl1."idProduct" = tbl2."idProduct")
                        WHERE
                            tbl1."idRetailer"='${data.id}'
                            AND tbl1."stockType"='${data.stockType}'
                            AND tbl1."createdDate" BETWEEN '${data.startDate}' AND '${data.endDate}'
                        
                        UNION ALL
                        SELECT '${data.id}' as "idRetailer", "idProduct","name", 0  as "jmlStock", 0 as "jmlKonsumsi"  FROM "Product_dev"
        
                ) tbl3
        GROUP BY
                tbl3."idRetailer", tbl3."idProduct", tbl3."name"`;

    let result = await queries.Query(query);

    arrData.push({
      totalPenjualan: result2.rows[0].totalPenjualan
    });

    if (result.rowCount == 0) {
      return wrapper.error('failed', 'Data not found', 404);
    }
    try {
      result.rows.map(async (item) => {
        let modelDb = await model.modelPenjualan();
        modelDb.name = item.name;
        modelDb.paket = item.paket;
        modelDb.value = item.value;
        modelDb.paket = item.paket;
        arrData.push(modelDb);
      });
    } catch (err) {
      return wrapper.error(false, 'Data not found', 404);
    }
    return wrapper.data(arrData, 'Success Get Data', 200);
  }

  async getDetailPenjualan (data) {
    let arrData = [];
    let query = `SELECT tbl1."tanggalBuat", tbl1."name", SUM(tbl1."paket") as "paket" FROM (
            SELECT
                "Product_dev"."name" as "name", 
                "UserStock_dev"."createdDate" :: TIMESTAMP :: DATE AS "tanggalBuat",
                SUM("UserStock_dev"."stock") AS "paket" 
            FROM
                "Product_dev"
                JOIN "UserStock_dev" ON "Product_dev"."idProduct" = "UserStock_dev"."idProduct" 
            WHERE
                "UserStock_dev"."createdDate" BETWEEN '${data.startDate}' AND '${data.endDate}'
                AND "idRetailer" = '${data.id}' 
                AND "UserStock_dev"."stockType" = '${data.stockType}' 
            GROUP BY "Product_dev"."name", "UserStock_dev"."createdDate"
            ) tbl1 GROUP BY tbl1."tanggalBuat", tbl1."name";`;

    let result = await queries.Query(query);
    if (result.rowCount == 0) {
      return wrapper.error('failed', 'Data not found', 404);
    }
    result.rows.map(async (item) => {
      let modelDb = await model.modelDetail();
      modelDb.createdDate = item.createdDate;
      modelDb.tanggalBuat = item.tanggalBuat;
      modelDb.name = item.name;
      modelDb.paket = item.paket;
      arrData.push(modelDb);
    });
    return wrapper.data(arrData, 'Success Get Data', 200);
  }

  async getDataRetailerByArea (data) {
    let arrData = [];
    let query = `SELECT whd.province, whd.city , whd.district, SUM(us.stock * pd.value) AS "total"
                FROM "Warehouse_dev" whd, "UserWarehouses_dev" uwhd, "User_dev" ud, "Product_dev" pd, "UserStock_dev" us
                WHERE whd."idWarehouse" = uwhd."idWarehouse" AND uwhd."idRetailer" = ud."idRetailer" AND ud."idRetailer" = us."idRetailer" AND us."idProduct" = pd."idProduct" `;

    if (data.productId !== '') {
      query += ` AND pd."idProduct" ='${data.productId}' `;
    }

    if (data.stockType !== '') {
      query += ` AND us."stockType" ='${data.stockType}' `;
      query += ' GROUP BY whd.province,whd.city, whd.district, us."stockType" ';
    } else query += ' GROUP BY whd.province,whd.city, whd.district';

    if (data.sort != '') {
      if (data.sort.toUpperCase() == 'ASC') {
        query += ` ORDER BY total ${data.sort}`;
      } else query += ` ORDER BY whd.province ASC  `;
    } else query += ` ORDER BY whd.province ASC`;

    if (data.page === '') {
      data.page = 1;
    }

    if (data.limit === '') {
      data.limit = 10;
    }
    let resultdata = await Postgre.query(query);
    let length = resultdata.rowCount;

    var paginator = new pagination.SearchPaginator({ prelink: '/', current: parseInt(data.page), rowsPerPage: parseInt(data.limit), totalResult: parseInt(length) });
    let config = paginator.getPaginationData();

    let configData = {
      startLimit: data.limit,
      offset: ((config.fromResult) - 1)
    };

    if (configData.offset <= 0) {
      configData.offset = 0;
    }

    query += ` LIMIT ${configData.startLimit} OFFSET ${configData.offset} `;
    let result = await Postgre.query(query);

    if (result.rowCount == 0) {
      return wrapper.error(false, 'Data not found', 404);
    }

    let rank = (data.limit * (data.page - 1)) + 1;

    result.rows.map(async (item) => {
      let modelDb = await model.rankingArea();
      modelDb.rank = rank;
      modelDb.province = item.province;
      modelDb.city = item.city;
      modelDb.district = item.district;
      modelDb.stock = parseInt(item.total) / 1000;
      modelDb.idProduct = item.idproduct;
      modelDb.productName = item.pdname;
      arrData.push(modelDb);
      rank++;
    });

    let paginationConfig = {
      prelink: '/',
      current: config.current,
      previous: config.previous,
      next: config.next,
      first: config.first,
      last: config.last,
      range: config.range,
      fromResult: config.fromResult,
      toResult: config.toResult,
      totalResult: config.totalResult,
      pageCount: config.pageCount
    };
    return wrapper.paginationData(arrData, paginationConfig, 'Get Total Stock', 200);
  }

  async getDataRetailerDetail (data) {
    let arrData = [];
    let querydiagram = `SELECT
                                tbl3."name",
                                SUM ( tbl3."jmlStock" ) AS "jmlStock",
                                SUM ( tbl3."jmlKonsumsi" ) AS "jmlKonsumsi" 
                            FROM
                                (
                            SELECT
                                '${data.id}' AS "idRetailer",
                                tbl1."idProduct",
                                tbl2."name",
                                tbl1.stock * tbl2."value" AS "jmlStock",
                                0 AS "jmlKonsumsi" 
                            FROM
                                "UserStock_dev" AS tbl1
                                RIGHT JOIN "Product_dev" AS tbl2 ON ( tbl1."idProduct" = tbl2."idProduct" ) 
                            WHERE
                                tbl1."stockType" = 'in' 
                                AND tbl1."idRetailer" = '${data.id}' UNION ALL
                            SELECT
                                '${data.id}' AS "idRetailer",
                                tbl1."idProduct",
                                tbl2."name",
                                0 AS "jmlStock",
                                tbl1.stock * tbl2."value" AS "jmlKonsumsi" 
                            FROM
                                "UserStock_dev" AS tbl1
                                RIGHT JOIN "Product_dev" AS tbl2 ON ( tbl1."idProduct" = tbl2."idProduct" ) 
                            WHERE
                                tbl1."stockType" = 'out' 
                                AND tbl1."idRetailer" = '${data.id}' UNION ALL
                            SELECT
                                '${data.id}' AS "idRetailer",
                                "idProduct",
                                "name",
                                0 AS "jmlStock",
                                0 AS "jmlKonsumsi" 
                            FROM
                                "Product_dev" 
                                ) tbl3 
                            GROUP BY
                                tbl3."name"`;
    let result = await queries.Query(querydiagram);

    let query = `SELECT
                        beras."idRetailer",
                        beras."idWarehouse",
                        beras.retailerName,
                        beras.bumnName,
                        beras.warehouseName,
                        beras.address,
                        beras.phone,
                        SUM ( beras.stockvalue ) AS "stockValue",
                        SUM ( beras.consValue ) AS "consValue",
                        beras.lat,
                        beras.lng,
                        beras.province,
                        beras.city,
                        beras.district,
                        beras.village,
                        beras."postalCode" 
                    FROM
                        (
                    SELECT
                        u."idRetailer",
                        w."idWarehouse",
                        u."name" AS retailerName,
                        mb."name" AS bumnName,
                        w."name" AS warehouseName,
                        u.address,
                        u.phone,
                        0 AS stockValue,
                        us.stock * pr."value" AS consValue,
                        u.lat,
                        u.lng,
                        u.province,
                        u.city,
                        u.district,
                        u.village,
                        u."postalCode" 
                    FROM
                        (((((
                        "User_dev" u
                        JOIN "UserWarehouses_dev" uw ON u."idRetailer" = uw."idRetailer" 
                        )
                        JOIN "Warehouse_dev" w ON uw."idWarehouse" = w."idWarehouse" 
                        )
                        JOIN "MasterBumn_dev" mb ON w."idBumn" = mb."idBumn" 
                        )
                        JOIN "UserStock_dev" us ON us."idRetailer" = u."idRetailer" 
                        )
                        JOIN "Product_dev" pr ON pr."idProduct" = us."idProduct" 
                        ) 
                    WHERE
                        u."idRetailer" = '${data.id}' 
                        AND us."stockType" = 'out' UNION ALL
                    SELECT
                        u."idRetailer",
                        w."idWarehouse",
                        u."name" AS retailerName,
                        mb."name" AS bumnName,
                        w."name" AS warehouseName,
                        u.address,
                        u.phone,
                        us.stock * pr."value" AS stockValue,
                        0 AS consValue,
                        u.lat,
                        u.lng,
                        u.province,
                        u.city,
                        u.district,
                        u.village,
                        u."postalCode" 
                    FROM
                        (((((
                        "User_dev" u
                        JOIN "UserWarehouses_dev" uw ON u."idRetailer" = uw."idRetailer" 
                        )
                        JOIN "Warehouse_dev" w ON uw."idWarehouse" = w."idWarehouse" 
                        )
                        JOIN "MasterBumn_dev" mb ON w."idBumn" = mb."idBumn" 
                        )
                        JOIN "UserStock_dev" us ON us."idRetailer" = u."idRetailer" 
                        )
                        JOIN "Product_dev" pr ON pr."idProduct" = us."idProduct" 
                        ) 
                    WHERE
                        u."idRetailer" = '${data.id}' 
                        AND us."stockType" = 'in' 
                        ) AS beras 
                    GROUP BY
                        beras."idRetailer",
                        beras."idWarehouse",
                        beras.retailerName,
                        beras.bumnName,
                        beras.warehouseName,
                        beras.address,
                        beras.phone,
                        beras.lat,
                        beras.lng,
                        beras.province,
                        beras.city,
                        beras.district,
                        beras.village,
                        beras."postalCode"`;

    let hasil = await queries.Query(query);
    if (hasil.rowCount == 0) {
      return wrapper.error(false, 'Data not found', 404);
    }

    hasil.rows.map(async (item) => {
      let modelDetail = await model.modelDtl();
      modelDetail.tanggal = new Date().toISOString().slice(0, 10);
      modelDetail.jam = new Date().getHours() + ':' + new Date().getMinutes();
      modelDetail.idRetailer = item.idRetailer;
      modelDetail.idWarehouse = item.idWarehouse;
      modelDetail.retailername = item.retailername;
      modelDetail.bumnname = item.bumnname;
      modelDetail.warehousename = item.warehousename;
      modelDetail.address = item.address;
      modelDetail.phone = item.phone;
      modelDetail.diagram = result.rows;
      modelDetail.stock = item.stockValue;
      modelDetail.consumption = item.consValue;
      modelDetail.lat = item.lat;
      modelDetail.lng = item.lng;
      modelDetail.province = item.province;
      modelDetail.city = item.city;
      modelDetail.district = item.district;
      modelDetail.village = item.village;
      modelDetail.postalCode = item.postalCode;
      arrData.push(modelDetail);
    });

    return wrapper.data(arrData, 'Success Get Data', 200);
  }

  async getTambahStok (data) {
    let arrData = [];
    let query = `SELECT
        tbl3."idRetailer",
        tbl3."idProduct",
        tbl3."value",
        tbl3."name",
        SUM ( tbl3."jmlStock" ) AS "jmlStock",
        SUM ( tbl3."jmlKonsumsi" ) AS "jmlKonsumsi",
        SUM ( tbl3."jmlStock" - tbl3."jmlKonsumsi" ) as "stock"
    FROM
        (
    SELECT
        '${data.id}' AS "idRetailer",
        tbl1."idProduct",
        tbl2."name",
        tbl2."value",
        tbl1.stock AS "jmlStock",
        0 AS "jmlKonsumsi"
    FROM
        "UserStock_dev" AS tbl1
        RIGHT JOIN "Product_dev" AS tbl2 ON ( tbl1."idProduct" = tbl2."idProduct" )
    WHERE
        tbl1."stockType" = 'in'
        AND tbl1."idRetailer" = '${data.id}' UNION ALL
    SELECT
        '${data.id}' AS "idRetailer",
        tbl1."idProduct",
        tbl2."name",
        tbl2."value",
        0 AS "jmlStock",
        tbl1.stock AS "jmlKonsumsi"
    FROM
        "UserStock_dev" AS tbl1
        RIGHT JOIN "Product_dev" AS tbl2 ON ( tbl1."idProduct" = tbl2."idProduct" )
    WHERE
        tbl1."stockType" = 'out'
        AND tbl1."idRetailer" = '${data.id}' UNION ALL
    SELECT
        '${data.id}' AS "idRetailer",
        "idProduct",
        "name", "value",
        0 AS "jmlStock",
        0 AS "jmlKonsumsi"
    FROM
        "Product_dev"
        ) tbl3
    GROUP BY
        tbl3."idRetailer",
        tbl3."idProduct",
        tbl3."value",
        tbl3."name"
    ORDER BY 
        tbl3."name";`;

    let result = await queries.Query(query);
    if (result.rowCount == 0) {
      return wrapper.error(false, 'Data not found', 404);
    } else {
      try {
        result.rows.map(async (item) => {
          let modelDb = await model.modelAddStock();
          modelDb.idProduct = item.idProduct;
          modelDb.value = item.value;
          modelDb.name = item.name;
          modelDb.stock = item.stock;
          arrData.push(modelDb);
        });
        return wrapper.data(arrData, 'Get Product List', 200);
      } catch (error) {
        return wrapper.error(false, 'Data not found', 404);
      }
    }
  }

  async getRetailerDaerah (data) {
    let arrData = [];
    let query = `SELECT "User_dev".district, (SELECT COUNT("Warehouse_dev"."idBumn") 
    FROM "Warehouse_dev" WHERE district = '${data.kecamatan}') AS "Jumlah_Bumn", 
    (SELECT COUNT("Warehouse_dev"."idWarehouse")
    FROM "Warehouse_dev" WHERE district = '${data.kecamatan}') AS "Jumlah_Gudang", 
    (SELECT COUNT("User_dev"."idRetailer") FROM "User_dev" WHERE district = '${data.kecamatan}') AS "Jumlah_Retailer", 
    COUNT(DISTINCT "User_dev"."postalCode") AS "Jumlah_Postalcode", 
    (SELECT COUNT("UserStock_dev"."stockType") 
    FROM "UserStock_dev" JOIN "User_dev" ON "UserStock_dev"."idRetailer" = "User_dev"."idRetailer" 
    WHERE "User_dev".district = '${data.kecamatan}' AND "UserStock_dev"."stockType" = 'out') 
    AS "Jumlah_Transaksi", (SELECT COUNT("UserStock_dev"."stockType") 
    FROM "UserStock_dev" JOIN "User_dev" ON "UserStock_dev"."idRetailer" = "User_dev"."idRetailer" 
    WHERE "User_dev".district = '${data.kecamatan}' AND "UserStock_dev"."stockType" = 'in') 
    AS "Total_Distribusi" FROM "User_dev" 
    JOIN "UserStock_dev" ON "User_dev"."idRetailer" = "UserStock_dev"."idRetailer" 
    JOIN "UserWarehouses_dev" ON "User_dev"."idRetailer" = "UserWarehouses_dev"."idRetailer" 
    JOIN "Warehouse_dev" ON "UserWarehouses_dev"."idWarehouse" = "Warehouse_dev"."idWarehouse" 
    WHERE "User_dev".district = '${data.kecamatan}' GROUP BY "User_dev".district;`;
    let result = await queries.Query(query);
    console.log(query);
    let queryBeras = `SELECT beras."name", SUM(beras.stok) AS "stok", 
        SUM(beras.konsumsi) AS "konsumsi" FROM
        (SELECT "Product_dev"."name", SUM("UserStock_dev".stock)*"Product_dev"."value" AS "stok", 
        0 AS "konsumsi" FROM "UserStock_dev" JOIN "User_dev" 
        ON "UserStock_dev"."idRetailer" = "User_dev"."idRetailer" 
        JOIN "Product_dev" ON "UserStock_dev"."idProduct" = "Product_dev"."idProduct" 
        WHERE "User_dev".district = '${data.kecamatan}' AND "UserStock_dev"."stockType" = 'in' 
        GROUP BY "Product_dev"."idProduct", "UserStock_dev"."stockType"
        UNION ALL
        SELECT "Product_dev"."name", 0 AS "stok", 
        SUM("UserStock_dev".stock)*"Product_dev"."value" AS "konsumsi" 
        FROM "UserStock_dev" JOIN "User_dev" 
        ON "UserStock_dev"."idRetailer" = "User_dev"."idRetailer" 
        JOIN "Product_dev" ON "UserStock_dev"."idProduct" = "Product_dev"."idProduct" 
        WHERE "User_dev".district = '${data.kecamatan}' AND "UserStock_dev"."stockType" = 'out' 
        GROUP BY "Product_dev"."idProduct", "UserStock_dev"."stockType"
        UNION ALL 
        SELECT "Product_dev"."name", 0 AS "stok", 0 AS "konsumsi" FROM "Product_dev") 
        AS beras GROUP BY beras."name" ORDER BY beras."name";`;
    let hasil = await queries.Query(queryBeras);
    if (result.rowCount == 0 || hasil.rowCount == 0) {
      return wrapper.error(false, 'Data not found', 404);
    } else {
      try {
        result.rows.map(async (item) => {
          let modelDb = await model.modelDaerah();
          modelDb.kecamatan = item.district;
          modelDb.tanggal = myDate('date', ':');
          modelDb.jam = myDate('time', ':');
          modelDb.jumlahBUMN = item.Jumlah_Bumn;
          modelDb.jumlahGudang = item.Jumlah_Gudang;
          modelDb.jumlahRetailer = item.Jumlah_Retailer;
          modelDb.kodepos = item.Jumlah_Postalcode;
          modelDb.totalTransaksi = item.Jumlah_Transaksi;
          modelDb.totalDistribusi = item.Total_Distribusi;
          modelDb.diagram = hasil.rows;
          arrData.push(modelDb);
        });
        return wrapper.data(arrData, 'Success Get Data', 200);
      } catch (error) {
        return wrapper.error(false, 'Cant Connect Database', 404);
      }
    }
  }

  async getDataPenambahanStok (data) {
    let arrData = [];
    if (data.startDate == undefined) {
      var start = new Date();
      var dd = start.getDate() - 7;
      var mm = start.getMonth() + 1;
      var yyyy = start.getFullYear();
      start = yyyy + '-' + mm + '-' + dd;
      data.startDate = start;
    }
    if (data.endDate == undefined) {
      var today = new Date();
      dd = today.getDate();
      mm = today.getMonth() + 1;
      yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;
      data.endDate = today;
    }

    let query2 = `SELECT SUM( ttl.paket * ttl."value" ) as "totalStok" FROM ( SELECT SUM ( "UserStock_dev".stock ) AS paket, "Product_dev"."value" AS "value",
        "Product_dev"."name" FROM "UserStock_dev" JOIN "Product_dev" ON "Product_dev"."idProduct" = "UserStock_dev"."idProduct" 
        WHERE "UserStock_dev"."createdDate" BETWEEN '${data.startDate}' AND '${data.endDate}' and "idRetailer"='${data.id}' and "UserStock_dev"."stockType" = '${data.stockType}'
        GROUP BY "Product_dev"."idProduct") ttl;`;
    let result2 = await queries.Query(query2);

    let query = `SELECT tbl3."idRetailer", tbl3."idProduct", tbl3."name", SUM(tbl3."jmlStock") as "jmlStock" ,SUM(tbl3."jmlKonsumsi") as "paket"
        FROM ( 
                        SELECT  '${data.id}' as "idRetailer", tbl1."idProduct", tbl2."name", tbl1.stock  as "jmlStock", 0 as "jmlKonsumsi" 
                        FROM
                            "UserStock_dev" as tbl1 
                        RIGHT JOIN
                            "Product_dev" as tbl2
                        ON
                            (tbl1."idProduct" = tbl2."idProduct")
                        WHERE
                            tbl1."idRetailer"='${data.id}'
                            AND tbl1."stockType"='${data.stockType}'
                            AND tbl1."createdDate" BETWEEN '${data.startDate}' AND '${data.endDate}'
                            UNION ALL
                        SELECT  '${data.id}' as "idRetailer", tbl1."idProduct", tbl2."name", 0  as "jmlStock", tbl1.stock as "jmlKonsumsi" 
                        FROM
                            "UserStock_dev" as tbl1 
                        RIGHT JOIN
                            "Product_dev" as tbl2
                        ON
                            (tbl1."idProduct" = tbl2."idProduct")
                        WHERE
                            tbl1."idRetailer"='${data.id}'
                            AND tbl1."stockType"='${data.stockType}'
                            AND tbl1."createdDate" BETWEEN '${data.startDate}' AND '${data.endDate}'
                        
                        UNION ALL
                        SELECT '${data.id}' as "idRetailer", "idProduct","name", 0  as "jmlStock", 0 as "jmlKonsumsi"  FROM "Product_dev"
        
                ) tbl3
        GROUP BY
                tbl3."idRetailer", tbl3."idProduct", tbl3."name"`;

    let result = await queries.Query(query);
    arrData.push({
      totalStok: result2.rows[0].totalStok
    });

    if (result.rowCount == 0) {
      return wrapper.error('failed', 'Data not found', 404);
    }
    try {
      result.rows.map(async (item) => {
        let modelDb = await model.modelPenambahanStok();
        modelDb.name = item.name;
        modelDb.paket = item.paket;
        modelDb.value = item.value;
        modelDb.paket = item.paket;
        arrData.push(modelDb);
      });
    } catch (err) {
      return wrapper.error(false, 'Data not found', 404);
    }
    return wrapper.data(arrData, 'Success Get Data', 200);
  }

  async getDetailPenambahanStok (data) {
    let arrData = [];
    let query = `SELECT tbl1."tanggalBuat", tbl1."name", SUM(tbl1."paket") as "paket" FROM (
            SELECT
                "Product_dev"."name" as "name", 
                "UserStock_dev"."createdDate" :: TIMESTAMP :: DATE AS "tanggalBuat",
                SUM("UserStock_dev"."stock") AS "paket" 
            FROM
                "Product_dev"
                JOIN "UserStock_dev" ON "Product_dev"."idProduct" = "UserStock_dev"."idProduct" 
            WHERE
                "UserStock_dev"."createdDate" BETWEEN '${data.startDate}' AND '${data.endDate}'
                AND "idRetailer" = '${data.id}' 
                AND "UserStock_dev"."stockType" = '${data.stockType}' 
            GROUP BY "Product_dev"."name", "UserStock_dev"."createdDate"
            ) tbl1 GROUP BY tbl1."tanggalBuat", tbl1."name";`;

    let result = await queries.Query(query);
    if (result.rowCount == 0) {
      return wrapper.error('failed', 'Data not found', 404);
    }
    result.rows.map(async (item) => {
      let modelDb = await model.modelDetailPenambahanStok();
      modelDb.createdDate = item.createdDate;
      modelDb.date = item.date;
      modelDb.name = item.name;
      modelDb.stock = item.stock;
      arrData.push(modelDb);
    });
    return wrapper.data(arrData, 'Success Get Data', 200);
  }

  async getlaporanStok (data) {
    let arrData = [];
    let query2 = `SELECT SUM(tbl3."jmlStock"-tbl3."jmlKonsumsi") as totalberas
        FROM ( 
                       SELECT SUM(tbl1.stock * tbl2."value" ) as "jmlStock", 0 as "jmlKonsumsi", tbl2."value" 
                       FROM
                           "UserStock_dev" as tbl1 
                       RIGHT JOIN
                           "Product_dev" as tbl2
                       ON
                           (tbl1."idProduct" = tbl2."idProduct")
                       WHERE
                           tbl1."stockType"='in'
                           AND tbl1."idRetailer"='${data.id}'
                                                       GROUP BY tbl2."value"
                       UNION ALL
                       SELECT 0  as "jmlStock", SUM(tbl1.stock * tbl2."value") as "jmlKonsumsi", tbl2."value" 
                       FROM
                           "UserStock_dev" as tbl1 
                       RIGHT JOIN
                           "Product_dev" as tbl2
                       ON
                           (tbl1."idProduct" = tbl2."idProduct")
                       WHERE
                           tbl1."stockType"='out'
                           AND tbl1."idRetailer"='${data.id}'
                       GROUP BY tbl2."value") tbl3`;
    let result1 = await queries.Query(query2);

    let query = `SELECT tbl3."idRetailer", tbl3."idProduct", tbl3."name", SUM(tbl3."jmlStock") as "jmlStock" ,SUM(tbl3."jmlKonsumsi") as "jmlKonsumsi", SUM(tbl3."jmlStock" - tbl3."jmlKonsumsi") as totalstock
        FROM ( 
                        SELECT tbl1."idRetailer", tbl1."idProduct", tbl2."name", tbl1.stock  as "jmlStock", 0 as "jmlKonsumsi", tbl2."value" 
                        FROM
                            "UserStock_dev" as tbl1 
                        RIGHT JOIN
                            "Product_dev" as tbl2
                        ON
                            (tbl1."idProduct" = tbl2."idProduct")
                        WHERE
                            tbl1."stockType"='in'
                            AND tbl1."idRetailer"='${data.id}'
                        UNION ALL
                        SELECT tbl1."idRetailer", tbl1."idProduct", tbl2."name", 0  as "jmlStock", tbl1.stock as "jmlKonsumsi", tbl2."value" 
                        FROM
                            "UserStock_dev" as tbl1 
                        RIGHT JOIN
                            "Product_dev" as tbl2
                        ON
                            (tbl1."idProduct" = tbl2."idProduct")
                        WHERE
                            tbl1."stockType"='out'
                            AND tbl1."idRetailer"='${data.id}'
                        
                        UNION ALL
                        SELECT '${data.id}' as "idRetailer", "idProduct","name", 0  as "jmlStock", 0 as "jmlKonsumsi", "value"  FROM "Product_dev"
        
                ) tbl3
        GROUP BY
                tbl3."idRetailer", tbl3."idProduct", tbl3."name" ORDER BY tbl3."name" `;

    let result = await queries.Query(query);
    let totalBeras = result1.rows[0].totalberas;

    if (result.rowCount == 0) {
      return wrapper.error(false, 'Data not found', 404);
    }
    try {
      result.rows.map(async (item) => {
        let modelDb = await model.modellaporanStok();
        modelDb.idRetailer = item.idRetailer;
        modelDb.idProduct = item.idProduct;
        modelDb.namaStok = item.name;
        modelDb.Stok = item.jmlStock;
        modelDb.Konsumsi = item.jmlKonsumsi;
        modelDb.totalstok = item.totalstock;
        arrData.push(modelDb);
      });
    } catch (err) {
      return wrapper.error(false, 'Data not found', 404);
    }

    let obj = {
      totalBeras: totalBeras,
      data: arrData
    };
    return wrapper.data(obj, 'Get Total Stock', 200);
  }

  async getpenjualanmanual (data) {
    let arrData = [];
    let query = `SELECT tbl3."idProduct", tbl3."name", SUM(tbl3."jmlStock") as "jmlStock" ,SUM(tbl3."jmlKonsumsi") as "jmlKonsumsi", SUM(tbl3."jmlStock" - tbl3."jmlKonsumsi") as totalstock
    FROM ( 
                    SELECT tbl1."idRetailer", tbl1."idProduct", tbl2."name", tbl1.stock  as "jmlStock", 0 as "jmlKonsumsi"
                    FROM
                            "UserStock_dev" as tbl1 
                        RIGHT JOIN
                            "Product_dev" as tbl2
                        ON
                            (tbl1."idProduct" = tbl2."idProduct")
                        WHERE
                        tbl1."stockType"='in'
                            AND tbl1."idRetailer"='${data.id}'
                        UNION ALL
                        SELECT tbl1."idRetailer", tbl1."idProduct", tbl2."name", 0  as "jmlStock", tbl1.stock as "jmlKonsumsi"
                        FROM
                            "UserStock_dev" as tbl1 
                        RIGHT JOIN
                            "Product_dev" as tbl2
                        ON
                            (tbl1."idProduct" = tbl2."idProduct")
                        WHERE
                        tbl1."stockType"='out'
                            AND tbl1."idRetailer"='${data.id}'
                            UNION ALL
                        SELECT '${data.id}' as "idRetailer", "idProduct","name", 0  as "jmlStock", 0 as "jmlKonsumsi"  FROM "Product_dev"
        
                ) tbl3
        GROUP BY tbl3."idProduct", tbl3."name" order by tbl3."name" asc`;

    let result = await queries.Query(query);

    if (result.rowCount == 0) {
      return wrapper.error(false, 'Data not found', 404);
    }
    try {
      result.rows.map(async (item) => {
        let modelDb = await model.modelPM();
        modelDb.idProduct = item.idProduct;
        modelDb.name = item.name;
        modelDb.jmlStock = item.jmlStock;
        modelDb.jmlKonsumsi = item.jmlKonsumsi;
        modelDb.totalstock = item.totalstock;

        arrData.push(modelDb);
      });
    } catch (err) {
      return wrapper.error(false, 'Data not found', 404);
    }
    return wrapper.data(arrData, 'Success Get Data', 200);
  }

  async getBUMN () {
    let arrData = [];
    let query = `SELECT "idBumn", "name" FROM "MasterBumn_dev";`;
    let result = await queries.Query(query);
    if (result.rowCount === 0) {
      return wrapper.error(false, 'Data not found', 404);
    }
    try {
      result.rows.map(async (item) => {
        let modelDb = await model.NB51bumn();
        modelDb.idBumn = item.idBumn;
        modelDb.name = item.name;
        arrData.push(modelDb);
      });
    } catch (error) {
      return wrapper.error('failed', 'Cannot connect database', 404);
    }
    return wrapper.data(arrData, 'Success Get Data', 200);
  }
}
module.exports = CoreService;
