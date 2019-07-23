import PropTypes from 'prop-types';

const stretchShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  bodyPartId: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  videoUrl: PropTypes.string.isRequired,
});


export default { stretchShape };
