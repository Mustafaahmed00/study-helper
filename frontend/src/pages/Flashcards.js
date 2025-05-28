import React, { useState } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PrevIcon
} from '@mui/icons-material';

const Flashcards = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      question: 'What is a Binary Search Tree?',
      answer: 'A binary search tree is a hierarchical data structure where each node has at most two children, and the left child is less than the parent while the right child is greater.'
    },
    {
      id: 2,
      question: 'What is the time complexity of Binary Search?',
      answer: 'O(log n) - The search space is divided in half with each comparison.'
    },
    {
      id: 3,
      question: 'Explain the difference between Stack and Queue.',
      answer: 'Stack is LIFO (Last In First Out) - elements are added and removed from the same end. Queue is FIFO (First In First Out) - elements are added at one end and removed from the other end.'
    },
    {
      id: 4,
      question: 'What is Big O notation and why is it important?',
      answer: 'Big O notation describes the performance or complexity of an algorithm. It helps us understand how an algorithm\'s execution time or space requirements grow as the input size increases.'
    },
    {
      id: 5,
      question: 'Explain the concept of Dynamic Programming.',
      answer: 'Dynamic Programming is a method for solving complex problems by breaking them down into simpler subproblems. It stores the results of subproblems to avoid redundant calculations.'
    },
    {
      id: 6,
      question: 'What is the difference between Array and Linked List?',
      answer: 'Arrays store elements in contiguous memory locations with fixed size, allowing O(1) access. Linked Lists store elements in nodes with pointers, allowing dynamic size but O(n) access.'
    },
    {
      id: 7,
      question: 'What is a Hash Table and how does it work?',
      answer: 'A hash table is a data structure that implements an associative array using a hash function to map keys to values. It provides O(1) average time complexity for insertions and lookups.'
    },
    {
      id: 8,
      question: 'Explain the concept of Recursion.',
      answer: 'Recursion is a programming concept where a function calls itself to solve a problem by breaking it down into smaller subproblems. It requires a base case to terminate the recursion.'
    },
    {
      id: 9,
      question: 'What is the difference between Process and Thread?',
      answer: 'A process is an independent program with its own memory space, while a thread is a lightweight process that shares memory with other threads in the same process.'
    },
    {
      id: 10,
      question: 'What is the difference between REST and GraphQL?',
      answer: 'REST is an architectural style that uses HTTP methods to perform operations on resources. GraphQL is a query language that allows clients to request specific data they need in a single request.'
    },
    {
      id: 11,
      question: 'What is the difference between SQL and NoSQL databases?',
      answer: 'SQL databases are relational, structured, and use tables with predefined schemas. NoSQL databases are non-relational, flexible, and can store unstructured data in various formats like documents, key-value pairs, or graphs.'
    },
    {
      id: 12,
      question: 'Explain the concept of Load Balancing.',
      answer: 'Load balancing distributes incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. It improves application responsiveness and availability.'
    },
    {
      id: 13,
      question: 'What is the difference between TCP and UDP?',
      answer: 'TCP is connection-oriented, reliable, and ensures data delivery with error checking. UDP is connectionless, faster, but doesn\'t guarantee delivery or order of packets.'
    },
    {
      id: 14,
      question: 'What is the difference between synchronous and asynchronous programming?',
      answer: 'Synchronous programming executes code sequentially, blocking until each operation completes. Asynchronous programming allows multiple operations to run concurrently without blocking, using callbacks, promises, or async/await.'
    },
    {
      id: 15,
      question: 'Explain the concept of Caching.',
      answer: 'Caching stores frequently accessed data in a faster storage layer to improve performance. It reduces load on the main data source and decreases response time for repeated requests.'
    },
    {
      id: 16,
      question: 'What is the difference between Stack and Heap memory?',
      answer: 'Stack memory is used for static memory allocation and stores local variables and function calls. Heap memory is used for dynamic memory allocation and stores objects and data structures.'
    },
    {
      id: 17,
      question: 'What is the difference between GET and POST requests?',
      answer: 'GET requests are used to retrieve data and parameters are sent in the URL. POST requests are used to submit data and parameters are sent in the request body, making them more secure for sensitive data.'
    },
    {
      id: 18,
      question: 'Explain the concept of Microservices Architecture.',
      answer: 'Microservices architecture breaks down applications into small, independent services that communicate via APIs. Each service handles a specific business function and can be developed, deployed, and scaled independently.'
    },
    {
      id: 19,
      question: 'What is the difference between Authentication and Authorization?',
      answer: 'Authentication verifies the identity of a user (who you are), while Authorization determines what resources and actions a user can access (what you can do).'
    },
    {
      id: 20,
      question: 'What is the difference between Horizontal and Vertical Scaling?',
      answer: 'Horizontal scaling adds more machines to your infrastructure (scale out), while vertical scaling adds more power to your existing machine (scale up).'
    }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleAddCard = () => {
    setNewCard({ question: '', answer: '' });
    setOpenDialog(true);
  };

  const handleSaveCard = () => {
    if (newCard.question && newCard.answer) {
      setCards([...cards, { id: Date.now(), ...newCard }]);
      setOpenDialog(false);
    }
  };

  const handleDeleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
    if (currentIndex >= cards.length - 1) {
      setCurrentIndex(Math.max(0, cards.length - 2));
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Flashcards
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCard}
        >
          Add Card
        </Button>
      </Box>

      {cards.length > 0 ? (
        <Card
          sx={{
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative'
          }}
          onClick={handleFlip}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              {isFlipped ? 'Answer' : 'Question'}
            </Typography>
            <Typography variant="body1" align="center">
              {isFlipped ? cards[currentIndex].answer : cards[currentIndex].question}
            </Typography>
          </CardContent>
          <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteCard(cards[currentIndex].id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ) : (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No flashcards yet. Add some to get started!
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PrevIcon />}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ alignSelf: 'center' }}>
          {cards.length > 0 ? `${currentIndex + 1} / ${cards.length}` : '0 / 0'}
        </Typography>
        <Button
          variant="outlined"
          endIcon={<NextIcon />}
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
        >
          Next
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Flashcard</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Question"
            fullWidth
            multiline
            rows={2}
            value={newCard.question}
            onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Answer"
            fullWidth
            multiline
            rows={4}
            value={newCard.answer}
            onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveCard} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Flashcards; 