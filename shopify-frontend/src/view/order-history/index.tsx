import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import {authStorage} from "../../storage/auth-storage";
import {useNavigate} from "react-router-dom";
import {getOrder} from "../../service/order.service";

export default function OrderHistory() {
    const navigate = useNavigate();

    const [rows, setRows] = useState([])

    useEffect(() => {
        if(!authStorage.get()){
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        getOrder()
            .then(res => {
                if (!!res?.result){
                    setRows(res?.result?.data)
                }
            })
    }, [])

    return (
        <div>
            Order history
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order code</TableCell>
                            <TableCell align="right">Total amount</TableCell>
                            <TableCell align="right">Created at</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: any) => (
                            <TableRow
                                key={row?.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row?.id}
                                </TableCell>
                                <TableCell align="right">{row.total_amount}</TableCell>
                                <TableCell align="right">{row?.created_at}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
