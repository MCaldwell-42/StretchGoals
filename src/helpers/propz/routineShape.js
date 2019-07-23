import PropTypes from 'prop-types';

const routineShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});


export default { routineShape };
