import { useMutation } from '@apollo/client'
import LollySvg from '../svg/lolly'
import React from 'react';
import * as Yup from "yup"
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField} from "@material-ui/core";
import gql from 'graphql-tag'
import { navigate } from 'gatsby';


const ADD_LOLLY_DATA = gql`
  mutation addLolly($sender: String, $message: String, $reciever: String, $topFlavor: String, $MidFlavor: String, $BottomFlavor: String, $lollypath:String) {
    addLolly(sender: $sender, message: $message, reciever: $reciever, topFlavor: $topFlavor, MidFlavor: $MidFlavor, BottomFlavor: $BottomFlavor, lollypath: $lollypath) {
    
      sender
      message
      reciever
    

    }
  }
`


export default function NewLolly() {

    const [addLolly] = useMutation(ADD_LOLLY_DATA )

    const [topFlavor, setTopFlavor] = React.useState<string>("#7D5A50")
    const [MidFlavor, setMidFlavor] = React.useState<string>("#0A1931")
    const [BottomFlavor, setBottomFlavor] = React.useState<string>("#FFC947")
    const [sender, setSender] = React.useState("")
    const [message, setMessage] = React.useState("")
    const [receiver, setReceiver] = React.useState("")


  const senderValue= ({node}) =>{
    setSender(node)
  } 
  const messageValue= ({node}) =>{
    setMessage(node)
  }

  const receiverValue= ({node}) =>{
    setReceiver(node)
  }


  const handleSubmt = (e) => {
    console.log(e, topFlavor);
    addLolly({
         variables: {
          sender: e.sender,
          message: e.message,
          reciever: e.receiver,
          topFlavor: topFlavor,
          MidFlavor: MidFlavor ,
          BottomFlavor: BottomFlavor,
        }
    })
    navigate(``)
    
  }

    const formSchema = Yup.object().shape({
        sender: Yup.string()
        .min(2, "Too Short")
        .max(60, "Too Long")
        .required("Required"),
        message: Yup.string()
        .min(2, "Too Short")
        .required("Required"),
        receiver: Yup.string()
        .min(2, "Too Short")
        .required("Required")
      })
    return (
        <div>
            <div>
            <LollySvg topFlavor={topFlavor} MidFlavor={MidFlavor} BottomFlavor={BottomFlavor} />
            <input type="color" value={topFlavor} onChange={(e) => {setTopFlavor(e.target.value)}}/>
            <input type="color" value={MidFlavor} onChange={(e) => {setMidFlavor(e.target.value)}}/>
            <input type="color" value={BottomFlavor} onChange={(e) => {setBottomFlavor(e.target.value)}}/>
            </div>
  
            <div>
            <h1>Hellow</h1>
            <Formik initialValues={{
                sender: sender,
                message: message ,
                receiver:receiver ,
            }}
            validationSchema={formSchema}
            onSubmit={handleSubmt}
            >
            {(formik:any) => (
                <Form>
                <Field  color='secondary' name="sender" as={TextField}  type="title" variant="outlined"
                label="To"
                autoComplete="off"
                ref={senderValue}
                />
                <br />
                <ErrorMessage
                  name="sender"
                  render={(msg: string) => (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {msg}
                    </span>
                  )}
                />
                 <Field  color='secondary' name="message" as={TextField}  type="title" variant="outlined"
                label="Message"
                multiline
                rows={6}
                autoComplete="off"
                ref={messageValue}
                />
                <br />
                <ErrorMessage
                  name="message"
                  render={(msg: string) => (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {msg}
                    </span>
                  )}
                />
                 <Field  color='secondary' name="receiver" as={TextField}  type="title" variant="outlined"
                label="From"
                autoComplete="off"
                ref={receiverValue}
                />
                <br />
                <ErrorMessage
                  name="receiver"
                  render={(msg: string) => (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {msg}
                    </span>
                  )}
                />
                <Button  color="secondary" variant="contained" type="submit" >CREATE LOLLY</Button>
                </Form>
            )}
            </Formik>
        </div>

        </div>
    )
}
