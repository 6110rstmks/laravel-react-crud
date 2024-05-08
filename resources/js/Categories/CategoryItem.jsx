import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

export default function CategoryItem({ category, deleteCategory, editCategory}) {
    const [open, setOpen] = useState(false);

    const [inputTitle, setInputTitle] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputTitleChange = (event) => {
        setInputTitle(event.target.value);
    };

    const handleUpdate = (e) => {
        // カテゴリーの更新処理
        editCategory(e.target, inputTitle)
        handleClose();
    };

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

    return (
        <div key={category.id}>
            <Link underline="none" color="green" href={`./yuy/${category.id}`}>{category.title}</Link>
            <Button id={category.id} onClick={deleteCategory}>☓</Button>
            <Button onClick={handleOpen}>Edit</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Category
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        defaultValue={category.title}
                        onChange={handleInputTitleChange}
                        variant="outlined" />
                    <Button id={category.id} onClick={handleUpdate}>Update</Button>
                </Box>
            </Modal>
        </div>
    );
}
