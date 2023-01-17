import { 
    Form, 
    useLoaderData,
    redirect,    
} from "react-router-dom";
import { updatePost } from "../posts";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updatePost(params.postId, updates);
    return redirect(`/posts/${params.postId}`);
  }

export default function EditPost() {
  const post = useLoaderData();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Form method="post" id="post-form">
      <p>
        <span>Titulo del post</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={post.title}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="hidden"
          name="last"
          defaultValue={post.last}
        />
      </p>
      <label>
        <span></span>
        <input
          type="hidden"
          name="twitter"
          placeholder="@jack"
          defaultValue={post.twitter}
        />
      </label>
      <label>
        <span></span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="hidden"
          name="avatar"
          defaultValue={post.avatar}
        />
      </label>
      <label>
        <span>Contenido</span>
        <textarea
          name="notes"
          defaultValue={post.body}
          rows={6}
        />
      </label>
      <p>
        <Button onClick={handleOpen} type="submit">Guardar</Button>
        <Button onClick={handleOpen} type="button">Cancelar</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              accion realizada con exito
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </p>
    </Form>
  );
}