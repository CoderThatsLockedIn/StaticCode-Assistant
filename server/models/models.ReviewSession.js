import mongoose from 'mongoose';

// Sub-schema for individual code findings / issues
const findingSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true, 
    enum: ['Security', 'Performance', 'Style', 'Bug Risk'] 
  },
  severity: { 
    type: String, 
    required: true, 
    enum: ['High', 'Medium', 'Low'] 
  },
  message: { type: String, required: true },
  lineStart: { type: Number },
  lineEnd: { type: Number },
  suggestedFix: { type: String }
});

// Main schema for a code review session
const reviewSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Added user association
  title: { type: String, default: 'Untitled Snippet' },
  language: { type: String, required: true },
  sourceCode: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'completed' 
  },
  summary: {
    high: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    low: { type: Number, default: 0 }
  },
  findings: [findingSchema]
}, { timestamps: true });

const ReviewSession = mongoose.model('ReviewSession', reviewSessionSchema);

export default ReviewSession;