
import React, { useRef } from 'react';
import * as Yup from "yup"
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField} from "@material-ui/core";


export default function FormField() {

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
    console.log(e);
    
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
                label="To"
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
                label="To"
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
                <Button  color="secondary" variant="contained" type="submit" >Add</Button>
                </Form>
            )}
            </Formik>
        </div>
    )
}
