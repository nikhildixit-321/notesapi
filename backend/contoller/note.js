const userNote = require('../module/note');

const createNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        
     
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: 'Title and description are required'
            });
        }
        
        const newNote = new userNote({
            title,
            description
        });
        
        await newNote.save();
        
        res.status(201).json({
            success: true,
            message: 'Note created successfully',
            data: newNote
        });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

// Get all notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await userNote.find({});
        
        res.status(200).json({
            success: true,
            message: 'Notes fetched successfully',
            data: notes
        });
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await userNote.findById(id);
        
        if (!note) {
            return res.status(404).json({
                success: false,
        message: 'Note not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Note fetched successfully',
            data: note
        });
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        
        const updatedNote = await userNote.findByIdAndUpdate(
            id,
            { title, description },
            { returnDocument: 'after', runValidators: true }
        );
        
        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Note updated successfully',
            data: updatedNote
        });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
const editNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedNote = await userNote.findByIdAndUpdate(
            id,
            { title, description },
            { returnDocument: 'after', runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Note updated successfully',
            data: updatedNote
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedNote = await userNote.findByIdAndDelete(id);
        
        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Note deleted successfully',
            data: deletedNote
        });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    editNote
};