import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Grid, IconButton, Dialog, DialogContent } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import data from '../data/numbers.json'; // numbers.json dosyasını içeri aktarın

function Numbers() {
  const [numbers, setNumbers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [usedNumbers, setUsedNumbers] = useState(new Set());
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    setNumbers(shuffle(data));
  }, []);

  const shuffle = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const [openDialog, setOpenDialog] = useState(false);


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getNextNumber = () => {
    if (usedNumbers.size === numbers.length) {
      setUsedNumbers(new Set());
      setNumbers(shuffle(data));
    }

    let newIndex;
    let attempts = 0;
    do {
      newIndex = Math.floor(Math.random() * numbers.length);
      attempts++;
      if (attempts > numbers.length * 2) break;
    } while (usedNumbers.has(newIndex));

    if (!usedNumbers.has(newIndex)) {
      setUsedNumbers(prevUsedNumbers => new Set(prevUsedNumbers).add(newIndex));
      setCurrentNumberIndex(newIndex);
    }
  };

  const checkAnswer = () => {
    if (inputValue.trim() === numbers[currentNumberIndex]?.num) {
      setInputValue('');
      setCorrectCount(prevCount => prevCount + 1);
      getNextNumber();
      toast.success('Doğru cevap!');
    } else {
      setInputValue('');
      setIncorrectCount(prevCount => prevCount + 1);
      toast.error('Yanlış cevap! Tekrar deneyin.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Dialog penceresini kapat
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', position: 'relative' }}>

      <IconButton
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: 'primary.main',
        }}
        onClick={() => setOpenDialog(true)} // Dialog'u aç
      >
        <HelpOutlineIcon fontSize="large" />
      </IconButton>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h3" gutterBottom>
          Korece Sayılar
        </Typography>
        <Typography variant="h6" paragraph>
          Rakam karşılığını yazınız.
        </Typography>

        <Typography variant="h2" sx={{ fontSize: '48px', fontWeight: 'bold', marginBottom: 3 }}>
          {numbers[currentNumberIndex]?.num_kr}
        </Typography>

        <TextField
          label="Rakam karşılığını yazınız"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          fullWidth
          sx={{ marginBottom: 3 }}
        />

        <Button variant="contained" color="primary" onClick={checkAnswer} sx={{ width: '100%', padding: '10px' }}>
          Kontrol Et
        </Button>

        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h6" color="success.main">
              Doğru Cevaplar: {correctCount}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="error.main">
              Yanlış Cevaplar: {incorrectCount}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent>
          <img src="/assets/numbers.png" alt="Yardım Resmi" style={{ width: '90%' }} />
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </Container>
  );
}

export default Numbers;