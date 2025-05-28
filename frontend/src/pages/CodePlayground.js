import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress
} from '@mui/material';
import { PlayArrow as RunIcon } from '@mui/icons-material';
import Editor from '@monaco-editor/react';

const CodePlayground = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(getDefaultCode(language));
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function getDefaultCode(lang) {
    switch (lang) {
      case 'javascript':
        return `// Write your JavaScript code here
function example() {
  console.log("Hello, World!");
  // Try some array operations
  const numbers = [1, 2, 3, 4, 5];
  console.log("Sum:", numbers.reduce((a, b) => a + b));
  // Try some string operations
  const message = "Hello, World!";
  console.log("Reversed:", message.split('').reverse().join(''));
}

example();`;
      case 'python':
        return `# Write your Python code here
def example():
    print("Hello, World!")
    # Try some list operations
    numbers = [1, 2, 3, 4, 5]
    print("Sum:", sum(numbers))
    # Try some string operations
    message = "Hello, World!"
    print("Reversed:", message[::-1])

example()`;
      default:
        return '';
    }
  }

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    setCode(getDefaultCode(newLanguage));
    setOutput('');
    setError('');
  };

  const handleRunCode = async () => {
    setLoading(true);
    setError('');
    setOutput('');

    try {
      if (language === 'javascript') {
        // JavaScript execution (client-side)
        const logs = [];
        const originalConsoleLog = console.log;
        console.log = (...args) => {
          logs.push(args.join(' '));
        };
        
        // Use Function constructor to evaluate the code
        new Function(code)();
        
        console.log = originalConsoleLog;
        setOutput(logs.join('\n'));
      } else if (language === 'python') {
        // Python execution (server-side)
        const response = await fetch('http://localhost:5000/api/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, language }),
        });

        const data = await response.json();
        
        if (response.ok) {
          setOutput(data.output);
        } else {
          setError(data.error);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Code Playground
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                label="Language"
                onChange={handleLanguageChange}
              >
                <MenuItem value="javascript">JavaScript</MenuItem>
                <MenuItem value="python">Python</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RunIcon />}
              onClick={handleRunCode}
              disabled={loading}
            >
              Run Code
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3}
            sx={{ 
              height: '500px', 
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <Box sx={{ height: '100%', width: '100%' }}>
              <Editor
                height="100%"
                defaultLanguage={language}
                language={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  padding: { top: 16, bottom: 16 },
                  lineNumbers: 'on',
                  renderLineHighlight: 'all',
                  scrollbar: {
                    vertical: 'visible',
                    horizontal: 'visible'
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3}
            sx={{ 
              height: '500px', 
              p: 2,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Output
            </Typography>
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                bgcolor: '#1e1e1e',
                color: '#fff',
                p: 2,
                borderRadius: 1,
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                minHeight: 0
              }}
            >
              {error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                output || 'Run your code to see the output here...'
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CodePlayground; 