import { Request, Response, Router } from "express";
import { catchAsync } from "../middlewares/catchAsync";
import { CustomError } from "../utils/CustomError";
import { pool } from "../database/db";
import { verifyJwt } from "../utils/jwt";

const router = Router();

router.patch(
  "/transfer",
  catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) {
      throw new CustomError("Not authenticated");
    }

    const payload = verifyJwt(token);
    if (!payload) {
      throw new CustomError("Invalid or expired token");
    }

    const senderId = payload.id;
    const { receiverEmail, amount } = req.body;

    if (!receiverEmail || !amount) {
      throw new CustomError("receiverEmail and amount are required");
    }

    if (amount <= 0) throw new CustomError("Amount should be greater than 0");

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      // Fetch sender
      const senderResult = await client.query(
        "SELECT id, money FROM users WHERE id = $1 FOR UPDATE",
        [senderId]
      );
      const sender = senderResult.rows[0];

      if (!sender) throw new CustomError("Sender not found");

      if (Number(sender.money) < amount)
        throw new CustomError("Insufficient funds");

      // Fetch receiver
      const receiverResult = await client.query(
        "SELECT id, money, email FROM users WHERE email = $1 FOR UPDATE",
        [receiverEmail]
      );
      const receiver = receiverResult.rows[0];

      if (!receiver) throw new CustomError("Receiver not found");

      // Update balances
      const updatedSenderResult = await client.query(
        "UPDATE users SET money = money - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING money",
        [amount, sender.id]
      );

      const updatedReceiverResult = await client.query(
        "UPDATE users SET money = money + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING money",
        [amount, receiver.id]
      );

      await client.query("COMMIT");

      res.status(200).send({
        status: "success",
        message: `Transferred $${amount} from user ${sender.id} to ${receiver.email}`,
        data: {
          sender: {
            id: sender.id,
            money: updatedSenderResult.rows[0].money,
          },
          receiver: {
            id: receiver.id,
            money: updatedReceiverResult.rows[0].money,
          },
          amount,
        },
      });
    } catch (err) {
      await client.query("ROLLBACK"); // rollback on error
      throw err; // let catchAsync handle it
    } finally {
      client.release(); // always release client
    }
  })
);

export default router;
