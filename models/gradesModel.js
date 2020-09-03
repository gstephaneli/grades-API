export default (mongoose) => {
    const schema = mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        min:0,
        required: true,
      },
      lastModified: { 
          type: Date,
          default: Date.now
       },
    });
  
    const Grades = mongoose.model('grades', schema, 'grades');
  
    return Grades;
  };
  