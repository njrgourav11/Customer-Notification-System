import React, { useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

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

  // Handle template change
  const handleTemplateChange = (e) => {
    const selected = e.target.value;
    onTemplateChange(selected, templates[selected]); // Pass the template name and its message
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
    <div className="mb-4">
      <FormControl fullWidth>
        <InputLabel>Template</InputLabel>
        <Select
          value={selectedTemplate}
          onChange={handleTemplateChange}
          label="Template"
        >
          {Object.keys(templates).map((templateKey) => (
            <MenuItem key={templateKey} value={templateKey}>
              {templateKey.charAt(0).toUpperCase() + templateKey.slice(1)} Template
            </MenuItem>
          ))}
          {/* Add Template Option */}
          <MenuItem onClick={handleOpenDialog}>
            Add Template
          </MenuItem>
        </Select>
      </FormControl>

      {/* Display the message of the selected template */}
      <div className="mt-4">
        <TextField
          label="Template Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={templates[selectedTemplate] || ''}
          onChange={() => {}}
          disabled
        />
      </div>

      {/* Dialog for Adding a New Template */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Template</DialogTitle>
        <DialogContent>
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
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddTemplate} color="primary">
            Add Template
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TemplateSelection;
