//declare var PouchDB:any;
// import 'app.js';
// import 'base.js';
import { ProductModel } from './model/ProductModel';
import { OrderModel } from './model/OrderModel';
import { LocalData } from './service/local-data.service';

declare var PouchDB: any;

var orderDb;
var productDb;
var templateDb;

function DbConnection() {
  orderDb = new PouchDB('orderDB' + new LocalData().getUserInfo().OrgId, {adapter : 'websql'});
  productDb = new PouchDB('productDB' + new LocalData().getUserInfo().OrgId, {adapter : 'websql'});
  templateDb = new PouchDB('printTemplateDB' + new LocalData().getUserInfo().OrgId, {adapter : 'websql'});
  return {
    orderDb,
    productDb,
    templateDb
  }
}

export function selectUpdateDate() {
  DbConnection();
  return productDb.get('updateTime').then(function (doc) {
    return doc.UpdateDate;
  }).catch(function (err) {
    console.log(err);
    return '1990-01-01 01:01:00';
  });
}
function getProInfo(pro) {
  return new Promise((resolve, reject) => {
    productDb.get(pro._id).then(function (doc) {
      if (doc) {
        pro._rev = doc._rev;
        if (pro.ProIsDel || pro.SkuIsDel) {
          pro._deleted = true;
        }
      }
      resolve({ pro: pro, oparation: 'insert' });
    }).catch(function (err) {
      console.log(err);
      if (pro.ProIsDel || pro.SkuIsDel) {
        resolve({ pro: pro, oparation: 'deleted' });
      } else {
        resolve({ pro: pro, oparation: 'insert' });
      }
    });
  });
}
function selectProductUom(proInfo) {
  return new Promise((resolve, reject) => {
    productDb.find({
      include_docs: true,
      selector: {
        _id: { $gte: null, "$regex": 'uomInfo' },
        ProductCode: { $eq: proInfo.ProductCode }
      }
    }).then(function (result) {
      resolve(result.docs);
    }).catch(function (err) {
      resolve();
    });
  });
}
export function bulkProducts(products, updatetime, uomList) {
  DbConnection();
  let promises = [];
  let uomPromises = [];
  products.forEach(pro => {
    promises.push(getProInfo(pro));
    uomPromises.push(selectProductUom(pro));
  });

  uomList.forEach(uom => {
    uom._id = 'uomInfo' + uom.ProductCode + uom.UomCode;
  })
  var date: any = {
    _id: 'updateTime',
    UpdateDate: updatetime
  }
  productDb.get('updateTime').then(function (doc) {
    date._rev = doc._rev;
    productDb.put(date);
  }).catch(function (err) {
    console.log(err);
    productDb.put(date);
  });
  Promise.all(promises).then(
    function (resultss) {
      for (var i = resultss.length - 1; i >= 0; i--) {
        if (resultss[i].oparation == 'deleted')
          products.splice(i, 1);
      }

      productDb.bulkDocs(products).then(function (result) {

      }).catch(function (err) {
        console.log(err);
      });

    },
  );
  Promise.all(uomPromises).then(function (uomresluts) {
    let uomdeleteList = [];
    if (uomresluts.length > 0) {
      uomdeleteList = uomresluts[0];
      uomdeleteList.forEach(uom => {
        uom._deleted = true;
      });
    }
    productDb.bulkDocs(uomdeleteList).then(function (result) {
      productDb.bulkDocs(uomList);
    }).catch(function (err) {
      console.log(err);
      productDb.bulkDocs(uomList);
    });
  })


}

export function findProductCount(selector): Promise<any> {
  DbConnection();
  return new Promise(function (res, rej) {
    productDb.find({
      include_docs: true,
      selector: selector
    }).then(function (result) {
      res(result.docs.length);
    }).catch(function (err) {
      console.log(err);
    });
  });


}

