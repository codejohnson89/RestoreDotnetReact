import { Divider, Grid, Table, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/product";

export default function ProductDetails() {

    const {id} = useParams<{id: string}>();
    const [ product, setProduct ] = useState<Product | null>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/Products/${id}`)
        .then(res => {
            setProduct(res.data);
            setLoading(false);
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }, [id])

    if (loading) return <h1>Loading...</h1>

    if (!product) return <h1>Product not found</h1>

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h3" gutterBottom>{product.name}</Typography>
                    <Divider sx={{mb: 2}}/>
                    <Typography variant="h5" gutterBottom>${(product.price / 100).toFixed(2)}</Typography>
                    <TableContainer>
                        <Table>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    )
}