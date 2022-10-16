import React, { useState, useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
const Chat = ({ socket, username, room }) => {
    const [messages, setmessages] = useState([]);

    const [currentmessage, setcurrentmessage] = useState();
    const sendmessage = async () => {
        if (currentmessage !== "" && username !== undefined) {
            const messagedata = {
                room: room,
                author: username,
                message: currentmessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            console.log(messagedata);

            await socket.emit("send_message", messagedata);
            setmessages((list) => [...list, messagedata]);

        }
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
            setmessages((list) => [...list, data]);
        })

    }, [socket]);
    useEffect(() => {
        console.log(messages);

    }, [messages]);





    return (
        <div className='w-full bg-[#c0c0c0] text-3xl text-center'>

            <div className='bg-[#111] text-white font-extrabold py-4 mt-4'>Live Chat</div>
            <div className='bg-[#EEE] h-[600px]'>
                <ScrollToBottom className='h-full overflow-y-scroll overflow-x-hidden text-lg'>
                    {messages.map((messagedata) => {
                        return (
                            <div key={123} className="w-full sans-q ">
                                {messagedata.author == username ? (
                                    <div className=''>
                                        <div className='w-full flex float-left my-2 max-w-[700px]'>

                                            <div className='mx-2 my-auto'>
                                                <div className='bg-[#33f] rounded-full w-[50px] h-[50px] pt-1'>#</div>
                                                <div className='text-md font-bold'>{messagedata.author}</div>

                                            </div>
                                            <div className='my-2 p-2'>
                                                <div className='max-w-[500px] bg-[#13ff13] text-white py-4 px-6 rounded-x rounded-r-full rounded-l-full break-words text-left'>
                                                    <p>{messagedata.message}</p></div>
                                                <div className='text-sm text-right mt-1 mr-4'>{messagedata.time}</div>

                                            </div>



                                        </div>
                                    </div>
                                ) : (
                                    <div className=''>
                                        <div className='w-full flex justify-end  my-2'>
                                            <div className='my-2 p-2'>
                                                <div className='max-w-[500px] bg-[#13ff13] text-white py-4 px-6 rounded-x rounded-r-full rounded-l-full break-words text-left'>
                                                    <p>{messagedata.message}</p></div>
                                                <div className='text-sm text-left mt-1 ml-4'>{messagedata.time}</div>

                                            </div>
                                            <div className='mx-2 my-auto'>
                                                <div className='bg-[#33f] rounded-full w-[50px] h-[50px] pt-1'>#</div>
                                                <div className='text-md font-bold'>{messagedata.author}</div>

                                            </div>




                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </ScrollToBottom>

            </div>
            <div className='flex'>
                <input type="text" className="w-full pl-8 font-thin" placeholder='Hey..' onChange={(event) => { setcurrentmessage(event.target.value) }} onKeyPress={(event) => { event.key == "Enter" && sendmessage(); }} />
                <button onClick={sendmessage} className="p-8" >&#9658;</button>
            </div>


        </div>
    );
}

export default Chat;
