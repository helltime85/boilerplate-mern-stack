const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             {Product}
//=================================

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
   
let upload = multer({ storage: storage }).single('file');

router.post('/image', (req, res) => {
    upload(req, res, err => {
        if(err) {
            return res.json({ success: false, err });
        }

        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.fileName });
      
    });
    //가져온 이미지 저장
});

router.post('/', (req, res) => {
  const product = new Product(req.body);
  
  product.save((err) => {
    if(err) {
      res.status(400).json({ success: false, });
    } else {
      res.status(200).json({ success: true, });
    }
  })
});

router.post('/products', (req, res) => {
  //const product = new Product(req.body);
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Product.find()
    .populate('writer')
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if(err) {
        res.status(400).json({ success: false, });
      } else {
        res.status(200).json({ success: true, productInfo, PostSize: productInfo.length });
      }
    });
});

module.exports = router;