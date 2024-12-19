const Log = require("../model/Logs"); 
const logsRoute = require("../Routes/productsRoute");

const getLogs = async (req, res) => {
      
    try {
        const logs = await Log.find();
         
        if (logs && logs.length > 0) {
            res.status(200).json({ logs: logs });
        } else {
            res.status(404).json({ msg: "No orders found " });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error on getting orders" });
    }
};


const deleteOrder = async (req, res) => {
    //console.log("hello")
    const {id} = req.params.id; 
    console.log(id)
    try {
        const deletedOrder = await Log.findOneAndDelete({ id: id });
        if (deletedOrder) {
            res.status(200).json({ msg: "Order successfully deleted" });
        } else {
            res.status(404).json({ msg: "No order found with the given id" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error on deleting order" });
    }
};


module.exports = {
    getLogs,
    deleteOrder,
};