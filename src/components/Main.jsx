import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Main() {
    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Grid container direction="column" alignItems="center" justifyContent="center">
                <Typography variant="h3" gutterBottom>
                    Hoş Geldiniz!
                </Typography>
                <Typography variant="h5" paragraph align="center">
                    Bu site temel Korece temellerinizi güçlendirmenizde size yardımcı olmak için yapıldı.
                </Typography>
                <hr style={{ width: '100%', margin: '20px 0' }} />
                <Typography variant="body1" align="center" paragraph sx={{ mb: 0 }}>
                    Dilerseniz beni GitHub veya LinkedIn üzerinden takip edebilirsiniz.
                </Typography>
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 1 }}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://github.com/kaansrflioglu"
                            target="_blank"
                            rel="noopener noreferrer"
                            size="large"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                px: 3,
                            }}
                        >
                            <FaGithub size={24} style={{ marginRight: 8 }} />
                            GitHub
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            href="https://www.linkedin.com/in/kaansereflioglu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            size="large"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                px: 3,
                            }}
                        >
                            <FaLinkedin size={24} style={{ marginRight: 8 }} />
                            LinkedIn
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Main;
