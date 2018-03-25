const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const {Schema} = mongoose;

const Article = new Schema({
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

Article.index({tags: 1});

Article.plugin(mongoosePaginate);

module.exports = Article;
