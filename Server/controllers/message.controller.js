import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id:recieverId}=req.params;
        const senderId = req.user._id;        

        let conversation = await Conversation.findOne(
            {
                participants: {$all: [senderId,recieverId]}
            }
        )
        

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId,recieverId]
            })

        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })


        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        return res.status(200).json({message: newMessage})
        
    } catch (error) {
        console.log("error: " + error.message);    
        res.status(500).json({error:"Internal Server Error"})
        
    }
}

const getMessage = async( request,res)=>{
    const {id:recieverId} = request.params;
    const senderId = request.user._id;


    const conversation = await Conversation.findOne({
        participants:{ $all: [recieverId,senderId]}
    }).populate("messages");

    return res.status(200).json({messages: conversation.messages})
}

export {
    sendMessage,
    getMessage,
}