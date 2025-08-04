const express = require('express');
const { body } = require('express-validator');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validate');

const router = express.Router();

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      success: true,
      user: user.getPublicProfile()
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
  protect,
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),
  body('socialLinks.github')
    .optional()
    .isURL()
    .withMessage('GitHub URL must be valid'),
  body('socialLinks.linkedin')
    .optional()
    .isURL()
    .withMessage('LinkedIn URL must be valid'),
  body('socialLinks.twitter')
    .optional()
    .isURL()
    .withMessage('Twitter URL must be valid'),
  body('socialLinks.website')
    .optional()
    .isURL()
    .withMessage('Website URL must be valid'),
  handleValidationErrors
], async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      bio,
      socialLinks,
      preferences
    } = req.body;

    const updateFields = {};
    
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (bio !== undefined) updateFields.bio = bio;
    if (socialLinks !== undefined) updateFields.socialLinks = socialLinks;
    if (preferences !== undefined) updateFields.preferences = preferences;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: user.getPublicProfile()
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @route   DELETE /api/user/profile
// @desc    Delete user account
// @access  Private
router.delete('/profile', protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isActive: false });

    res.json({
      success: true,
      message: 'Account deactivated successfully'
    });
  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deactivating account'
    });
  }
});

// @route   GET /api/user/preferences
// @desc    Get user preferences
// @access  Private
router.get('/preferences', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('preferences');
    
    res.json({
      success: true,
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching preferences'
    });
  }
});

// @route   PUT /api/user/preferences
// @desc    Update user preferences
// @access  Private
router.put('/preferences', [
  protect,
  body('theme')
    .optional()
    .isIn(['light', 'dark', 'auto'])
    .withMessage('Theme must be light, dark, or auto'),
  body('notifications.email')
    .optional()
    .isBoolean()
    .withMessage('Email notifications must be a boolean'),
  body('notifications.push')
    .optional()
    .isBoolean()
    .withMessage('Push notifications must be a boolean'),
  handleValidationErrors
], async (req, res) => {
  try {
    const { theme, notifications } = req.body;

    const updateFields = {};
    
    if (theme !== undefined) updateFields['preferences.theme'] = theme;
    if (notifications?.email !== undefined) updateFields['preferences.notifications.email'] = notifications.email;
    if (notifications?.push !== undefined) updateFields['preferences.notifications.push'] = notifications.push;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating preferences'
    });
  }
});

// @route   GET /api/user/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const stats = {
      memberSince: user.createdAt,
      lastLogin: user.lastLogin,
      totalEvents: 0, // This would be calculated from event registrations
      completedEvents: 0, // This would be calculated from event completions
      totalWins: 0, // This would be calculated from event wins
      averageScore: 0 // This would be calculated from event scores
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

// @route   GET /api/user/search
// @desc    Search users (admin only)
// @access  Private/Admin
router.get('/search', protect, authorize('admin'), async (req, res) => {
  try {
    const { q, role, limit = 10, page = 1 } = req.query;
    
    const query = { isActive: true };
    
    if (q) {
      query.$or = [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } }
      ];
    }
    
    if (role) {
      query.role = role;
    }

    const skip = (page - 1) * limit;
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      users: users.map(user => user.getPublicProfile()),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while searching users'
    });
  }
});

module.exports = router; 