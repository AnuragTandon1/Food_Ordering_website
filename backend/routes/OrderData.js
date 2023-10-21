const express=require('express')
const router=express.Router()
const Order=require('../models/Orders')
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})

    let eId = await Order.findOne({ 'email': req.body.email }) ;   
    console.log(eId)
    if (eId==null) {
        try {
            console.log(data)
            
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }
    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})


// router.post('/orderData', async (req, res) => {
//   try {
//     const data = req.body.order_data;
//     const orderDate = req.body.order_date;
//     const email = localStorage.getItem('userEmail');
//     // Check if an order with this email already exists
//     const existingOrder = await Order.findOne({ email });
//     console.log(data)
//     console.log(orderDate)
//     console.log(email)
//     if (!existingOrder) {
//       // Create a new order document if the email doesn't exist
//       const newOrder = new Order({
//         email,
//         order_data: [{ Order_date: orderDate }, ...data],
//       });
      
//       await newOrder.save();
//     } else {
//       // Add order data to an existing order
//       existingOrder.order_data.push({ Order_date: orderDate }, ...data);
//       await existingOrder.save();
//     }

//     res.json({ success: true });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });
router.post('/myorderData', async (req, res) => {
try {
    let myData= await Order.findOne({'email' : req.body.email })
    res.json({orderData : myData})
} catch (error) {
    res.send("Server Error", error.message)
}
})
module.exports = router;