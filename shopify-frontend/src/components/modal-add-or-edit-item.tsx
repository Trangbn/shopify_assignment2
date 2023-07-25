import React, {useState} from "react";
import {
    Modal, Box, Button, TextField,
    List, ListItem, IconButton, Skeleton
} from '@mui/material';
import {style} from "./modal-login-or-register";
import {DeleteOutline} from "@mui/icons-material";
import {Item} from "../redux/slice";
import {createProduct, editProduct, uploadFile} from "../service/item.service";
import {convertImage} from "../utils/convert";

type ModalAddOrEditItemProps = {
    open: boolean;
    onClose: () => void;
    isEdit: boolean;
    dataSource?: Item
}

export const ModalAddOrEditItem = ({open, onClose, isEdit, dataSource}: ModalAddOrEditItemProps) => {

    const [formData, setFormData] = useState({
        name: dataSource?.name ?? '',
        price: dataSource?.price ?? 1,
        image: dataSource?.image ?? ''
    });

    const [fileImage, setFileImage] = useState();
    const [isUploadImage, setIsUploadImage] = useState(false);

    const handleSubmit = () => {
        if (isEdit){
            editProduct({...formData, id: dataSource?.id})
                .then(res => {
                    if (res?.type === "success"){
                        onClose();
                        window.location.reload();
                    }
                })
        } else {
            createProduct(formData)
                .then(res => {
                    if (res?.type === "success"){
                        onClose();
                        window.location.reload();
                    }
                })
        }
    }

    const handleUploadImage = (e: any) => {
        setIsUploadImage(true);
        setFileImage((e.target as any)?.files[0])
        uploadFile((e.target as any)?.files[0])
            .then(res => {
                if (res?.result){
                    setFormData(prev => ({
                        ...prev,
                        image: res?.result
                    }))
                }
                setIsUploadImage(false);
            })
    }

    const isDisableAdd = !formData.name || !formData.price || (!fileImage && !formData.image)

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="bg-white flex flex-col items-center rounded-xl absolute top-50 ">
                <h5>
                    {
                        isEdit ? "Edit" : "Create"
                    }
                    &nbsp;<span>item</span>
                </h5>
                <div className="mt-3">
                    <TextField
                        label="Name"
                        size="small"
                        className='w-full'
                        value={formData?.name}
                        onChange={e => {
                            setFormData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }}
                    />
                    <TextField
                        label="Price"
                        size="small"
                        className='w-full my-4'
                        value={formData?.price}
                        onChange={e => {
                            setFormData(prev => ({
                                ...prev,
                                price: +e.target.value ?? 1
                            }))
                        }}
                        type="number"
                        InputProps={{
                            inputProps: {
                                max: 100, min: 1
                            }
                        }}
                    />
                    {
                        isUploadImage ? (
                                <Skeleton variant="rectangular" className="!w-32 !h-32"/>
                            ) :
                            formData?.image || fileImage ? (
                                <List dense sx={{bgcolor: 'background.paper'}}>
                                    <ListItem
                                        secondaryAction={
                                            <IconButton
                                                color="error"
                                                onClick={() => {
                                                    setFileImage(undefined)
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        image: ''
                                                    }))
                                                }}
                                            >
                                                <DeleteOutline/>
                                            </IconButton>
                                        }
                                        disablePadding
                                    >
                                        <input
                                            type='image'
                                            alt="image"
                                            src={fileImage ? URL.createObjectURL(fileImage) : convertImage(formData?.image) }
                                            className="object-fit-cover w-32 h-32"
                                        />
                                    </ListItem>
                                </List>
                            ) : (
                                <TextField
                                    label=""
                                    size="small"
                                    className='w-full'
                                    type='file'
                                    onChange={handleUploadImage}
                                />
                            )
                    }
                </div>
                <div className="mt-5 flex justify-end w-full">
                    <Button variant="text" onClick={onClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        className='!ml-4'
                        onClick={handleSubmit}
                        disabled={isDisableAdd}
                    >
                        {isEdit ? "Save" : " Add"}
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}
