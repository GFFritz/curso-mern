import { React, useState, useEffect } from 'react';
import { makeStyles, Box, Container, Grid, Paper, Button, ButtonGroup, Chip } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

import Footer from '../../../components/footer-admin'
import MenuAdmin from '../../../components/menu-admin';

import api from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 240,
  },
  paper: {
    padding: 35,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  table:{
    minWidth: 650,
  }
}));


function UsuariosListagem() {
  const classes = useStyles();

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function loadUsuarios(){
      const response = await api.get("/api/usuarios")
      setUsuarios(response.data)
    }
    loadUsuarios();
  },[])

  async function handleDelete(id){
    if (window.confirm("Deseja realmente excluir este usuário?")){
      var result = await api.delete('/api/usuarios/'+id);
      if (result.status === 200){
        window.location.href = '/admin/usuarios';
      }else{
        alert('Ocorreu algum erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'USUÁRIOS'}/>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Paper className={classes.paper}>
                <h2>Listagem de Usuário</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="left">E-mail</TableCell>
                            <TableCell align="left">Tipo</TableCell>
                            <TableCell align="left">Data de Cadastro</TableCell>
                            <TableCell align="right">Opções</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {usuarios.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell component="th" scope="row">
                                {row.nome_usuario}
                              </TableCell>
                              <TableCell align="left">{row.email_usuario}</TableCell>
                              <TableCell align="left">{row.tipo_usuario===1?<Chip label="Administrador" color="primary" />:<Chip label="Funcionário" color="secondary" />}</TableCell>
                              <TableCell align="left">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                              <TableCell align="right">
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                  <Button color="primary" href={'/admin/usuarios/editar/'+row._id}>Atualizar</Button>
                                  <Button color="secondary" onClick={() =>handleDelete(row._id)}>Excluir</Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default UsuariosListagem;
