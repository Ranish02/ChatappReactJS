import React, { useState } from "react";
import io from 'socket.io-client';
import Chat from "./Chat";
const socket = io.connect("https://baseappnodeapp.herokuapp.com/");
function App() {

  const [username, setusername] = useState();
  const [room, setroom] = useState();

  const [showchat, setshowchat] = useState(false);


  const joinroom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setshowchat(true);
    }
    else {
      console.log("data error");
    }
  }




  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[600px]">
        <div className=" flex justify-center">
          <div className=" text-center max-w-[800px]">
            {!showchat ? (
              <div className="bg-[#EEE] flex w-[300px] text-xl rounded-lg h-full">
                <div className="w-full text-center mx-4 my-4">
                  <div>
                    <div className="font-bold text-center mb-4">Username</div>
                    <div className="border border-black mb-4 ">
                      <input type="text" className="w-full" onChange={(event) => { setusername(event.target.value) }} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-center mb-4">Room ID</div>
                    <div className="border border-black mb-4 ">
                      <input type="text" className="w-full" onChange={(event) => { setroom(event.target.value) }} />
                    </div>
                  </div>
                  <div className="mb-4"><button className="bg-[#14ff20] border border-black py-4 px-16 rounded-lg text-white" onClick={joinroom}>Join</button></div>
                </div>
              </div>

            ) : (
              <div className="w-full">
                <Chat socket={socket} username={username} room={room} />
              </div>
            )}



          </div>

        </div>

      </div>
    </div >




  );
}

export default App;
