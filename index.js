// cors'u projeye dahil edelim
const cors = require("cors");

// Express Framework'u dahil edelim
var express = require("express"); // call express
var app = express(); // define our app using express

// Gönderilen datalar almak için gereklidir
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var portNum = "8086";

// Path Tanımlamaları için router oluştur
var router = express.Router(); // get an instance of the express Router

// Database Baglantısı
const sql = require("mssql");

const mssqlconfig = {
  user: "as",
  password: "1234",
  database: "Northwind",
  server: "DESKTOP-VN9UJI5\\MSSQLSALTUK",
  options: {
    port: 49670,
    encrypt: false, // for azure
    //trustServerCertificate: true // change to true for local dev / self-signed certs
  },
  pool: {
    max: 20,
    min: 5,
    idleTimeoutMillis: 150000,
  },
};

getCategoriesFunction = async (req, res, next) => {
  try {
    await sql.connect(mssqlconfig);
    const result = await sql.query(
      "SELECT CategoryID, CategoryName FROM Categories"
    );

    return res.status(200).json([{ Categories: result.recordsets[0] }]);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Hata" });
  }
};

getProductsFunction = async (req, res, next) => {
  try {
    await sql.connect(mssqlconfig.Config);
    const result = await sql.query(
      "SELECT ProductID, ProductName FROM Products"
    );

    return res.status(200).json([{ Products: result.recordsets[0] }]);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Hata" });
  }
};

postProductFuncion = async (req, res, next) => {
  // sabit değerle Categories tablosuna insert göndermek
  //var sqlStatement =  `INSERT INTO Categories (CategoryName) VALUES ('Test123')`

  // değeri değişkenden okuyalım
  const { ProductName, UnitPrice } = req.body; // CategoryName adlı değişkeni request body'si içinden alalım.

  // ifadeyi pis tırnak içine yazalım ve ${} yazımı ile değişken değerini ifadeye yerleştirelim
  var sqlStatement = `INSERT INTO Products (ProductName,UnitPrice) VALUES ('${ProductName}','${UnitPrice}')`;

  console.log(sqlStatement); // SQL ifadesini log'a yazdıralım
  try {
    await sql.connect(mssqlconfig); // function async olduğu için await diyebildik
    const result = await sql.query(sqlStatement); // sorguyu sql ifadesini içeren değişkenden alalım
    return res.status(200).json({ message: "İşlem Başarılı!" }); // İşlem başarılı olarak dönelim
  } catch (error) {
    //console.log(error);
    return res.status(400).json({ message: error }); // Eğer hata var ise hata mesajını döndürelim.
  }
};

putProductFunction = async (req, res, next) => {
  const { ProductID, ProductName, UnitPrice } = req.body; // CategoryID,CategoryName adlı değişkenleri request body'si içinden alalım.

  // ifadeyi pis tırnak içine yazalım ve ${} yazımı ile değişken değerini ifadeye yerleştirelim
  var sqlStatement = `UPDATE Products SET ProductName='${ProductName}',UnitPrice= '${UnitPrice}' WHERE ProductID = ${ProductID}`;
  console.log(sqlStatement); // SQL ifadesini log'a yazdıralım
  try {
    await sql.connect(mssqlconfig); // function async olduğu için await diyebildik
    const result = await sql.query(sqlStatement); // sorguyu sql ifadesini içeren değişkenden alalım
    return res.status(200).json({ message: "İşlem Başarılı!" }); // İşlem başarılı olarak dönelim
  } catch (error) {
    //console.log(e);
    return res.status(400).json({ message: error }); // Eğer hata var ise hata mesajını döndürelim.
  }
};

deleteProductFunction = async (req, res, next) => {
  const { ProductID } = req.body; // CategoryID adlı değişkenleri request body'si içinden alalım.

  // ifadeyi pis tırnak içine yazalım ve ${} yazımı ile değişken değerini ifadeye yerleştirelim
  var sqlStatement = `DELETE Products WHERE ProductID = ${ProductID}`;
  console.log(sqlStatement); // SQL ifadesini log'a yazdıralım
  try {
    await sql.connect(mssqlconfig); // function async olduğu için await diyebildik
    const result = await sql.query(sqlStatement); // sorguyu sql ifadesini içeren değişkenden alalım
    return res.status(200).json({ message: "İşlem Başarılı!" }); // İşlem başarılı olarak dönelim
  } catch (error) {
    //console.log(e);
    return res.status(400).json({ message: error }); // Eğer hata var ise hata mesajını döndürelim.
  }
};

