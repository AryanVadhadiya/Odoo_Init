const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  registrationDeadline: {
    type: Date,
    required: [true, 'Registration deadline is required']
  },
  location: {
    type: {
      type: String,
      enum: ['online', 'offline', 'hybrid'],
      default: 'online'
    },
    address: String,
    city: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  maxParticipants: {
    type: Number,
    default: null
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  categories: [{
    type: String,
    enum: ['web-development', 'mobile-development', 'ai-ml', 'blockchain', 'cybersecurity', 'iot', 'other']
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  prizes: [{
    rank: {
      type: String,
      enum: ['1st', '2nd', '3rd', 'honorable-mention']
    },
    amount: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    description: String
  }],
  sponsors: [{
    name: String,
    logo: String,
    website: String,
    contribution: String
  }],
  organizers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  mentors: [{
    name: String,
    expertise: String,
    bio: String,
    avatar: String
  }],
  resources: [{
    title: String,
    description: String,
    url: String,
    type: {
      type: String,
      enum: ['documentation', 'video', 'tutorial', 'api', 'other']
    }
  }],
  rules: [String],
  tags: [String],
  status: {
    type: String,
    enum: ['draft', 'published', 'registration-open', 'registration-closed', 'ongoing', 'completed', 'cancelled'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  coverImage: {
    type: String,
    default: null
  },
  gallery: [String],
  registrationFee: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  requirements: {
    minTeamSize: {
      type: Number,
      default: 1
    },
    maxTeamSize: {
      type: Number,
      default: 4
    },
    ageRestriction: {
      min: Number,
      max: Number
    },
    skills: [String],
    equipment: [String]
  },
  timeline: [{
    title: String,
    description: String,
    date: Date,
    type: {
      type: String,
      enum: ['registration', 'kickoff', 'checkpoint', 'submission', 'judging', 'awards']
    }
  }],
  contact: {
    email: String,
    phone: String,
    website: String
  },
  socialMedia: {
    twitter: String,
    facebook: String,
    instagram: String,
    linkedin: String
  },
  statistics: {
    views: {
      type: Number,
      default: 0
    },
    registrations: {
      type: Number,
      default: 0
    },
    submissions: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for event duration
eventSchema.virtual('duration').get(function() {
  if (this.startDate && this.endDate) {
    const duration = this.endDate - this.startDate;
    const days = Math.ceil(duration / (1000 * 60 * 60 * 24));
    return days;
  }
  return null;
});

// Virtual for registration status
eventSchema.virtual('isRegistrationOpen').get(function() {
  if (this.status === 'registration-open') {
    return new Date() <= this.registrationDeadline;
  }
  return false;
});

// Virtual for event status
eventSchema.virtual('eventStatus').get(function() {
  const now = new Date();
  if (this.status === 'cancelled') return 'cancelled';
  if (now < this.startDate) return 'upcoming';
  if (now >= this.startDate && now <= this.endDate) return 'ongoing';
  if (now > this.endDate) return 'completed';
  return 'unknown';
});

// Indexes for better query performance
eventSchema.index({ status: 1, startDate: 1 });
eventSchema.index({ categories: 1 });
eventSchema.index({ featured: 1 });
eventSchema.index({ 'location.city': 1, 'location.country': 1 });
eventSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Pre-save middleware to update current participants
eventSchema.pre('save', function(next) {
  if (this.isModified('currentParticipants')) {
    if (this.currentParticipants < 0) {
      this.currentParticipants = 0;
    }
    if (this.maxParticipants && this.currentParticipants > this.maxParticipants) {
      this.currentParticipants = this.maxParticipants;
    }
  }
  next();
});

// Static method to find upcoming events
eventSchema.statics.findUpcoming = function(limit = 10) {
  return this.find({
    status: { $in: ['published', 'registration-open'] },
    startDate: { $gt: new Date() }
  })
  .sort({ startDate: 1 })
  .limit(limit);
};

// Static method to find featured events
eventSchema.statics.findFeatured = function(limit = 5) {
  return this.find({
    featured: true,
    status: { $in: ['published', 'registration-open'] }
  })
  .sort({ startDate: 1 })
  .limit(limit);
};

// Static method to search events
eventSchema.statics.search = function(query, filters = {}) {
  const searchQuery = {
    $text: { $search: query }
  };
  
  if (filters.categories && filters.categories.length > 0) {
    searchQuery.categories = { $in: filters.categories };
  }
  
  if (filters.difficulty) {
    searchQuery.difficulty = filters.difficulty;
  }
  
  if (filters.location) {
    searchQuery['location.type'] = filters.location;
  }
  
  return this.find(searchQuery)
    .sort({ score: { $meta: 'textScore' } })
    .limit(filters.limit || 20);
};

module.exports = mongoose.model('Event', eventSchema); 