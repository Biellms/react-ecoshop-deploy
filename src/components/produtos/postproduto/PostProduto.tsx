import './PostProduto.css'
import { TextField, Paper, Button, styled, InputLabel, Select, SelectChangeEvent, MenuItem, FormControl } from '@mui/material';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../../../models/Categoria';
import { TokenState } from '../../../store/tokens/tokensReduce';
import { useSelector } from 'react-redux';
import User from '../../../models/User';
import Produto from '../../../models/Produto';
import { busca, buscaId, post, put } from '../../../service/Service';
import { toast } from 'react-toastify';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#97C160',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#97C160',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#97C160',
        },
    },
});

export const PostProduto = () => {

    const handleClose = () => setOpen(true);
    const [open, setOpen] = useState(false);
    const { id } = useParams<{ id: string }>();
    const [categorias, setCategorias] = useState<Categoria[]>([])

    const idUser = useSelector<TokenState, TokenState["ids"]>(
        (state) => state.ids
    )
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    let navigate = useNavigate();

    useEffect(() => {
        if (open) {

            navigate('/VenderResp')
        }
    }, [open])

    useEffect(() => {
        if (token == "") {

            toast.error('Você precisa estar logado!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });

            navigate("/login")
        }
    }, [token])

    const [user, setUser] = useState<User>(
        {
            id: idUser,
            nome: '',
            usuario: '',
            senha: ''
        })

    const [categoria, setCategoria] = useState<Categoria>(
        {
            id: 0,
            nomeCategoria: '',
            descricao: ''
        })

    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nomeProduto: '',
        descricao: '',
        preco: 0,
        imagem: '',
        categoria: null,
        usuario: user
    })

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria
        })
    }, [categoria])

    async function getCategorias() {
        await busca('/categorias', setCategorias, {
            headers: { 'Authorization': token }
        })
    }

    async function findByIdProduto(id: string) {
        await buscaId(`produtos/${id}`, setProduto, {
            headers: { 'Authorization': token }
        })
    }

    useEffect(() => {
        getCategorias()
        if (id !== undefined) {
            findByIdProduto(id)
        }
    }, [id])

    function updatedProduto(e: ChangeEvent<HTMLInputElement>) {

        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria
        })

    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            put(`/produtos`, produto, setProduto, {
                headers: {
                    'Authorization': token
                }
            })

            toast.success('Produto atualizado com sucesso!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });

        } else {
            post(`/produtos`, produto, setProduto, {
                headers: {
                    'Authorization': token
                }
            })

            toast.success('Produto cadastrado com sucesso!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
        }
        navigate('/VenderResp')
    }

    return (
        <Paper elevation={12} className='post-card'>
            <div className='post-card-logo'>
                <h3>
                    <span className='ecoshop-header-eco'>ECO</span>
                    <span className='ecoshop-header-shop'>SHOP</span>
                    <img src="./img/logoEcoshop.png" alt="" />
                </h3>
            </div>
            <div className='post-card-info'>
                <h3>Preencha os campos</h3>
            </div>
            <form onSubmit={onSubmit} className='post-card-form'>
                <div className='post-card-form-input'>
                    <CssTextField id='nomeProduto' label='Nome do Produto' variant='outlined' name='nomeProduto' fullWidth
                        value={produto.nomeProduto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)}
                    />
                    <CssTextField id='descricao' label='Descrição do Produto' variant='outlined' name='descricao' fullWidth
                        value={produto.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)}
                    />
                    <CssTextField id='preco' label='Preço' variant='outlined' name='preco' fullWidth
                        value={produto.preco} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)}
                    />
                    <CssTextField id='imagem' label='URL da Imagem' variant='outlined' name='imagem' fullWidth
                        value={produto.imagem} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedProduto(e)}
                    />
                    <FormControl variant="standard" fullWidth>
                        <InputLabel id="input-categoria-label">Categoria</InputLabel>
                        <Select
                            labelId="input-categoria-label"
                            id="input-categoria"
                            onChange={(e) => buscaId(`/categorias/${e.target.value}`, setCategoria, {
                                headers: {
                                    'Authorization': token
                                }
                            })}>
                            {
                                categorias.map(categoria => (
                                    <MenuItem value={categoria.id}>{categoria.nomeCategoria}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className='post-card-form-button'>
                    <Button className='button-post' type='submit' variant="contained">
                        Confirmar
                    </Button>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancelar
                    </Button>
                </div>
            </form>
        </Paper>
    );
}