export function findProductUom(selector): Promise<any> {
  DbConnection();
  return new Promise(function (res, rej) {
    productDb.find({
      include_docs: true,
      selector: selector,
      sort: ['_id']
    }).then(function (result) {
      res(result.docs);
    }).catch(function (err) {
      console.log(err);
    });
  });
}

export function findLimitProductInfo(selector, curPage, pageSize): Promise<any> {
  DbConnection();
  let QueryParam: any = {
    include_docs: true,
    selector: selector
  };
  if (curPage) {
    QueryParam.skip = curPage;
  }
  if (pageSize) {
    QueryParam.pageSize = pageSize;
  }
  return new Promise(function (res, rej) {
    productDb.find(QueryParam).then(function (result) {
      var results = result.docs;
      res(results);
    }).catch(function (err) {
      console.log(err);
    });
  });

}


export function bulkOrders(orders, startTime, endTime) {
  DbConnection();
  allOrderDocs(orders, startTime, endTime);
}

function allOrderDocs(newOrderList, startTime, endTime) {
  var now = new Date();
  var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
  orderDb.find({
    include_docs: true,
    selector: {
      _id: { $gte: null, "$regex": 'orderInfo' },
      CreateDate: { $lte: now, $gte: date },
      sort: ['_id']
    }
  }).then(function (result) {
    deleteOrderDocs(result.docs, newOrderList);

  })
}


function deleteOrderDocs(oldOrderList, newOrderList) {

  if (oldOrderList) {
    oldOrderList.forEach(order => {
      order._deleted = true;
    })
    orderDb.bulkDocs(oldOrderList).then(function (result) {
      InsertOrderDocs(newOrderList);
    }).catch(function (err) {
      console.log(err);
    });
  }
  else {
    InsertOrderDocs(newOrderList);
  }
}

export function InsertOrderDocs(newOrderList: OrderModel[]): Promise<any> {
  DbConnection();
  return orderDb.bulkDocs(newOrderList).then(function (result) {
    console.log(result);
    return result;
  }).catch(function (err) {
    console.log(err);
  });
}

export function findOrderCount(selector) {
  DbConnection();
  return new Promise(function (res, rej) {
    orderDb.find({
      include_docs: true,
      selector: selector
    }).then(function (result) {
      res(result.docs.length);
    });
  });

}

export function findLimitOrderInfo(selector, curPage, pageSize): Promise<ProductModel[]> {
  DbConnection();
  return new Promise(function (res, rej) {
    orderDb.find({
      include_docs: true,
      limit: pageSize, skip: curPage,
      selector: selector
    }).then(function (result) {
      var results = result.docs;
      res(results as ProductModel[]);
    })
  });
}

export function bulkPrintTemplats(templats) {
  DbConnection();
  let promises = [];
  templats.forEach(tem => {
    promises.push(getTemplatInfo(tem));
  });
  Promise.all(promises).then(
    function (resultss) {
      templateDb.bulkDocs(templats).then(function (result) {
      }).catch(function (err) {
        console.log(err);
      });

    },
  );
}

export function findPrintTemplat(selector): Promise<any> {
  DbConnection();
  return new Promise(function (res, rej) {
    templateDb.find({
      include_docs: true,
      selector: selector
    }).then(function (result) {
      res(result.docs);
    });
  });
}

function getTemplatInfo(templat) {
  return new Promise((resolve, reject) => {
    templateDb.get(templat._id).then(function (doc) {
      if (doc) {
        templat._rev = doc._rev;
        resolve({ templat: templat, oparation: 'update' });
      }
      resolve({ templat: templat, oparation: 'insert' });
    }).catch(function (err) {
      console.log(err);
      resolve({ templat: templat, oparation: 'insert' });
    });
  });
}

export function allDocs() {
  var db = new PouchDB('productDB');
  db.allDocs({
    include_docs: true,
    attachments: true,
    startkey: 'pro',
    endkey: 'pro\uffff'
  }).then(function (result) {
    return result;
  }).catch(function (err) {
    console.log(err);
  });
}

