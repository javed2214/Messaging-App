import React, { useState, useEffect } from 'react'
import './App.css'
import { Button, FormControl, InputLabel, Input, Typography } from '@material-ui/core'
import Message from './Message'
import db from './firebase'
import firebase from 'firebase'
import FlipMove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import validator from 'validator'

const App = () => {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const [username, setUsername] = useState('')
    const [lobbyid, setLobbyid] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [messages])

    useEffect(() => {
        db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
        })
    }, [])

    useEffect(() => {
        setUsername(prompt('Enter your Name: '))
        // setLobbyid(prompt('Enter Lobby ID: '))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        window.scrollTo(0, 0)
        setInput(input.trim())
        if(input.length > 0){
            db.collection('messages').add({
                message: input,
                username: username,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                lobbyid: lobbyid
            })
        }
        setInput('')
    }

    return(
        <div className="App">
            <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=40&h=40" style={{marginTop: '2px'}} alt=""/>
            {/* <Typography color="primary" variant="h5" component="h2">Messenger App</Typography> */}
            <Typography color="primary" variant="h5" component="h1">Welcome <span style={{fontWeight: 'bold', color: 'red'}}>{username}</span></Typography>

            <form className="app__form">
                <FormControl className="app__formControl">
                    <InputLabel></InputLabel>
                    <Input value={input} onChange={(e) => setInput(e.target.value)} />
                    
                    <IconButton
                        disabled={!input} variant="contained" color="primary" type="submit" onClick={(e) => sendMessage(e)}>
                        <SendIcon />
                    </IconButton>
                </FormControl>
            </form>

            <FlipMove>
                {messages.map(({lobby, id, message}) => {
                    return (<Message key={id} username={username} message={message} />)
                })}
            </FlipMove>

        </div>
    )
}

export default App;