postCategoryFunction = async (req, res, next) => {
  // sabit değerle Categories tablosuna insert göndermek
  //var sqlStatement =  `INSERT INTO Categories (CategoryName) VALUES ('Test123')`

  // değeri değişkenden okuyalım
  const { CategoryName } = req.body; // CategoryName adlı değişkeni request body'si içinden alalım.
  // ifadeyi pis tırnak içine yazalım ve ${} yazımı ile değişken değerini ifadeye yerleştirelim
  var sqlStatement = `INSERT INTO Categories (CategoryName) VALUES ('${CategoryName}')`;

  console.log(sqlStatement); // SQL ifadesini log'a yazdıralım
  try {
    await sql.connect(mssqlconfig); // function async olduğu için await diyebildik
    const result = await sql.query(sqlStatement); // sorguyu sql ifadesini içeren değişkenden alalım
    return res.status(200).json({ message: "İşlem Başarılı!" }); // İşlem başarılı olarak dönelim
  } catch (error) {
    //console.log(error);
    return res.status(400).json({ message: error }); // Eğer hata var ise hata mesajını döndürelim.
  }
};

putCategoryFunction = async (req, res, next) => {
  const { CategoryID, CategoryName } = req.body; // CategoryID,CategoryName adlı değişkenleri request body'si içinden alalım.

  // ifadeyi pis tırnak içine yazalım ve ${} yazımı ile değişken değerini ifadeye yerleştirelim
  var sqlStatement = `UPDATE Categories SET CategoryName='${CategoryName}' WHERE CategoryID = ${CategoryID}`;
  console.log(sqlStatement); // SQL ifadesini log'a yazdıralım
  try {
    await sql.connect(mssqlconfig); // function async olduğu için await diyebildik
    const result = await sql.query(sqlStatement); // sorguyu sql ifadesini içeren değişkenden alalım
    return res.status(200).json({ message: "İşlem Başarılı!" }); // İşlem başarılı olarak dönelim
  } catch (error) {
    //console.log(e);
    return res.status(400).json({ message: error }); // Eğer hata var ise hata mesajını döndürelim.
  }
};

deleteCategoryFunction = async (req, res, next) => {
  const { CategoryID } = req.body; // CategoryID adlı değişkenleri request body'si içinden alalım.

  // ifadeyi pis tırnak içine yazalım ve ${} yazımı ile değişken değerini ifadeye yerleştirelim
  var sqlStatement = `DELETE Categories WHERE CategoryID = ${CategoryID}`;
  console.log(sqlStatement); // SQL ifadesini log'a yazdıralım
  try {
    await sql.connect(mssqlconfig); // function async olduğu için await diyebildik
    const result = await sql.query(sqlStatement); // sorguyu sql ifadesini içeren değişkenden alalım
    return res.status(200).json({ message: "İşlem Başarılı!" }); // İşlem başarılı olarak dönelim
  } catch (error) {
    //console.log(e);
    return res.status(400).json({ message: error }); // Eğer hata var ise hata mesajını döndürelim.
  }
};

// Proje Servisleri
// ---------------------------------------------
// ---------------------------------------------

router.post("/postProduct", postProductFuncion);
router.put("/putProduct", putProductFunction);
router.delete("/deleteProduct", deleteProductFunction);

router.get("/getCategories", getCategoriesFunction);
router.get("/getProducts", getProductsFunction);
router.post("/postCategory", postCategoryFunction); // postCategory adlı post servisini postCategoryFunction içinden alacak
router.put("/putCategory", putCategoryFunction); // putCategory adlı put servisini putCategoryFunction içinden alacak
router.delete("/deleteCategory", deleteCategoryFunction); // deleteCategory adlı delete servisini deleteCategoryFunction içinden alacak

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

// uygulamada cors'a tüm adresler için izin verelim
app.use(
  cors({
    origin: "*",
  })
);

// router'ı aktive edelim.
app.use("/", router);

// START THE SERVER
// =============================================================================
app.listen(portNum);
