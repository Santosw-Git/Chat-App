import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";
const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId}=req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne(
            {
                participants: {$all: [senderId,receiverId]}
            }
        )
        console.log("conversation",conversation);
        

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId,receiverId]
            })

        }
        console.log("conversation",conversation);

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })


        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // await Promise.all([conversation.save(),newMessage.save()])
        await newMessage.save()


        return res.status(200).json({message: newMessage})
        

        
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        
    }

    


}

export {
    sendMessage,
}