import { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';

export default function Comments({ docId, comments: allComments, posted, commentInput }) {
  const [comments, setComment] = useState(allComments);
  return (
    <>
      <p>I am a comment</p>
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired
};
