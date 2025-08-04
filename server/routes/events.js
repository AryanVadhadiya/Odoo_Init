const express = require('express');
const { body, query } = require('express-validator');
const Event = require('../models/Event');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validate');

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events with filtering and pagination
// @access  Public
router.get('/', [
  optionalAuth,
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('category').optional().isIn(['web-development', 'mobile-development', 'ai-ml', 'blockchain', 'cybersecurity', 'iot', 'other']),
  query('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced']),
  query('location').optional().isIn(['online', 'offline', 'hybrid']),
  query('status').optional().isIn(['published', 'registration-open', 'registration-closed', 'ongoing', 'completed']),
  handleValidationErrors
], async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      difficulty,
      location,
      status,
      featured,
      search
    } = req.query;

    const query = {};

    // Apply filters
    if (category) query.categories = category;
    if (difficulty) query.difficulty = difficulty;
    if (location) query['location.type'] = location;
    if (status) query.status = status;
    if (featured === 'true') query.featured = true;

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const events = await Event.find(query)
      .populate('organizers', 'firstName lastName email')
      .sort({ startDate: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(query);

    res.json({
      success: true,
      events,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching events'
    });
  }
});

// @route   GET /api/events/featured
// @desc    Get featured events
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const events = await Event.findFeatured(5);
    
    res.json({
      success: true,
      events
    });
  } catch (error) {
    console.error('Get featured events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching featured events'
    });
  }
});

// @route   GET /api/events/upcoming
// @desc    Get upcoming events
// @access  Public
router.get('/upcoming', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const events = await Event.findUpcoming(parseInt(limit));
    
    res.json({
      success: true,
      events
    });
  } catch (error) {
    console.error('Get upcoming events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching upcoming events'
    });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizers', 'firstName lastName email');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Increment view count
    event.statistics.views += 1;
    await event.save();

    res.json({
      success: true,
      event
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching event'
    });
  }
});

// @route   POST /api/events
// @desc    Create new event
// @access  Private/Admin
router.post('/', [
  protect,
  authorize('admin', 'moderator'),
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Description must be between 20 and 2000 characters'),
  body('shortDescription')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Short description must be between 10 and 200 characters'),
  body('startDate')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('registrationDeadline')
    .isISO8601()
    .withMessage('Registration deadline must be a valid date'),
  body('categories')
    .isArray({ min: 1 })
    .withMessage('At least one category is required'),
  body('categories.*')
    .isIn(['web-development', 'mobile-development', 'ai-ml', 'blockchain', 'cybersecurity', 'iot', 'other'])
    .withMessage('Invalid category'),
  handleValidationErrors
], async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      organizers: [req.user._id]
    };

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating event'
    });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private/Admin
router.put('/:id', [
  protect,
  authorize('admin', 'moderator'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Description must be between 20 and 2000 characters'),
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Short description must be between 10 and 200 characters'),
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date'),
  body('registrationDeadline')
    .optional()
    .isISO8601()
    .withMessage('Registration deadline must be a valid date'),
  handleValidationErrors
], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if user is organizer or admin
    const isOrganizer = event.organizers.includes(req.user._id);
    const isAdmin = req.user.role === 'admin';

    if (!isOrganizer && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this event'
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Event updated successfully',
      event: updatedEvent
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating event'
    });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private/Admin
router.delete('/:id', [
  protect,
  authorize('admin')
], async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting event'
    });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register for an event
// @access  Private
router.post('/:id/register', protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.status !== 'registration-open') {
      return res.status(400).json({
        success: false,
        message: 'Event registration is not open'
      });
    }

    if (new Date() > event.registrationDeadline) {
      return res.status(400).json({
        success: false,
        message: 'Registration deadline has passed'
      });
    }

    if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }

    // Increment participant count
    event.currentParticipants += 1;
    event.statistics.registrations += 1;
    await event.save();

    res.json({
      success: true,
      message: 'Successfully registered for event',
      event
    });
  } catch (error) {
    console.error('Register for event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while registering for event'
    });
  }
});

// @route   GET /api/events/search
// @desc    Search events
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q, filters = {}, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const events = await Event.search(q, { ...filters, limit: parseInt(limit) });

    res.json({
      success: true,
      events,
      query: q
    });
  } catch (error) {
    console.error('Search events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching events'
    });
  }
});

module.exports = router; 