// const express = require('express');
// const router = express.Router();
// const data = {};
// data.employees = require('../../data/employees.json');

// router.route('/')
//     .get((req, res) => {
//         res.json(data.employees);
//     })
//     .post((req, res) => {
//         res.json({
//             "firstname": req.body.firstname,
//             "lastname": req.body.lastname
//         });
//     })
//     .put((req, res) => {
//         res.json({
//             "firstname": req.body.firstname,
//             "lastname": req.body.lastname
//         });
//     })
//     .delete((req, res) => {
//         res.json({ "id": req.body.id })
//     });

// router.route('/:id')
//     .get((req, res) => {
//         res.json({ "id": req.params.id });
//     });

// module.exports = router;
//  17 changes: 17 additions & 0 deletions17  
// routes/root.js
// @@ -0,0 +1,17 @@
// const express = require('express');
// const router = express.Router();
// const path = require('path');

// router.get('^/$|/index(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
// });

// router.get('/new-page(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
// });

// router.get('/old-page(.html)?', (req, res) => {
//     res.redirect(301, '/new-page.html'); //302 by default
// });

// module.exports = router;