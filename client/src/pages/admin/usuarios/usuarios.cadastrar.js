import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Paper, FormControl, MenuItem, InputLabel, Select, Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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
  paper: {
    padding: 35,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    width: '100%',
  },
}));

export default function UsuarioCadastrar() {
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');

  async function handleSubmit(){
    const data = {
      nome_usuario:nome,
      email_usuario:email,
      senha_usuario:senha,
      tipo_usuario:tipo
    }

    if (nome !== '' && email !== '' && senha !== '' && tipo !== ''){
      const response = await api.post('/api/usuarios', data);

      if(response.status === 200){
        window.location.href='/admin/usuarios'
      }else{
        alert('Erro ao cadastrar o usuário');
      }
    }else{
      alert('Por Favor, preencha todos os dados');
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
                <h2>Cadastro de Usuário</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome Completo"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="E-mail"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labelTipo">Tipo</InputLabel>
                      <Select
                      labelId="labelTipo"
                      id="tipo"
                      value={tipo}
                      onChange={e => setTipo(e.target.value)}
                      >
                        <MenuItem value={1}>Administrador</MenuItem>
                        <MenuItem value={2}>Funcionário</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="password"
                      required
                      id="senha"
                      name="senha"
                      label="Senha"
                      fullWidth
                      autoComplete="senha"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleSubmit}>
                    Salvar
                  </Button>
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

