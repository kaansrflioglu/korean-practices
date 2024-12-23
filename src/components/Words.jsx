import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from '../data/words.json';

function Words() {
  const [alphabet, setAlphabet] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [usedWords, setUsedWords] = useState(new Set());
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    setAlphabet(shuffle(data));
  }, []);

  const shuffle = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getNextWord = () => {
    if (usedWords.size === alphabet.length) {
      setUsedWords(new Set());
      setAlphabet(shuffle(data));
    }

    let newIndex;
    let attempts = 0;
    do {
      newIndex = Math.floor(Math.random() * alphabet.length);
      attempts++;
      if (attempts > alphabet.length * 2) break;
    } while (usedWords.has(newIndex));

    if (!usedWords.has(newIndex)) {
      setUsedWords(prevUsedWords => new Set(prevUsedWords).add(newIndex));
      setCurrentWordIndex(newIndex);
    }
  };

  const checkAnswer = () => {
    const correctAnswers = alphabet[currentWordIndex]?.word_tr.map(ans => ans.toLowerCase());
    if (correctAnswers.includes(inputValue.trim().toLowerCase())) {
      setInputValue('');
      setCorrectCount(prevCount => prevCount + 1);
      getNextWord();
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


  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', position: 'relative' }}>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h3" gutterBottom>
          Korece Kelimeler
        </Typography>
        <Typography variant="h6" paragraph>
          Türkçe karşılığını yazınız.
        </Typography>

        <Typography variant="h2" sx={{ fontSize: '48px', fontWeight: 'bold', marginBottom: 3 }}>
          {alphabet[currentWordIndex]?.word_kr}
        </Typography>

        <TextField
          label="Türkçe karşılığını yazınız"
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

      <ToastContainer />
    </Container>
  );
}

export default Words;
