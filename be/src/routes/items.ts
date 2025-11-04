import { Router , Response , Request} from "express";
import { redis } from "../database/redisClient";

const router = Router();
const PREFIX = "item:";


router.post("/", async (req : Request, res : Response )=>{
    const {id , name} = req.body;
    
    if(!id || !name){
        return res.status(400).send("id and name required");
    }

    await redis.hset(`${PREFIX}${id}` , {id,name});
    res.send({
        message : "Item created" , id,name
    })
});


router.get("/" , async (_, res:Response)=>{
    const keys = await redis.keys(`${PREFIX}*`);
    const items = [];

    for (const i of keys){
        const item = await redis.hgetall(i);
        items.push(item);
    }
    res.send(items);
})


router.get("/:id" , async (req : Request , res : Response)=>{
    const {id} = req.params;
    const item = await redis.hgetall(`${PREFIX}${id}`);
    if(!item || !item.id) return res.status(404).send("Not found");
    res.send(item);
})



router.put("/:id", async (req : Request , res: Response)=>{
    const {id} = req.params;
    const {name} = req.body;

    const exits = await redis.exists(`${PREFIX}${id}`);
    if(!exits){
        return res.status(404).send("Not Found");
    }

    await redis.hset(`${PREFIX}${id}` , {id,name});
    res.send({
        msg : "Items updated!!!",
        id,name
    });
})

router.delete("/:id", async (req : Request , res : Response)=>{
    const {id} = req.params;
    const deleted = await redis.del(`${PREFIX}${id}`);

    if(!deleted) {
        return res.status(404).send("Not Found");
    }

    res.send({
        msg : "item deleted", id
    })
});



export default router;