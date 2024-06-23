import { Button, Form, InputGroup } from "react-bootstrap";
import { useRef } from "react";
import { useFormik } from "formik";
import { Send } from "react-bootstrap-icons";
import { useAddMessageMutation } from "../../store/services/messagesApi";
import { useSelector } from "react-redux";

export const MessageForm = () => {
  const inputRef = useRef(null);
  const [ addMessage, { isLoading, isSuccess, isError } ] = useAddMessageMutation();
  const { activeChannelId } = useSelector((state) => state.channels);
  const { username } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      const newMessage = {
        body: values.message,
        channelId: activeChannelId,
        username,
      }
      addMessage(newMessage)

      if(!isError) {
        formik.values.message = '';
      }
    },
  })

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="p-0 rounded-3 border" noValidate onSubmit={ formik.handleSubmit }>
        <InputGroup hasValidation>
          <Form.Control
            className="border-0 p-0 ps-2"
            name="message"
            ref={ inputRef }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
            value={ formik.values.message }
            disabled={ isLoading }
            autoFocus
            placeholder="Введите сообщение..."
            inputMode="text"
            autoComplete="off"
            /*isInvalid={isError || !formik.isValid}*/
          />
          <Button
            className="ms-1"
            variant="outline-secondary"
            type="submit"
            disabled={ !formik.values.message.length || isLoading }
          >
            <Send size={ 18 } />
          </Button>
          {/*{(isError || !formik.isValid) && (*/ }
          {/*  <Form.Control.Feedback type="invalid" tooltip>*/ }
          {/*    {addMessageError?.error}*/ }
          {/*    {' '}*/ }
          {/*    {t(formik.errors?.message)}*/ }
          {/*  </Form.Control.Feedback>*/ }
          {/*)}*/ }
        </InputGroup>
      </Form>
    </div>
  )
}
