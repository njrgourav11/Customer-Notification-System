import React, { useState } from 'react';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from '@mui/material';

const TemplateSelection = ({ selectedTemplate, onTemplateChange }) => {
  // Define messages for each template
  const [templates, setTemplates] = useState({
    basic: 'Hello, this is a basic message. Please let us know if you need any further assistance.',
    advanced: 'Dear Customer, we are pleased to offer you an advanced service. Please reach out to us for more information.',
    promo: 'Exclusive Offer! Get 20% off on your next purchase using promo code SAVE20. Limited time only!',
    reminder: 'Reminder: Your appointment is scheduled for tomorrow at 10:00 AM. Please don’t forget.',
    event: 'Join us for our exciting event happening this weekend! RSVP today to secure your spot.',
    thank_you: 'Thank you for your recent purchase! We appreciate your business and look forward to serving you again.',
  });

  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateMessage, setNewTemplateMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(''); // Store selected template message

  // Handle template change
  const handleTemplateChange = (e) => {
    const selected = e.target.value;
    const message = templates[selected] || '';
    setSelectedMessage(message); // Update local state with selected message
    onTemplateChange(selected, message); // Pass selection to parent component
  };

  // Handle new template input change
  const handleNewTemplateNameChange = (e) => {
    setNewTemplateName(e.target.value);
  };

  const handleNewTemplateMessageChange = (e) => {
    setNewTemplateMessage(e.target.value);
  };

  // Open Add Template Dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close Add Template Dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Add new template
  const handleAddTemplate = () => {
    if (newTemplateName && newTemplateMessage) {
      setTemplates((prevTemplates) => ({
        ...prevTemplates,
        [newTemplateName]: newTemplateMessage,
      }));
      setNewTemplateName('');
      setNewTemplateMessage('');
      setOpenDialog(false);
    }
  };

  return (
    <Paper
      elevation={6} // Card shadow effect
      sx={{
        p: 3,
        borderRadius: 2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // Light gradient background
      }}
    >
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Template</InputLabel>
        <Select
          value={selectedTemplate || ''}
          onChange={handleTemplateChange}
          label="Template"
          sx={{
            backgroundColor: 'white',
            borderRadius: 1,
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)', // Slight shadow for a floating effect
          }}
        >
          {Object.keys(templates).map((templateKey) => (
            <MenuItem key={templateKey} value={templateKey}>
              {templateKey.charAt(0).toUpperCase() + templateKey.slice(1)} Template
            </MenuItem>
          ))}
          {/* Add Template Option */}
          <MenuItem onClick={handleOpenDialog} sx={{ fontWeight: 'bold', color: '#1976D2' }}>
            Add Template
          </MenuItem>
        </Select>
      </FormControl>

      {/* Display the message of the selected template */}
      <TextField
        label="Template Message"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        value={selectedMessage} // Display selected message
        disabled
        sx={{
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
        }}
      />

      {/* Dialog for Adding a New Template */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle sx={{ background: 'linear-gradient(135deg, #2193b0, #6dd5ed)', color: 'white' }}>
          Add New Template
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#f4f6f8' }}>
          <TextField
            label="Template Name"
            variant="outlined"
            fullWidth
            value={newTemplateName}
            onChange={handleNewTemplateNameChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Template Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newTemplateMessage}
            onChange={handleNewTemplateMessageChange}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#f4f6f8' }}>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddTemplate}
            sx={{
              background: 'linear-gradient(135deg, #56ab2f, #a8e063)',
              color: 'white',
              '&:hover': { background: 'linear-gradient(135deg, #4ca62f, #94d65e)' },
            }}
          >
            Add Template
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TemplateSelection;
