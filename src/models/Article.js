const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const User = require('./User');
const CustomValidationError = require('../utils/errors/CustomValidationError');
const {Schema} = mongoose;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Article title is required'],
    maxlength: [150, 'Title is to long. Cannot contain more than {MAXLENGTH} characters.'], // eslint-disable-line max-len
  },
  text: {
    type: String,
    require: [true, 'Article Text is required.'],
    maxlength: [30000, 'The Text is to long. Cannot contain more than {MAXLENGTH} characters.'], // eslint-disable-line max-len
  },
  tags: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Create an index on a searchable field.
ArticleSchema.index({tags: 1});

// Add paginaiton plugin.
ArticleSchema.plugin(mongoosePaginate);

// Validate user exist.
ArticleSchema.pre('save', function(next) {
  User.findById(this.user)
    .then((user) => {
      if (user) {
        return next();
      }
      const errors = {user: 'User does not exist.'};
      next(new CustomValidationError('User does not exist.', errors));
    })
    .catch(next);
});

Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
