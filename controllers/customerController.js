import Order from "../models/Order.js";
import OrderDetail from "../models/OrderDetail.js";
import ProductionTask from "../models/ProductionTask.js";
import Payment from "../models/Payment.js";

export const createFullOrder = async (req, res) => {
  try {

    const { customerId, products, payment } = req.body;

    // tạo order
    const order = new Order({
      customerId,
      orderDate: new Date(),
      status: "created"
    });

    const savedOrder = await order.save();

    let totalAmount = 0;

    // tạo order details
    for (let item of products) {

      const detail = new OrderDetail({
        orderId: savedOrder._id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      });

      const savedDetail = await detail.save();

      totalAmount += item.quantity * item.price;

      // tạo production task
      const task = new ProductionTask({
        orderDetailId: savedDetail._id,
        status: "pending"
      });

      await task.save();
    }

    // cập nhật tổng tiền
    savedOrder.totalAmount = totalAmount;
    await savedOrder.save();

    // tạo payment nếu có
    if (payment) {

      const paymentDoc = new Payment({
        orderId: savedOrder._id,
        amount: payment.amount,
        paymentDate: new Date(),
        paymentMethod: payment.method,
        status: "paid"
      });

      await paymentDoc.save();
    }

    res.json({
      message: "Order created successfully",
      orderId: savedOrder._id
    });

  } catch (error) {

    res.status(500).json({
      message: "Error creating order",
      error
    });

  }
};