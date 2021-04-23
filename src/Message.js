import React, { forwardRef } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './Message.css'

const Message = forwardRef(({ username, message }, ref) => {

    const isUser = username === message.username

    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? 'message__userCard' : 'message__guestCard'} >
                <CardContent>
                    <Typography style={{ textAlign: 'left', fontSize: '15px', color: 'red' }} color="white" variant="h6" component="h6">
                        {!isUser && `${message.username || 'Unknown User'} `} 
                    </Typography>
                    <Typography style={{ fontSize: '18px' }} color="white" variant="h6" component="h2">
                        {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})

export default Message
