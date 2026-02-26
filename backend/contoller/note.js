 const userNote  = require('../module/note')
   const note = async (req, res) => {
    const {title,description} = req.body
    const newNote = new userNote({
        title,
        description
    })
    await newNote.save()
    return res.redirect('/')
 }
 


module.exports = note;