import { Button, Form, InputGroup } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Send } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { useAddMessageMutation } from '../../store/services/messagesApi';
import showToastMessage from '../../utils/toast';

export const MessageForm = () => {
  const inputRef = useRef(null);
  const [addMessage, { isLoading, isError }] = useAddMessageMutation();
  const { activeChannelId } = useSelector((state) => state.channels);
  const { username } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      const newMessage = {
        body: leoProfanity.clean(values.message),
        channelId: activeChannelId,
        username,
      };
      addMessage(newMessage)
        .then((response) => {
          if (response.error?.status === 'FETCH_ERROR') {
            showToastMessage(t('errors.fetchError'), 'error');

            return;
          }

          if (!isError) {
            formik.values.message = '';
          }
          inputRef.current.focus();
        });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [isLoading]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="p-0 rounded-3 border" noValidate onSubmit={formik.handleSubmit}>
        <InputGroup hasValidation>
          <Form.Control
            className="border-0 p-0 ps-2"
            name="message"
            ref={inputRef}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.message}
            disabled={isLoading}
            autoFocus
            placeholder={t('chat.messages.enterMessage')}
            inputMode="text"
            autoComplete="off"
            aria-label={t('message.newMessage')}
          />
          <Button
            className="ms-1"
            variant="outline-secondary"
            type="submit"
            disabled={!formik.values.message.length || isLoading}
          >
            <Send size={18} />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};
