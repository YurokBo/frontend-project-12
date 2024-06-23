import { Button, Modal, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useAddChannelMutation, useUpdateChannelMutation } from "../../store/services/channelsApi";
import { useDispatch } from "react-redux";
import { actions } from "../../store";
import { useEffect, useState } from "react";

export const RenameChannelModal = ({ ...props }) => {
  const { show, hide, renameChannelData: { id, name } } = props;
  const [ updateChannel, { isLoading, isSuccess } ] = useUpdateChannelMutation();
  const [ formikInitialValues, setFormikInitialValues ] = useState({ name: '' });
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('useEffect', name)
  //   if(!name.length) {
  //     return;
  //   }
  //
  //   setFormikInitialValues({ name });
  //
  //
  //   console.log('useEffect formikInitialValues', formikInitialValues)
  //   console.log('useEffect formik...InitialValues', formik.initialValues)
  // }, [ id, show ]);

  // console.log('formikInitialValues', formikInitialValues)

  const formik = useFormik({
    initialValues: {
      ...formikInitialValues,
    },
    onSubmit: (values) => {
      // console.log(values)
      const { name } = values;
      const trimmedName = name.trim();

      // console.log('onSubmit', name)
      // console.log('onSubmit formikInitialValues', formikInitialValues)

      // console.log(trimmedName)

      // updateChannel({ id, name: trimmedName })
      //   .then((data) => {
      //     // dispatch(actions.addChannel({ ...data }))
      //     console.log('updateChannel data', data)
      //     hide();
      //     formik.values.name = '';
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   })
    }
  });

  // console.log('formik', formik.initialValues)

  return (
    <Modal show={ show } onHide={ hide } centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={ formik.handleSubmit }>
          <Form.Group className="mb-2">
            <Form.Control
              id="name"
              type="text"
              autoFocus
              onChange={ formik.handleChange }
              value={ formik.values.name }
            />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={ hide }>Отменить</Button>
            <Button disabled={ isLoading } type="submit">
              {/*|| !formik.values.name.length*/}
              { isLoading ? 'Загрузка…' : 'Отправить' }
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
