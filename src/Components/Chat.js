import React, { useEffect ,useState}  from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import uuid from 'react-uuid'

let socket;
const Chat =({location}) =>{

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message , setMessage] = useState('');
    const [messages , setMessages] = useState([])


    const serverEndPoint = 'http://localhost:7070/';

    useEffect( ()=>{
        const {name , room} = queryString.parse(location.search);

        setName(name)
        setRoom(room)

        socket = io(serverEndPoint)

        socket.emit('join',{name, room})




    },[serverEndPoint,location.search])


    useEffect ( ()=>{
        socket.on('message',(message)=>{
                setMessages([ ... messages , message])
        });
        
    },[,messages])

    const sendingMessage=(event)=>{
        event.preventDefault();
        setMessage('');

        if(message){
            socket.emit('sendMessage', message)
        }
    }

    return(
        <div className="m-auto" style={{
            width:'70%',
            height:'60vh',
        }}>
            <strong>Room: ${room}</strong>
            <br></br>
            <br></br>

            <section style={{
            width:'100%',
            height:'75vh',
            padding:'20px',
            overflowY:'scroll',
            borderRadius:'20px',
            boxShadow:'0px 0px 10px black'
        }}>
                {
                    messages.map(e=>{

                   
                     return (

                        e.user == name 
                        ? 
                            <div key={uuid()} class="border alert alert-light d-flex justify-content-between" role="alert">
                                <section>
                                <strong> {e.user} : </strong>
                                <span style={{marginLeft:'20px'}}> {e.text} </span>
                                </section>
                                <span className="text-muted">{e.time}</span>
                            </div>
                            :
                            <div  key={uuid()} class=" alert alert-primary  d-flex justify-content-between  " role="alert" >
                            <section>
                                <strong> {e.user}  :</strong>
                                <span style={{marginLeft:'20px'}}> {e.text} </span>
                                </section>
                                <span className="text-muted">{e.time}</span>
                           </div>

                            
                       ) 
                    })
                }

            </section>
            <section style={{
                position:'relative',
                bottom:'0px',
            }}>
                <input
                 className="form-control m-auto  p-2"
                 placeholder="send message ..."
                  onChange={({target})=>setMessage(target.value) } 
                  onKeyPress={event => event.key ==='Enter'?sendingMessage(event):null}
                  />
            </section>
        </div>
    )

}
export default Chat;